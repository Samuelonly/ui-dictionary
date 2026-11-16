import { useState } from "react"
import { APPSHELLS } from "./appshell/registry"

/* Application Shell：8 个应用外壳场景。默认展示 1 个，点卡片右上角「更多 7 种」展开其余 7 个。放进「② 布局词」Tab，不跳页。 */
function ShellCard({ num, en, cn, def, Comp, more }: {
  num: number; en: string; cn: string; def: string; Comp: React.ComponentType; more?: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-5 min-w-0 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold flex items-center gap-2.5 min-w-0">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{num}</span>
          <span className="font-mono truncate">Shell {num}</span>
          <span className="text-muted-foreground font-normal truncate">{cn}</span>
        </h3>
        {more}
      </div>
      <p className="mt-2 mb-3 text-[13px] leading-relaxed text-muted-foreground">{def}</p>
      <div className="flex flex-col flex-1"><Comp /></div>
      <p className="mt-auto pt-2.5 font-mono text-[11px] text-muted-foreground truncate" title={en}>话术：{en}</p>
    </div>
  )
}

export function AppShellSection() {
  const [open, setOpen] = useState(false)
  const first = APPSHELLS[0]
  const rest = APPSHELLS.slice(1)

  return (
    <section className="mt-12 pt-8 border-t">
      <div className="mb-2">
        <h2 className="text-lg font-semibold tracking-tight">Application Shell · 应用外壳</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          一个 App 的固定骨架：<b>侧栏 + 顶栏 + 内容区</b>，换内脏就是后台、邮箱、播放器、编辑器。源码在 <code className="font-mono text-[12px] rounded bg-muted px-1.5 py-0.5">source/src/appshell/AppShell-编号.tsx</code>。
        </p>
      </div>
      <p className="text-sm text-muted-foreground mb-7">
        默认展示 1 号后台骨架；静态就是成品样子，鼠标点左上角按钮能收起侧栏。
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShellCard {...first} more={
          <button
            onClick={() => setOpen(v => !v)}
            className="shrink-0 rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
            aria-expanded={open}
          >
            {open ? "收起" : `更多 ${rest.length} 种`}
          </button>
        } />
      </div>

      {open && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
          {rest.map(c => <ShellCard key={c.num} {...c} />)}
        </div>
      )}
    </section>
  )
}
