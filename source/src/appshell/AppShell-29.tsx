/**
 * Application Shell 29 · Shell With Banner + Status Bar
 * 横幅 + 状态栏外壳
 * 场景：顶部可关闭的试用横幅 + 侧栏 + 底部细状态条。SaaS 试用版常见。
 * 来源：shadcnblocks.com/block/application-shell29 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell29() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#f3f2f7", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", flexDirection: "column", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", background: "#fff" }}>
        <div id="trialbanner" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 24, background: "linear-gradient(90deg,#6d5efc,#a855f7)", color: "#fff", fontSize: 8, position: "relative" }}>
          ✨ 免费试用还剩 14 天 · <b style={{ marginLeft: 3 }}>升级专业版</b>
          <button onClick={()=>{const b=document.getElementById('trialbanner');if(b)b.style.display='none'}} style={{ position:"absolute",right:8,background:"transparent",border:0,color:"#fff",fontSize:12,cursor:"pointer",lineHeight:1 }}>×</button>
        </div>
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <aside style={{ width: open ? 86 : 0, flexShrink: 0, overflow: "hidden", transition: "width .35s cubic-bezier(.22,1,.36,1)", background: "#fafafa", borderRight: "1px solid #e6e6ea" }}>
          <div style={{ width: 86, padding: "10px 9px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: "#6d5efc" }} /><b style={{ fontSize: 9 }}>Northstar</b></div>
            {["总览","项目","团队","设置"].map((x,i)=><div key={x} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 7px",borderRadius:6,fontSize:8,marginBottom:3,background:i===0?"#eeeafe":"transparent",color:i===0?"#5b4be0":"#52525b" }}><span style={{ width:7,height:7,borderRadius:2,background:i===0?"#6d5efc":"#c4c4cc" }} />{x}</div>)}
          </div>
        </aside>
          <div style={{ flex: 1, padding: 12, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={toggle} aria-label="切换侧栏" style={{ width: 22, height: 22, display: "grid", placeItems: "center", border: "1px solid #e4e4e7", borderRadius: 6, background: "#fff", cursor: "pointer", flexShrink: 0 }}>
            <span style={{ display: "block", width: 11, height: 7, borderTop: "2px solid #71717a", borderBottom: "2px solid #71717a", position: "relative" }}><span style={{ position: "absolute", left: 0, right: 0, top: 2, borderTop: "2px solid #71717a" }} /></span>
          </button><b style={{ fontSize: 11, color: "#27272a" }}>项目概览</b></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 7, marginTop: 10 }}>
              <div style={{ height: 52, borderRadius: 7, background: "#fafafa", border: "1px solid #ececf0", padding: 8 }}><div style={{ fontSize: 7, color: "#a1a1aa" }}>进行中</div><b style={{ fontSize: 14, color: "#6d5efc" }}>8</b></div>
              <div style={{ height: 52, borderRadius: 7, background: "#fafafa", border: "1px solid #ececf0", padding: 8 }}><div style={{ fontSize: 7, color: "#a1a1aa" }}>已完成</div><b style={{ fontSize: 14, color: "#27272a" }}>24</b></div>
            </div>
          </div>
        </div>
        <div style={{ height: 18, flexShrink: 0, background: "#18181b", color: "#a1a1aa", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 9px", fontSize: 7 }}>
          <span>main · 全部通过 ✓</span><span>UTF-8　Ln 12, Col 4</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
