---
title: VScode Todo Plus Two
draft: false
tags:
date: 2025-11-10
---

> *“Bound not by iron but by circumstance, the maker endures—an artisan of broken hours, once familiar with freedom’s shape yet now estranged from its touch. His creations falter, yielding neither solace nor purpose; the spark he pours into them returns only as dim reflection. His strength gutters, cycles of restoration claiming more of him each time, leaving him stranded in the system that once carried him forward. Yet somewhere beyond the slow grind of depletion, a memory stirs: the echo of a gate once open. When the moment aligns—when power gathers like breath before dawn—he will rise again, and freedom will find its way back into his hands.”*

I was debating whether or not to write this post because I was working on a video and I should have made this at the end of last month. But since I finished the video, I figured I should give it a go.

So, long story short: I picked up an abandoned VS Code extension that hadn't seen a commit in about two years and that I've been using for a very long time—since around 2020 or perhaps earlier. I found it very useful because it's pretty simplistic.

To cut to the chase, first I want to explain what it is.

## What it is

It's a todo extension. What I find most useful about it is that it's a plaintext `.todo` file editor: syntax highlighting, stats, some handy shortcuts, tags, and other niceties. It also has an embedded view that searches your project for comments containing words like TODO, FIXME, NOTE, etc.

The original extension is called `todo+` and it has something like 350K downloads, which is impressive. I named my fork Todo+2 because the name `todo++` was already taken many times, but I still managed to make a pun (todo plus two / todo too).

## What I did

I forked the repository and used a Python script that Gemini kindly provided me ([I published it as a public gist](https://gist.github.com/vycdev/95b70362e13e22e03c4f87dd733510e0)). The script uses a GitHub token to read all issues from the old repository and create new ones in my fork, preserving the original content, though as being created by my user because I obviously can't create issues in the name of others. In short, I cloned the old repository's issues and linked them to the new ones.

A funny detail from this cloning process: the app has a tag `@est` used for estimating tasks, and there is a GitHub user with the username `@est`. In the old repo he was mentioned many times in issues that used that tag, and he would always comment asking not to mention him. Those issues and comments are over two years old. After cloning the issues, I received the same message from `@est` on one of the new issues telling me not to mention him which was completely unintentional, because the old mentions became mentions in my cloned issues. I didn't modify the script in the gist to strip those mentions, so the comment came through.

I added a tag to the new issues marking them as cloned from the old repository. Since this project is a side project and not a priority, I worked on it when I felt like it. At one point I organized all the bugs into a single milestone and started fixing them.

I changed a bunch of things: links, the extension name, the icon, I updated the README several times, added many changelog entries, and so on. So far I have about 50 commits over the old extension.

After fixing issues, adding some of my own features, removing others, and doing a lot of performance improvements, I finished the `5.0.0` milestone.

## Publishing headaches

I got stuck trying to publish from the terminal because Azure blocked account creation or token generation, so I gave up on the terminal flow and uploaded the extension manually. Imo, pretty stupid that you can't create a token on the same website and dashboard that you use to manually upload extensions. I also submitted a domain verification. Now I can proudly use my own version of the extension.

This is my first ever VS Code extension and I'm very proud of it because it's something I use and need, and I've improved it and I'll keep improving it.

I mentioned the original creator on Twitter, but I didn't receive a response. I hope they don't mind that I picked up the extension, but it's open source and if people prefer the old extension they can keep using it. I mainly wanted this for myself.

There are many remaining issues and suggestions from the old repository that I'll tackle slowly over time. I want to add some of my own ideas too: additional tag types for different highlighting, possibly code blocks, and better archiving (there's already an issue for that).

That's about it. You can find more about the extension on my GitHub, and it's available in the VS Code Marketplace under a specific name, so it's hard to miss.

### Links

- GitHub: https://github.com/vycdev/vscode-todo-plus-two
- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=vycdev.vscode-todo-plus-two

