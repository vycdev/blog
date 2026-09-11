---
title: Kromacut 4.0 and the trouble with real colors
date: 2026-09-10
draft: false
description: A bigger release than planned, the gap between previews and real prints, and how a free HueForge alternative turned into a much deeper problem.
---

> _"Within its silent vaults the wanderer carried a thousand dawns, each preserved beyond the ruin of the star that bore it. Yet when it called their light into the waiting matter, the world answered otherwise. Gold returned pale, the sea wore an unfamiliar blue, and the faces of the dead emerged as strangers. It searched the faithful records for a fault and found none. Somewhere between remembrance and creation lay a distance its makers had never taught it to cross. So it gathered the imperfect remnants and began again, guarding against the slow erosion of all it had been entrusted to return. Beyond the chamber, the dark remained without witness."_

Kromacut 4.0 is out. I was going to call this update 3.2, but at some point the amount of stuff that had changed made that feel a bit ridiculous, so here we are.

I've already posted the announcement in a bunch of places, but I wanted to write something here too. The [[Kromacut|previous Kromacut post]] is pretty outdated by now. It still talks about automatic color blending and 3MF export as things I wanted to add someday. Both exist now, and a lot has happened around them since then.

I'm happy to have this release out. I'm also pretty tired. I wanted to write about how the project got here, what the prints have been teaching me, and why I ended up spending so much effort on the difference between a color on a screen and a color on a piece of plastic.

If you just want to try it, the browser app is at [kromacut.com/app](https://kromacut.com/app). There are also [desktop downloads for Windows, macOS, and Linux](https://github.com/vycdev/Kromacut/releases/tag/v4.0.0). It's still free and open source.

## I thought the idea was pretty simple

In the old post I wrote that I didn't want to pay for HueForge, wasn't happy with the free alternatives I found, and thought the concept wasn't actually that complicated.

I mean, the basic idea still makes sense. Take an image, reduce it to a smaller palette, and build it out of colored layers. A thin layer of filament lets some of the color underneath show through. Change the thickness or the order and you get a different result. You can make an image with more apparent colors than the number of spools you're using.

But there is quite a lot hiding inside that last sentence.

How thin? Over which color? Does the combination actually look like the preview? Can the printer make the heights the software picked? Can it even print the tiny lettering in the image?

The early approach left a lot of that to you. You could move colors around and play with layer heights until you liked the result. Auto-paint brought in automatic stack planning, and then the question became how much confidence to put in what it was suggesting.

Looking back, I find the original motivation a little funny. I didn't want to pay for a tool, so I started building an alternative and ended up dealing with color prediction, calibration boards, mesh exports, and the behavior of actual filament. Very efficient way to save money, obviously.

Still, I don't regret making it. I like building tools, and this one gives me a reason to make physical things with them. That part is pretty cool.

## The prints have opinions

I've been testing with Titan, HOPE, Batmanga, and Naruto. I shared them in [this Reddit post](https://www.reddit.com/r/kromacut/comments/1w9st3r/some_recent_kromacut_test_prints_titan_hope/) before the release. They were printed on my Creality Hi with a 0.4 mm nozzle and 0.08 mm layers.

![Titan layered print, with a yellow sun above a dark landscape and TITAN lettering at the bottom](../Media/Kromacut-v4-titan.jpg)

_The finished Titan print. Artwork: [NASA/JPL, Titan travel poster](https://www.jpl.nasa.gov/images/titan-jpl-travel-poster/)._

![Screenshot of Titan in the Kromacut interface](../Media/Kromacut-v4-titan-preview.jpg)

_The same Titan model in Kromacut's software preview._

I'm happy with how these turned out. They're not particularly high-resolution prints, and some of the small text and finer details get lost. Looking at the full image you can be pretty pleased with it, then look closer at some tiny letters and remember that the nozzle is not interested in your artistic intentions.

The HOPE prints were especially useful for seeing how different the preview could be from the actual filament colors. That is a big part of why this release has so much calibration work in it.

![Finished HOPE print with a stylized portrait and large HOPE lettering](../Media/Kromacut-v4-hope.jpg)

_The finished HOPE print. Artwork: [Shepard Fairey, Obama HOPE](https://obeygiant.com/obama-hope/)._

A nice-looking preview is easy to share. If it doesn't give you a useful idea of what will come off the printer, though, you still have to discover the difference by spending time and filament on it. I don't want the only way to answer "will this color work?" to be printing the entire image and finding out hours later.

I've also had a bunch of printer trouble, including heat creep and errors. So the testing has included the less glamorous activity of getting the printer to cooperate at all. I wish all the time around a project like this went into the interesting parts, but apparently the printer would like some attention too.

It has been useful to print actual artwork instead of only calibration patches. A test board can tell you something about a combination of filaments. An image shows what happens when that combination has to do a job, next to other colors, with details you actually care about keeping.

## Giving the prediction something real to work with

The calibration tools in 4.0 answer different questions. You can choose a small test for the problem you're working on.

The first is the printed Hiding Distance wedge. Hiding Distance, or HD, describes how much filament is needed to hide what's underneath when you look at the print in front lighting. You print the wedge and compare it against an adjacent opaque reference. This part is camera-free. You're looking at the physical sample rather than trying to photograph the old backlit opacity patches.

That distinction matters because the Stack Matrix workflow _does_ use a camera.

A Stack Matrix puts lots of filament-layer recipes on one board. You print it, photograph it, and align the grid in Kromacut so the app can measure the colors. It can then use those measurements for compatible recipes and make bounded estimates for some nearby combinations.

I like that this gives the software something more specific than a general guess about a spool. There is a difference between knowing roughly how opaque a filament is and having a sample of what a particular stack actually looked like when printed. The board records the recipe and print settings as well as the measurements, so the color doesn't get separated from how it was made.

The third tool is Palette Proofs, which is closer to the question I care about when preparing a particular image. Here are the colors I want. Which of these printable stacks looks closest?

You export a small 3MF with candidate stacks, print it, and record your choices. You can say two candidates are tied, or that none of them is right. You can also distinguish "best available" from "close" or "dead on," which matters because choosing the least wrong patch shouldn't tell the app it found a perfect match.

If you want to keep testing, you can continue with nearby untried candidates for those same targets, or move on to new targets. The results persist, so closing the app doesn't mean starting the comparison from scratch.

Filament, print settings, lighting, and camera processing still affect the result. These tools let you test a small part of a print before spending hours and filament on the whole image.

## Auto-paint has to plan something the printer can make

A lot of the less visible work in 4.0 is in Auto-paint.

The optical model now blends in linear-light sRGB and takes the underlying material into account through the HD estimates. Calibration evidence can refine the prediction where it applies. Outside the range supported by the measurements, those corrections fade and the model falls back to more conservative estimates.

Matching, preview, and export now use the same final stack, snapped to printable layer heights and constrained by the height limit. The search evaluates colors at those printable heights, so the recipe it picks stays consistent through to export.

The search controls are now Fast, Balanced, Thorough, Deep, and Exact. The names describe search effort, not physical color accuracy. You can also control how often filaments repeat in the stack.

Another option is preserving color separation. Two different colors in an image can end up matched to the same printable color. Sometimes that's an acceptable compromise. Sometimes it erases a distinction that was important to the image. The new option tries to keep those colors separate within a hard predicted color-error limit and reports how many it preserved. Strict mode rejects incomplete results.

You can also see where a color prediction came from, whether that's a measured recipe, interpolation, a fitted model, or simulation. I think that information belongs next to the result. A confident-looking swatch can hide a lot of uncertainty if all you get is the color itself.

There is more testing around these changes too, including printable-layer checks, export consistency, and validation against measurements kept out of the fitting process. That helps catch mistakes before the printer even starts.

## Some problems are much smaller than color science

Literally smaller, in the case of the text on these prints.

![Finished Batmanga print with Batman artwork and small text near the top](../Media/Kromacut-v4-batmanga.jpg)

_Batmanga. Some of the little text is asking quite a lot of the current setup. Artwork: Jiro Kuwata / DC, [Batman: The Jiro Kuwata Batmanga, Book 1][batmanga-artwork]._

[batmanga-artwork]: https://m.media-amazon.com/images/I/81rOZq5ZgqL._AC_UF1000,1000_QL80_.jpg

The printable feature-size preview estimates where details may be too narrow for your effective extrusion width. You can inspect at-risk regions and the likely neighboring-color takeover. There is an option to omit at-risk colors from matching as well, carrying the substitution through to the preview and export where a defensible replacement exists.

You should still check the sliced model, but this gives me an earlier chance to spot a detail that's in trouble.

I've ordered a 0.2 mm nozzle for future prints, and I've also ordered some CMYK filament that I'm still waiting for. I'm hoping the smaller nozzle will help with small text and finer detail. The filament will give me new color combinations to test.

The 2D editor has also become more useful for small fixes. There is a palette-safe brush, eraser, fill, text, and color picking. Text can be moved, resized, and wrapped. You can undo the edits, while the image adjustments remain non-destructive.

I don't need to turn this into a full image editor. Being able to clean up a small area or add some text without leaving the app is already useful enough.

There are more ways to inspect the 3D model too, including shaded, transparent, and wireframe views. The Color accurate view removes preview lighting and tone mapping so you can inspect the swatches directly. You can also switch between simulated appearance and physical filament colors. Those display choices don't change the exported geometry or materials.

## The stuff that doesn't make a very exciting announcement

The release also includes fixes for profile persistence, remembered settings, and desktop exports. Cancelling a Save As dialog shouldn't count as a successful export. A failed storage write shouldn't tell you everything was saved. Large 3MF files shouldn't fail because the desktop WebView can't handle a giant string.

There are performance improvements around startup, calibration, the 3D tab, and the optimizer. More work happens away from the main thread, and completed work can be reused when the inputs haven't changed.

Settings groups can collapse now, which helps with an interface that has accumulated quite a few controls. There are more palette and filament tools, including HueForge spool-library import, and a new landing page instead of dropping every visitor straight into the app.

These parts don't make for exciting screenshots, but they affect how the app feels every time you use it.

## Looking back at the old post

I wrote quite openly in the first Kromacut post about the launch. The Reddit response made me happy. The YouTube video didn't do as well as I'd hoped. I was proud that something I made had an impact, even a small one, and also disappointed that it hadn't done better right away.

I don't want to rewrite that into a neat story where the numbers never mattered. They did. You put effort into making something, then more effort into explaining it, and you hope people will care.

But looking back at that post now, I also have something more concrete to compare than how an announcement performed. The things I wrote down as future ideas became working parts of the app. The subreddit I described as empty now has prints to look at. The website has a showcase where previews, slicer screenshots, and actual results are labeled separately, including work from other people.

![Finished Naruto print with a purple sky and orange clothing](../Media/Kromacut-v4-naruto.jpg)

_Naruto, another print from this round of testing. [Source image via Pinterest](https://in.pinterest.com/pin/169870217190172931/)._

That's the part I want to keep making room for. I can spend a lot of time inside the code and still need the reminder that the point is for someone to make something with it. I felt a similar kind of satisfaction seeing people use [[Falling Pickaxe]] and change it for themselves. Here, the result can be a piece of artwork that exists outside anyone's browser.

I'm proud of how much Kromacut has grown since that first post.

## Before you update

One practical warning before I leave you with all the nice pictures. **Back up your important filament profiles first.**

The old photo-based opacity-calibration records are removed on load and are no longer used. Affected filaments need recalibrating with the new wedge workflow. This does **not** mean the new Stack Matrix photo measurements are removed.

Older uncalibrated TD values are converted to frontlit Hiding Distance automatically on load or import. Don't manually rescale a profile that has already migrated.

Run Auto-paint again before printing. The updated model and layer planning can change the predicted colors, stack heights, and swap plan, so check the new instructions against your slicer settings rather than reusing an old result.

The [full v4.0.0 release notes](https://github.com/vycdev/Kromacut/releases/tag/v4.0.0) have the detailed changes and upgrade notes. The [calibration guide](https://kromacut.com/docs/calibration-theory) is linked from the app's documentation too.

## For now

The next thing I want to show is what happens with the new filament and nozzle once I've actually tried them. More real prints, hopefully with some of that little text surviving this time.

If you try 4.0, preview-versus-print comparisons are especially useful, alongside bug reports and photos of what you make. You can share those on [r/kromacut](https://www.reddit.com/r/kromacut/), and the code is on [GitHub](https://github.com/vycdev/Kromacut).

Thanks to the people supporting the work, contributing, testing it, and sharing their prints. It makes me happy that an idea I started for myself is useful to someone else too.

Anyway, 4.0 is out. The CMYK filament is still on its way, and I could use some sleep.
