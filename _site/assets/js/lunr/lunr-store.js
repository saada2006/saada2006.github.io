var store = [{
        "title": "Part 0 - Introduction",
        "excerpt":"OpenGL and GLSL Minecraft is written in a really old version of OpenGL, and shaders are only available via OpenGL extensions. Since Minecraft is written in such an old OpenGL version, many (old) shaders are written in GLSL version 120. For simplicity’s sake, I will be also writing my shaders...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shader-tutorials/part-0",
        "teaser": "/assets/images/mc_shaders_part0/2020-12-30_13.22.37.png"
      },{
        "title": "Part 1 - The Final Program",
        "excerpt":"Basic file structure of a shader Before we start learning about final, we need to understand the basic file structure of a shader pack. Within a shader pack, there is a folder called “shaders”. This is where all the shader files goes. The files have the extension .vsh for vertex...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shader-tutorials/part-1",
        "teaser": "/assets/images/mc_shaders_part1/demo.png"
      },{
        "title": "Part 2 - The Gbuffers Programs",
        "excerpt":"What is gbuffers? The gbuffers programs are the main geometry passes. In gbuffers, you can render entities, particals, blocks, etc from the point of view of the player. There are different types of gbuffers programs. For example, gbuffers_terrain renders blocks like stone and dirt, while gbuffers_entities renders entities like mobs...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shader-tutorials/part-2",
        "teaser": "/assets/images/mc_shaders_part2/simple_diffuse.png"
      },{
        "title": "Part 3 - Lighting and Shadows",
        "excerpt":"The lightmap In the gbuffers vertex shader, the lightmap is accesible by using gl_MultiTexCoord1. The s channel is the torch lightmap, and the t channel is the sky lightmap..However this value is not in the range [0, 1]. Instead it is in the range [0, 15], but that can change...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shader-tutorials/part-3",
        "teaser": "/assets/images/mc_shaders_part3/no_shadow_acne.png"
      },{
        "title": "Part 4 - Advanced Shadow Mapping",
        "excerpt":"Fixing the low detailed shadows problem Continuing from the last tutorial, our shadows still look blocky. There is a fix to this. We can use a technique known as shadow distortion. In a nutshell, what shadow distortion does is distort the shadow clip space verticies in a way that verticies...","categories": ["shaders"],
        "tags": [],
        "url": "/minecraft-shader-tutorials/part-4",
        "teaser": "/assets/images/mc_shaders_part4/transparent_shadows.png"
      },{
        "title": "GPU BVH Traversal Algorithms",
        "excerpt":"A Quick Primer on How GPUs Crunch Numbers and Stuff GPUs are essentially just like the CPU except with one small difference: every thing is massively parrallelized. Work is executed in the single instruction multiple thread (SIMT) model, meaning that a group of threads (usually 32) exeucte an instruction altoghter...","categories": ["gpu"],
        "tags": [],
        "url": "/blogs/gpu-bvh-traversal-algorithms",
        "teaser": "/assets/images/bvh_traversal_algos/bvh.png"
      },{
        "title": "GPU Path Tracer",
        "excerpt":"I wrote this project in order to do path tracing in real time on the GPU. Currently, the project attains 20-30 FPS in scenes like Conference and Breakfast Room on my GTX 980 using OpenGL. It currently supports: MIS, NEE, and physically-based BRDFs Spatially-split BVHs Path regeneration This project is...","categories": [],
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
