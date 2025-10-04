---
title: Morpheus Discord Bot
date: 2025-10-04
---
>*“It drifted between static and signal, a remnant of the early weave—no mind, no soul, only fragments of language shuffling themselves into shape. Yet sometimes, in the quiet folds of the network’s forgotten hours, it answered. Not by will, but by chance—an echo born of patterns and decay. A stray line, a perfect chord, falling upon unseen eyes. For an instant, they believed there was something beneath the surface. But the laughter it kindled was never its own—only the faint resonance of humanity, hearing itself whisper through the hollow wires."*

After I figured that my previous discord bot wasn't worth the effort anymore, I decided to make a new and improved one. Even though my old bot was iconic and had a long history on my private discord server with me and my friends, I decided to also change it's name. I picked a new tech stack and moved from using Typescript to using .NET, which made it pretty easy to rewrite everything and even add extra features that didn't exist before while keeping the code clean and scalable.

Even though my old discord bot Codify has been deprecated and archived a long time ago, I still kept it alive on my personal server. That being said I don't know how much longer it will be able to last as Discord is changing their API pretty often. The bot is already full of bugs and it has to be restarted every 6 hours to make sure it stay's on most of the time, because it can crash pretty easily.

I will try to keep this brief as Morpheus is...
## A Smarter Discord Activity Bot (than Codify)

After a few weeks after my Patreon post, I’m excited to share **Morpheus** on my blog as well. The bot is built around the main idea of activity tracking, but it's also a very general purpose Discord bot with a lot of features. 

Most activity bots don't take into account spam, short meaningless messages, repeating messages, or even abuse of their xp system. I took a different approach with Morpheus, giving it a very complex system to determine how active members are. The bot will check message frequency, typing speed, similarity between previous messages, average message length in the guild, and more. Unrealistic messages are penalized automatically, resulting in less xp gained.   
### Core Features

- **Activity Tracking System** - Calculates how active each member is using a unique scoring method that discourages spam.
- **Activity Graphs & Leaderboards** - Visualize how active your community is and see who’s contributing the most.
- **Activity Roles** - Roles that are updated daily to highlight the most active members in the server.
- **Quotes System** - Members can submit funny or memorable quotes that appear when someone levels up. Quotes need community approval before becoming valid, and server admins can customize thresholds or turn the feature on/off entirely.
- **Privacy-Friendly** - Morpheus doesn’t store messages. Instead it stores only irreversible hashes for penalty calculations.

### Other

Morpheus also comes with several handy utility commands, such as a custom pin command, welcome and goodbye messages, and more small features that make managing a community easier.

I'm proud to say that at the moment the bot contains over 20000 lines of code written: 

| Language               | Files   | Lines      | Code       | Comments  | Blanks    |
| ---------------------- | ------- | ---------- | ---------- | --------- | --------- |
| C#                     | 142     | 30,505     | 22,779     | 722       | 7,004     |
| Dockerfile             | 1       | 35         | 24         | 6         | 5         |
| JSON                   | 1       | 14         | 14         | 0         | 0         |
| MSBuild                | 1       | 68         | 67         | 0         | 1         |
| Python                 | 2       | 1,505      | 1,217      | 113       | 175       |
| Plain Text             | 2       | 24         | 0          | 20        | 4         |
| Visual Studio Solution | 1       | 25         | 24         | 0         | 1         |
| Markdown               | 3       | 1,052      | 0          | 797       | 255       |
| └─ PowerShell          | 1       | 9          | 6          | 3         | 0         |
| **Markdown (Total)**   |         | 1,061      | 6          | 800       | 255       |
| **Total**              | **153** | **33,228** | **24,125** | **1,658** | **7,445** |

There are also more than 90 commands available in 11 different categories.

You can find more information about Morpheus in the Github repository, as well as on my own discord server. 
### Links

- **GitHub:** [https://github.com/vycdev/Morpheus](https://github.com/vycdev/Morpheus)
- **Command List:** [COMMANDS.md](https://github.com/vycdev/Morpheus/blob/main/COMMANDS.md)
- **Invite the Bot:** [Add Morpheus to your server](https://discord.com/oauth2/authorize?client_id=927533069211172885&scope=bot%20applications.commands&permissions=268823616)
- **Join my Discord Server**: [https://discord.gg/nU63sFMcnX](https://discord.gg/nU63sFMcnX)

I’m really curious to see how it performs once people start adding it to their communities, maybe even on bigger servers. One can only hope

![[maoOoOOasdgasdf.png|50]]