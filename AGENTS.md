# AI 协作与维护指南

本文件适用于本仓库中的所有 AI 协作，目标是让 Celia 的个人作品集长期保持**内容可信、体验一致、易于维护**。README.md 提供项目入口，docs/maintenance.md 记录维护细节，本文件只保留稳定、可执行的协作约束；同一事实尽量只在对应层级维护。

## 1. 开始之前

- 先读 [README.md](README.md)；涉及站点结构、模板、交互或依赖时，同时读 [docs/maintenance.md](docs/maintenance.md)。再检查当前配置、模板和相近实现，以代码与命令输出为事实来源，不凭旧模板、其他项目经验或记忆推断现状。
- 动手前查看工作区状态，保护已有未提交修改；不覆盖、回滚或格式化无关文件。
- 先明确页面、内容、样式和交互的受影响范围，优先检索并复用现有实现，再开始修改。
- 这是 Hugo Extended 静态站点：无 Node 构建链、数据库或后端。本地运行、部署和新增作品的完整步骤见 README.md；CI 的 Hugo 版本以 `.github/workflows/hugo.yml` 为准。
- 未经明确要求，不提交、不推送、不部署，也不升级 Hugo、依赖或 CI 配置。

## 2. 变更原则

- 做**最小且完整**的改动：解决当前需求及直接关联问题，不顺手重构、改名、清理或调整无关页面。
- 遵循现有目录、命名、样式和代码约定；优先复用组件与参数，避免重复模板、页面专用分支、冗余样式和隐式耦合。
- 不为局部需求引入新框架、构建工具或依赖。确有必要时，先说明收益、维护成本、替代方案和影响范围。
- 不把实验代码、临时调试、个人路径、本机配置或密钥写入仓库；不提交 `public/`、`resources/`、`.hugo_build.lock` 等生成物。
- 涉及公开内容、视觉风格或信息架构的大幅调整时，先说明方案；不确定的事实先核实，不编造客户、职责、成果、奖项或项目数据。

## 3. 个人主页内容

- 站点只有 `content/work/` 下的三个作品分类，以及 About、Contact 页面；没有 blog 或独立 portfolio 分区，不凭习惯新增。
- 保持 Celia 的表达方式与作品叙事，文案具体、克制、真实；保留必要的 NDA 声明、版权信息和归属，不公开敏感材料。
- 新增或修改作品时，同时检查：
  1. `content/work/<category>/<slug>.md` 的 front matter；
  2. `layouts/<category>/<slug>.html` 的详情正文；
  3. `data/works.yml` 中首页与分类页共用的卡片、顺序、分类和链接。
- 改动页面标题、URL 或 slug 时，同步检查卡片链接、站内引用、canonical / Open Graph、sitemap 及可能的旧链接影响；不无故改变已发布 URL。
- 卡片链接使用带尾斜杠的完整站内路径：`/work/<category>/<slug>/`。
- 图片和视频版权归原作者或相应权利人所有。替换媒体前确认来源与使用权限，并同步更新 CDN 地址、模板引用和替代文本。

## 4. Hugo 内容与模板

适用于 `content/**/*.md` 与 `layouts/**/*.html`。

| 内容 | 模板 |
| --- | --- |
| `content/work/<category>/<slug>.md` | `layouts/<category>/<slug>.html` |
| `content/work/<category>/_index.md` | `layouts/work/work-list-with-type.html` |
| `content/work/_index.md` | `layouts/work/list.html` |

`<category>` 仅可为 `multimedia-art-hci`、`spatial-design`、`ux-web3`。

- 详情页显式设置分类 `type` 和作品 `layout`：`type` 选择模板目录，`layout` 只写不带 `/` 的模板名。例如 `type: 'ux-web3'` 与 `layout: 'armadillo'` 对应 `layouts/ux-web3/armadillo.html`。
- 分类 `_index.md` 使用 `type: 'work'`、`layout: 'work-list-with-type'`，并以 `data_type` 匹配 `data/works.yml` 的卡片 `type`。
- 所有页面复用 `layouts/_default/baseof.html`；不为分类或作品复制共享骨架。
- 作品正文主要位于详情模板，仅写 Markdown 正文不会自动生成完整作品页。
- 复用 `layouts/partials/work/`，不要将已有 partial 回退为页面内硬编码的重复块。卡片底色、文字色等个性化优先通过参数传递。
- `has_carousel: true` 只用于确有轮播的页面，避免无条件加载 Swiper。
- 动态拼接 `style` 时使用安全属性输出，避免 Hugo 将其过滤为 `ZgotmplZ`：

  ```go-html-template
  <div {{ printf "style=%q" $style | safeHTMLAttr }}></div>
  {{ with .imageStyle }}{{ printf "style=%q" . | safeHTMLAttr }}{{ end }}
  ```

  不要写成 `<div style="{{ $style }}"></div>`。

## 5. 样式、交互与媒体

### 工程与设计

- 保持视觉克制、统一，检查间距、层级、对齐、响应式布局、状态反馈、动效节奏和可读性；设计效果与后续维护成本同样重要。
- 样式优先落在现有 SCSS 模块中，控制选择器范围，避免全局副作用、重复覆盖和依赖 `!important` 的竞叠。
- 图片保留真实比例、准确的 `alt` 和尺寸信息；不要移除 `assets/scss/_common.scss` 中 `img { height: auto; }` 的回退。
- 上传前压缩图片，避免为缩略图加载不必要的大图。主要图片与视频是远端资源，Hugo 构建不会验证其可访问性。
- 修改公共导航、页脚、字体、颜色或组件时，检查所有复用页面，而不只检查当前作品页。

### 导航与键盘

- 导航交互由 `assets/js/script.js` 实现，Bootstrap 仅提供 CSS。不要因 HTML 保留 `data-toggle` 属性就重新引入 jQuery、Bootstrap JS 或旧 vendor 脚本。
- 折叠断点与 `navbar-expand-lg` 一致，JS 使用 `max-width: 991.98px`。窄屏点击 Work 展开分类；桌面支持 hover、键盘焦点和直接访问 `/work/`。
- Logo 返回首页，不重复增加 All Work 子菜单。汉堡按钮的布局覆盖必须限定在折叠断点，避免影响桌面隐藏规则。
- 保留 skip link、可见焦点、`aria-expanded` 同步和 Escape 关闭；新增交互必须可用键盘操作，不能只支持 hover。

### 轮播、弹窗与视频

- 自动图片轮播当前为 4000ms；保持悬停或聚焦暂停，并在 `prefers-reduced-motion` 下关闭自动播放。相关代码位于 `assets/js/init.js` 和 `layouts/partials/auto-carousel-modal.html`。
- 修改弹窗时检查焦点进入与限制、关闭后的焦点返回、背景滚动恢复及 iframe 停播。
- 手机宽度 `<= 575px` 时，点击视频封面使用内联播放；All Videos 仍打开弹窗。
- Swiper 11 导航按钮使用 `--swiper-navigation-top-offset` 定位，以按钮高度一半的负 `margin-top` 居中，并清除外部 `transform`；不要用 `top: 50% !important` 加 `translateY(-50%)` 覆盖内部定位。

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

- 移动端改变按钮尺寸时，同步调整负 `margin-top`。浅色图片上的按钮可使用 `rgba(0, 0, 0, 0.55)` 背景，确保箭头与页面背景有足够对比度。

## 6. 验证与交付

仓库没有自动化测试。根据变更范围选择验证，不把未执行的检查写成已通过。

### 站点变更

1. 运行生产构建：

   ```sh
   HUGO_ENVIRONMENT=production HUGO_ENV=production hugo --minify
   ```

2. 检查构建产物中不存在 `ZgotmplZ`：

   ```sh
   rg -n 'ZgotmplZ' public -g '*.html'
   ```

3. 检查变更页面及共用组件影响到的页面，至少覆盖桌面和窄屏。涉及导航、轮播、弹窗或视频时，按 docs/maintenance.md 验证键盘、焦点、滚动、暂停、关闭和远端媒体加载。
4. 涉及 URL、元数据或部署配置时，额外检查生成 HTML、内部链接及 CI 结果。

本地构建只证明静态生成成功，不代表线上已发布或交互验收通过。无法执行的检查要明确说明原因和剩余风险。

### 纯文档变更

检查命令、路径、链接和 Markdown 结构是否与仓库一致，并运行 `git diff --check`；无需为了文档修改执行浏览器验收。

### 完成前

- 审查最终 diff，确认没有误改、调试残留、生成物或无关格式化。
- 若运行方式、目录结构或长期约定发生变化，同步更新 README.md、docs/maintenance.md 或本文件；不要把一次性排查过程写入长期文档。
- 交付时简要说明：改了什么、实际验证了哪些内容、哪些尚未验证或需要后续处理。
- 只有被要求提交时才创建 commit；提交信息沿用 Conventional Commits，例如 `fix(nav): ...`、`feat(works): ...`。
