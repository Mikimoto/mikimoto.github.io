---
title: Ubuntu autofs 設定筆記
slug: ubuntu-autofs-configuration
date: 2020-11-06
categories:
- Ubuntu
- Linux
tags:
- autofs
- automount
keywords:
- Ubuntu
- Linux
- Server
- NAS
- autofs
- automount
- nfs
---

每次爬完漫畫，都要手動用 rsync 同步到 NAS 上，一直找不到機會好好設定這個自動化流程。
<!--more-->

<!-- toc -->

我的構想是在 NAS 上架設 NFS（SMB 也可以，但是想說 NFS 比較沒有權限問題），利用 autofs 讓