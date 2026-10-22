# 项目工作约定

- 先读 [README.md](README.md) 中的运行、内容映射及验证说明。以当前模板、配置与命令输出为事实来源；不要把旧 blog/portfolio 页面当成可随意删除的无用文件。
- 这是 Hugo 静态站点，无 Node 构建链或后端。命令入口为 `hugo server` 和 `HUGO_ENVIRONMENT=production HUGO_ENV=production hugo --minify`；CI 版本见 `.github/workflows/hugo.yml`。
- 修改作品须同时检查内容 front matter、对应详情模板及 `data/works.yml` 卡片。具体模板和样式规则见下文。
- 导航交互由 `assets/js/script.js` 实现，Bootstrap 仅提供 CSS。不要因 HTML 保留 `data-toggle` 属性就重新引入旧 vendor/jQuery/Bootstrap JS。
- 导航折叠与 `navbar-expand-lg` 一致：JS 使用 `max-width: 991.98px`。折叠时 Work 点击展开分类；桌面支持 hover/键盘焦点，并可直接访问 `/work/`。Logo 返回首页，不重复增加 All Work 子菜单。汉堡按钮的布局覆盖必须限定在折叠断点，避免覆盖 Bootstrap 桌面隐藏规则。
- 保留 skip link、可见焦点、`aria-expanded` 更新和 Escape 关闭。修改弹窗须检查焦点进入/限制/返回、背景滚动恢复与 iframe 停播；手机宽度 `<=575px` 的视频封面点击使用内联播放，All Videos 仍打开弹窗。
- 自动图片轮播当前为 4000ms；保持悬停/聚焦暂停及 `prefers-reduced-motion` 关闭自动播放。相关代码分布在 `assets/js/init.js` 和 `layouts/partials/auto-carousel-modal.html`。
- 图片保留真实比例、适当的 alt 和尺寸信息；不要移除 `assets/scss/_common.scss` 的 `img { height: auto; }` 回退。
- 修改后运行构建并检查 `ZgotmplZ`；涉及交互或布局时，按 README 做浏览器验证。说明实际验证范围，本地构建不等于线上发布或交互验收。
- 保护现有未提交修改；不提交 `public/`、`resources/`、锁文件或本机配置，不把临时调试过程写进长期文档。

## 前端工程与设计

- 遵循现有目录、样式与代码约定；命名清晰、职责明确，优先模块化和组件复用，避免重复代码、冗余样式及无效渲染，控制耦合和变更影响。
- 界面保持美观、克制、统一，检查间距、层级、对齐、状态反馈、动效节奏、可读性和交互可用性，兼顾视觉效果与维护成本。
- 提供方案时说明原因、落地方式及如何维护扩展。

## Hugo 模板路由

适用于 `content/**/*.md` 与 `layouts/**/*.html`。

- 显式用 `type` 选择模板目录，`layout` 只写不带 `/` 的模板名。例如 `type: 'multimedia-art-hci'`、`layout: 'knowing-river-through-sound'` 对应 `layouts/multimedia-art-hci/knowing-river-through-sound.html`。
- 不要用 `type: 'work'` 搭配 `layout: 'multimedia-art-hci/knowing-river-through-sound'`。

| 内容 | 模板 |
| --- | --- |
| `content/work/multimedia-art-hci/<slug>.md` | `layouts/multimedia-art-hci/<slug>.html` |
| `content/work/spatial-design/<slug>.md` | `layouts/spatial-design/<slug>.html` |
| `content/work/ux-web3/<slug>.md` | `layouts/ux-web3/<slug>.html` |
| 三个分类目录内的 `_index.md` | `layouts/work/work-list-with-type.html` |
| `content/work/_index.md` | `layouts/work/list.html` |

- 详情页显式设置分类 `type` 与作品 `layout`。分类列表入口使用目录内的 `_index.md`，设置 `type: 'work'`、`layout: 'work-list-with-type'`，以 `data_type` 匹配 `data/works.yml` 的卡片 `type`。
- 所有分类复用 `layouts/_default/baseof.html`；不要为分类复制共享骨架。
- 卡片链接使用完整站内路径，例如 `/work/multimedia-art-hci/knowing-river-through-sound`。新增作品与验证步骤统一见 README。

## Partial 复用与动态样式

适用于 `layouts/**/*.html`。

- 复用 `layouts/partials/work/`，不要将已有 partial 回退为页面内的硬编码重复块。
- 页面个性化（如卡片底色、文字色）优先通过 partial 参数传递，避免新增页面专用样式分支。
- 动态拼接 style 属性时使用安全属性输出，避免 Hugo 将其过滤成 `ZgotmplZ`：

  ```go-html-template
  <div {{ printf "style=%q" $style | safeHTMLAttr }}></div>
  {{ with .imageStyle }}{{ printf "style=%q" . | safeHTMLAttr }}{{ end }}
  ```

- 不要使用 `<div style="{{ $style }}"></div>` 拼接动态样式。构建后检查无 `ZgotmplZ`，颜色参数输出为真实 CSS 变量（如 `--two-card-bg`）。

## Swiper 导航按钮样式

适用于 SCSS 中的 Swiper 11 导航按钮。

- 使用 `--swiper-navigation-top-offset` 设置垂直位置，用按钮高度一半的负 `margin-top` 居中，清除外部 `transform`；不要依赖 `top: 50% !important` 加 `translateY(-50%)` 覆盖内部定位。

  ```scss
  .image-swiper {
    --swiper-navigation-top-offset: 50%;

    .swiper-button-prev,
    .swiper-button-next {
      width: 40px;
      height: 40px;
      margin-top: -20px;
      transform: none;
    }
  }
  ```

- 移动端按钮尺寸变化时，同步调整负 `margin-top`。浅色图片上的按钮需保证可见，可加 `background-color: rgba(0,0,0,0.35)` 半透明背景。
