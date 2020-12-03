---
title: HP 印表機在 Mac OX Big Sur 上無法運作
slug: mac-bigsur-printer
date: 2020-12-03
categories:
- Apple
- System
- OS
tags:
- system
keywords:
- Mac
- BigSur
- HP
- Printer
---

紀錄一下在 Mac OS Big Sur 上遇到舊 HP Printer(CM1312nfi) 驅動程式無法運作的問題。
<!--more-->

<!-- toc -->

## 狀況 ##
在 Mac OS Big Sur 上面要列印時發現 HP Printer Driver 已經被視為有害軟體 XD，根據 [這篇討論](https://discussions.apple.com/thread/252047347)，看起來 HP 應該是沒有繼續為旗下軟體更換憑證，才造成這個問題。

## 解決方案 ##
目前看起來比較好的方案是移除 HP Driver 後，安裝 Open Source 的解決方案。

- 移除 HP Driver
    - 先移除印表機
    - 下載 [HP Uninstaller](https://ftp.hp.com/pub/softlib/software12/HP_Quick_Start/osx/Installations/Essentials/HP_Uninstaller.zip) 反安裝 HP Driver。
- 安裝 Open Source Printer Driver 
    - [在這裡下載 Gutenprint - Top Quality Printer Drivers](https://sourceforge.net/projects/gimp-print/files/)，支援的印表機列表可以[看這裡](http://gimp-print.sourceforge.net/p_Supported_Printers.php)。
    - 安裝後，重新安裝印表機，並手懂選擇合適 Driver 即可。