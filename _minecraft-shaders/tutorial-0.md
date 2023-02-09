---
title: "Minecraft Shaders Part 0"
layout: single
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
categories:
    - shaders
permalink: /minecraft-shaders-tutorial/part-0
header:
  overlay_color: "#000"
  overlay_filter: "0.24"
  overlay_image: /assets/images/mc_shaders_part0/2020-12-30_13.22.37.png
  teaser: /assets/images/mc_shaders_part0/2020-12-30_13.22.37.png
---

Here I will explain a few basics of the graphics in Minecraft and the shader pipeline and how Minecraft shaders work in general.

# OpenGL and GLSL

Minecraft is written in a really old version of OpenGL, and shaders are only available via OpenGL extensions. Since Minecraft is written in such an old OpenGL version, many (old) shaders are written in GLSL version 120. For simplicity's sake, I will be also writing my shaders in version 120. Many things very different between version 120 and more mordern versions of GLSL. Here are a few examples:

- You no longer specify vertex attributes with `layout(location = N) in genType var`. Instead you do `attribute genType var`. The shaders mod knows the locations of the attributes by using `glGetAttribLocation`.
- You can't use `in` or `out` to transfer variables between the vertex and fragment shader. You must use a keyword called `varying`. `varying` was replaced with `in` and `out` in newer OpenGL versions because other shaders besides the vertex and fragment shader were added.
- GLSL version 120 had a lot more in-built variables than modern ones. Some examples include `gl_Vertex` and `gl_Normal`. I will explain how these are used in the later tutorials I suggest you check out the [GLSL Version 120 Specifcation](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.1.20.pdf) for the full list.
- If you want to write to a render target you must use `gl_FragColor` and `gl_FragData`. `gl_FragData` is an array of `vec4` with size of `GL_MAX_COLOR_ATTACHMENTS` (typically 8, you can check the [OpenGL GPU database](https://opengl.gpuinfo.org/displaycapability.php?name=GL_MAX_COLOR_ATTACHMENTS) for more details). Each element of `gl_FragData` corresponds to a color attachment. For example, the first color attachment is `gl_FragData[0]`, the second one is `gl_FragData[1]`, and so on. `gl_FragColor` is like `gl_FragData` except it writes to all color attachments.

# Rendering the blocks

Now with that out of the way, we can focus on how Minecraft actually does it's rendering. Minecraft is a voxel game, and therefore it does not follow the normal style of rendering that is present in most games.First of all, Minecraft has to render a large amount of blocks, which could be different types of blocks. Rendering each block as it's own draw call is a really bad idea for performance. Intancing could work, but it has it's own limitations, besides not being present in ancient version of OpenGL at all. Instead, what Minecraft does it it batches verticies into a chunks of verticies, so each chunk becomes it's own draw call. To texture each block, Minecraft uses a texture atlas.

# Lighting

Lighting in Minecraft is a bit different from how it is done in other games. Minecraft needs to support an arbitrary number of light sources, with the features of old OpenGL versions, and have decent performance on slow hardware like Intel iGPUs and Apple Macs. There also needs to be occlusion detection for the lights, that is, a light behind a wall cannot light up what is in front of the the wall. Doing this the "normal" way would require storing all lights in a texture and having a texture atlas of shadow maps for each light. This doesn't support area lighting, so lighting from blocks like glowstone up close will look bad, and this would be insanely costly. Imagine how slow rendering the nether would be, since each lava block in the nether needs to be processed. Minecraft needs a different approach from this.

Some of you who play Minecraft will know that each block has a lighting level, which comes from both torches and how exposed a block is to the sky. Minecraft reuses this information for lighting the blocks. Each vertex has a `vec2` attribute known as the "lightmap coordinates". The `x` value represents lighting from blocks like torches and glowstone, while the `y` value represents how much the vertex is exposed to the sky. These values in older versions of Minecraft are from 0 to 15, but in newer versions it can be up to the 200s.

The lightmap alone is not enough to light the block. It somehow has to be converted to a lighting color which then has to be multiplied by the block color to obtain the final color that gets displayed on your screen. Minecraft by default uses the light map coordinates (after doing math to move them to the [0, 1] range) as texture coordinates to look up a lighting color value from a lightmap texture in the fragment shader. The lighting color value gets multiplied by the block color and then displayed on your screen. See the [Optifine documentation](https://github.com/sp614x/optifine/blob/master/OptiFineDoc/doc/custom_lightmaps.txt) on this for more details. We won't be using the light map coordinates to look up from the lightmap texture. We will be doing our own math to calculate the lighting value. This is what most other shaders do anyway (and when I mean most I mean 99.9%, if it doesn't, then it's probably a really bad or super old no-name shader)

# How Shaders Work

To understand how shaders work, lets understand how the shader pipeline works. The shader pipeline is comprised of a bunch of fullscreen passes, a few block and entity rendering passes, and a shadow pass. What shader packs do is define what goes on in each pass of the pipeline. To give an example, let's say I wanted to do a blur of what I see on my screen. I could write a fullscreen pass that does that. If this sounds confusing, don't worry, it will become much more easier to understand in the coming tutorials. (note: if any exprienced shader dev has a better explanation of this part, please contact me with the better explanation so I can update this section with it)
