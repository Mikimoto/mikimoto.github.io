---
slug: vcpkg-cplusplus-package-manager
title: vcpkg（C++ 套件管理器）搭配 cmake 的設定筆記
authors: [mikimoto]
tags: [cplusplus, cmake]
---

最近重新把一些舊的專案整理一下，發現 C++ 專案要重建實在太吃系統環境，例如必須要安裝一些函式庫，並且函式庫之間還有版本相容問題，
導致專案重建非常麻煩，因此評估了一些 C++ 套件管理器，例如 [Vcpkg](https://github.com/microsoft/vcpkg)、[Conan](https://github.com/conan-io/conan)、[Spack](https://github.com/spack/spack) 等。

<!-- truncate -->

<!-- toc -->

## 套件管理器比較 ##

### Conan ###

Conan 是一套使用 Python 為基底來管理函式庫的套件管理器，可以方便地管理函式庫的版本，並且可以方便地在不同的環境下安裝函式庫。
可以搭配 CMake 使用，大致上滿足我的需求，但缺點就是一定要準備 Python 的環境。

### Spack ###

Spack 有點類似 vcpkg 不需要 Python 的執行環境，但在網路上看到一些文章開箱嘗試遇到一些困難，於是沒有繼續評估下去。

### Vcpkg ###

Vcpkg 不需要 Python 的執行環境，只需要把專案 clone 到你的目錄下就可以了，大部分的環境也都支援，雖然有大量的文件，不過學習曲線實在太陡峭了
在搭配 CMake 的狀況下，需要設定一些環境變數讓 CMake 與 Vcpkg 能夠搭配使用，我嘗試了一天才終於讓他們可以正常運作。
 