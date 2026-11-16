import { COVERFLOWS } from "./coverflow/registry"

/* 23 张场景化 CoverFlow 卡：放进现有「③ 动效词」Tab 末尾，不新增分类、不跳页 */
export function CoverFlowSection() {
  return (
    <section className="mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">CoverFlow · 23 个场景封面流</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            每张卡就是一个编号。把编号告诉 AI，它会去仓库里读 <code className="font-mono text-[12px] rounded bg-muted px-1.5 py-0.5">source/src/coverflow/CoverFlow-编号.tsx</code>，拿到能直接复制的整份源码。
          </p>
        </div>
        <span className="rounded-full border px-3 py-1 text-[11px] text-muted-foreground shrink-0">编号沿用 shadcnblocks · 独立实现</span>
      </div>
      <p className="text-sm text-muted-foreground mb-7">
        静态就已经是成品样子；鼠标划过去才演。每份源码单文件自包含，只依赖 React，封面是本地画的假图、没有外链。
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {COVERFLOWS.map(({ num, en, cn, def, interaction, Comp }) => (
          <div key={num} className="rounded-xl border bg-card p-5 min-w-0 flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold flex items-center gap-2.5 min-w-0">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{num}</span>
                <span className="font-mono truncate">CoverFlow {num}</span>
                <span className="text-muted-foreground font-normal truncate">{cn}</span>
              </h3>
              <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                {interaction === "auto" ? "悬停演" : interaction === "drag" ? "可拖" : interaction === "scroll" ? "滚动" : "指针"}
              </span>
            </div>
            <p className="mt-2 mb-3 text-[13px] leading-relaxed text-muted-foreground">{def}</p>
            <div className="flex flex-col flex-1"><Comp /></div>
            <p className="mt-auto pt-2.5 font-mono text-[11px] text-muted-foreground truncate" title={en}>话术：{en}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
