---
name: celia-portfolio-project-design
description: 为 celiasy.com（artstur/celia-portfolio）新增作品、编排案例页、制作导航封面或校正作品设计时使用。按作品分类复用 Hugo 模板，保持字体、行距、字色、留白和移动端体验与现有作品一致。
---

# Celia 作品集设计规范

以下路径均相对 `celia-portfolio` 仓库根目录。先读 `AGENTS.md`、`README.md` 的「新增一件作品」及 `docs/maintenance.md`。从 `data/works.yml` 找到同分类、素材类型最接近的已发布作品，同时打开其页面、front matter 和详情模板。以当前源码和页面为准。

## 用同一套模板编排

- 由 `layouts/_default/baseof.html` 提供整站框架，用 `layouts/partials/work/page-header.html` 展示作品名称、简介和有依据的角色信息。
- Product Design 可参照 `layouts/ux-web3/self-evolving-ai-workbench.html`。复用 `work/detail-front.html` 的图像、信息框和按钮，首屏后以 `.site-work-detail-page` 呈现问题背景。正文用 `.site-work-detail-page-template`、`.container`、`.site-work-detail-page-template-header`，让 `h3`、`h4`、`p`、图注和上下段落保留共用层级。多媒体或空间设计从各自分类挑选参考，按作品需要使用影像、轮播或大幅图纸。
- 在 `layouts/partials/work/` 选择与材料相符的图文、双图、双栏文字等组件。章节数和标题跟随作品故事。注明实际产品界面、原型或演示数据，使图注与画面相符。

## 把项目特色放在素材与主题色上

- 由 `assets/scss/_variables.scss`、`_typography.scss` 和 `components/_swork.scss` 决定各层字体、字号、字重、字色、行距、字距、段距及断点。使用相同的元素、容器和类，避免为整页另写等效 CSS。例：作品标题和正文小节使用不同字体，章节的下划线与正文留白由其外层类生成。
- 需要主题色的模板调用 `layouts/partials/accent-color-style.html`。在 front matter 用 `accent_color` 指定标题与按钮可读的强调色，`accent_surface_color` 指定较浅的主题底色。例如淡紫可用于底色与封面，标题与按钮配同色系较深的强调色。正文和图注沿用共享字色。
- 独有截图或交互需要额外样式时，将选择器限制在该组件，优先处理图片尺寸、比例或操作反馈。用横幅素材适配共享首屏的信息框和手机裁切，项目标识和界面保留在可见范围内。

## 给作品列表单独做封面

- 在首页、`/work/` 和分类列表找到相邻作品，按实际卡片大小看它们如何取景。Product Design 先对照 Armadillo、PayBlocks Banking 或 Workbench：方形画布铺项目主题纯色，中央白边矩形画框约占画布宽度的三分之二，真实设备或界面放在框内，四周留出色块。用新作品自己的画面和颜色延续该构图；其他分类以各自的摄影、作品实物或图纸封面为参照。
- 标题由模板根据 `data/works.yml` 的 `title` 叠加。封面只放作品画面，避免额外排大字标题、口号或按钮。方形封面供列表使用，横向首屏图按正文模板的信息框位置构图。两者可取材于同一截图，分别导出适合各自用途的尺寸；以实际图片比例核对成品。
- 三处入口共用 `data/works.yml` 的 `img` 和 `url`，分类依 `type` 筛选。查看 `layouts/partials/work-list.html`、`layouts/work/work-list-with-type.html` 和 `assets/scss/components/_work.scss`。需要更新的本地封面优先放在 `assets/images/<category>/<slug>/`，让共享 `work/image-url.html` 输出带内容指纹的资源；README 使用仓库内可访问的图片路径。桌面验收双列布局、悬停蒙层与居中标题，用 Tab 检查焦点并按 Enter 进入详情；手机验收单列、底部渐变上常显的标题和主体是否完整可见。

## 登记与验收

1. 新增时将 `content/work/<category>/<slug>.md` 的 `type` 和 `layout` 对应到 `layouts/<category>/<slug>.html`。在 `data/works.yml` 和 README「作品一览」按相同顺序登记封面及带尾斜杠的详情链接。仅调整既有详情页时，保留其 URL 和目录顺序。
2. 按仓库说明运行 Hugo 生产构建。在同一桌面宽度、同一手机宽度分别打开新页和参考页，截图对照页头、首屏、典型正文与图注。核对浏览器计算样式中的字体、字号、行高、字色、容器宽度与段落间距；主题色按该项目配置检查。确认窄屏正文换行自然、截图看得清、链接或控件可操作。
3. 核对首页、`/work/`、所属分类到详情页的入口与图片。检查差异，确认已有作品和卡片相对顺序保留。若改动共用模板或样式，检查所有受影响的作品；仅新增项目时，可比较同一次构建配置下改动前后既有详情页的生成结果。交付时区分本地预览和已核实的线上页面。
