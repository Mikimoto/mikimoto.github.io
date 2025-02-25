---
slug: github-hugo-implement
title: 部署到 Github 上的 Hugo Blog 紀錄
authors: [mikimoto]
tags: [github, blog]
---

想要找的地方把自己的 Note 整理一下，既然是工程師當然要善用工程師社交網站 Github 來放 Blog。Hugo 好像比 Hexo 來多人使用，佈景主題也比較齊全，所以就有了這篇動手建立的實作紀錄。

<!-- truncate -->

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
開啟一篇新文章，或是在 [your site name]/content/post 目錄，新增 Markdown 檔案。

## 本機端測試 ##
你可以用以下指令：
```
cd <your site>
hugo server
```
開啟瀏覽器 http://localhost:1313/

## 部署到 Github ##
Github 支援使用每一個帳號有一個專屬的 Github Page，部署到 Github 上有兩種方式：
* User/Organization Pages (https://[USERNAME or ORGANIZATION].github.io/)
* Project Pages (https://[USERNAME orORGANIZATION].github.io/[PROJECT]/)

我們以 User Pages 的方式說明:

### 建立 repository ###
請先建立 < your username >/ < your username >.github.io 這個 repository 當作你帳號的專屬頁面

p.s. 你的 theme 如果是 clone 來的，建議另外用 submodule 掛上去

### 撰寫 Github Action ###
在 Github 上的 Actions 去新增一個 Action，填入以下內容：
```
{{< codeblock ".github/workflows/main.yml" ".github/workflows/main.yml" "http://underscorejs.org/#compact" ".github/workflows/main.yml" >}}

# This is a basic workflow to help you get started with Actions

name: Hugo Build and Deploy

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      # Runs a single command using the runners shell
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
        #run: echo Hello, world!

      - uses: actions/cache@v2
        with:
          path: /tmp/hugo_cache
          key: ${{ runner.os }}-hugomod-${{ hashFiles('**/go.sum') }}
          restore-keys: |
            ${{ runner.os }}-hugomod-
      
      # Runs a set of commands using the runners shell
      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
{{< /codeblock >}}
```

Github Action 在 Deploy 時會幫你建立 gh-pages 並把產生於 ./public 的靜態網站 commit 上去。設定完成後，可以看看 run 的結果調整。

最後不要忘記到  repository 的設定裡面把 Github Pages 功能打開並對應到 gh-pages 的 branch。

如果上述步驟都成功，你應該可以連線到 https:// < username > .github.io 去看看自己的成果。