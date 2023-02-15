---
title: Compactly Representing Scenes in GPU Path Tracing
permalink: /blogs/gpu-path-tracing-compact-scenes
layout: single
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
excerpt: Memory bandwidth is usually not a bottleneck in GPU path tracing - unless it is. 
header:
  overlay_color: "#000"
  overlay_filter: "0.24"
  overlay_image: /assets/images/compact-scenes/breakfast-sq.png
  teaser: /assets/images/compact-scenes/breakfast-sq.png
---

# When Bandwith Becomes an Issue
Suppose you've super-duper optimized your path tracer to be 99.9% branchless - but wait! It still runs at 0.01 FPS! 

For us unforunately, bandwidth has finally caught up to us and is now a limiting factor. Optimizing bandwidth occurs in two ways:
1. we optimize our raw memory to store the same data but more compactly, or
2. we make sure our code doesn't move around as much memory.

# Storing Raw Data More Compactly
Usually, there's a few components of a path tracer that are really frequently accessed:
1. the BVH,
2. the actual scene geometry, 
3. whatever data structure we are using to store NEE surfaces, 
4. any ray/work pools, and 
5. textures.

Usually 4 is a matter of our traversal algorithm and 5 is extremely fast on the GPU, so I'll look at 1, 2, and 3.

## The BVH

Let's begin with a very rough way of how we would represent a node:

```glsl
// 24 bytes
struct AABB {
    float min[3];
    float max[3];
};

// 41 bytes
struct node {
    AABB box;
    bool isLeaf;

    int child1, child2; // parent data
    int startIndex, endIndex; // leaf data
};
```

Now this representation is absolutely horrible. 

On the GPU, a the L1 cache is 128 bytes. To make the most out of caching, we should place child nodes together and make sure that both nodes cannot cross a cache boundry. Additionally, the size of a node should divide 128 to ensure proper alignment. 