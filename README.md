<div align="center">

# Celia Shuyue Li

**AI 产品设计 · 多媒体艺术 · 空间设计**

把人、设计、艺术与技术编织在一起的个人作品集。

[![Live Site](https://img.shields.io/badge/live-celiasy.com-111111?style=flat-square&logo=googlechrome&logoColor=white)](https://celiasy.com/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/artstur/celia-portfolio/hugo.yml?branch=master&style=flat-square&label=deploy&logo=githubactions&logoColor=white)](https://github.com/artstur/celia-portfolio/actions/workflows/hugo.yml)

[在线浏览](https://celiasy.com/) ·
[作品一览](#作品一览) ·
[本地运行](#本地运行) ·
[新增作品](#新增一件作品) ·
[发布](#发布)

</div>

---

## 你好，我是 Celia

这个仓库是我的个人作品集 [celiasy.com](https://celiasy.com/) 的源码。我在 AI 产品、多媒体艺术与空间设计之间工作，这个站点就是这三个方向作品的家：从声音里的河流，到食物荒漠中的社区农业，再到 Web3 世界的金融产品。

整站是一个纯静态网站——没有数据库、没有后端，改动推送到 `master` 后会自动构建并发布。如果你只想看作品，直接去[线上站点](https://celiasy.com/)就好；下面的内容留给需要在这个仓库里动手的人。

## 作品一览

站点按三个方向组织作品。

<table>
  <tr>
    <th width="33%">Multimedia Art &amp; HCI</th>
    <th width="33%">Spatial Design</th>
    <th width="33%">Product Design</th>
  </tr>
  <tr>
    <td valign="top">
      <a href="https://celiasy.com/work/multimedia-art-hci/knowing-river-through-sound/"><img src="https://cdn.celiasy.com/images/index/compressed/1.jpg" alt="Knowing River Through Sound"></a><br>
      <sub>Knowing River Through Sound</sub><br><br>
      <a href="https://celiasy.com/work/multimedia-art-hci/a-collection-garments-of-discomfort/"><img src="https://cdn.celiasy.com/images/index/compressed/2.jpg" alt="A Collection: Garments of Discomfort"></a><br>
      <sub>A Collection: Garments of Discomfort</sub><br><br>
      <a href="https://celiasy.com/work/multimedia-art-hci/stone-fized-history-and-tree-fized-temporary/"><img src="https://cdn.celiasy.com/images/index/compressed/3.jpg" alt="Stone-fized History and Tree-fized Temporary"></a><br>
      <sub>Stone-fized History and Tree-fized Temporary</sub>
    </td>
    <td valign="top">
      <a href="https://celiasy.com/work/spatial-design/seeding-the-food-desert/"><img src="https://cdn.celiasy.com/images/index/compressed/5.jpg" alt="Seeding the Food Desert"></a><br>
      <sub>Seeding the Food Desert</sub><br><br>
      <a href="https://celiasy.com/work/spatial-design/sandscape-sediment-mechanism/"><img src="https://cdn.celiasy.com/images/index/compressed/4.jpg" alt="Sandscape: Sediment Mechanism"></a><br>
      <sub>Sandscape: Sediment Mechanism</sub><br><br>
      <a href="https://celiasy.com/work/spatial-design/junctionscape/"><img src="https://cdn.celiasy.com/images/index/compressed/7.jpg" alt="JunctionScape"></a><br>
      <sub>JunctionScape</sub>
    </td>
    <td valign="top">
      <a href="https://celiasy.com/work/ux-web3/armadillo/"><img src="https://cdn.celiasy.com/images/index/compressed/8.jpg" alt="Armadillo"></a><br>
      <sub>Armadillo</sub><br><br>
      <a href="https://celiasy.com/work/ux-web3/trust-finance/"><img src="https://cdn.celiasy.com/images/index/compressed/9.jpg" alt="Trust Finance"></a><br>
      <sub>Trust Finance</sub><br><br>
      <a href="https://celiasy.com/work/ux-web3/payblocks-banking/"><img src="https://cdn.celiasy.com/images/index/compressed/10.jpg" alt="PayBlocks Banking"></a><br>
      <sub>PayBlocks Banking</sub><br><br>
      <a href="https://celiasy.com/work/ux-web3/buffet/"><img src="https://cdn.celiasy.com/images/index/compressed/6.jpg" alt="Buffet"></a><br>
      <sub>Buffet</sub>
    </td>
  </tr>
</table>

## 本地运行

只想本地预览或改点东西，只需要安装一个 [Hugo Extended](https://gohugo.io/installation/)，没有 `npm install`，没有构建链：

```sh
git clone git@github.com:artstur/celia-portfolio.git
cd celia-portfolio
hugo server --bind 127.0.0.1 --baseURL http://localhost:1313/
```

打开 <http://localhost:1313/>，改动会即时刷新。CI 固定使用 Hugo **0.157.0**，需要复现线上结果时请用同一版本。

## 新增一件作品

1. **写内容**：在 `content/work/<分类>/<slug>.md` 新建文件，front matter 参考同类现有作品。分类只有 `multimedia-art-hci`、`spatial-design`、`ux-web3` 三种。

   ```yaml
   ---
   title: "Project | Celia Shuyue Li"
   type: 'ux-web3'
   layout: 'project'
   work_header_title: "Project"
   # has_carousel: true   # 仅当页面里有图片轮播时才加
   ---
   ```

2. **写页面**：在 `layouts/<分类>/<slug>.html` 里用 `layouts/partials/work/` 中现成的组件拼装详情页。作品正文主要写在模板里——只写 Markdown 正文不会自动变成作品页。

3. **登记卡片**：在 [`data/works.yml`](data/works.yml) 的 `work_item` 里追加一项，卡片才会出现在首页和分类页：

   ```yaml
     - title: "Project"
       img: "https://cdn.celiasy.com/images/index/compressed/<n>.jpg"
       url: "/work/ux-web3/project/"
       type: "ux-web3"
   ```

几个容易踩的坑：

- URL 一律带尾斜杠写成 `/work/<分类>/<slug>/`。
- `has_carousel: true` 只该出现在真正有轮播的页面，否则会白白加载一份 Swiper。
- 修改已有作品时，front matter、详情模板、`data/works.yml` 卡片三处要一起检查。
- 页面个性化（卡片底色、文字色等）优先通过组件参数传入；动态拼接 `style` 时用 `printf "style=%q" $style | safeHTMLAttr`，避免 Hugo 输出 `ZgotmplZ`。

## 发布

把改动推送到 `master`，GitHub Actions 会自动构建并部署到 GitHub Pages，几分钟后 [celiasy.com](https://celiasy.com/) 即更新。也可以在工作流页面手动触发。构建时 CI 会把 `baseURL` 替换为 Pages 的正式 https 地址，所以本地不用关心域名配置。

## 改完后检查

仓库没有自动化测试，每次改动后请过一遍：

1. 生产构建通过：`HUGO_ENVIRONMENT=production HUGO_ENV=production hugo --minify`
2. 构建产物里没有 `ZgotmplZ`（这是 Hugo 把可疑输出过滤后的痕迹）：

   ```sh
   rg -n 'ZgotmplZ' public -g '*.html'
   ```

3. 浏览器走查：首页、三个分类页、改过的作品页、About、Contact——桌面与窄屏导航、键盘 Tab / Escape、轮播悬停暂停、弹窗关闭后的焦点与滚动、CDN 图片与视频是否加载正常。

本地构建通过只说明静态生成成功，不等于线上已发布或交互验收通过。

---

## 维护文档

站点结构、模板映射、交互细节、运行依赖与维护约定见 [docs/maintenance.md](docs/maintenance.md)。

## 版权

站点中的作品、图片、视频与文案版权归 Celia Shuyue Li 所有，© ArtStur Associates. All Rights Reserved. 未经授权请勿转载或复用。

<div align="center">
<sub>Built with <a href="https://gohugo.io/">Hugo</a> · Designed by Celia Shuyue Li · <a href="https://celiasy.com/contact/">Let's Collaborate</a></sub>
</div>
