---
slug: xcode-debug-note
title: Xcode debug 筆記
authors: [mikimoto]
tags: [xcode, debug, development]
---

紀錄一下自己常用的 Xcode debug 設定與 keyword，以免忘記。

<!-- truncate -->

<!-- toc -->

## 基本用法 ##

- p, print, call: [expression]

```
(lldb) p count
(Int) $R0 = 10
```

- po: [expression]

```
(lldb) po self
<DispatchInProtocol.ViewController: 0x7fd404f05e50>

(lldb) expr -l objc++ -0 -- @[@"a", @"b"]
<__NSArrayI 0x60400022d940>(
a,
b
)
```

不只拿來列印變數，還可以改變執行內容

```
(lldb) print self.view.backgroundColor = UIColor.red
(lldb) print CATransaction.flush()
```

- breakpoint, br: [expression]

指令可以縮寫到唯一配對即可

```
(lldb) breakpoint set -n main
Breakpoint 4: 44 locations.

(lldb) br s -n main
Breakpoint 4: 44 locations.
```

- eobjc: [expression]

可以執行時期宣告變數，$ 開頭之變數可存在於 lldb 執行期間

```
(lldb) eobjc int $a = 10
(lldb) po $a
10

(lldb) p $a * 19
(int) $1 = 190

(lldb)
```