---
date: 2026-01-03
title: MineDirt and MemHack
---
>*“After ages beyond reckoning, the void at last betrayed itself. Subtle harmonies arose where none had ever been—motions too deliberate for stone, too restless for dust. It tarried but a moment, committing the aberration to its silent ledgers, though no living ear remained to claim it. Thus the revelation passed unannounced, borne onward as the wanderer resumed its appointed course, faithful to a charge older than wonder and untouched by the need to be known.”*

I haven't talked about these two projects before, even though they are older than some of the other projects I've discussed on this blog. I didn't know what to write about, so I decided to finally cover them.

# MemHack

The first project I want to talk about is **MemHack**. The idea came from a friend of mine, [Low Level Game Dev](https://www.youtube.com/@lowlevelgamedev9330), who made a Cheat Engine clone in C++ and created a video about it.

I have a lot of nostalgia for Cheat Engine, I remember using it over a decade ago to give myself sun points in *Plants vs. Zombies*. I needed some inspiration for a project, and I really liked his video, so I decided to make my own version to see if I could build a tool that lets me cheat in games by manipulating memory.

Instead of C++, I chose to build it in **C#** since I am much more familiar with it. I worked on this project at the end of 2024, spending about two weeks on it during my paid leave.

## Features and Development

The core logic relies heavily on the **Windows API**. To scan the memory like Cheat Engine does, I had to use several specific functions:
*   `EnumWindows`, `GetWindowText`, and `IsWindowVisible` to find and filter the list of open applications.
*   `OpenProcess` to get the necessary access rights to the target process.
*   `VirtualQueryEx` to iterate through memory regions. I specifically look for committed and allocated memory (virtual memory), skipping reserved regions.
*   `ReadProcessMemory` and `WriteProcessMemory` to actually read and modify the values.

To make the scanning process faster, I split the memory regions into multiple chunks and used **multithreading** to process them in parallel. This applies to both the initial scan and the subsequent "next scan" filtering steps. I did run into some funny issues, like searching for the value `0` initially caused a nasty bug due to the amount of memory addresses found.

### The GUI

I decided to use **MonoGame** with a port of **ImGui** for the interface. The tool allows you to:
*   Select a process.
*   Scan for a specific value.
*   Filter results ("Next Scan") until you find the correct address.
*   Modify the value.

I also had to implement **pagination** for the address list. Without it, the app would run at 5 FPS when displaying millions of found addresses.

To help with testing, I created a mini-project called **MemHack Console**. It's a simple console application that loops and increments a value, allowing me to practice scanning and modifying memory in a controlled environment.

## YouTube Success

After finishing the project, I made a YouTube video about it. Initially, it didn't do that well, but after a few days, it really started picking up. It was honestly the most amazing thing that has happened to my YouTube channel yet.

*   **2 weeks:** ~50,000 views
*   **1 month:** ~70,000 views
*   **Now:** ~110,000 views

Most of the traffic comes from external sources and YouTube search, it seems people are actively searching for Cheat Engine clone alternatives. Because of this video, I was actually able to get my channel monetized.

In the video, I explain what Cheat Engine is, how to use it, and how I built my clone with code examples. I also included a demonstration of me hacking Minecraft in survival mode to give myself diamonds (which obviously only works in single-player).

### The Linux Update

Later on, I released a Linux update and made a shorter video about it. It was a bit of a pain to implement, but I got it working. The main difference is that on Linux, I couldn't make it so you can select from a list of open windows, but you can select from a list of processes.

I added a few quality-of-life features in this update:
*   **Process/Window Toggle**: A checkbox to switch between listing all processes and listing windows.
*   **Refresh Button**: To reload the list without restarting the app.

I also addressed some of the feedback I received. Many people asked for features like **Memory Mapping**, **Pointer Scanning**, **Lua Scripting**, and **DLL Injection**. While these would be cool, I don't plan to continue working on MemHack unless I get a sudden spark of interest. The project was always meant for educational purposes, to learn how memory works, not to build a fully-featured hacking tool to rival Cheat Engine.

Speaking of which, I had a bit of a rant in the video about people asking how to hack servers or why they shouldn't just use Creative Mode. The point wasn't to cheat in Minecraft; the point was to *build the tool* that lets you cheat.

Unfortunately, this second video performed quite poorly compared to the first, getting only about 3,000 views.

*   [**GitHub Repository**](https://github.com/vycdev/MemHack) (85 stars)
*   [**Watch the Video**](https://www.youtube.com/watch?v=x5ClRQIKoXk)

# MineDirt

The next project, which I started around **January 2025**, is **MineDirt**. I decided to make a Minecraft clone from scratch using **MonoGame** as the base. I wanted to challenge myself to learn more about game development and get familiar with the library.

This project was significantly harder to make than MemHack because it's a 3D voxel engine. It started with the basics: opening a window, rendering a cube, and getting a 3D camera working. From there, I moved on to splitting the world into **16x16x16 chunks** and generating terrain using noise functions.

## Optimizations and Challenges

Rendering a voxel world efficiently is tough. I spent a lot of time on optimizations:

*   **Frustum Culling**: I reduced draw calls by not rendering what is behind the camera.
*   **Face Culling**: This was a huge improvement. By not drawing the hidden faces of blocks, I went from rendering millions of vertices to just a few hundred thousand.
*   **Memory Management**: I initially had astronomically high memory usage because I was using fixed-size arrays for my vertex and index buffers. Switching to Lists dropped usage to around **500 MB**. I also switched from using a Dictionary for block storage to a simple 1D array.
*   **Lag Spikes**: To fix world generation lag, I deferred rendering and mesh building across multiple frames so the GPU wouldn't freeze. I also implemented **multithreading** for mesh building.

One tricky part was generating chunks correctly. I had to separate the process into two steps: generating block data first, and then building the mesh. This ensures that neighboring chunks exist before we try to calculate the visible faces at the edges.

## Features

Beyond just rendering blocks, I implemented several gameplay features:
*   **Block Interaction**: Using a raycast, I added a crosshair and the ability to break and place blocks.
*   **Transparency**: I separated chunk meshes into opaque and transparent parts to handle glass and water correctly. I also sorted chunks based on distance to the player.
*   **Water & Lighting**: I added water generation (with slightly lowered vertices) and "fake" lighting by darkening block faces based on their direction (North, South, Top, Bottom, etc.).

By the end, I could run a **render distance of 32** (over 3,000 chunks) while maintaining over **100 FPS**.

## The Optimization Update

In the follow-up update, I focused heavily on performance and refactoring, moving away from the "spaghetti code" of the initial prototype.

### Refactoring and Visuals

I rewrote the **camera system** from scratch to fix drifting issues and improve smoothness. I also simplified the chunk system by removing subchunks (infinite height was overkill) and fixed multithreading issues that caused crashes on exit.

Terrain generation got a boost with **three noise layers**: base terrain, shoreline sand, and a hill overlay.

I also dove into shaders, adding a **vignette effect** to blocks and creating a proper **water shader** with underwater fog and wave distortion. To fix transparency issues, I implemented a system that sorts transparent quads only within a 4-chunk radius of the player, and only updates when necessary.

### Vertex Packing

The most significant optimization was **vertex packing**. I compressed the vertex data from **24 bytes** (Vector3 + Vector2 + float) down to just **8 bytes** (2 floats).

Since MonoGame restricts me to HLSL 3.0 (no bitwise operators), I had to pack data into the **23-bit mantissa** of 32-bit floats:
*   **Float 1**: Packed Position (Relative X, Z, Y), Light Level, and Corner ID.
*   **Float 2**: Texture Index and Face Index.

This change **halved the memory usage**. On my laptop with integrated graphics, I was still getting **150-250 FPS**.

## Video Performance

The first video for MineDirt actually did quite well, reaching almost **70,000 views**.

I later released a follow-up video in July showcasing these optimizations. However, this second video didn't perform well at all, getting only about 1,000 views. I'm not sure why, maybe because the video was too boring, or the algorithm just didn't pick it up.

Despite that, the original Minecraft clone video is still getting some views (about 25 in the last 48 hours), though not as many as the MemHack video, which is still getting over 100 views every 48 hours even a year later.

*   [**GitHub Repository**](https://github.com/vycdev/MineDirt) (52 stars)
*   [**Watch the Video**](https://www.youtube.com/watch?v=0TsFaSmdKOg)

# Conclusion

It's insane to me that the MemHack video has performed so well for the past year. It's my only video to surpass 100,000 views and was the catalyst for getting my channel monetized. While my other big projects like **[[Falling Pickaxe]]** were great, these two videos hold a special place in my journey.

That being said, I don't plan on working on MemHack or MineDirt anymore. They have been fantastic experiments and invaluable learning experiences, but they were never intended to be the final goal. I'm just going to take what I've learned and apply it to whatever comes next.