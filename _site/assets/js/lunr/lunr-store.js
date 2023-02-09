var store = [{
        "title": "Minecraft Shaders Part 0",
        "excerpt":"Here I will explain a few basics of the graphics in Minecraft and the shader pipeline and how Minecraft shaders work in general. OpenGL and GLSL Minecraft is written in a really old version of OpenGL, and shaders are only available via OpenGL extensions. Since Minecraft is written in such...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shaders-tutorial/part-0",
        "teaser": "/assets/images/mc_shaders_part0/2020-12-30_13.22.37.png"
      },{
        "title": "Minecraft Shaders Part 1",
        "excerpt":"In this tutorial we explore the most basic fullscreen pass: The final pass. Basic file structure of a shader Before we start learning about final, we need to understand the basic file structure of a shader pack. Within a shader pack, there is a folder called “shaders”. This is where...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shaders-tutorial/part-1",
        "teaser": "/assets/images/mc_shaders_part1/demo.png"
      },{
        "title": "Minecraft Shaders Part 2",
        "excerpt":"Today we will explore the gbuffers and composite shader programs, and we will use our new knowledge to implement basic diffuse lighting What is gbuffers? The gbuffers programs are the main geometry passes. In gbuffers, you can render entities, particals, blocks, etc from the point of view of the player....","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shaders-tutorial/part-2",
        "teaser": "/assets/images/mc_shaders_part2/simple_diffuse.png"
      },{
        "title": "Minecraft Shaders Part 3",
        "excerpt":"In this tutorial we will look at implementing the lightmap and shadows. The lightmap In the gbuffers vertex shader, the lightmap is accesible by using gl_MultiTexCoord1. The s channel is the torch lightmap, and the t channel is the sky lightmap..However this value is not in the range [0, 1]....","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shaders-tutorial/part-3",
        "teaser": "/assets/images/mc_shaders_part3/no_shadow_acne.png"
      },{
        "title": "Minecraft Shaders Part 4",
        "excerpt":"In this tutorial I will make our shadows look actually good. I will be covering things like PCF, shadow distortion, and transparent shadows. Fixing the low detailed shadows problem Continuing from the last tutorial, our shadows still look blocky. There is a fix to this. We can use a technique...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shaders-tutorial/part-4",
        "teaser": "/assets/images/mc_shaders_part4/transparent_shadows.png"
      },{
        "title": "BVH Traversal Algorithms",
        "excerpt":"In this blog post, I go over how we can design efficient GPU BVH traversal algorithms. A Quick Primer on How GPUs Crunch Numbers and Stuff GPUs are essentially just like the CPU except with one small difference: every thing is massively parrallelized. Work is executed in the single instruction...","categories": ["gpu"],
        "tags": [],
        "url": "/blogs/gpu_traversal_algos",
        "teaser": "/assets/images/bvh_traversal_algos/bvh.png"
      },{
        "title": "GPU Path Tracer",
        "excerpt":"A computer program that I am wrote to do real-time path tracing on the GPU. Currently, it supports MIS, NEE, and physically-based BRDFs. It also uses spatial splits BVHs. This was originally a project I had completed throughout April and a bit of May 2021, but I picked it back...","categories": [],
        "tags": [],
        "url": "/projects/path-tracer",
        "teaser": "/assets/images/path-tracer/cornell-box.png"
      },{
        "title": "CPU Renderer",
        "excerpt":"This was an offshoot of my GPU path tracing project. My goal was to implement more complex rendering algorithms here before adapting them to the GPU. The code is here. Notice that the above image doesn’t seem to have caustics. I didn’t get that far because I stopped working on...","categories": [],
        "tags": [],
        "url": "/projects/cpu-renderer",
        "teaser": "/assets/images/cpu-renderer/render.png"
      },{
        "title": "Minecraft Shaders",
        "excerpt":"Way back, I worked on Minecraft shader projects. This shaderpack is the culmination of my work and what I learned. The shaderpack includes precomputed atmospheric scattering, transparent soft shadows, volumetric clouds and lighting, I worked on this shader from December 2020 to February 2021. You can download it here. Before...","categories": [],
        "tags": [],
        "url": "/projects/minecraft-shaders",
        "teaser": "/assets/images/shaders/village-square.png"
      }]
