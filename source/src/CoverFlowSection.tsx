import { useState } from "react"
import { COVERFLOWS } from "./coverflow/registry"

/* CoverFlow：本站自编号 1~23。默认展示 1 张，点「更多」展开全部。放进「③ 动效词」Tab 末尾，不新增分类、不跳页。 */
function CoverFlowCard({ num, en, cn, def, interaction, Comp }: {
  num: number; en: string; cn: string; def: string; interaction: string; Comp: React.ComponentType
}) {
  return (
    <div className="rounded-xl border bg-card p-5 min-w-0 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold flex items-center gap-2.5 min-w-0">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{num}</span>
          <span className="font-mono truncate">CoverFlow {num}</span>
          <span className="text-muted-foreground font-normal truncate">{cn}</span>
        </h3>
        <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
          {interaction === "drag" ? "可拖" : interaction === "scroll" ? "滚动" : interaction === "click" ? "点击" : "悬停"}
        </span>
      </div>
      <p className="mt-2 mb-3 text-[13px] leading-relaxed text-muted-foreground">{def}</p>
      <div className="flex flex-col flex-1"><Comp /></div>
      <p className="mt-auto pt-2.5 font-mono text-[11px] text-muted-foreground truncate" title={en}>话术：{en}</p>
    </div>
  )
}

export function CoverFlowSection() {
  const [open, setOpen] = useState(false)
  const first = COVERFLOWS[0]
  const rest = COVERFLOWS.slice(1)

  return (
    <section className="mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">CoverFlow · 封面流</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            <b>本站编号 1~23</b>。把编号告诉 AI，它会去仓库里读 <code className="font-mono text-[12px] rounded bg-muted px-1.5 py-0.5">source/src/coverflow/CoverFlow-编号.tsx</code>，拿到能直接复制的整份源码。
          </p>
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          className="shrink-0 rounded-full border px-3 py-1.5 text-[12px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-expanded={open}
        >
          {open ? "收起 ▲" : `更多 ${rest.length} 种 ▼`}
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-7">
        默认展示 1 号黑胶唱片流；静态就已经是成品样子，鼠标划过才演。每份源码单文件自包含，只依赖 React。
      </p>

      {/* 默认展示第一张 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CoverFlowCard {...first} />
      </div>

      {/* 展开其余 22 张 */}
      {open && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
          {rest.map(c => <CoverFlowCard key={c.num} {...c} />)}
        </div>
      )}
    </section>
  )
}
