---
title: Infinity Tic Tac Toe
---
> *“Ages collapse into dust, sinking into a sea of silence. Beneath indifferent stars, two shadows drift in exile—unmoored from time, unclaimed by any home. To stave off dissolution they trace a game without edges, each move reverberating through the void. Within its fragile pattern endures defiance: the ember of a species unwilling to be erased.”*

I'm back with a very short blog post about a game that I made some 6 months ago. 

You can play the game here: https://tictactoeinf.vycdev.com/
And you can find it on github here: https://github.com/vycdev/infinity-tic-tac-toe

# How the game works

The premise is very simple. You have a tic tac toe grid that expands as you play it. The grid is only infinite in size as it can grow forever, but there is a time limit. 

The way you win is by getting the most points, which are collected by crossing 3 consecutive Xs or Os just like in regular tic tac toe. 

# Interesting strategies 

Since the game is not multiplayer and you have to share a mouse, this can get very interesting very quickly. Think about it, it's a time based game where you have to share the mouse. You can take a lot of time, or you can be very quick, or you can fight over the mouse. 

It's also interesting to think about how the grid evolves. You can spend your time trying to stop the other person from getting points or you can try to get as many points as possible. You can also combine multiple lines in a single move, giving you more points, so it's pretty important to notice those and stop your opponent from completing them, while you make your own. 

Honestly I couldn't think of a best strategy for this game yet. It really depends on how your oponent decides to play. 

# How I got the idea

I wanted to make a very small game, something that I could make in a few days. So that's what I did, I kind of brainstormed ideas while doing my things, and at some point this idea popped into my head. 

There's other ideas that I got back then iirc. Like a [setris](https://www.youtube.com/watch?v=vKIoQeCadt8) clone (which afaik is no longer called setris becasue of copyright), but basically sand tetris. Or some spin on a classic snake game, or even chess. 

So yeah, it's pretty cool, maybe one day I will add more things to it, maybe even multiplayer, since it does have a backend (which you probably noticed if you checked the [github repository](https://github.com/vycdev/infinity-tic-tac-toe)) even though it's not used. 

I was too lazy so I used a template project I had laying around. You can also tell how lazy I was just by looking at the code I wrote. It's pretty bad 😬

![[tictactoe.png|700]]