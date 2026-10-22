# Celia Portfolio

Celia Shuyue Li 的个人作品集，使用 Hugo 模板、SCSS 和原生 JavaScript 生成静态站点，线上地址为 <https://celiasy.com/>。

## 本地运行与构建

安装 Hugo Extended；CI 固定使用 **0.157.0**，需要复现 CI 时使用相同版本。项目没有 `package.json`，无需 `npm install`，模板和样式均在仓库内维护。

```sh
hugo version
hugo server --bind 127.0.0.1 --baseURL http://localhost:1313/
```

访问 <http://localhost:1313/>。生产构建：

```sh
HUGO_ENVIRONMENT=production HUGO_ENV=production hugo --minify
```

构建产物写入 `public/`；`public/`、`resources/` 和 `.hugo_build.lock` 已被 Git 忽略，不作为源码提交。需要保留现有本地产物时，可将输出和缓存放到临时目录：

```sh
build_dir=$(mktemp -d /tmp/celia-build.XXXXXX)
hugo --minify --destination "$build_dir" --cacheDir "$build_dir/.cache"
```

`layouts/partials/head.html` 通过 `css.Sass` 编译 `assets/scss/style.scss`，未指定 Dart Sass 转译器。CI 另行安装 Dart Sass；这不表示本地必须先安装独立的 `sass` 命令。

## 内容与模板入口

| 位置 | 用途 |
| --- | --- |
| `hugo.toml` | 域名、菜单、站点介绍、favicon、Google Analytics 配置 |
| `data/works.yml` | 首页及 `/work/` 的作品卡片、顺序、分类和链接 |
| `content/work/<category>/` | 作品 front matter 和分类列表配置 |
| `layouts/<category>/<slug>.html` | 各作品详情正文，复用 `layouts/partials/work/` 组件 |
| `layouts/_default/baseof.html` | 共享页面骨架、导航、主内容及页脚 |
| `assets/scss/` | 样式，入口为 `style.scss` |
| `assets/js/script.js` | 导航展开、键盘操作、锚点滚动 |
| `assets/js/init.js` | AOS、图片/视频轮播、视频播放与弹窗 |
| `layouts/partials/auto-carousel-modal.html` | 自动图片轮播及共享图库弹窗，含初始化脚本 |
| `static/` | 直接复制到输出目录的本地图片、字体、robots.txt |

主导航为 About、Work、Contact，Logo 返回首页。Work 下有 `multimedia-art-hci`、`spatial-design`、`ux-web3` 三类。`content/blog/` 与 `content/portfolio/` 虽未出现在主导航，仍会生成可访问页面。

### 新增或修改作品

1. 在 `content/work/<category>/<slug>.md` 设置 front matter，参考同类现有作品：

   ```yaml
   ---
   title: "Project | Celia Shuyue Li"
   type: 'ux-web3'
   layout: 'project'
   work_header_title: "Project"
   ---
   ```

2. 在 `layouts/ux-web3/project.html` 定义 `main` 块并复用作品组件。作品正文主要在模板内；默认的 `layouts/_default/single.html` 主块为空，单独新增 Markdown 正文不会自动成为作品详情。
3. 在 `data/works.yml` 的 `work_item` 添加 `title`、`img`、`url`、`type`。分类列表按 `type` 与 `_index.md` 的 `data_type` 精确匹配；仅新增内容文件不会自动出现卡片。
4. URL 使用 `/work/<category>/<slug>`；`type` 指定模板目录，`layout` 使用不带目录的模板名。分类 `_index.md` 使用 `type: 'work'`、`layout: 'work-list-with-type'`。模板共用 `layouts/_default/baseof.html`。

详情页的 `work_header_title` 同时控制 Swiper CSS/JS 的加载。新增轮播时要保留该字段，并按需引入图片或视频弹窗 partial。

主要作品图片来自 `https://cdn.celiasy.com/images/`，视频使用外部嵌入；Hugo 构建不会验证这些远端资源。可用 [iLoveIMG](https://www.iloveimg.com/zh-cn/compress-image/compress-jpg) 压缩 JPG。`format_file.py` 会直接将指定目录内的文件名改成小写并用连字符替换空格，使用前须确认资源 URL 和引用也会同步更新。

## 运行依赖与发布

- Bootstrap 4.6.2 **CSS**、Font Awesome、AOS 和作品页的 Swiper 11.2.6 来自 jsDelivr；字体来自 Google Fonts。页面视觉和交互需要这些服务可访问。
- `layouts/partials/footer.html` 加载 `script.js`、AOS、按需加载的 Swiper 和 `init.js`；旧 `vendor.js`、`formhandler.js` 的脚本标签被注释。Contact 页为联系方式展示，没有启用表单提交后端。
- `.github/workflows/hugo.yml` 在推送到 `master` 或手动触发时构建并发布 GitHub Pages，上传 `public/`，构建时用 Pages 输出的 `base_url` 覆盖 `hugo.toml` 的 `baseURL`。域名/DNS 与 Pages 设置需在托管端管理。

## 验证

仓库没有自动化测试套件。先完成生产构建，再检查生成 HTML 是否含 Hugo 安全过滤占位符：

```sh
rg -n 'ZgotmplZ' public -g '*.html'
```

正常应无匹配（`rg` 返回 1）。随后浏览首页、三个分类页、修改的作品页、About 和 Contact；检查桌面与窄屏导航、键盘 Tab/Escape、轮播暂停、图片/视频弹窗关闭后的焦点及滚动恢复，以及 CDN 图片和视频。构建通过只证明静态生成成功。

2026-10-22 使用本地 Hugo Extended 0.162.1 构建成功；该版本对 `languageCode`、`.Site.LanguageCode`、`.Site.Data` 报弃用警告。升级 CI 前需处理并验证兼容性，CI 版本仍以 workflow 为准。
