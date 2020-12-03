---
title: Apple DTK Restore 筆記
slug: apple-dtk-restore-note
date: 2020-11-20
categories:
- Apple
- System
- Restore
tags:
- restore
- backup
- m1
- apple-dtk
keywords:
- Apple
- DTK
- Restore
- System
- Backup
---

紀錄一下自己設定 Apple DTK mini 的工作環境。
<!--more-->

<!-- toc -->

## 工作環境 ##
- Xcode 12.3beta 安裝
    這一版的 Xcode 不會幫你安裝 Command Line Tool，所以要自行安裝

- Xcode Command Line Tool for Xcode 12.3

- 安裝 Rosetta VM

    因為現在很多程式尚未 porting 到 ARM chip，所以先用 Rosetta x86_64 VM 來模擬
    ```
    softwareupdate --install-rosetta
    ```
    Rosetta Command Line 的使用方式為：
    ```
    arch -x86_64 [COMMAND]
    ```

- 安裝 Homebrew

    因為目前 Homebrew  尚未 porting 到 ARM chip 上，所以我們需要先用 Rosetta 2 VM 來模擬 x86_64 平台來執行。

    ```
    arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```

- Restore Homebrew 套件

    因為有裝 brew-file，平時就會把他備份到 iCloud 上，所以直接從 iCloud 拉回來，另外 Restore 時發現不知道什麼緣故 Brewfile 裡面的套件必須要用雙引號包起來才有辦法 Restore 所以也得先處理一下 Brewfile