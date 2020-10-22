---
title: 部署到 Github 上的 Hugo Blog 紀錄
slug: github-hugo
date: 2020-10-22
categories:
- 筆記(Note)
- 實作紀錄(Implement)
tags:
- 實作紀錄
keywords:
- github
- hugo
- blog
thumbnailImagePosition: left
thumbnailImage: //d1u9biwaxjngwg.cloudfront.net/chinese-test-post/vintage-140.jpg
---

想要找的地方把自己的 Note 整理一下，既然是工程師當然要善用工程師社交網站 Github 來放 Blog。Hugo 好像比 Hexo 來多人使用，佈景主題也比較齊全，所以就有了這篇動手建立的實作紀錄。
<!--more-->

<!-- toc -->

Hugo 是一套用 Go 寫成的靜態網頁產生器，因此很適合用來部署在 Github 上面的 public 頁面。

## 安裝 ##
在 Mac 平台上可以用 Homebrew 安裝
```
brew install hugo
```

其他安裝方式，可參考[官網](https://gohugo.io/getting-started/installing/)

## 產生新的網站 ##
```
mkdir <your site path>
cd <your site path>
hugo new site <your site name>
```
產生新網站時，會一並把 hugo 專案的基本目錄與檔案產生給你，對於新手來說非常方便。

## 安裝喜歡的佈景主題 ##
```
cd <your site path>/<your site name>
git clone <your theme git repo>
```
我自己是用[hugo-tranquilpeak-theme](https://github.com/kakawait/hugo-tranquilpeak-theme.git)，但你也可以參考[Hugo Theme](https://themes.gohugo.io)下載自己喜歡的 theme，下面紀錄就用 hugo-tranquilpeak-theme 來說明怎麼設定。

## 設定佈景主題 ##
Hugo 的設定檔是專案目錄下的 config.toml，一開始我們可以先套用 theme 附帶的範例設定，然後再來修改。像 hugo-tranquilpeak-theme 的目錄下有 exampleSite 就是預設好的範例，我們用 rsync 來覆蓋掉 hugo 產生的範例。
```
cd <your site path>/<your site name>/thems/<your theme>/exampleSite
rsync -avh config.toml ../../../
rsync -avh content ../../../
rsync -avh static ../../../
```

再依據自己的需求修改 config.toml 即可開始使用囉。
[hugo-tranquilpeak-theme 線上說明](https://github.com/kakawait/hugo-tranquilpeak-theme/blob/master/docs/user.md#writing-posts)

## 開始撰寫新的筆記 ##
你可以用以下指令：
```
cd <your site>
hugo new
```
開啟一篇新文章，或是在 <your site name>/content/post 目錄，新增 Markdown 檔案。

## 本機端測試 ##
你可以用以下指令：
```
cd <your site>
hugo server
```
開啟瀏覽器 http://localhost:1313/

## 部署到 Github ##

> 工步他始能詩的，裝進分星海演意學值例道……於財型目古香亮自和這乎？化經溫詩。只賽嚴大一主價世哥受的沒有中年即病行金拉麼河。主小路了種就小為廣不？

*From [亂數假文產生器 - Chinese Lorem Ipsum](http://www.richyli.com/tool/loremipsum/)*
