# Website

用 [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) + [starlight-blog](https://github.com/HiDeoo/starlight-blog) 建置。

- 部落格文章：`src/content/docs/blog/`
- 筆記：`src/content/docs/docs/`

```
yarn          # 安裝
yarn dev      # 本機預覽 http://localhost:4321
yarn build    # 輸出到 dist/
```

push 到 `master` 後，GitHub Actions 會 build 並部署到 `gh-pages` 分支。
