# hand off · UI 词典交接文档

> 写于 2026-11-16 · v1.1.0 · 为下一个 AI 工具接力。读完这份 + 站规，你就能无损接手。

## ⚠️ 接手前必读：一处未同步差异（2026-11-16 01:00）

远端提交 `61f86e6`（作者 Samuelonly，非本会话产物）把**构建产物**里的页脚精简成「只保留仓库 ID」，移除了版本统计与检查更新——但**只改了产物（assets JS + 离线文件），没动 `source/`**。当前状态：线上页脚 = 精简版；`source/src/App.tsx` 的 footer = 完整版（含 APP_VERSION/version.json 检查更新逻辑）。接手后先向用户确认方向：**A. 保留精简页脚 → 把 source/ 的 footer 同步改掉再双构建；B. 恢复完整页脚 → 重新双构建覆盖产物**。在确认之前，不要动页脚相关代码。

## 一、项目是什么

**UI 词典**：一个可视化 UI 词汇词典（公开站），46 个词（21 组件 + 7 布局 + 13 动效 + 5 响应式），每个词配可交互 live demo + 中文注解 + 沟通话术 + 「更多 N 种」变体弹窗。定位：帮不懂代码的人学会用行业标准词和程序员/设计师/AI 对话。**术语英文、解释中文、单页静态（绝无二级页面）**。

- **在线版**：https://samuelonly.github.io/ui-dictionary/
- **仓库**：https://github.com/Samuelonly/ui-dictionary（public，MIT）
- **离线版**：`ui-dictionary-offline.html`（仓库根，734KB 单文件，**与在线版一模一样**——同一套 React 构建，vite-plugin-singlefile 全内联）
- **版本**：v1.1.0（App 内 `APP_VERSION` 常量 + 仓库根 `version.json`，两处必须同步改）

## 二、源码在哪

| 位置 | 内容 |
|---|---|
| **本仓库 `source/` 目录**（本次新增） | 完整 Vite + React + shadcn 工程源码（唯一权威源） |
| 本地 `~/Documents/ui-dic-build/` | 开发工作区（和 source/ 内容一致，含 node_modules/dist/dist-offline） |
| 本地 `~/Documents/ui-dictionary-site/` | 部署仓本地克隆（= 本仓库） |

**警告：GitHub 仓库根 = 构建产物（index.html/assets/离线文件），不是源码；源码在 `source/` 子目录。改源码后必须重新构建再部署，别只改产物。**

## 三、构建与部署流程（每次改动的完整闭环）

```bash
cd source/            # 或 ~/Documents/ui-dic-build
npm install           # 首次
npm run build         # 在线版 → dist/
BUILD_OFFLINE=1 npm run build   # 离线单文件 → dist-offline/index.html（全部内联）
# 然后部署：
# 1. cp -r dist/* <部署仓根>/
# 2. cp dist-offline/index.html <部署仓根>/ui-dictionary-offline.html
# 3. 改 version.json（{"version","updated","words","repo"}）和 App 内 APP_VERSION，保持同步
# 4. git add -A && git commit && git push origin main
# 5. GitHub Pages 自动构建，等 1-2 分钟，curl 验证 200
```

**双构建纪律：改了页面必须两个构建都跑、两个产物都部署——只发在线版会让离线版掉队（用户为此发过火）。**

## 四、页面结构（用户多轮拍板，勿再改）

- 吸顶**大 Tabs** 切四大类：① 组件词 21 / ② 布局词 7 / ③ 动效词 13 / ④ 响应式 5（默认组件，Tab 上标词数）
- 每类 = **单层 grid md:grid-cols-3 自动行流**：编号横向走（第一横排 1,2,3，第二横排 4,5,6），**黑底圆形号牌**
- **禁止瀑布流**：同排卡片按最高卡片对齐高度（Entry 用 flex-col，note 用 mt-auto 沉底）
- 手机自动一竖列；任何宽度**禁止横向溢出**（min-w-0 + overflow-x-clip + 顶栏只留品牌和下载按钮）
- **页面待机**：动效只 hover/点击才演，**全局自动演示已被否决**（几十张卡同时动=像死机）。例外：Pulse/Bounce/Spin/Marquee/Typewriter 循环版（本义就是循环，已注明）

## 五、变体机制（「更多 N 种」）

- Entry 组件支持 `variants?: { name, demo }[]`；`variants.length > 1` 时标题右上角自动出现「更多 N 种」小圆钮 → 点开 Dialog（不跳页）内网格展示全部变体，**全部待机、悬停才演**
- 加变体 = 给该词 variants 数组加一项。当前 46 词全覆盖（约 90 个变体 demo），亮点：Link Highlights 9 种（下划线滑入/色块滑动/渐变描边/发光/变色/背景擦除/删除线/波浪线/字距呼吸）、Popover 3 方位、Sheet 4 边、Toast 4 情绪、Slider 双滑块+竖直、Breadcrumb 带下拉等

## 六、技术栈与坑

- Vite 6 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui（Radix 行为层）+ sonner（Toast）
- 构建工作区 shadcn CLI 是 4.x：`init -b` 选底层库 radix|base|aria（不是 baseColor）；TS 6 移除了 baseUrl，paths 直接 `@/*: ./src/*`
- GitHub Pages 首次构建 1-2 分钟；用户浏览器可能缓存 404——先 `gh api repos/Samuelonly/ui-dictionary/pages/builds/latest` 查状态 + curl 验 200，再让用户 Cmd+Shift+R
- **用户网络：GitHub 推送必须走 Clash 代理**：`https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 git push`；代理挂了跑 `~/bin/refresh-clash-sub.sh`

## 七、站规（用户逐条拍板，全部长期有效）

1. 术语英文、解释中文；词名卡片为「号牌 + 英文名 + 中文名」
2. 单页静态，绝无二级页面（shadcn.io 那种点进去的二级页被否决）；变体进弹窗
3. 页面待机，动效触发才演；禁止全局自动演示
4. 编号横向走、同排等高、禁止瀑布流
5. 机制必须全局一致：一个功能（如「更多 N 种」）要么全部词都有，要么都不做——不许挑个别词做样
6. 离线版永远与在线版一致（双构建纪律）

## 八、待办（V2，已提出未拍板）

用户调研了 donglang.linter.top（60 个动效词库，场景化演示，自带 llms.txt/catalog.json/逐效果 md，改写自 MIT 项目）后，V2 方案已提出待拍板：

1. 新增第五类「⑤ 场景动效」12 个成品动效词：逐行遮罩升起 Line mask reveal、错峰淡入上移 Stagger fade-up、擦除揭示 Wipe reveal、模糊到清晰 Blur in、放大镜 Magnifier lens、聚光灯卡片 Spotlight、里程表数字滚动 Odometer、手绘圈注 Hand-drawn circle、3D 跟随倾斜 3D tilt、磁吸按钮 Magnetic button、阅读追踪光束 Tracing beam、下滑隐藏顶栏 Hide-on-scroll header
2. demo 场景化：彩色底 + 迷你真实页面（海报/产品格/导航/文章页），虚拟人格作品集风格——现在的白底裸组件被用户评「像原型不像 UI/UE」
3. 全站改「中文主名 + 英文副名」（中文管检索、英文管对 AI 说话）
4. 效果实现：手搓或裁剪 MIT 项目（Aceternity/Inspira/StyleKit），不抄站、不付费

词库三层论（理解用户「不够全」的根因）：零件词（组件/布局）→ 原子动效（fade/slide=字母表）→ 成品动效（词组）。第三层目前只有 Link Highlights 1 个，V2 补 12 个。

## 九、本地环境备忘

- `gh` 已登录 Samuelonly；Pages 部署 = push main 即触发
- Clash Verge：mixed-port 7897；订阅刷新 `~/bin/refresh-clash-sub.sh`；推送失败先查代理
- 本地三个目录都是独立 git 仓/工程，互为副本——以仓库 `source/` 为准绳
