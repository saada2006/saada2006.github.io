var store = [{
        "title": "Minecraft Shader Tutorial 0 - Prerequisites",
        "excerpt":"Here I will explain a few basics of the graphics in Minecraft and the shader pipeline and how Minecraft shaders work in general. Graphics in Minecraft Minecraft is written in a really old version of OpenGL, and shaders are only available via OpenGL extensions. Since Minecraft is written in such...","categories": ["shaders"],
        "tags": [],
        "url": "/posts/shaders/2021-02-13-mc_shader_tut0/",
        "teaser": null
      },{
        "title": "Minecraft Shader Tutorial 1 - The Final Program",
        "excerpt":"In this tutorial we explore the most basic fullscreen pass: The final pass. Basic file structure of a shader Before we start learning about final, we need to understand the basic file structure of a shader pack. Within a shader pack, there is a folder called “shaders”. This is where...","categories": ["shaders"],
        "tags": [],
        "url": "/posts/shaders/2021-02-14-mc_shader_tut1/",
        "teaser": null
      },{
        "title": "Minecraft Shader Tutorial 2 - The Gbuffers and Composite Programs",
        "excerpt":"Today we will explore the gbuffers and composite shader programs, and we will use our new knowledge to implement basic diffuse lighting What is gbuffers? The gbuffers programs are the main geometry passes. In gbuffers, you can render entities, particals, blocks, etc from the point of view of the player....","categories": ["shaders"],
        "tags": [],
        "url": "/posts/shaders/2021-02-17-mc_shader_tut2/",
        "teaser": null
      },{
        "title": "Minecraft Shader Tutorial 3 - Lighting and Shadows",
        "excerpt":"In this tutorial we will look at implementing the lightmap and shadows. The lightmap In the gbuffers vertex shader, the lightmap is accesible by using gl_MultiTexCoord1. The s channel is the torch lightmap, and the t channel is the sky lightmap..However this value is not in the range [0, 1]....","categories": ["shaders"],
        "tags": [],
        "url": "/posts/shaders/2021-02-21-mc_shader_tut3/",
        "teaser": null
      },{
        "title": "Minecraft Shader Tutorial 4 - Advanced Shadows",
        "excerpt":"In this tutorial I will make our shadows look actually good. I will be covering things like PCF, shadow distortion, and transparent shadows. Fixing the low detailed shadows problem Continuing from the last tutorial, our shadows still look blocky. There is a fix to this. We can use a technique...","categories": ["shaders"],
        "tags": [],
        "url": "/posts/shaders/2021-02-23-mc_shader_tut4/",
        "teaser": null
      },{
        "title": "BVH Traversal Algorithms",
        "excerpt":"Designing Algorithms that traverse BVHs efficiently on the GPU is no easy task. Porting the usual CPU algorithms for traversal will not work well at all, unless you enjoy horrible performance along with low hardware utilization. Thankfully, some smart people have already created efficient traversal methods, so we do not...","categories": ["gpu"],
        "tags": [],
        "url": "/posts/gpu/2022-07-22-traversal_algos/",
        "teaser": null
      },{
        "title": "Introduction to Molecular Docking",
        "excerpt":"Molecular docking is a class of algorithms that predict how proteins create bonds with small molecules called ligands. Docking is an important tool in drug discovery. This posts gives a brief description of the algorithm used in UCSF’s DOCK project for non-chemistry majors. This post is not yet complete, I...","categories": ["cheminformatics"],
        "tags": [],
        "url": "/posts/cheminformatics/2022-10-29-mol_docking/",
        "teaser": null
      }]
