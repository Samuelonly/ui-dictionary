/**
 * Application Shell 9 · IDE File Explorer Shell
 * IDE 文件树外壳
 * 场景：最左活动栏 + 文件树侧栏 + 代码编辑区，像 VS Code。开发工具、文件管理用。
 * 来源：shadcnblocks.com/block/application-shell9 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell9() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#1e1e24", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #2b2b33", background: "#1e1e24" }}>
        <div style={{ width: 30, flexShrink: 0, background: "#18181d", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 10, borderRight: "1px solid #2b2b33" }}>
          {["▤","⌕","⑂","⚙"].map((x,i)=><span key={x} style={{ fontSize:13,color:i===0?"#a78bfa":"#6b6b78" }}>{x}</span>)}
        </div>
        <aside style={{ width: open ? 96 : 0, flexShrink: 0, overflow: "hidden", transition: "width .35s cubic-bezier(.22,1,.36,1)", background: "#202027", borderRight: "1px solid #2b2b33" }}>
          <div style={{ width: 96, padding: "10px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}><span style={{ width: 15, height: 15, borderRadius: 4, background: "#a78bfa" }} /><b style={{ fontSize: 8, color: "#fff" }}>studio</b></div>
            <div style={{ fontSize: 7, color: "#6b6b78", marginBottom: 5 }}>EXPLORER</div>
            {["▾ src","  App.tsx","  main.tsx","▸ components","▸ lib","  index.css"].map((x,i)=><div key={x} style={{ fontSize:7.5,padding:"4px 5px",borderRadius:4,color:i===1?"#c4b5fd":"#b8b8c4",background:i===1?"#2c2740":"transparent" }}>{x}</div>)}
          </div>
        </aside>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 26, background: "#25252c", display: "flex", alignItems: "center", gap: 6, padding: "0 8px", borderBottom: "1px solid #2b2b33" }}>
            <span style={{ fontSize:8,color:"#c4b5fd",background:"#2c2740",padding:"3px 7px",borderRadius:"4px 4px 0 0" }}>App.tsx</span><span style={{ fontSize:8,color:"#6b6b78" }}>index.css</span>
          </div>
          <div style={{ padding: "10px 12px", fontFamily: "ui-monospace,monospace", fontSize: 8, lineHeight: 1.9, color: "#b8b8c4" }}>
            <div><span style={{ color:"#c678dd" }}>import</span> &#123; useState &#125; <span style={{ color:"#c678dd" }}>from</span> <span style={{ color:"#98c379" }}>"react"</span></div>
            <div><span style={{ color:"#c678dd" }}>export default function</span> <span style={{ color:"#61afef" }}>App</span>() &#123;</div>
            <div style={{ paddingLeft: 12 }}><span style={{ color:"#c678dd" }}>const</span> &#91;n, setN&#93; = useState(0)</div>
            <div style={{ paddingLeft: 12 }}><span style={{ color:"#c678dd" }}>return</span> &lt;div&gt;Hello&lt;/div&gt;</div>
            <div>&#125;</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
