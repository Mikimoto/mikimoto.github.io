---
title: "Vcpkg 的安裝與使用筆記"
sidebar_position: 0
sidebar_label: Vcpkg 的安裝與使用筆記
hide_table_of_contents: false
last_update: 
  date: 2024-01-28
---

## Vcpkg 的安裝與使用筆記 ##

### 安裝 ###

1. 將 [Vcpkg](https://github.com/microsoft/vcpkg) 的程式碼 clone 到你準備的目錄下（不需要放在專案內，可以多數專案共用）
   
   ```
   git clone https://github.com/microsoft/vcpkg.git
   ```

1. 執行 vcpkg 下的設定 shell script

   ```
   ./bootstrap-vcpkg.sh
   ```

   這一步會在目錄下產生一個 vcpkg 的執行 script，用於 vcpkg 的安裝、查詢等工具，但與 CMake 整合之後，不會直接用到這個工具。

### 整合進 CMake ###

1. 在目錄下新增檔案 CMakeUserPresets.cmake，並在裡面加入下列內容:

   ```json
   {
      "version": 2,
      "configurePresets": [
         {
            "name": "default",  
            "inherits": "vcpkg",
            "environment": {
               "VCPKG_ROOT": "${sourceDir}/../vcpkg"
            }
         }
      ]
   }
   ```

   > - name 是 CMake 的 preset 名稱，這裡我們用 default 為例子。
   > - VCPKG_ROOT 是前面 vcpkg 的 git clone 路徑，這裡我用專案相對路徑。

1. 在目錄下新增 CMakePresets.json，並在裡面加入下列內容:

   ```json
   {
      "version": 2,
      "configurePresets": [
         {
            "name": "vcpkg",
            "generator": "Unix Makefiles",
            "binaryDir": "${sourceDir}/build",
            "cacheVariables": {
               "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
            }
         }
      ]
   }
   ```

   > - generator 是 CMake 的 generator 名稱，這裡我們用 Unix Makefiles 為例子。
   > - CMAKE_TOOLCHAIN_FILE 是 CMake 整合 vcpkg 的關鍵，這裡我們用 CMakeUserPresets 設定的 VCPKG_ROOT 作為 base。

1. 在目錄下新增 vcpkg.json，並在裡面加入下列內容:

   ```json
   {
      "dependencies": [
         "openssl",
         "protobuf"
         ...
      ]   
   }
   ```

   裡面設定你專案需要引用的套件，這樣在執行 CMake 的時候就會自動安裝這些套件。

1. 設定好 CMakeList.txt 後，例如我習慣建立一個 build 目錄作為編譯目錄，我就會執行以下命令：

   ```
   madir build
   cd build
   cmake --preset=default ../
   ```

   Makefile 會自動產生在 build 目錄下，然後就可以編譯了。

### 其他 ### 

 - vcpkg 安裝的套件會在 build 目錄下的 vcpkg_installed 目錄下。