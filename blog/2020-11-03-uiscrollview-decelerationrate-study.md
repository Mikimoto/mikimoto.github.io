---
slug: uiscrollview-decelerationrate-study
title: 控制 UIScrollView 的快速捲動的減速速度
authors: [mikimoto]
tags: [apple, ios, uikit]
---

負責的 APP 因為優化過了 UITableView 的捲動，捲動順暢了，但是連帶的使用者操作反而會常觸發快速捲動模式。

<!-- truncate -->

<!-- toc -->

如果覺得快速捲動過程中，滾動速度過快，一滑就溜出去很遠。而且最糟糕的是在快速捲動時，使用者要操作時會因為動畫而有延遲的現象。一開始的想法是去找有沒有可以把快速捲動模式取消的方法，可是好像沒法控制 UIScrollView 的快速捲動。

不過在翻文件的過程當中，讓我找到 UIScrollView 的 decelerationRate 的屬性，來控制快速捲動的減速速度，decelerationRate 為 CGFloat，範圍從 0 ~ 1。

系統有預設兩種常數可以用來控制：
    
    - normal = 0.998 (預設值)，正常減速
    - fast = 0.99 ，更快減速

使用範例：

```
self.tableview.decelerationRate = .fast
```

我們也可以將 decelerationRate 設為自訂值，例如：

```
self.tableview.decelerationRate = 0.1
```

你會發現捲動很快就停下來。

UITableView 繼承自 UIScrollView，因此來自於 UIScrollView 的控制項也會作用在 UITableView 身上。
