/**
 * Application Shell 1 · Sidebar Shell With Breadcrumbs
 * 侧栏 + 面包屑外壳
 * 场景：左侧可折叠分组导航，顶栏面包屑，右侧内容区。后台管理最常见的骨架。
 * 来源：shadcnblocks.com/block/application-shell1 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell1() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#f3f2f7", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", background: "#fff" }}>
        <aside style={{ width: open ? 86 : 0, flexShrink: 0, overflow: "hidden", transition: "width .35s cubic-bezier(.22,1,.36,1)", background: "#fafafa", borderRight: "1px solid #e6e6ea" }}>
          <div style={{ width: 86, padding: "10px 9px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: "#6d5efc" }} /><b style={{ fontSize: 9 }}>Northstar</b></div>
            {["总览","项目","团队","设置"].map((x,i)=><div key={x} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 7px",borderRadius:6,fontSize:8,marginBottom:3,background:i===0?"#eeeafe":"transparent",color:i===0?"#5b4be0":"#52525b" }}><span style={{ width:7,height:7,borderRadius:2,background:i===0?"#6d5efc":"#c4c4cc" }} />{x}</div>)}
          </div>
        </aside>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ height: 34, borderBottom: "1px solid #eeeef1", display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }}>
            <button onClick={toggle} aria-label="切换侧栏" style={{ width: 22, height: 22, display: "grid", placeItems: "center", border: "1px solid #e4e4e7", borderRadius: 6, background: "#fff", cursor: "pointer", flexShrink: 0 }}>
            <span style={{ display: "block", width: 11, height: 7, borderTop: "2px solid #71717a", borderBottom: "2px solid #71717a", position: "relative" }}><span style={{ position: "absolute", left: 0, right: 0, top: 2, borderTop: "2px solid #71717a" }} /></span>
          </button>
            <span style={{ fontSize: 8, color: "#a1a1aa" }}>工作台 / <b style={{ color: "#3f3f46" }}>总览</b></span>
          </div>
          <div style={{ padding: 11, flex: 1, background: "#fbfbfc" }}>
            <b style={{ fontSize: 11, color: "#27272a" }}>早上好，Lin 👋</b>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginTop: 9 }}>
              {["12.4k","2,180","98.2%"].map((t,i)=><div key={t} style={{ background:"#fff",border:"1px solid #ececf0",borderRadius:7,padding:"9px 7px" }}><div style={{ fontSize:6.5,color:"#a1a1aa" }}>{["本月访问","新增注册","系统状态"][i]}</div><b style={{ fontSize:10,color:i===1?"#6d5efc":"#27272a" }}>{t}</b></div>)}
            </div>
            <div style={{ marginTop: 9, height: 54, borderRadius: 7, background: "linear-gradient(180deg,#f3f1ff,#fff)", border: "1px solid #ece9ff", display: "flex", alignItems: "flex-end", gap: 5, padding: "8px 10px 9px" }}>
              {[38,54,44,66,58,80,72,90].map((h,i)=><span key={i} style={{ flex:1,height:h+"%",borderRadius:"3px 3px 0 0",background:i===7?"#6d5efc":"#ddd7ff" }} />)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
