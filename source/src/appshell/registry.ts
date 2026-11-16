// Application Shell 场景索引：编号 → 组件。AI 找编号请直接看 AppShell-XX.tsx。
import type { ComponentType } from "react"
import S1 from "./AppShell-01"
import S9 from "./AppShell-09"
import S22 from "./AppShell-22"
import S27 from "./AppShell-27"
import S29 from "./AppShell-29"
import S34 from "./AppShell-34"
import S36 from "./AppShell-36"
import S38 from "./AppShell-38"

export type AppShellEntry = { num: number; en: string; cn: string; def: string; Comp: ComponentType }
export const APPSHELLS: AppShellEntry[] = [
  { num: 1, en: "Sidebar Shell With Breadcrumbs", cn: "侧栏 + 面包屑外壳", def: "左侧可折叠分组导航，顶栏面包屑，右侧内容区。后台管理最常见的骨架。", Comp: S1 },
  { num: 9, en: "IDE File Explorer Shell", cn: "IDE 文件树外壳", def: "最左活动栏 + 文件树侧栏 + 代码编辑区，像 VS Code。开发工具、文件管理用。", Comp: S9 },
  { num: 22, en: "Three-Pane Mail Shell", cn: "三栏邮件外壳", def: "文件夹栏 + 邮件列表 + 阅读窗格，中间可拖动分隔。邮件客户端经典布局。", Comp: S22 },
  { num: 27, en: "Music Player Shell", cn: "音乐播放器外壳", def: "歌单侧栏 + 内容 shelves + 底部常驻播放条，带进度和音量。音乐/播客应用。", Comp: S27 },
  { num: 29, en: "Shell With Banner + Status Bar", cn: "横幅 + 状态栏外壳", def: "顶部可关闭的试用横幅 + 侧栏 + 底部细状态条。SaaS 试用版常见。", Comp: S29 },
  { num: 34, en: "Document Editor Shell", cn: "文档编辑器外壳", def: "标题栏 + File/Edit/View 菜单 + 格式工具条 + 纸张画布。在线文档用。", Comp: S34 },
  { num: 36, en: "Whiteboard Shell", cn: "白板工具外壳", def: "点阵画布 + 浮动的文件条/工具条/分享条。设计协作工具。", Comp: S36 },
  { num: 38, en: "Pull Request Review Shell", cn: "代码评审外壳", def: "仓库顶栏 + 吸顶 PR 头 + 分支标签页 + 改动文件树 + diff 视图。代码评审。", Comp: S38 },
]
