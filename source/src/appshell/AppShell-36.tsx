/**
 * Application Shell 36 · Whiteboard Shell
 * 白板工具外壳
 * 场景：点阵画布 + 浮动的文件条/工具条/分享条。设计协作工具。
 * 来源：shadcnblocks.com/block/application-shell36 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell36() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#fafafa", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ position: "relative", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", backgroundColor: "#fafafa", backgroundImage: "radial-gradient(#d4d4d8 1px,transparent 1px)", backgroundSize: "14px 14px" }}>
        <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: "5px 9px", boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}>
          <span style={{ fontSize: 8, color: "#a1a1aa" }}>📁</span><b style={{ fontSize: 8, color: "#3f3f46" }}>产品看板</b><span style={{ fontSize: 7, color: "#a1a1aa" }}>分享</span>
        </div>
        <div style={{ position: "absolute", left: 9, top: 88, display: "flex", flexDirection: "column", gap: 6, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 6, boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}>
          {["▣","✎","○","▭","T"].map((x,i)=><span key={x} style={{ width:20,height:20,borderRadius:5,display:"grid",placeItems:"center",fontSize:11,background:i===1?"#eeeafe":"#fafafa",color:i===1?"#6d5efc":"#71717a" }}>{x}</span>)}
        </div>
        <div style={{ position: "absolute", left: 88, top: 56, width: 96, height: 60, borderRadius: 8, background: "#fff", border: "1px solid #e4e4e7", boxShadow: "0 4px 12px rgba(0,0,0,.08)", padding: 8 }}>
          <b style={{ fontSize: 8, color: "#27272a" }}>用户流程</b>
          <svg style={{ width: "100%", height: 34, marginTop: 4 }}><path d="M4 26 C 30 26, 30 8, 60 8 S 84 22, 92 12" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 3" /><circle cx="4" cy="26" r="3" fill="#6d5efc" /><circle cx="92" cy="12" r="3" fill="#6d5efc" /></svg>
        </div>
        <div style={{ position: "absolute", right: 12, top: 122, width: 74, height: 46, borderRadius: 8, background: "#fff", border: "1px solid #e4e4e7", boxShadow: "0 4px 12px rgba(0,0,0,.08)", padding: 7 }}>
          <b style={{ fontSize: 8, color: "#27272a" }}>待办</b><div style={{ fontSize: 7, color: "#a1a1aa", marginTop: 4 }}>☐ 评审动效</div><div style={{ fontSize: 7, color: "#a1a1aa" }}>☐ 补文档</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
