# UI 词典 · UI Dictionary

**23 个词，和任何人聊 UI：程序员、设计师、拖拽建站工具、AI。**

一言不合就写一大段"你做一个点击后弹出来的框，没有红绿灯，不用点叉，点了别处它就消失……"？其实那一个词就说完了：**Popover**。

本站是一份**可触摸的可视化词典**：每个词都配一个真的能点的 live demo。玩 30 秒，词和手感焊死在脑子里。

🔗 **在线版**：https://samuelonly.github.io/ui-dictionary/（极简单文件版）
🚀 **增强版**：https://samuelonly.github.io/ui-dictionary/enhanced/（真 shadcn/ui 组件 + 真动效）

## 词表

### ① 组件词（11）

| 词 | 一句话 |
|---|---|
| Hover | 鼠标悬停时元素的变化 |
| Popover | 点按钮弹出的小浮层，点外面就消失 |
| Tooltip | 纯悬停提示，不能交互 |
| Modal / Dialog | 居中大弹窗 + 背景变暗，处理完才能继续 |
| Toast | 角落弹出、几秒自己消失的通知 |
| Drawer / Sheet | 从屏幕边缘滑出的面板 |
| Dropdown | 点一下列出选项，专用于"选一项" |
| Accordion | 点标题展开/收起的折叠面板 |
| Skeleton | 数据没到时的灰色闪光占位 |
| Backdrop / Overlay | 让背景变暗的那层膜 |
| Disabled · Active · Focus | 三态：禁用 / 按下 / 选中 |

### ② 布局词（7）

| 词 | 一句话 |
|---|---|
| Layout | 整页版式总纲（侧边栏+主区……）|
| Grid | 行列矩阵排布（"卡片一行 3 个"）|
| Flex | 单向排列（横排/竖排）|
| Stack | 垂直堆叠（表单标配）|
| Container | 限宽居中的壳 |
| Section | 页面一大段（Hero、Footer……）|
| Block | 内容积木（Notion 里回车一下那个）|

### ③ 响应式词（5）

| 词 | 一句话 |
|---|---|
| Responsive | 界面随屏宽自适应 |
| Breakpoint | 触发换折法的宽度线（如 768px）|
| Mobile-first | 先做手机版再往大屏加 |
| Fluid / Fixed | 百分比撑满 / 写死像素 |
| Sticky | 滚动时钉住不走的元素 |

## 为什么是这 23 个词

它们是**全行业的公共货币**：同一个 Popover，程序员在代码里叫 `<Popover />`，设计师在 Figma 里叫 Component，建站工具里叫一块，AI 听一个词就落实现——**一本词典，四张门票**。

沟通的最高效格式：**名词做基线，散文只说偏差。**

- ✅ "这里一个 Popover，但别点外面关"
- ❌ "你做一个点击后弹出来的框，不要红绿灯，不用点叉……"

## 使用方式

- **在线玩**：打开上面的链接，每个 demo 摸 30 秒
- **离线自取**：`index.html` 是单文件、零依赖，下载后双击即用
- **学会即毕业**：词是路标不是终点，记住之后就不用再来了

## 技术说明

单文件 HTML + 原生 CSS/JS，零依赖、零构建、离线可用。组件词以 [shadcn/ui](https://ui.shadcn.com) 词表为准。

---

MIT License · 做一次，方便所有人
