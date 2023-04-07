---
permalink: /research/ucsf/
title: "My Research at UCSF"
layout: single
---

I have been working since August 2021 at the University of California, San Francisco on applying GPU acceleration to drug discovery algorithms. My work is on DOCK 3.8, a molecular docking program that finds poses in which a potential drug molecule and a protein bond, and then scores those poses.

Scoring is a computationally expensive task as it has a high arithmetic complexity and thousands of poses need to be scored. Making scoring efficient is crucial for speeding up molecular docking. As a result, I have been working on a project to score poses in parallel on the GPU. So far, I have obtained a 21% speedup over the original CPU version.

Here's a WIP report on my work:
{% pdf "/assets/files/GPUDOCK.pdf" %}
