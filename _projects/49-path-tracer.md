---
permalink: /projects/path-tracer
title: "GPU Path Tracer"
layout: single
header:
    teaser: /assets/images/path-tracer/cornell-box.png
wide-class: true
---

![Cornell Box](/assets/images/path-tracer/cornell-box.png)
A computer program that I am wrote to do real-time path tracing on the GPU. Currently, it supports MIS, NEE, and physically-based BRDFs. It also uses spatial splits BVHs. This was originally a project I had completed throughout April and a bit of May 2021, but I picked it back up in June 2022. My vision for this project was to create a small real-time path tracer entirely on OpenGL with cross-platform and cross-GPU support that can go beyond simple scenes. 

The code is available [here](https://github.com/saada2006/GPUPathTracer). 

## Gallery 

![](/assets/images/path-tracer/sponza.png)

![](/assets/images/path-tracer/dof.png)

![](/assets/images/path-tracer/bunny.png)

![](/assets/images/path-tracer/blue.png)

![](/assets/images/path-tracer/bathroom.png)
For the last one, I made a small energy conservation mistake for the mirrors when I took the image. However, it is fixed now.




