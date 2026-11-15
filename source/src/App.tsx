import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

/* ================= 通用骨架 ================= */

const APP_VERSION = "1.1.0"
const REPO_ID = "Samuelonly/ui-dictionary"
const REPO_URL = "https://github.com/Samuelonly/ui-dictionary"
const ONLINE_URL = "https://samuelonly.github.io/ui-dictionary/"

function CheckUpdate() {
  const [state, setState] = useState<{ msg: string; newer?: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const check = async () => {
    setBusy(true)
    try {
      const r = await fetch(`https://samuelonly.github.io/ui-dictionary/version.json?t=${Date.now()}`)
      const j = await r.json()
      setState(j.version === APP_VERSION
        ? { msg: `✓ 已是最新版本（v${j.version}）` }
        : { msg: `↑ 发现新版本 v${j.version}，点仓库地址去拿`, newer: j.version })
    } catch {
      setState({ msg: "✗ 检查失败（无网络？）——直接点仓库地址看最新版" })
    }
    setBusy(false)
  }
  return (
    <span className="inline-flex items-center gap-2">
      <button onClick={check} disabled={busy} className="rounded-full border px-3 py-1 text-xs hover:bg-accent cursor-pointer disabled:opacity-50">
        {busy ? "检查中…" : "🔄 检查更新"}
      </button>
      {state && <span className={`text-xs ${state.newer ? "text-emerald-600 font-medium" : "text-muted-foreground"}`}>{state.msg}</span>}
    </span>
  )
}

type Variant = { name: string; demo: React.ReactNode }

function Entry({ num, en, cn, def, note, variants, children }: {
  num: number
  en: string
  cn: string
  def: React.ReactNode
  note?: string
  variants?: Variant[]
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-5 min-w-0 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold flex items-center gap-2.5 min-w-0">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{num}</span>
          <span className="font-mono truncate">{en}</span>
          <span className="text-muted-foreground font-normal truncate">{cn}</span>
        </h3>
        {variants && variants.length > 1 && <MoreVariants count={variants.length} items={variants} />}
      </div>
      <p className="mt-2 mb-3 text-[13px] leading-relaxed text-muted-foreground">{def}</p>
      <div className="rounded-lg border bg-background p-5 min-h-44 flex flex-col flex-1 flex-wrap items-center justify-center gap-4">{children}</div>
      {note && <p className="mt-auto pt-2.5 font-mono text-[11px] text-muted-foreground">{note}</p>}
    </div>
  )
}

/* 「更多 N 种」：右上角小圆钮 → 弹窗内变体网格，全程不跳页 */
function MoreVariants({ count, items }: { count: number; items: Variant[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
      >
        更多 {count} 种
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>全部 {count} 种效果</DialogTitle>
            <DialogDescription>页面待机——把鼠标悬停 / 点击每个 demo 才演。全程不跳页。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((v, i) => (
              <div key={i} className="rounded-xl border bg-background p-3">
                <p className="text-xs font-medium mb-2">
                  <span className="font-mono text-muted-foreground mr-1.5">{i + 1}.</span>{v.name}
                </p>
                {v.demo}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function Box({ label, dashed = false }: { label: string; dashed?: boolean }) {
  return (
    <div className="relative min-h-14 rounded-lg border-2 border-zinc-400 p-3">
      {dashed && <div className="absolute inset-0 border-2 border-dashed border-zinc-400 rounded-lg" />}
      <span className="absolute -top-2.5 left-2 bg-zinc-600 text-white text-[10px] px-2 rounded-full">{label}</span>
    </div>
  )
}

/* ================= 有状态 demo（待机，触发才演） ================= */

function ShakeDemo({ hard = false }: { hard?: boolean }) {
  const [shaking, setShaking] = useState(false)
  return (
    <Button
      variant="outline"
      className={shaking ? (hard ? "dic-shake-hard" : "dic-shake") : ""}
      onClick={() => { setShaking(true); setTimeout(() => setShaking(false), hard ? 600 : 500) }}
    >
      点我抖一下
    </Button>
  )
}

function RippleDemo({ color = "rgba(0,0,0,.16)", label = "点我，波纹从点击处扩散" }: { color?: string; label?: string }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  return (
    <button
      className="relative overflow-hidden rounded-lg border bg-card px-6 py-3.5 text-sm font-medium cursor-pointer"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const id = Date.now() + Math.random()
        setRipples(rs => [...rs, { x: e.clientX - r.left, y: e.clientY - r.top, id }])
        setTimeout(() => setRipples(rs => rs.filter(v => v.id !== id)), 700)
      }}
    >
      {label}
      {ripples.map(v => <span key={v.id} className="dic-ripple" style={{ left: v.x, top: v.y, backgroundColor: color }} />)}
    </button>
  )
}

function EasingDemo() {
  const [run, setRun] = useState(false)
  const curves: [string, string][] = [
    ["linear", "linear"],
    ["ease", "ease-in-out"],
    ["spring", "cubic-bezier(.34,1.56,.64,1)"],
  ]
  return (
    <div className="w-full space-y-3">
      {curves.map(([name, fn]) => (
        <div key={name} className="flex items-center gap-3">
          <span className="w-16 text-right font-mono text-[11px] text-muted-foreground">{name}</span>
          <div className="relative h-7 flex-1 rounded-md bg-muted/40">
            <span
              className="absolute top-1 size-5 rounded-full bg-zinc-700"
              style={{ left: run ? "calc(100% - 26px)" : "6px", transitionProperty: "left", transitionDuration: "900ms", transitionTimingFunction: fn }}
            />
          </div>
        </div>
      ))}
      <Button size="sm" variant="outline" className="mx-auto block" onClick={() => setRun(v => !v)}>跑一次，对比三种缓动</Button>
    </div>
  )
}

/* 打字机：光标闪版（待机）+ 循环打字版（例外循环） */
function TypewriterCaret() {
  return <p className="font-mono text-sm text-muted-foreground text-center">你好，我是打字机动效<span className="animate-pulse">▌</span></p>
}
function TypewriterLoop() {
  const full = "你好，我是打字机动效，一个字一个字冒出来。"
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN(v => (v >= full.length + 10 ? 0 : v + 1)), 150)
    return () => clearInterval(t)
  }, [full.length])
  return <p className="font-mono text-sm text-muted-foreground text-center min-h-6">{full.slice(0, Math.min(n, full.length))}<span className="animate-pulse">▌</span></p>
}

/* 命令面板：命令模式 / 文件搜索模式 */
function CommandDemo({ mode }: { mode: "commands" | "files" }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {mode === "commands" ? "打开命令面板" : "打开文件搜索"} <kbd className="ml-2 rounded border bg-muted px-1.5 font-mono text-[10px]">⌘K</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={mode === "commands" ? "输入命令…" : "搜索文件名…"} />
        <CommandList>
          <CommandEmpty>没有匹配结果。</CommandEmpty>
          {mode === "commands" ? (
            <>
              <CommandGroup heading="操作">
                <CommandItem>📋 复制路径</CommandItem>
                <CommandItem>✏️ 重命名</CommandItem>
                <CommandItem>🗑️ 删除</CommandItem>
              </CommandGroup>
              <CommandGroup heading="导航">
                <CommandItem>🏠 回到首页</CommandItem>
                <CommandItem>⚙️ 打开设置</CommandItem>
              </CommandGroup>
            </>
          ) : (
            <CommandGroup heading="文件">
              <CommandItem>📄 PRD-元宝.md</CommandItem>
              <CommandItem>📄 index.html</CommandItem>
              <CommandItem>🖼️ hero.png</CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

/* ================= 链接高亮 9 种 ================= */

function MiniNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5 text-[11px] text-muted-foreground w-full overflow-hidden">
      <span className="font-semibold text-foreground shrink-0">◆ 工作室</span>
      {children}
    </nav>
  )
}
const linkBase = "cursor-pointer shrink-0 whitespace-nowrap"
const uline = "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-zinc-700 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-foreground"
const gradient = "bg-[linear-gradient(90deg,#818cf8,#f472b6)] bg-no-repeat bg-left-bottom bg-[length:0%_2px] pb-0.5 transition-[background-size] duration-300 hover:bg-[length:100%_2px] hover:text-foreground"

const linkHighlightVariants: Variant[] = [
  { name: "下划线滑入", demo: <MiniNav><a className={`${linkBase} ${uline}`}>作品</a><a className={`${linkBase} ${uline}`}>服务</a><a className={`${linkBase} ${uline}`}>日志</a></MiniNav> },
  { name: "色块滑动高亮", demo: <MiniNav><a className={`${linkBase} rounded px-1.5 py-0.5 transition-colors duration-200 hover:bg-zinc-800 hover:text-white`}>作品</a><a className={`${linkBase} rounded px-1.5 py-0.5 transition-colors duration-200 hover:bg-zinc-800 hover:text-white`}>服务</a><a className={`${linkBase} rounded px-1.5 py-0.5 transition-colors duration-200 hover:bg-zinc-800 hover:text-white`}>日志</a></MiniNav> },
  { name: "渐变描边", demo: <MiniNav><a className={`${linkBase} ${gradient}`}>作品</a><a className={`${linkBase} ${gradient}`}>服务</a><a className={`${linkBase} ${gradient}`}>日志</a></MiniNav> },
  { name: "发光链接", demo: <MiniNav><a className={`${linkBase} transition-all duration-300 hover:text-indigo-300 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]`}>作品</a><a className={`${linkBase} transition-all duration-300 hover:text-indigo-300 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]`}>服务</a><a className={`${linkBase} transition-all duration-300 hover:text-indigo-300 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]`}>日志</a></MiniNav> },
  { name: "变色渐亮", demo: <MiniNav><a className={`${linkBase} transition-colors duration-300 hover:text-foreground`}>作品</a><a className={`${linkBase} transition-colors duration-300 hover:text-foreground`}>服务</a><a className={`${linkBase} transition-colors duration-300 hover:text-foreground`}>日志</a></MiniNav> },
  { name: "背景擦除", demo: <MiniNav><a className={`${linkBase} bg-zinc-700/50 bg-no-repeat bg-left-top bg-[length:0%_100%] px-1 transition-[background-size] duration-300 hover:bg-[length:100%_100%] hover:text-white`}>作品</a><a className={`${linkBase} bg-zinc-700/50 bg-no-repeat bg-left-top bg-[length:0%_100%] px-1 transition-[background-size] duration-300 hover:bg-[length:100%_100%] hover:text-white`}>服务</a><a className={`${linkBase} bg-zinc-700/50 bg-no-repeat bg-left-top bg-[length:0%_100%] px-1 transition-[background-size] duration-300 hover:bg-[length:100%_100%] hover:text-white`}>日志</a></MiniNav> },
  { name: "删除线划过", demo: <MiniNav><a className={`${linkBase} relative text-zinc-500 after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-red-400 after:transition-transform after:duration-300 hover:after:scale-x-100`}>作品</a><a className={`${linkBase} relative text-zinc-500 after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-red-400 after:transition-transform after:duration-300 hover:after:scale-x-100`}>服务</a><a className={`${linkBase} relative text-zinc-500 after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-red-400 after:transition-transform after:duration-300 hover:after:scale-x-100`}>日志</a></MiniNav> },
  { name: "波浪线", demo: <MiniNav><a className={`${linkBase} hover:text-foreground hover:underline decoration-wavy decoration-indigo-400 underline-offset-4`}>作品</a><a className={`${linkBase} hover:text-foreground hover:underline decoration-wavy decoration-indigo-400 underline-offset-4`}>服务</a><a className={`${linkBase} hover:text-foreground hover:underline decoration-wavy decoration-indigo-400 underline-offset-4`}>日志</a></MiniNav> },
  { name: "字距呼吸", demo: <MiniNav><a className={`${linkBase} transition-all duration-300 hover:tracking-[0.2em] hover:text-foreground`}>作品</a><a className={`${linkBase} transition-all duration-300 hover:tracking-[0.2em] hover:text-foreground`}>服务</a><a className={`${linkBase} transition-all duration-300 hover:tracking-[0.2em] hover:text-foreground`}>日志</a></MiniNav> },
]

/* ================= Hover 5 种 ================= */

const hoverVariants: Variant[] = [
  { name: "浮起", demo: <Button variant="outline" className="transition-all hover:-translate-y-1 hover:shadow-md">悬停我</Button> },
  { name: "放大", demo: <Button variant="outline" className="transition-transform hover:scale-110">悬停我</Button> },
  { name: "描边", demo: <Button variant="outline" className="transition-all hover:ring-2 hover:ring-zinc-800">悬停我</Button> },
  { name: "发光", demo: <Button variant="outline" className="transition-shadow hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]">悬停我</Button> },
  { name: "变色", demo: <Button variant="outline" className="transition-colors hover:bg-zinc-800 hover:text-white">悬停我</Button> },
]

/* ================= 页面 ================= */

export default function App() {
  const [flexDir, setFlexDir] = useState<"row" | "col">("row")
  const [width, setWidth] = useState(1000)
  const respCols = width < 700 ? "1fr" : "repeat(3, 1fr)"
  const respFlag = width < 700 ? "📱 已过断点（<700px）→ 折成 1 列" : "🖥️ 宽屏（≥700px）→ 3 列"

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* 顶栏 */}
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight">UI 词典</span>
          <a href="/ui-dictionary/ui-dictionary-offline.html" download className="rounded-full border px-3 py-1.5 text-xs hover:bg-accent">⬇️ 离线版</a>
        </div>
      </header>

      {/* Hero */}
      <div className="py-10 text-center px-4">
        <h1 className="text-4xl font-bold tracking-tight">UI 词典</h1>
        <p className="mt-3 text-muted-foreground">46 个词 = 21 组件 + 7 布局 + 13 动效 + 5 响应式</p>
        <p className="mt-1.5 text-xs text-muted-foreground">大 Tab 切分类 · 每类横向三列 · 编号横向走 · 页面默认待机，悬停/点击才演 · <span className="text-emerald-600">右上角「更多 N 种」= 一个词的全部效果</span></p>
      </div>

      {/* 大 Tab 分类导航（吸顶） */}
      <Tabs defaultValue="c1">
        <div className="sticky top-14 z-40 border-b bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-[1500px] px-6 py-3">
            <TabsList className="grid w-full grid-cols-4 h-11">
              <TabsTrigger value="c1" className="text-[11px] sm:text-sm">① 组件词 21</TabsTrigger>
              <TabsTrigger value="c2" className="text-[11px] sm:text-sm">② 布局词 7</TabsTrigger>
              <TabsTrigger value="c3" className="text-[11px] sm:text-sm">③ 动效词 13</TabsTrigger>
              <TabsTrigger value="c4" className="text-[11px] sm:text-sm">④ 响应式 5</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <main className="mx-auto max-w-[1500px] px-6 pb-24">

          {/* ==================== ① 组件词 21 ==================== */}
          <TabsContent value="c1" className="mt-8">
            <p className="text-sm text-muted-foreground mb-7">回答「<b>放什么</b>」——页面上那些有名字的零件。页面待机，悬停/点击才演。</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <Entry num={1} en="Hover" cn="悬停" def="鼠标停上去时元素的变化。Hover 是动效的宿主——5 种常见变体看右上角。" note="话术：这个卡片 hover 时浮起 + 加阴影" variants={hoverVariants}>
                <Button variant="outline" className="transition-all hover:-translate-y-0.5 hover:shadow-md">把鼠标滑到我身上</Button>
              </Entry>

              <Entry num={2} en="Popover" cn="弹出层" def={<>点按钮弹出的<b>小</b>浮层，<b>点外面就消失</b>。弹出的方位也能选——看右上角。</>} note="默认行为：点外部关闭 · Esc 关闭" variants={[
                { name: "从上方弹出", demo: <Popover><PopoverTrigger asChild><Button variant="outline" size="sm">上方</Button></PopoverTrigger><PopoverContent side="top" className="w-40 text-xs text-center">我从上面弹出来</PopoverContent></Popover> },
                { name: "从右侧弹出", demo: <Popover><PopoverTrigger asChild><Button variant="outline" size="sm">右侧</Button></PopoverTrigger><PopoverContent side="right" className="w-40 text-xs text-center">我从右边弹出来</PopoverContent></Popover> },
                { name: "从左侧弹出", demo: <Popover><PopoverTrigger asChild><Button variant="outline" size="sm">左侧</Button></PopoverTrigger><PopoverContent side="left" className="w-40 text-xs text-center">我从左边弹出来</PopoverContent></Popover> },
              ]}>
                <Popover>
                  <PopoverTrigger asChild><Button>点我弹出 Popover</Button></PopoverTrigger>
                  <PopoverContent className="w-64 text-sm">
                    <p className="font-semibold">我是一个真·Popover</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">点外部任何地方、按 Esc，我都会消失。</p>
                  </PopoverContent>
                </Popover>
              </Entry>

              <Entry num={3} en="Tooltip" cn="悬停提示" def={<>纯提示，<b>不能交互</b>。弹出的方位有四种——看右上角。</>} note="口诀：能点的用 Popover，只看看的用 Tooltip" variants={[
                { name: "上方（默认）", demo: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm">上方</Button></TooltipTrigger><TooltipContent>上面的提示</TooltipContent></Tooltip></TooltipProvider> },
                { name: "下方", demo: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm">下方</Button></TooltipTrigger><TooltipContent side="bottom">下面的提示</TooltipContent></Tooltip></TooltipProvider> },
                { name: "左侧", demo: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm">左侧</Button></TooltipTrigger><TooltipContent side="left">左边的提示</TooltipContent></Tooltip></TooltipProvider> },
                { name: "右侧", demo: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm">右侧</Button></TooltipTrigger><TooltipContent side="right">右边的提示</TooltipContent></Tooltip></TooltipProvider> },
              ]}>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="outline">悬停在我上面</Button></TooltipTrigger>
                    <TooltipContent>我是 Tooltip，真·延时出现动画</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Entry>

              <Entry num={4} en="Modal / Dialog" cn="大弹窗" def={<>居中大弹窗 + <b>背景变暗</b>。除了确认框，还有表单弹窗、危险确认弹窗——看右上角。</>} note="那层变暗的膜见第 10 个词 Backdrop" variants={[
                { name: "表单弹窗", demo: <Dialog><DialogTrigger asChild><Button variant="outline" size="sm">打开表单弹窗</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>新建项目</DialogTitle><DialogDescription>填两下就能建好。</DialogDescription></DialogHeader><div className="space-y-3"><Input placeholder="项目名称" /><Input placeholder="备注" /><Button className="w-full">创建</Button></div></DialogContent></Dialog> },
                { name: "危险确认弹窗", demo: <Dialog><DialogTrigger asChild><Button variant="outline" size="sm">打开危险确认</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>确认删除？</DialogTitle><DialogDescription>删除后无法恢复，请想清楚。</DialogDescription></DialogHeader><div className="flex gap-2 justify-end"><Button variant="outline">取消</Button><Button variant="destructive">确认删除</Button></div></DialogContent></Dialog> },
              ]}>
                <Dialog>
                  <DialogTrigger asChild><Button>打开 Modal</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>我是真·Dialog</DialogTitle>
                      <DialogDescription>点背景、按 Esc 都能关闭。按 Tab——焦点圈只在弹窗里转。</DialogDescription>
                    </DialogHeader>
                    <Button className="w-fit">知道了</Button>
                  </DialogContent>
                </Dialog>
              </Entry>

              <Entry num={5} en="Toast" cn="飘过的通知" def="右上角弹出来、几秒后自己消失的通知。四种情绪色——看右上角，各点一下。" note="组件名 Sonner，沟通时说 Toast 人人听得懂" variants={[
                { name: "错误（红）", demo: <Button variant="outline" size="sm" onClick={() => toast.error("保存失败", { description: "网络开小差了，重试一下" })}>弹错误 Toast</Button> },
                { name: "警告（黄）", demo: <Button variant="outline" size="sm" onClick={() => toast.warning("注意", { description: "草稿还没保存" })}>弹警告 Toast</Button> },
                { name: "信息（白）", demo: <Button variant="outline" size="sm" onClick={() => toast.info("小提示", { description: "双击可以快速复制路径" })}>弹信息 Toast</Button> },
              ]}>
                <Button variant="outline" onClick={() => toast.success("已保存", { description: "3 秒后自己消失，不用点任何东西" })}>
                  弹成功 Toast（看右上角）
                </Button>
              </Entry>

              <Entry num={6} en="Drawer / Sheet" cn="抽屉" def="从屏幕边缘滑出的面板。四个边都能滑——看右上角。" note="shadcn 里叫 Sheet" variants={[
                { name: "从左侧滑出", demo: <Sheet><SheetTrigger asChild><Button variant="outline" size="sm">左侧</Button></SheetTrigger><SheetContent side="left"><SheetHeader><SheetTitle>左抽屉</SheetTitle><SheetDescription>从屏幕左缘滑入。</SheetDescription></SheetHeader></SheetContent></Sheet> },
                { name: "从顶部滑出", demo: <Sheet><SheetTrigger asChild><Button variant="outline" size="sm">顶部</Button></SheetTrigger><SheetContent side="top"><SheetHeader><SheetTitle>顶抽屉</SheetTitle><SheetDescription>从屏幕上缘滑入。</SheetDescription></SheetHeader></SheetContent></Sheet> },
                { name: "从底部滑出", demo: <Sheet><SheetTrigger asChild><Button variant="outline" size="sm">底部</Button></SheetTrigger><SheetContent side="bottom"><SheetHeader><SheetTitle>底抽屉</SheetTitle><SheetDescription>从屏幕下缘滑入。</SheetDescription></SheetHeader></SheetContent></Sheet> },
              ]}>
                <Sheet>
                  <SheetTrigger asChild><Button variant="outline">从右边滑出抽屉</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>我是 Sheet</SheetTitle>
                      <SheetDescription>从屏幕右缘滑入，自带遮罩和滑入动效。</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </Entry>

              <Entry num={7} en="Dropdown" cn="下拉菜单" def="点一下列出一串选项。还能带多选、快捷键标注、子菜单——看右上角。" note="shadcn 里叫 Dropdown Menu" variants={[
                { name: "多选菜单", demo: <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm">多选菜单</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem checked>显示隐藏文件</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>显示网格</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu> },
                { name: "标签 + 快捷键 + 危险项", demo: <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm">完整菜单</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>文件操作</DropdownMenuLabel><DropdownMenuItem>重命名 <DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive">删除…</DropdownMenuItem></DropdownMenuContent></DropdownMenu> },
                { name: "子菜单", demo: <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm">子菜单</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSub><DropdownMenuSubTrigger>导出为…</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem>PDF</DropdownMenuItem><DropdownMenuItem>PNG</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu> },
              ]}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="outline">选择操作 ▾</Button></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>重命名</DropdownMenuItem>
                    <DropdownMenuItem>复制路径</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">删除…</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Entry>

              <Entry num={8} en="Accordion" cn="折叠面板" def="点标题展开、再点收起，自带展开动画。FAQ 的标配。单开还是多开，看右上角。" note="组件名就叫 Accordion" variants={[
                { name: "多开模式（type=multiple）", demo: <Accordion type="multiple" className="w-full"><AccordionItem value="a"><AccordionTrigger>什么是组件？</AccordionTrigger><AccordionContent>可复用的最小功能件。</AccordionContent></AccordionItem><AccordionItem value="b"><AccordionTrigger>可以同时开两个吗？</AccordionTrigger><AccordionContent>多开模式下可以——这就是它和单开的区别。</AccordionContent></AccordionItem></Accordion> },
              ]}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>什么是组件？</AccordionTrigger>
                    <AccordionContent>页面上可复用的最小功能件。一个按钮、一个弹窗，都是组件。</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger>为什么词表这么重要？</AccordionTrigger>
                    <AccordionContent>一个词压缩一段话，且全行业语义一致——人和 AI 都听得懂。</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Entry>

              <Entry num={9} en="Skeleton" cn="骨架屏" def="数据还没到时，先用灰色闪光占位。骨架可以拼成任何版式的形状——看右上角。" note="加载体验三兄弟：Skeleton（占位）→ Toast（通知）→ Popover（交互）" variants={[
                { name: "卡片骨架", demo: <div className="w-full space-y-2"><Skeleton className="h-24 w-full" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/2" /></div> },
                { name: "表格骨架", demo: <div className="w-full space-y-2">{[0, 1, 2].map(i => <div key={i} className="flex gap-2">{[0, 1, 2].map(j => <Skeleton key={j} className="h-6 flex-1" />)}</div>)}</div> },
                { name: "列表骨架", demo: <div className="w-full space-y-3">{[0, 1, 2].map(i => <div key={i} className="flex items-center gap-3"><Skeleton className="size-8 rounded-full" /><Skeleton className="h-4 flex-1" /></div>)}</div> },
              ]}>
                <div className="flex items-center gap-4 w-full">
                  <Skeleton className="size-14 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </Entry>

              <Entry num={10} en="Backdrop / Overlay" cn="背景膜" def="让背景变暗或变模糊的那层膜，把注意力逼到弹层上。变暗和模糊是两种做法——看右上角。" note="内置于 Dialog/Sheet，不用单独调用" variants={[
                { name: "模糊膜（backdrop-blur）", demo: <div className="relative h-28 w-full overflow-hidden rounded-lg border">
                  <div className="absolute inset-0 flex items-center justify-around px-4 text-2xl">🟣 🟡 🔵</div>
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background px-3 py-1.5 text-xs shadow">后面的图形被糊掉了</span>
                </div> },
              ]}>
                <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted/30">
                  <span className="absolute inset-0 bg-black/50 transition-opacity duration-700" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background px-4 py-2 text-xs shadow">我在膜上面</span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400">↑ 背景被压暗 = Backdrop</span>
                </div>
              </Entry>

              <Entry num={11} en="Disabled · Active · Focus" cn="三态" def="Disabled 不可点（灰）· Active 正在被按下 · Focus 被选中（描边圈）。按钮和输入框的三态各有细节——看右上角。" note="真组件自带三态" variants={[
                { name: "输入框三态", demo: <div className="w-full space-y-2"><Input disabled placeholder="Disabled 禁用" /><Input placeholder="点我 = Focus 描边圈" /></div> },
              ]}>
                <Button disabled>Disabled 禁用</Button>
                <Button>普通（点住不松 = Active）</Button>
                <Input placeholder="点我 = Focus 描边圈" className="w-full max-w-56" />
              </Entry>

              <Entry num={12} en="Tabs" cn="标签页" def="同一个位置，切换不同内容——头顶这个大 Tab 就是它。样式还有下划线式、带图标式——看右上角。" note="话术：这里用 Tabs 切换预览和代码" variants={[
                { name: "下划线式", demo: <Tabs defaultValue="t1" className="w-full"><TabsList className="h-10 w-full justify-start gap-4 rounded-none border-b bg-transparent"><TabsTrigger value="t1" className="rounded-none bg-transparent px-2 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent">预览</TabsTrigger><TabsTrigger value="t2" className="rounded-none bg-transparent px-2 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent">代码</TabsTrigger></TabsList><TabsContent value="t1" className="mt-3 text-xs text-muted-foreground">下划线式的 Tabs。</TabsContent><TabsContent value="t2" className="mt-3 text-xs text-muted-foreground">也是切内容，只是长得不同。</TabsContent></Tabs> },
                { name: "带图标式", demo: <Tabs defaultValue="t1" className="w-full"><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="t1">👁 预览</TabsTrigger><TabsTrigger value="t2">⌨ 代码</TabsTrigger></TabsList><TabsContent value="t1" className="mt-3 text-xs text-muted-foreground">带图标的 Tabs。</TabsContent><TabsContent value="t2" className="mt-3 text-xs text-muted-foreground">图标帮助快速定位。</TabsContent></Tabs> },
              ]}>
                <Tabs defaultValue="t1" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="t1">预览</TabsTrigger>
                    <TabsTrigger value="t2">代码</TabsTrigger>
                  </TabsList>
                  <TabsContent value="t1" className="mt-3 text-sm text-muted-foreground">这里是预览内容。</TabsContent>
                  <TabsContent value="t2" className="mt-3 text-sm text-muted-foreground"><code className="font-mono">&lt;Button /&gt;</code></TabsContent>
                </Tabs>
              </Entry>

              <Entry num={13} en="Switch" cn="开关" def="一个设置项的「开 / 关」。设置页面的标配。" note="话术：加一个 Switch 开关，默认关闭" variants={[
                { name: "默认关闭", demo: <div className="flex items-center gap-3"><Switch id="sw-off" /><span className="text-sm text-muted-foreground">深色模式</span></div> },
                { name: "禁用状态", demo: <div className="flex items-center gap-3"><Switch disabled defaultChecked /><span className="text-sm text-muted-foreground">不可改（管理员锁定）</span></div> },
              ]}>
                <div className="flex items-center gap-3">
                  <Switch id="sw" defaultChecked />
                  <span className="text-sm text-muted-foreground">自动保存</span>
                </div>
              </Entry>

              <Entry num={14} en="Checkbox" cn="勾选框" def="可多选的小方框。还有第三态「半选」（部分子项勾了）——看右上角。" note="半选 = 父项里只勾了一部分子项" variants={[
                { name: "已勾选", demo: <div className="flex items-center gap-2.5"><Checkbox id="ck2" defaultChecked /><span className="text-sm text-muted-foreground">已同意</span></div> },
                { name: "半选（indeterminate）", demo: <div className="flex items-center gap-2.5"><Checkbox id="ck3" checked="indeterminate" /><span className="text-sm text-muted-foreground">3 个子项勾了 1 个</span></div> },
              ]}>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="ck" />
                  <span className="text-sm text-muted-foreground">我已阅读并同意用户协议</span>
                </div>
              </Entry>

              <Entry num={15} en="Badge" cn="小徽标" def="状态小标签。四种情绪色就是它的全部变体——看右上角。" note="话术：标题旁边加一个 badge，写「新」" variants={[
                { name: "默认", demo: <Badge>默认</Badge> },
                { name: "次要", demo: <Badge variant="secondary">次要</Badge> },
                { name: "危险", demo: <Badge variant="destructive">错误</Badge> },
                { name: "描边", demo: <Badge variant="outline">描边</Badge> },
              ]}>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge>默认</Badge>
                  <Badge variant="secondary">次要</Badge>
                  <Badge variant="destructive">错误</Badge>
                  <Badge variant="outline">描边</Badge>
                </div>
              </Entry>

              <Entry num={16} en="Avatar" cn="头像" def="圆形用户头像，加载失败自动显示首字母。方形、状态点也是它的变体——看右上角。" note="评论区、成员列表的标配" variants={[
                { name: "方形头像", demo: <div className="flex -space-x-2.5"><Avatar className="ring-2 ring-background rounded-lg"><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar><Avatar className="ring-2 ring-background rounded-lg"><AvatarFallback className="bg-zinc-200 rounded-lg">余</AvatarFallback></Avatar></div> },
                { name: "带在线状态点", demo: <div className="flex items-center gap-4"><span className="relative"><Avatar><AvatarFallback className="bg-zinc-700 text-white">AI</AvatarFallback></Avatar><span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-background" /></span><span className="text-xs text-muted-foreground">在线</span></div> },
                { name: "纯首字母（无图）", demo: <div className="flex -space-x-2.5"><Avatar className="ring-2 ring-background"><AvatarFallback className="bg-indigo-200 text-indigo-800">余</AvatarFallback></Avatar><Avatar className="ring-2 ring-background"><AvatarFallback className="bg-amber-200 text-amber-800">鲤</AvatarFallback></Avatar></div> },
              ]}>
                <div className="flex -space-x-2.5">
                  <Avatar className="ring-2 ring-background"><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar>
                  <Avatar className="ring-2 ring-background"><AvatarFallback className="bg-zinc-200">余</AvatarFallback></Avatar>
                  <Avatar className="ring-2 ring-background"><AvatarFallback className="bg-zinc-700 text-white">AI</AvatarFallback></Avatar>
                </div>
              </Entry>

              <Entry num={17} en="Progress" cn="进度条" def="告诉用户「事情在推进，别关页面」。颜色可以换情绪——看右上角。" note="话术：加一个进度条，显示上传进度" variants={[
                { name: "信息蓝", demo: <Progress value={66} className="[&_[data-slot=progress-indicator]]:bg-indigo-500" /> },
                { name: "危险红", demo: <Progress value={90} className="[&_[data-slot=progress-indicator]]:bg-red-500" /> },
              ]}>
                <div className="w-full max-w-xs space-y-2">
                  <Progress value={66} />
                  <p className="text-xs text-muted-foreground text-center">上传中 · 66%</p>
                </div>
              </Entry>

              <Entry num={18} en="Slider" cn="滑杆" def="拖动选一个数值。单选一个值是基本款；范围双滑块、竖直滑杆是它的变体——看右上角。" note="真 Radix Slider，键盘方向键也能调" variants={[
                { name: "范围双滑块（价格区间）", demo: <Slider defaultValue={[40, 70]} max={100} step={1} className="w-full max-w-xs" /> },
                { name: "竖直滑杆（音量台）", demo: <div className="flex h-32 items-center gap-6"><Slider orientation="vertical" defaultValue={[40]} max={100} className="h-28" /><Slider orientation="vertical" defaultValue={[70]} max={100} className="h-28" /><Slider orientation="vertical" defaultValue={[55]} max={100} className="h-28" /></div> },
              ]}>
                <Slider defaultValue={[66]} max={100} step={1} className="w-56 max-w-full" />
              </Entry>

              <Entry num={19} en="Command Palette" cn="命令面板" def="按 ⌘K（Ctrl+K）呼出的搜索框。除了执行命令，还能当文件搜索器——看右上角。" note="点下面的按钮体验，或真的按 Ctrl+K / ⌘K" variants={[
                { name: "文件搜索模式", demo: <CommandDemo mode="files" /> },
              ]}>
                <CommandDemo mode="commands" />
              </Entry>

              <Entry num={20} en="Breadcrumb" cn="面包屑" def="页面顶部的路径条。当前级还能塞一个下拉菜单，收起更多同级页面——看右上角。" note="上一级可以点着跳回去" variants={[
                { name: "当前页带下拉菜单", demo: <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">首页</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><DropdownMenu><DropdownMenuTrigger asChild><button className="cursor-pointer flex size-5 items-center justify-center rounded text-muted-foreground hover:bg-accent">…</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>组件库</DropdownMenuItem><DropdownMenuItem>设计规范</DropdownMenuItem></DropdownMenuContent></DropdownMenu></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>按钮</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb> },
              ]}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="#">首页</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="#">组件</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>按钮</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </Entry>

              <Entry num={21} en="Empty State" cn="空状态" def="列表什么都没有时，别留白屏。极简式、大插画式、行内式是三种常见版式——看右上角。" note="话术：空状态给个插画和「新建」按钮" variants={[
                { name: "大插画式", demo: <div className="flex flex-col items-center gap-2 py-3 text-center"><span className="text-5xl">🗃️</span><p className="text-sm font-medium">还没有项目</p><p className="text-xs text-muted-foreground">创建第一个项目开始工作</p><Button size="sm">立即创建</Button></div> },
                { name: "行内紧凑式", demo: <div className="flex w-full items-center justify-between rounded-lg border px-4 py-2.5"><span className="text-sm text-muted-foreground">📭 没有搜索结果</span><Button size="sm" variant="outline">清除筛选</Button></div> },
              ]}>
                <div className="flex flex-col items-center gap-2 py-2 text-center">
                  <span className="text-3xl">📭</span>
                  <p className="text-sm text-muted-foreground">还没有任何项目</p>
                  <Button size="sm" variant="outline">新建第一个</Button>
                </div>
              </Entry>

            </div>
          </TabsContent>

          {/* ==================== ② 布局词 7 ==================== */}
          <TabsContent value="c2" className="mt-8">
            <p className="text-sm text-muted-foreground mb-7">回答「<b>怎么排</b>」——组件排队的方式。层级：Layout 总纲 → Grid/Flex/Stack 手法 → Container/Section 盒子 → Block 内容块。</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <Entry num={1} en="Layout" cn="版式总纲" def="整页的骨架。侧边栏式、上下式、三栏式是三大骨架——看右上角。" note="说「侧边栏布局」「上下布局」，AI 就知道骨架了" variants={[
                { name: "上下式（Hero+内容+Footer）", demo: <div className="w-full space-y-2"><Box label="Hero" dashed /><Box label="内容" dashed /><Box label="Footer" dashed /></div> },
                { name: "三栏式", demo: <div className="w-full flex gap-2"><Box label="左" dashed /><Box label="中" dashed /><Box label="右" dashed /></div> },
              ]}>
                <div className="w-full rounded-xl border-2 border-zinc-400 p-4 relative">
                  <span className="absolute -top-2.5 left-3 bg-zinc-600 text-white text-[10px] px-2 rounded-full">Layout</span>
                  <div className="flex gap-3 mt-1">
                    <div className="w-20 min-h-20"><Box label="侧边栏" /></div>
                    <div className="flex-1 min-h-20"><Box label="主区" dashed /></div>
                  </div>
                </div>
              </Entry>

              <Entry num={2} en="Grid" cn="网格" def="行列矩阵排布。除了均匀分，还能让某张卡占两格（col-span）——看右上角。" note="话术：卡片用 grid，一行 3 个，间距 16px" variants={[
                { name: "混合跨度（大卡占两格）", demo: <div className="grid grid-cols-3 gap-2 w-full">{[0, 1, 2, 3].map(i => <div key={i} className={`rounded-md border bg-muted/40 py-3 text-center text-xs text-muted-foreground ${i === 0 ? "col-span-2" : ""}`}>{i === 0 ? "大卡" : "卡"}</div>)}</div> },
                { name: "双列大卡", demo: <div className="grid grid-cols-2 gap-2 w-full">{[0, 1].map(i => <div key={i} className="rounded-md border bg-muted/40 py-5 text-center text-xs text-muted-foreground">大卡</div>)}</div> },
              ]}>
                <GridDemo />
              </Entry>

              <Entry num={3} en="Flex" cn="单向排列" def="横排或竖排。对齐和分布是它的两个旋钮：等分、两端对齐、居中——看右上角。" note="话术：三个按钮 flex 横排，间距 12px" variants={[
                { name: "两端对齐（space-between）", demo: <div className="flex w-full items-center justify-between rounded-md border px-3 py-2"><span className="text-xs text-muted-foreground">Logo</span><span className="text-xs text-muted-foreground">菜单</span></div> },
                { name: "居中对齐", demo: <div className="flex w-full items-center justify-center gap-3 rounded-md border px-3 py-2">{["甲", "乙", "丙"].map(x => <span key={x} className="text-xs text-muted-foreground">{x}</span>)}</div> },
              ]}>
                <div className="w-full">
                  <Button size="sm" variant="outline" className="mb-3" onClick={() => setFlexDir(flexDir === "row" ? "col" : "row")}>
                    切换到{flexDir === "row" ? "竖排" : "横排"}
                  </Button>
                  <div className={`flex gap-3 ${flexDir === "col" ? "flex-col" : ""}`}>
                    {["甲", "乙", "丙"].map(x => (
                      <div key={x} className="flex-1 rounded-md border bg-muted/40 px-6 py-3 text-center text-xs text-muted-foreground">{x}</div>
                    ))}
                  </div>
                </div>
              </Entry>

              <Entry num={4} en="Stack" cn="竖向堆叠" def="Flex 的竖排特例，从上往下。间距是它的主要旋钮——紧凑、宽松、分隔线，看右上角。" note="「表单 stack 排列，间距 8px」——这句话 AI 天天听" variants={[
                { name: "宽松（gap-6）", demo: <div className="flex flex-col gap-6 w-full max-w-xs"><Box label="甲" dashed /><Box label="乙" dashed /></div> },
                { name: "带分隔线（divide-y）", demo: <div className="w-full max-w-xs divide-y rounded-md border bg-card overflow-hidden"><div className="px-3 py-2 text-xs text-muted-foreground">第一项</div><div className="px-3 py-2 text-xs text-muted-foreground">第二项</div></div> },
              ]}>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <Box label="姓名输入框" dashed /><Box label="邮箱输入框" dashed /><Box label="提交按钮" dashed />
                </div>
              </Entry>

              <Entry num={5} en="Container" cn="限宽容器" def="把内容锁在一个最大宽度里居中。锁多宽由内容决定——窄、中、宽三档，看右上角。" note="本站页面整体就装在一个 Container 里" variants={[
                { name: "窄（max-w-sm）", demo: <div className="w-full"><div className="mx-auto max-w-[60%] h-10 rounded-lg border-2 border-dashed border-zinc-400 bg-muted/30 flex items-center justify-center text-[10px] text-muted-foreground">窄</div></div> },
                { name: "宽（max-w-xl）", demo: <div className="w-full"><div className="mx-auto max-w-full h-10 rounded-lg border-2 border-dashed border-zinc-400 bg-muted/30 flex items-center justify-center text-[10px] text-muted-foreground">宽（几乎撑满）</div></div> },
              ]}>
                <div className="w-full">
                  <div className="mx-auto max-w-xs h-14 rounded-lg border-2 border-dashed border-zinc-400 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">我是 Container，锁宽居中</div>
                </div>
              </Entry>

              <Entry num={6} en="Section" cn="大段区块" def="页面的一大段。Hero 式、功能三卡式、CTA 式是三种最常用的 Section——看右上角。" note="话术：Hero section / Footer section" variants={[
                { name: "Hero 式", demo: <div className="w-full rounded-lg border p-3 text-center space-y-1.5"><p className="text-xs font-semibold">大标题一句话</p><p className="text-[10px] text-muted-foreground">副标题补充</p><Button size="sm">主按钮</Button></div> },
                { name: "CTA 式", demo: <div className="w-full flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"><span className="text-[11px] text-muted-foreground">准备好了吗？</span><Button size="sm">开始</Button></div> },
              ]}>
                <div className="flex flex-col gap-3 w-full">
                  {["Hero Section", "功能 Section", "Footer Section"].map(s => <Box key={s} label={s} dashed />)}
                </div>
              </Entry>

              <Entry num={7} en="Block" cn="内容块" def="Notion / 建站工具里说的「块」——一段现成的内容积木。文字、清单、引用、代码都是块——看右上角。" note="同一个词两个世界：编辑器语境=内容模板，CSS 语境=占位方式" variants={[
                { name: "清单块", demo: <div className="w-full rounded-lg border bg-card px-3 py-2 text-sm">☑️ 买咖啡豆<br />☑️ 修自行车</div> },
                { name: "引用块", demo: <div className="w-full border-l-4 border-zinc-400 pl-3 py-1 text-sm italic text-muted-foreground">「简单，比复杂更难。」</div> },
                { name: "代码块", demo: <div className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-100">npm install shadcn</div> },
              ]}>
                <div className="w-full max-w-sm rounded-lg border bg-card divide-y overflow-hidden">
                  <div className="px-4 py-2.5 text-sm">📝 一段文字块</div>
                  <div className="px-4 py-2.5 text-sm">☑️ 一个待办块</div>
                  <div className="px-4 py-2.5 text-sm">🖼️ 一张图片块</div>
                </div>
              </Entry>

            </div>
          </TabsContent>

          {/* ==================== ③ 动效词 13 ==================== */}
          <TabsContent value="c3" className="mt-8">
            <p className="text-sm text-muted-foreground mb-7">回答「<b>怎么变</b>」——元素状态转换的方式。动效挂在组件状态上（hover 时发光 = 组件 Hover + 动效 Glow）。页面待机，悬停/点击才演。</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <Entry num={1} en="Glow" cn="发光" def={<>鼠标放上去，元素外围泛出<b>光晕</b>。柔光、强光、彩色、内发光是四种档位——看右上角。</>} note="话术：这个按钮 hover 时发光" variants={[
                { name: "强光", demo: <Button variant="outline" className="transition-all duration-300 hover:shadow-[0_0_36px_10px_rgba(99,102,241,0.55)] hover:border-indigo-400">强光版</Button> },
                { name: "彩色（粉）", demo: <Button variant="outline" className="transition-all duration-300 hover:shadow-[0_0_28px_6px_rgba(244,114,182,0.45)] hover:border-pink-400 hover:text-pink-500">彩色版</Button> },
                { name: "内发光", demo: <Button variant="outline" className="transition-all duration-300 hover:shadow-[inset_0_0_18px_rgba(99,102,241,0.5)] hover:border-indigo-400">内发光版</Button> },
              ]}>
                <Button variant="outline" className="transition-all duration-300 hover:shadow-[0_0_28px_6px_rgba(99,102,241,0.4)] hover:border-indigo-400 hover:text-indigo-500">把鼠标放上来 = 发光</Button>
              </Entry>

              <Entry num={2} en="Fade" cn="淡入淡出" def="透明度渐变——最常见的过渡。方向没有，速度有：慢速 1000ms 和快速 300ms 手感完全不同——看右上角。" note="话术：弹窗打开时背景 fade 变暗" variants={[
                { name: "慢速（1 秒）", demo: <FadeDemo duration={1000} label="慢速淡入淡出" /> },
                { name: "快速（0.3 秒）", demo: <FadeDemo duration={300} label="快速淡入淡出" /> },
              ]}>
                <FadeDemo duration={700} label="我会淡入淡出" />
              </Entry>

              <Entry num={3} en="Slide" cn="滑入滑出" def="从边上滑进画面。四个边都能进——看右上角。" note="话术：通知从右侧 slide 进来" variants={[
                { name: "从左侧滑入", demo: <SlideDemo axis="x" start="-100%" /> },
                { name: "从顶部滑入", demo: <SlideDemo axis="y" start="-300%" /> },
                { name: "从底部滑入", demo: <SlideDemo axis="y" start="300%" /> },
              ]}>
                <SlideDemo axis="x" start="100%" />
              </Entry>

              <Entry num={4} en="Scale / Zoom" cn="缩放" def="放大缩小。缩到 90% = 「缩小退后」，弹性曲线 = 「活力感」，慢速 = 「郑重感」——看右上角。" note="话术：hover 时 scale 到 110%" variants={[
                { name: "缩小到 90%", demo: <div className="rounded-lg border bg-muted/40 px-8 py-4 text-sm text-muted-foreground transition-transform duration-300 hover:scale-90 cursor-pointer">悬停我，缩小</div> },
                { name: "弹性缩放（spring）", demo: <div className="rounded-lg border bg-muted/40 px-8 py-4 text-sm text-muted-foreground transition-transform duration-500 hover:scale-110 cursor-pointer" style={{ transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}>悬停我，弹性放大</div> },
                { name: "慢速（郑重感）", demo: <div className="rounded-lg border bg-muted/40 px-8 py-4 text-sm text-muted-foreground transition-transform duration-1000 hover:scale-110 cursor-pointer">悬停我，慢慢放大</div> },
              ]}>
                <div className="rounded-lg border bg-muted/40 px-8 py-4 text-sm text-muted-foreground transition-transform duration-300 hover:scale-110 cursor-pointer">悬停我，放大 110%</div>
              </Entry>

              <Entry num={5} en="Pulse" cn="呼吸 / 脉冲" def="反复扩张，提示「这里有新东西 / 这里是活的」。扩散圈、心跳、透明度呼吸是三种做法——看右上角。" note="话术：红点加 pulse 动画提示有新消息" variants={[
                { name: "双层心跳", demo: <span className="relative flex size-5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" style={{ animationDuration: "1.6s" }} /><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" style={{ animationDuration: "1.6s", animationDelay: ".3s" }} /><span className="relative inline-flex size-5 rounded-full bg-red-500" /></span> },
                { name: "透明度呼吸", demo: <div className="size-8 rounded-lg bg-zinc-700 animate-pulse" /> },
              ]}>
                <div className="relative flex size-5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75" />
                  <span className="relative inline-flex size-5 rounded-full bg-zinc-600" />
                </div>
              </Entry>

              <Entry num={6} en="Bounce" cn="弹跳" def="上下弹动，引导视线。球下面加一块影子同步缩放，弹跳感立刻真实——看右上角。" note="话术：图标加 bounce 动画吸引点击" variants={[
                { name: "弹跳 + 影子同步", demo: <div className="flex flex-col items-center gap-1"><div className="size-7 rounded-full bg-zinc-700 animate-bounce" /><div className="h-1.5 w-10 rounded-full bg-zinc-300 animate-bounce" style={{ animationDuration: "1s" }} /></div> },
              ]}>
                <div className="size-8 rounded-full bg-zinc-700 animate-bounce" />
              </Entry>

              <Entry num={7} en="Shake" cn="抖动" def="左右快速晃动 = 「不对，重来」。幅度大一点、带点旋转，情绪更强——看右上角。" note="话术：验证失败时输入框 shake 一下" variants={[
                { name: "强烈版（带旋转）", demo: <ShakeDemo hard /> },
              ]}>
                <ShakeDemo />
              </Entry>

              <Entry num={8} en="Spin" cn="旋转" def="转圈加载中。速度是它的情绪旋钮：慢 = 系统在忙，快 = 紧张处理——看右上角。" note="话术：提交按钮里加个 spin 转圈" variants={[
                { name: "慢速（1.5 秒/圈）", demo: <div className="size-8 rounded-full border-[3px] border-zinc-300 border-t-zinc-800 animate-spin" style={{ animationDuration: "1.5s" }} /> },
                { name: "快速（0.6 秒/圈）", demo: <div className="size-8 rounded-full border-[3px] border-zinc-300 border-t-zinc-800 animate-spin" style={{ animationDuration: ".6s" }} /> },
              ]}>
                <div className="size-8 rounded-full border-[3px] border-zinc-300 border-t-zinc-800 animate-spin" />
              </Entry>

              <Entry num={9} en="Ripple" cn="波纹" def="从点击位置扩散开的水波。颜色跟着品牌走——看右上角。" note="点下面按钮——波纹从你点击的位置长出来" variants={[
                { name: "品牌彩色波纹", demo: <RippleDemo color="rgba(99,102,241,.35)" label="点我，靛蓝波纹" /> },
              ]}>
                <RippleDemo />
              </Entry>

              <Entry num={10} en="Marquee" cn="跑马灯" def="内容横向循环滚动。方向可反转、鼠标悬停可暂停——看右上角。" note="话术：公告栏用 marquee 循环滚动" variants={[
                { name: "向右滚（reverse）", demo: <div className="w-full overflow-hidden rounded-lg border bg-muted/30 py-2.5"><div className="dic-marquee flex whitespace-nowrap text-sm text-muted-foreground [animation-direction:reverse]"><span className="px-6">向右滚动 ·</span><span className="px-6">方向反过来了 ·</span><span className="px-6">向右滚动 ·</span><span className="px-6">方向反过来了 ·</span></div></div> },
                { name: "悬停暂停", demo: <div className="w-full overflow-hidden rounded-lg border bg-muted/30 py-2.5"><div className="dic-marquee flex whitespace-nowrap text-sm text-muted-foreground hover:[animation-play-state:paused]"><span className="px-6">把鼠标放上来我就停 ·</span><span className="px-6">悬停暂停是公告栏标配 ·</span><span className="px-6">把鼠标放上来我就停 ·</span><span className="px-6">悬停暂停是公告栏标配 ·</span></div></div> },
              ]}>
                <div className="w-full overflow-hidden rounded-lg border bg-muted/30 py-2.5">
                  <div className="dic-marquee flex whitespace-nowrap text-sm text-muted-foreground">
                    <span className="px-6">🎉 UI 词典上线 ·</span><span className="px-6">📖 46 个词条 ·</span><span className="px-6">🆓 MIT 开源 ·</span>
                    <span className="px-6">🎉 UI 词典上线 ·</span><span className="px-6">📖 46 个词条 ·</span><span className="px-6">🆓 MIT 开源 ·</span>
                  </div>
                </div>
              </Entry>

              <Entry num={11} en="Typewriter" cn="打字机" def="文字一个字一个字冒出来，AI 聊天回复的标配——你每天都在看它。" note="话术：AI 回复用 typewriter 逐字输出" variants={[
                { name: "循环打字版（例外循环）", demo: <TypewriterLoop /> },
              ]}>
                <TypewriterCaret />
              </Entry>

              <Entry num={12} en="Transition / Easing" cn="过渡 / 缓动" def="所有动效背后的原理词：Transition = 变化的过程，Easing = 过程的节奏。除了位移，缩放同样吃缓动——看右上角。" note="点「跑一次」——三个球同时出发，节奏各异" variants={[
                { name: "缩放缓动对比", demo: <div className="flex justify-center gap-4 w-full"><div className="size-12 rounded-lg bg-zinc-700 transition-transform duration-500 hover:scale-125 cursor-pointer" style={{ transitionTimingFunction: "linear" }} /><div className="size-12 rounded-lg bg-zinc-700 transition-transform duration-500 hover:scale-125 cursor-pointer" style={{ transitionTimingFunction: "ease-in-out" }} /><div className="size-12 rounded-lg bg-zinc-700 transition-transform duration-500 hover:scale-125 cursor-pointer" style={{ transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }} /></div> },
              ]}>
                <EasingDemo />
              </Entry>

              <Entry num={13} en="Link Highlights" cn="链接高亮" def="导航链接的悬停高亮家族——shadcn.io 同名类目。一个词，9 种效果，右上角「更多」看全部。" note="9 种变体全是纯 CSS，hover 才演" variants={linkHighlightVariants}>
                {linkHighlightVariants[0].demo}
              </Entry>

            </div>
          </TabsContent>

          {/* ==================== ④ 响应式词 5 ==================== */}
          <TabsContent value="c4" className="mt-8">
            <p className="text-sm text-muted-foreground mb-7">回答「<b>宽度变了怎么办</b>」——同一棵嵌套树，在不同屏宽下换折法。本站自己就是实物：大 Tab + 三列，手机上自动收成一竖列。</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <Entry num={1} en="Responsive + Breakpoint" cn="响应式 + 断点" def="拖动滑杆模拟屏幕变窄——过了断点（700px）卡片自动从 3 列变 1 列。常用断点对照表看右上角。" note="桌面版和手机版不是两个页面，是同一棵树换了折法" variants={[
                { name: "常用断点对照表", demo: <div className="w-full rounded-lg border divide-y text-xs font-mono"><div className="flex justify-between px-3 py-2"><span className="text-muted-foreground">sm</span><span>≥ 640px</span></div><div className="flex justify-between px-3 py-2"><span className="text-muted-foreground">md</span><span>≥ 768px</span></div><div className="flex justify-between px-3 py-2"><span className="text-muted-foreground">lg</span><span>≥ 1024px</span></div><div className="flex justify-between px-3 py-2"><span className="text-muted-foreground">xl</span><span>≥ 1280px</span></div></div> },
              ]}>
                <div className="w-full">
                  <div className="rounded-lg border bg-background p-3 overflow-hidden">
                    <div className="mx-auto transition-all duration-200" style={{ width: `${width}px`, maxWidth: "100%" }}>
                      <div className="grid gap-3" style={{ gridTemplateColumns: respCols }}>
                        {["卡片", "卡片", "卡片"].map((c, i) => (
                          <div key={i} className="rounded-md border bg-muted/40 py-4 text-center text-xs text-muted-foreground">{c}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <input type="range" min={320} max={1000} value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full mt-4 accent-zinc-900" />
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-1"><span>320</span><span>700 ← 断点</span><span>1000px</span></div>
                  <p className="mt-2 font-mono text-[11px] text-destructive min-h-4">{respFlag}</p>
                </div>
              </Entry>

              <Entry num={2} en="Mobile-first" cn="手机优先" def="先做手机版（最窄、最简单），再往大屏加列。反面教材是「桌面优先」——用 max-width 一路往小改，越改越乱。写法对比看右上角。" note="Tailwind/shadcn 的断点写法天生就是 mobile-first" variants={[
                { name: "写法对比（min-width vs max-width）", demo: <div className="w-full space-y-2 font-mono text-[11px]"><div className="rounded-md bg-emerald-50 border border-emerald-300 px-3 py-2">✅ 手机优先：默认手机样式<br />+ min-width: 768px 加桌面样式</div><div className="rounded-md bg-red-50 border border-red-300 px-3 py-2">❌ 桌面优先：默认桌面样式<br />+ max-width: 768px 一路往小改</div></div> },
              ]}>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="w-36 rounded-xl border bg-card p-4 text-center text-xs text-muted-foreground">📱 手机版<br />1 列，一切竖排</div>
                  <span className="text-muted-foreground text-sm">→ 加宽 →</span>
                  <div className="w-52 rounded-xl border bg-card p-4 text-center text-xs text-muted-foreground">🖥️ 桌面版<br />三列并排</div>
                </div>
              </Entry>

              <Entry num={3} en="Fluid / Fixed" cn="流动 / 固定" def="Fluid 按百分比跟着屏幕撑，Fixed 写死像素。全部 Fluid 和全部 Fixed 各是什么样——看右上角。" note="本站的外层 max-w + 内层 px-6 就是这个结构" variants={[
                { name: "全部 Fluid", demo: <div className="flex gap-2 w-full"><div className="flex-1 h-10 rounded-md border bg-muted/40 flex items-center justify-center text-[10px] text-muted-foreground">33%</div><div className="flex-1 h-10 rounded-md border bg-muted/40 flex items-center justify-center text-[10px] text-muted-foreground">33%</div><div className="flex-1 h-10 rounded-md border bg-muted/40 flex items-center justify-center text-[10px] text-muted-foreground">33%</div></div> },
                { name: "全部 Fixed", demo: <div className="flex gap-2 w-full overflow-hidden"><div className="w-40 h-10 rounded-md border bg-muted/40 flex items-center justify-center text-[10px] text-muted-foreground shrink-0">160px</div><div className="w-40 h-10 rounded-md border bg-muted/40 flex items-center justify-center text-[10px] text-muted-foreground shrink-0">160px</div></div> },
              ]}>
                <div className="flex gap-3 w-full">
                  <div className="flex-1 h-12 rounded-lg border-2 border-dashed border-zinc-400 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">Fluid：随窗口伸缩</div>
                  <div className="w-28 h-12 rounded-lg border-2 border-dashed border-zinc-400 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">Fixed: 112px</div>
                </div>
              </Entry>

              <Entry num={4} en="Sticky" cn="钉住" def="滚动时钉在原地不走的元素。钉头部是基本款，钉侧栏才是它的高频用法——看右上角。" note="导航条、表格表头常用" variants={[
                { name: "侧栏钉住（滚动时右边卡片不走）", demo: <div className="flex gap-3 h-44 w-full"><div className="flex-1 overflow-y-auto rounded-lg border bg-background">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="px-3 py-3 border-b text-xs text-muted-foreground">长内容行 {i + 1}</div>)}</div><div className="w-24 shrink-0"><div className="sticky top-6 rounded-lg border bg-muted/40 px-2 py-3 text-center text-[10px] text-muted-foreground">侧栏卡片<br />钉住不走</div></div></div> },
              ]}>
                <div className="w-full h-40 overflow-y-auto rounded-lg border bg-background">
                  <div className="sticky top-0 bg-primary text-primary-foreground px-4 py-2.5 text-sm">我是 Sticky 头部，往下滚试试</div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="px-4 py-3 border-b text-sm text-muted-foreground">内容行 {i + 1}</div>
                  ))}
                </div>
              </Entry>

            </div>
          </TabsContent>

        </main>
      </Tabs>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground space-y-2">
        <p>UI 词典 v{APP_VERSION} · 46 词 = 21 组件 + 7 布局 + 13 动效 + 5 响应式 · 真 shadcn/ui + Radix 构建 · MIT</p>
        <p className="text-xs">
          仓库 ID：<a className="text-violet-600 underline" href={REPO_URL} target="_blank" rel="noreferrer">{REPO_ID}</a>
          {" · "}仓库地址：<a className="text-violet-600 underline" href={REPO_URL} target="_blank" rel="noreferrer">github.com/Samuelonly/ui-dictionary</a>
          {" · "}在线版：<a className="text-violet-600 underline" href={ONLINE_URL}>samuelonly.github.io/ui-dictionary</a>
        </p>
        <CheckUpdate />
      </footer>
    </div>
  )
}

/* ================= 小组件定义 ================= */

function GridDemo() {
  const [cols, setCols] = useState(3)
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3 justify-center">
        {[1, 2, 3].map(n => (
          <Button key={n} size="sm" variant={cols === n ? "secondary" : "outline"} onClick={() => setCols(n)}>{n} 列</Button>
        ))}
      </div>
      <div className="grid gap-3 transition-all" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md border bg-muted/40 py-3 text-center text-xs text-muted-foreground">卡片</div>
        ))}
      </div>
    </div>
  )
}

function FadeDemo({ duration, label }: { duration: number; label: string }) {
  const [on, setOn] = useState(true)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`rounded-lg border bg-muted/40 px-8 py-4 text-sm text-muted-foreground transition-opacity ${on ? "opacity-100" : "opacity-0"}`} style={{ transitionDuration: `${duration}ms` }}>{label}</div>
      <Button size="sm" variant="outline" onClick={() => setOn(v => !v)}>切换（{duration}ms）</Button>
    </div>
  )
}

function SlideDemo({ axis, start }: { axis: "x" | "y"; start: string }) {
  const [on, setOn] = useState(false)
  const pos = on ? { left: "12px", top: "12px" } : axis === "x"
    ? { left: start === "100%" ? "calc(100% - 3.5rem)" : "-3.5rem", top: "12px" }
    : { left: "12px", top: start === "300%" ? "calc(100% - 3.5rem)" : "-3.5rem" }
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-lg border bg-muted/30 h-16 relative">
        <div className="absolute size-10 rounded-lg bg-zinc-700 transition-all duration-500" style={{ ...pos, transitionProperty: "left, top" }} />
      </div>
      <Button size="sm" variant="outline" className="mt-3 mx-auto block" onClick={() => setOn(v => !v)}>切换 Slide</Button>
    </div>
  )
}
