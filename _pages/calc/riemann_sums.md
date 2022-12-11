---
permalink: /notes/calc/riemann_sums
title: "Riemann Sums"
layout: splash
---

Suppose I gave you some function $$f(x)$$ and wanted you to find the area under it but above the x-axis on some interval $$[a, b]$$ (for now assume that $$f(x)>0$$ on $$[a,b]$$).

For a simple example, suppose I wanted you to find the area under $$f(x)=2x$$ on $$[0,1]$$. If we graph it, we see this:

![Graph](/assets/notes/calc/riemann_sums/2x_graph.png)

We immediately recognize it as a triangle and can apply the formula $$A=\frac{1}{2}bh$$. Our base is $$1$$, and our height is $$f(1)=2*1=2$$, so if we plug those numbers in, we get $$A=\frac{1}{2}*1*2=1$$. That was easy, wasn't it? But what about a function like $$f(x)=x^2$$?

![Graph](/assets/notes/calc/riemann_sums/x2_graph.png)

This looks unlike any geometric shape we have studied before. We will need to take a different approach to solve this>

# Approximating the Area

With our current knowledge, we can't really derive the exact area. However, we can try to approximate the area with what we know. The most straightforward approach is to divide the interval into many rectangles of equal width and find the area of each:

![Graph](/assets/notes/calc/riemann_sums/x2_left_sum.png)

Then the area becomes:

$$A \approx 0.1f(0) + 0.1f(0.1) + 0.1f(0.2) + 0.1f(0.3) + 0.1f(0.4) + 0.1f(0.5) + 0.1f(0.6) + 0.1f(0.7) + 0.1f(0.8) + 0.1f(0.9) = 0.285$$

A perfectly valid question to ask is, "what if evaluated $$f(x)$$ at the right side of the rectangles instead of the left?", i.e. something like this instead:

![Graph](/assets/notes/calc/riemann_sums/x2_right_sum.png)

This works too! We can estimate the area as: 

$$A \approx 0.1f(0.1) + 0.1f(0.2) + 0.1f(0.3) + 0.1f(0.4) + 0.1f(0.5) + 0.1f(0.6) + 0.1f(0.7) + 0.1f(0.8) + 0.1f(0.9) + 0.1f(1) = 0.385$$

Our first method for estimating the area is known as *left sum* because we evaluate the height of rectangles at their left side, and the second method is known as *right sum* because we evaluate the height at the right side.

Which one is better? The answer is: it depends. However, if we take a look at the pictures of the graphs again, we notice that left sum underestiamtes the area (the recatangles are completely enclosed within $$f(x)$$) and right sum overestimates the area (the rectangles extrude from $$f(x)$$). This is because $$f(x)$$ is increasing on $$[0,1]$$ (can you figure out why?). The reverse is true for decreasing functions. Here I have plotted $$f(x)=1-x^2$$:

![Graph](/assets/notes/calc/riemann_sums/1mx2_left.png)
![Graph](/assets/notes/calc/riemann_sums/1mx2_right.png)

Before we move on to the next section, it is important to derive a general form for this type of estimation. For $$n$$ rectangles, we can estimate the area as:

$$A \approx \sum_{i=1}^{n} f(x_i) \Delta x$$

Where $$x_i$$ is where we choose to evaluate the $$i$$th rectangle and $$\Delta x$$ is the width of each rectangle. If we want to estimate the area on $$[a, b]$$, then $$\Delta x=\frac{b-a}{n}$$. For left sums, $$x_i=a+(i-1)\Delta x$$ and for right sums, $$x_i=a+i\Delta x$$.

# The Exact Area

Recall that the estimated area gets more and more accurate as we use more rectangles. With just 30 rectangles, we get something like this:

![Graph](/assets/notes/calc/riemann_sums/x2_30_left.png)

Intutively, we know that the true area, $$A$$ lies in between $$A_{left}$$ and $$A_{right}$$. We can then write $$min(A_{left}, A_{right}) < A < max(A_{left}, A_{right})$$. If we use an infinite number of rectangles, $$A_{left}$$ and $$A_{right}$$ converge on the exact area $$A$$. Hence, we can find the exact area as

$$A = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i) \Delta x$$

For $$f(x)=x^2$$, finding the exact area is simple:

$$A = \lim_{n \to \infty} \sum_{i=1}^{n} (i\Delta x)^2 \Delta x$$ 

$$A = \lim_{n \to \infty} \sum_{i=1}^{n} (\frac{i}{n})^2 \frac{1}{n}$$

$$A = \lim_{n \to \infty} \sum_{i=1}^{n} \frac{i^2}{n^3}$$

$$A = \lim_{n \to \infty} \frac{1}{n^3} \sum_{i=1}^{n} i^2$$

$$A = \lim_{n \to \infty} \frac{1}{n^3} \frac{n(n+1)(2n+1)}{6}$$

$$A = \lim_{n \to \infty} \frac{2n^3+3n^2+n}{6n^3}$$

$$A = \frac{1}{3}$$ 

Note that we used sum identities to simplfy the summation. Generally, you can use this method on any polynomial. 

# More examples

Uh I'll finish this section later

# An Even More General Form

Why restrict ourselves to equal-width rectangles? Riemann sums generalize our method to work with any partition of $$[a, b]$$. A Riemann sum states that 

$$A \approx \sum_{i=1}^{n} f(x_i) \Delta x_i$$

The difference with our equal-width method is now each rectnagle can have its own $$\Delta x_i$$, and $$x_i$$ can be anywhere within the rectangle.

This formula is espically useful if you are working with a dataset where the rectangle widths are not equal.