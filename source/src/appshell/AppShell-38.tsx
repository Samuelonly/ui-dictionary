/**
 * Application Shell 38 · Pull Request Review Shell
 * 代码评审外壳
 * 场景：仓库顶栏 + 吸顶 PR 头 + 分支标签页 + 改动文件树 + diff 视图。代码评审。
 * 来源：shadcnblocks.com/block/application-shell38 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell38() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#f3f2f7", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", flexDirection: "column", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", background: "#fff" }}>
        <div style={{ height: 26, display: "flex", alignItems: "center", gap: 7, padding: "0 10px", borderBottom: "1px solid #eeeef1", background: "#fafafa" }}>
          <span style={{ fontSize: 9, color: "#6d5efc" }}>⑂</span><b style={{ fontSize: 8, color: "#3f3f46" }}>Samuelonly / ui-dictionary</b><span style={{ fontSize: 7, color: "#a1a1aa" }}>Public</span>
        </div>
        <div style={{ padding: "9px 11px", borderBottom: "1px solid #eeeef1", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><b style={{ fontSize: 10, color: "#27272a" }}>升级演示区为原型卡</b><span style={{ fontSize: 7, background: "#e7f7ee", color: "#1a7f4b", borderRadius: 99, padding: "2px 6px" }}>✓ 检查通过</span></div>
          <div style={{ fontSize: 7, color: "#71717a", marginTop: 3 }}><b>#128</b> 由 Lin 打开 · <span style={{ color: "#6d5efc" }}>feat/proto</span> → <span style={{ color: "#6d5efc" }}>main</span></div>
          <div style={{ display: "flex", gap: 10, marginTop: 7, fontSize: 7.5, color: "#a1a1aa" }}><b style={{ color: "#6d5efc" }}>Conversation</b><span>Commits 4</span><span>Files changed 12</span></div>
        </div>
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <div style={{ width: 96, flexShrink: 0, borderRight: "1px solid #eeeef1", padding: "8px 7px" }}>
            <div style={{ fontSize: 7, color: "#a1a1aa", marginBottom: 5 }}>CHANGED FILES</div>
            {["src/App.tsx","src/proto.css","registry.ts","+9 more"].map((f,i)=><div key={f} style={{ fontSize:7,padding:"4px 5px",borderRadius:4,background:i===0?"#eeeafe":"transparent",color:i===0?"#5b4be0":"#71717a" }}>{f}</div>)}
          </div>
          <div style={{ flex: 1, fontFamily: "ui-monospace,monospace", fontSize: 7.5, lineHeight: 1.7, padding: "8px 10px", background: "#fbfbfc" }}>
            <div style={{ background:"#e7f7ee",color:"#1a7f4b" }}>@@ -12,6 +12,8 @@ export function Entry</div>
            <div style={{ background:"#e7f7ee",color:"#1a7f4b" }}>+ import &#123; PrototypeStage &#125; from "./Prototype"</div>
            <div style={{ background:"#fdeaea",color:"#b91c1c" }}>- &lt;div class="wireframe" /&gt;</div>
            <div style={{ background:"#e7f7ee",color:"#1a7f4b" }}>+ &lt;PrototypeStage num=&#123;num&#125; /&gt;</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
