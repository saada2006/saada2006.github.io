---
title: "BVH Traversal Algorithms"
layout: splash
categories:
    - gpu
---

Designing Algorithms that traverse BVHs efficiently on the GPU is no easy task. Porting the usual CPU algorithms for traversal will not work well at all, unless you enjoy horrible performance along with low hardware utilization. Thankfully, some smart people have already created efficient traversal methods, so we do not need to waste our time getting a degree in GPU programming to make ray tracing work fast. In this blog post, I begin by first going over some of the basics of how GPUs work, and then move onto making your traversal more efficient.

# A Quick Primer on How GPUs Crunch Numbers and Stuff

GPUs are essentially just like the CPU except with one small difference: every thing is massively parrallelized. Work is executed in the single instruction multiple thread (SIMT) model, meaning that a group of threads (usually 32) exeucte an instruction altoghter at once. This group of threads is known as a *warp* and on Nvidia GPUs, each warp executes on a single CUDA core, with the average GPU having thousands of them. The SIMT model allows your GPU to crunch a lot of numbers, for example, in a video game where millions of pixels need to undergo the same lighting calculations. However, an avid reader would realize the SIMT model would probably not work (well) at all with conditional statements like `if`. Suppose I have a block of code like:

```glsl
if(cond)
    MyFuncA();
else
    MyFuncB();
```

In the SIMT model, all threads where `cond` is true will proceed on to execute `MyFuncA()` while the other threads wait and do nothing. One the threads that were executing `MyFuncA()` are done, they then wait for the other threads to finish doing `MyFuncB()`. This leads to extremely poor hardware utilization, as each thread will, at some point, have to wait and do nothing. This problem gets even worse if `MyFuncA()` or `MyFuncB()` are costly to evaluate, which increases the wait times. This is exactly the problem in path tracing: too many conditionals lead to wasted hardware utilization. Some paths may terminate early on, and be completely idle until long running paths terminate.

# Improving Hardware Utilization

In 2009, a ground-breaking research paper by researchers Timo Aila and Samuli Laine at Nvidia published in the *High Performance Graphics* journal showed the results of experiments with various traversal algorithms, which included the performance of the `while-while` traversal algorithm:

```
function traverse(root)
    node = root
    while ray is not terminated
        while node is not a leaf node
            move to the next node
        while node is a leaf node
            intersect with the primitives in node
            move to the next node
```

At first glance, this code seems to be properly parallelized by ensuring that `node` is either a parent or leaf node at the beginning of the two inner `while` loops. To test how well this algorithm is suited towards GPU ray tracing, a simulator was devised that "ran" the algorithm assuming perfect conditions in memory usage to set an upper bound for performance. The simulator also recorded the hardware utilization (referred to as "SIMD efficiency" in their paper) to gain further information. Surprisingly, the `while-while` traversal only acheived approximately 55% efficiency, meaning that it was poorly parallelized. Upon further inspection, this becomes obvious: the inner `while` loops have wildly varying execution times before they end. This means that, for example, while most rays had found a leaf node early on, some threads are stalling the entire warp by still going deeper into the tree. Then, when some nodes have exhausted the leaf nodes they have left to intersect, some threads are still going through each possible intersection. Then the loop was reorganized to follow an `if-if` structure:

```
function traverse(root)
    node = root
    while ray is not terminated
        if node is not a leaf
            proceed to the next node
        if node is a leaf
            intersect with the primitives in node
            move to the next node
```

This function executres a lot better. This is because instead of having loops with can have varying execution times, we only have two `if-if` conditionals, which execute more or less in a constant amount of time . The traversal logic if the node is not a leaf may take a varying amount of time, and leaves can have a varying amount of primitives referenced with in them, so it is not perfectly constant. `if-if` was tested by the simulator and showed the perforamance skyrocketed to 75% efficiency.

# Persistent GPU Computing

In normal GPU compute applications, if you have `n` tasks to process, you tell the GPU to dispatch `n` threads and each thread will work on a single task. However, in many cases, the number tasks exceeds the number of available threads, so a hardware scheduler is needed to dispatch tasks at optimial timings. An optimization GPU hardware schedulers often use is to pause a warp's execution of its tasks and move onto another set of tasks (this strategy is commonly used when the entire warp is idling because it is waiting on memory reads to return). This works very well for regular workloads, but for highly irregular workloads like ray-tracing, the hardware scheduler becomes our enenmy. To bypass it, the *persistent threads* programming model is used. Simply put, we launch just enough "tasks"" to completely fill our GPU, and implement our own software scheduler that gathers work for our threads. This has the benefit of not letting our hardware scheduler interrupt our program execution as it has no tasks to replace it with. Our software scheduler can be implemented by fetching our actual tasks from a work pool. One way we can implement persistent threads in ray tracing is to first represent our screen not as a 2D array but a long 1D array, and associate for each index in it a pixel coordinate on the 2D array. We can then increment atomic counters (until our 1D array is full) to get a pixel from this 1D array. An implementation of persistent threads in GLSL would look like this:

```glsl
layout(local_size_x = 32, local_size_y = 1, local_size_z = 1) in; // What this means is that we run one warp per each dispatch 
    
const uint batchPortion = 32; // How many tasks our warp will process. This should be the number of threads in a warp
const uint batchSize = 1 * batchPortion; // On a GTX 285, 3 is the optimal multiplier [1], but 1 seems to perform better on my GTX 980

shared uint nextRay;  // In this warp, what will our next ray be?
shared uint rayCount; // In this warp, how many rays are left? (if it is zero we need to get more tasks)

layout(std430) buffer globalNextRayBuf {
    uint globalNextRay; // Initially zero
};

void main() {
    threadIdx =  gl_LocalInvocationID.xy;

    // Initialize all to batchPortion since we will subtract batchPortion later to make it zero
    if(threadIdx.x == 0) {
        rayCount = batchPortion;
    }

    while(true) {
        if(threadIdx.x == 0) {
            // Update our remaining tasks
            nextRay += batchPortion;
            rayCount -= batchPortion;
            // If we are out of rays, then fetch some more
            if(rayCount == 0) {
                nextRay = atomicAdd(globalNextRay, batchSize);
                rayCount = batchSize;
            }
            memoryBarrierShared(); // Flush the value out of volatile memory
        }
        // Find the ray we are processing for this specific thread
        uint rayIndex = nextRay + threadIdx.x;
        if(rayIndex >= globalRayCount) {
            break;
        }
        // Complete our ray task
        ivec2 pixel = ConvertIndexToCoordiante(rayIndex); 
        vec3 color = RayTrace(pixel);
        imageStore(screen, pixel, vec4(color, 1.0));
    }
}
```
The implemenation of persistent threads begins by grabbing 32 tasks per each warp (since the number of threads in a warp is 32) and then proceeds to go burn through the 32 threads before getting more. This allows us to bypass the hardware scheduler and have more performance. Much more. In fact, from my testing, I went from 13 FPS to outright 20 FPS in one scene. Simulation results show that this is close to 85% of maximum performance.

# Persistent Regeneration

In a path tracing loop, paths are often terminated because they either leave the scene or have too low energy. This is problematic for path tracers on the GPU because many threads stay idle because they were terminated early on while others continue long-running paths. To circumvent this issue, I choose to replace a path with a brand new one every time it was terminated by having too low energy. This gave me another 3-5 FPS boost.

# Further Reading

1. Timo Aila and Samuli Laine. 2009. Understanding the Efficiency of Ray Traversal on GPUs. In *Proceedings of the Conference on High Performance Graphics 2009* (HPG ’09), Association for Computing Machinery, New Orleans, Louisiana, 145–149. DOI:https://doi.org/10.1145/1572769.1572792<
2. Kshitij Gupta, Jeff A. Stuart, and John D. Owens. 2012. A study of Persistent Threads style GPU programming for GPGPU workloads. In *2012 Innovative Parallel Computing* (InPar), 1–14. DOI:https://doi.org/10.1109/InPar.2012.6339596