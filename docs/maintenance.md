# 维护指南

本文记录站点结构、模板映射、交互、依赖与维护约定。快速运行、新增作品、发布和验证入口见 [README.md](../README.md)；AI 协作约束见 [AGENTS.md](../AGENTS.md)。

## 站点结构

首页和分类页的作品卡片全部来自一份 [`data/works.yml`](../data/works.yml)；作品详情页由 `layouts/partials/work/` 里 15 个可复用组件拼成；导航、轮播、弹窗由原生 JavaScript 负责（`assets/js/script.js` 与 `init.js`），Bootstrap 只提供 CSS。

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

生产构建、产物检查和浏览器走查见 [README.md 的“改完后检查”](../README.md#改完后检查)。默认构建产物写入已被 Git 忽略的 `public/`。

想保留现有本地产物时，可以把输出和缓存放到临时目录：

```sh
build_dir=$(mktemp -d /tmp/celia-build.XXXXXX)
hugo --minify --destination "$build_dir" --cacheDir "$build_dir/.cache"
```

## 内容文件与模板

| 内容文件 | 使用的模板 |
| --- | --- |
| `content/work/_index.md` | `layouts/work/list.html` |
| `content/work/<category>/_index.md` | `layouts/work/work-list-with-type.html` |
| `content/work/<category>/<slug>.md` | `layouts/<category>/<slug>.html` |

详情页用 `type` 选择模板目录，用 `layout` 写**不带目录**的模板名，例如 `type: 'multimedia-art-hci'` + `layout: 'knowing-river-through-sound'`。站内只有三个作品分类和 About / Contact 页面，没有 blog 等其他分区。

## 交互与无障碍

| 能力 | 行为 |
| --- | --- |
| 导航 | 折叠断点与 Bootstrap `navbar-expand-lg` 一致（`max-width: 991.98px`）；窄屏点击 Work 展开分类，桌面支持 hover 与键盘焦点 |
| 键盘 | skip link、可见焦点、`aria-expanded` 同步、Escape 关闭菜单和弹窗 |
| 图片轮播 | 每 4 秒自动切换；悬停或聚焦时暂停；`prefers-reduced-motion` 下关闭自动播放 |
| 弹窗 | 焦点进入并被限制在弹窗内，关闭后焦点返回、背景滚动恢复、iframe 停播 |
| 手机视频 | 宽度 `<= 575px` 时点击封面内联播放；All Videos 仍打开弹窗 |

导航交互由 `assets/js/script.js` 实现，不要因 HTML 里保留了 `data-toggle` 属性就重新引入 jQuery 或 Bootstrap JS。

## 运行时依赖

| 依赖 | 来源 | 用途 |
| --- | --- | --- |
| Bootstrap 4.6.2（仅 CSS） | jsDelivr | 栅格与基础样式 |
| Font Awesome | jsDelivr | 页脚社交图标 |
| AOS | jsDelivr | 滚动入场动画 |
| Swiper 11.2.6 | jsDelivr | 作品页轮播（按需加载） |
| Google Fonts | Google | 网页字体 |

页面视觉和交互依赖这些服务可访问。`layouts/partials/footer.html` 依次加载 `script.js`、AOS、按需的 Swiper 和 `init.js`。Contact 页只展示联系方式，没有启用表单后端。

## 图片与媒体

主要作品图片托管在 `https://cdn.celiasy.com/images/`，视频使用外部嵌入；**Hugo 构建不会验证这些远端资源**。上传前可用 [iLoveIMG](https://www.iloveimg.com/zh-cn/compress-image/compress-jpg) 压缩 JPG，并为图片保留真实宽高和恰当的 `alt`。

> `format_file.py` 会直接把指定目录内的文件名改为小写并用连字符替换空格。使用前请确认 CDN 上的资源 URL 和模板中的引用会同步更新。

## Sass

`layouts/partials/head.html` 通过 Hugo 的 `css.Sass` 编译 `assets/scss/style.scss`，没有显式指定 Dart Sass 转译器。CI 会另行安装 Dart Sass，但这不意味着本地必须先安装独立的 `sass` 命令。

## 维护约定

- 复用 `layouts/partials/work/` 组件，不要退回到页面内硬编码的重复块；所有页面共用 `layouts/_default/baseof.html`。
- 不提交 `public/`、`resources/`、锁文件或本机配置。
- 提交信息沿用 [Conventional Commits](https://www.conventionalcommits.org/) 风格，例如 `fix(nav): ...`、`feat(works): ...`。
