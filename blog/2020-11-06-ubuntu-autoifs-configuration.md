---
slug: ubuntu-autofs-configuration
title: Ubuntu autofs 設定筆記
authors: [mikimoto]
tags: [linux, system, ubuntu]
---

每次爬完漫畫，都要手動用 rsync 同步到 NAS 上，一直找不到機會好好設定這個自動化流程。

<!-- truncate -->

<!-- toc -->

我的構想是在 NAS 上架設 NFS（SMB 也可以，但是想說 NFS 比較沒有權限問題），利用 autofs 讓抓圖機(Linux)可以 mount NFS，直接存檔即可。

在 /etc/auto.misc 最後加上這一行
```
/mnt    /etc/auto.nas --timeout 60 --ghost
```

新增 /etc/auto.nas 加上這一行，xxx 換成你的 NAS IP
```
*       -fstype=nfs,soft,intr,rsize=32768,wsize=32768,nosuid,tcp xxx.xxx.xxx.xxx:/volume1/ebook
```

打完收工，記得設定完重新開機或重啟服務