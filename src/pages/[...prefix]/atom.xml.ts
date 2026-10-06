// 保留 Docusaurus 時期的 /blog/atom.xml，內容與 /blog/rss.xml 相同
// ponytail: 輸出的是 RSS 格式，閱讀器會依內容判斷格式；真的需要 Atom 再自己產生
export { getStaticPaths, GET } from 'starlight-blog/routes/rss'
