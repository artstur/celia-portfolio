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
    <th width="33%">UX &amp; Web3</th>
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

<details>
<summary><strong>技术细节</strong>（站点结构、模板映射、交互与依赖，维护时再看）</summary>

### 站点是怎么组织的

首页和分类页的作品卡片全部来自一份 [`data/works.yml`](data/works.yml)；作品详情页由 `layouts/partials/work/` 里 15 个可复用组件拼成；导航、轮播、弹窗由几百行原生 JavaScript 负责（`assets/js/script.js` 与 `init.js`），Bootstrap 只提供 CSS。

```text
celia-portfolio/
├── hugo.toml                  # 域名、菜单、站点信息、favicon、Google Analytics
├── data/works.yml             # 首页与 /work/ 的作品卡片、顺序、分类、链接
├── content/
│   ├── about/  contact/       # About 与 Contact 页的文案
│   └── work/<category>/       # 作品 front matter 与分类列表配置
├── layouts/
│   ├── _default/baseof.html   # 共享骨架：导航、主内容、页脚
│   ├── index.html             # 首页 = work-intro + work-list
│   ├── <category>/<slug>.html # 每个作品的详情正文
│   ├── partials/work/         # 可复用的作品组件
│   └── partials/auto-carousel-modal.html  # 自动图片轮播与共享图库弹窗
├── assets/
│   ├── scss/                  # 样式，入口 style.scss
│   └── js/
│       ├── script.js          # 导航展开、键盘操作、锚点滚动
│       └── init.js            # AOS、图片/视频轮播、视频播放与弹窗
├── static/                    # 原样复制的图片、字体、robots.txt
└── .github/workflows/hugo.yml # 构建并发布到 GitHub Pages
```

生产构建命令（产物写入 `public/`，已被 Git 忽略）：

```sh
HUGO_ENVIRONMENT=production HUGO_ENV=production hugo --minify
```

想保留现有本地产物时，可以把输出和缓存放到临时目录：

```sh
build_dir=$(mktemp -d /tmp/celia-build.XXXXXX)
hugo --minify --destination "$build_dir" --cacheDir "$build_dir/.cache"
```

### 内容文件与模板的对应关系

| 内容文件 | 使用的模板 |
| --- | --- |
| `content/work/_index.md` | `layouts/work/list.html` |
| `content/work/<category>/_index.md` | `layouts/work/work-list-with-type.html` |
| `content/work/<category>/<slug>.md` | `layouts/<category>/<slug>.html` |

详情页用 `type` 选择模板目录，用 `layout` 写**不带目录**的模板名，例如 `type: 'multimedia-art-hci'` + `layout: 'knowing-river-through-sound'`。站内只有三个作品分类和 About / Contact 页面，没有 blog 等其他分区。

### 交互与无障碍

| 能力 | 行为 |
| --- | --- |
| 导航 | 折叠断点与 Bootstrap `navbar-expand-lg` 一致（`max-width: 991.98px`）；窄屏点击 Work 展开分类，桌面支持 hover 与键盘焦点 |
| 键盘 | skip link、可见焦点、`aria-expanded` 同步、Escape 关闭菜单和弹窗 |
| 图片轮播 | 每 4 秒自动切换；悬停或聚焦时暂停；`prefers-reduced-motion` 下关闭自动播放 |
| 弹窗 | 焦点进入并被限制在弹窗内，关闭后焦点返回、背景滚动恢复、iframe 停播 |
| 手机视频 | 宽度 `<= 575px` 时点击封面内联播放；All Videos 仍打开弹窗 |

导航交互由 `assets/js/script.js` 实现，不要因 HTML 里保留了 `data-toggle` 属性就重新引入 jQuery 或 Bootstrap JS。

### 运行时依赖

| 依赖 | 来源 | 用途 |
| --- | --- | --- |
| Bootstrap 4.6.2（仅 CSS） | jsDelivr | 栅格与基础样式 |
| Font Awesome | jsDelivr | 页脚社交图标 |
| AOS | jsDelivr | 滚动入场动画 |
| Swiper 11.2.6 | jsDelivr | 作品页轮播（按需加载） |
| Google Fonts | Google | 网页字体 |

页面视觉和交互依赖这些服务可访问。`layouts/partials/footer.html` 依次加载 `script.js`、AOS、按需的 Swiper 和 `init.js`。Contact 页只展示联系方式，没有启用表单后端。

### 图片与媒体

主要作品图片托管在 `https://cdn.celiasy.com/images/`，视频使用外部嵌入；**Hugo 构建不会验证这些远端资源**。上传前可用 [iLoveIMG](https://www.iloveimg.com/zh-cn/compress-image/compress-jpg) 压缩 JPG，并为图片保留真实宽高和恰当的 `alt`。

> `format_file.py` 会直接把指定目录内的文件名改为小写并用连字符替换空格。使用前请确认 CDN 上的资源 URL 和模板中的引用会同步更新。

### Sass

`layouts/partials/head.html` 通过 Hugo 的 `css.Sass` 编译 `assets/scss/style.scss`，没有显式指定 Dart Sass 转译器。CI 会另行安装 Dart Sass，但这不意味着本地必须先安装独立的 `sass` 命令。

### 维护约定

- 动手前先读本文件和 [`AGENTS.md`](AGENTS.md)，以当前模板、配置和命令输出为准。
- 复用 `layouts/partials/work/` 组件，不要退回到页面内硬编码的重复块；所有页面共用 `layouts/_default/baseof.html`。
- 不提交 `public/`、`resources/`、锁文件或本机配置。
- 提交信息沿用 [Conventional Commits](https://www.conventionalcommits.org/) 风格，例如 `fix(nav): ...`、`feat(works): ...`。

> 2026-10-22 曾用本地 Hugo Extended 0.162.1 构建成功，但该版本对 `languageCode`、`.Site.LanguageCode`、`.Site.Data` 报弃用警告。升级 CI 前需要先处理并验证兼容性；CI 版本以 workflow 为准。

</details>

## 版权

站点中的作品、图片、视频与文案版权归 Celia Shuyue Li 所有，© ArtStur Associates. All Rights Reserved. 未经授权请勿转载或复用。

<div align="center">
<sub>Built with <a href="https://gohugo.io/">Hugo</a> · Designed by Celia Shuyue Li · <a href="https://celiasy.com/contact/">Let's Collaborate</a></sub>
</div>
