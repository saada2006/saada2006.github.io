---
permalink: /projects/path-tracer
title: "GPU Path Tracer"
layout: single
header:
    teaser: /assets/images/path-tracer/cornell-box.png
wide-class: true
---

![Cornell Box](/assets/images/path-tracer/cornell-box.png)
I wrote this project in order to do path tracing in real time on the GPU. Currently, the project attains 20-30 FPS in scenes like Conference and Breakfast Room. 

It currently supports:
- MIS, NEE, and physically-based BRDFs
- Spatially-split BVHs
- Terminated ath replacement

This project is the culmination of my work in computer graphics. I learned quite a lot from it, especially within the domain of GPU programming, and I have shared what I've learned in a few blogs:
- [GPU BVH Traversal Algorithms](/blogs/gpu-bvh-traversal-algorithms)

I worked on this project throughout April-May 2021 and Summer 2022. The code repository is [here](https://github.com/saada2006/GPUPathTracer). 

## Gallery 

### Breakfast Room
![](/assets/images/path-tracer/breakfast2.png)

### Sponza
![](/assets/images/path-tracer/gray-sponza.png)
No curtains.

![](/assets/images/path-tracer/sponza.png)
With curtains.

### Salle De Bain
![](/assets/images/path-tracer/bathroom.png)
With darkened mirrors.

### Conference Room
![](/assets/images/path-tracer/conference.png)

### Miscellaneous

![](/assets/images/path-tracer/cubemap-dof.png)

![](/assets/images/path-tracer/cube.png)
These are some shots I took while debugging.





