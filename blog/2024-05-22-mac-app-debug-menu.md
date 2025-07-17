---
slug: mac-app-debug-menu
title: macOS App Debug Menu
authors: [mikimoto]
tags: [macos, app, debug]
---

In this article, we'll explore a few lesser-known macOS AppKit debug tools that can help you better understand your app's behavior and troubleshoot issues.


<!-- truncate -->

<!-- toc -->

AppKit includes a private category on NSApplication that adds _eventFirstResponderChainDescription — a string describing the current responder chain. This can be a really useful debugging tool!

You can also set the _NS_4445425547 user default to see a Cocoa debug menu. I tend to just leave this enabled in my apps.

print(NSApp.value(forKey: "_eventFirstResponderChainDescription"))
defaults write -g _NS_4445425547 -bool true

And in case anyone’s wondering what the 4445425547 means:

0x44 = d
0x45 = e
0x42 = b
0x55 = u
0x47 = g


This HUD can be activated by calling the private CARenderServerSetDebugOption function.