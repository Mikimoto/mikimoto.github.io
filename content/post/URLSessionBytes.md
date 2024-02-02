---
title: URLSession async/await 的 bytes 運作機制 
slug: urlsession-bytes
date: 2022-11-28
categories:
- iOS
- URLSession
tags:
- ios
- swift
- async/await
- bytes
- urlsession
- research
keywords:
- ios
- swift
- async/await
- bytes
- urlsession
---

最近從同事口中得知，Swift 的 URLSession 多了一個 bytes(from:) 的函式，看說明很神奇，他可以一筆一筆步進式的下載資料，對他的運作原理實在很好奇，趁著週末空虛寂寞覺得冷，研究了一下它的運作機制。
<!--more-->

<!-- toc -->

## 實驗方法 ##

為了實驗方便，我從國外 Quote 網站收集了一百則名言，用 FastAPI 簡單架設了一個名言放送服務。打算用 URLSession 來 get 這個 API 

