/**
 * Application Shell 34 · Document Editor Shell
 * 文档编辑器外壳
 * 场景：标题栏 + File/Edit/View 菜单 + 格式工具条 + 纸张画布。在线文档用。
 * 来源：shadcnblocks.com/block/application-shell34 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell34() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#f3f2f7", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", flexDirection: "column", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", background: "#fff" }}>
        <div style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #eeeef1", fontSize: 8, color: "#52525b", position: "relative" }}>
          <b>产品需求文档 v2.1</b><span style={{ position: "absolute", right: 9, color: "#a1a1aa" }}>已保存 ✓</span>
        </div>
        <div style={{ height: 22, display: "flex", alignItems: "center", gap: 10, padding: "0 10px", borderBottom: "1px solid #eeeef1", fontSize: 8, color: "#71717a" }}>
          <span>File</span><span>Edit</span><span>View</span><span>Insert</span>
        </div>
        <div style={{ height: 26, display: "flex", alignItems: "center", gap: 5, padding: "0 10px", borderBottom: "1px solid #eeeef1" }}>
          <button onClick={toggle} aria-label="切换侧栏" style={{ width: 22, height: 22, display: "grid", placeItems: "center", border: "1px solid #e4e4e7", borderRadius: 6, background: "#fff", cursor: "pointer", flexShrink: 0 }}>
            <span style={{ display: "block", width: 11, height: 7, borderTop: "2px solid #71717a", borderBottom: "2px solid #71717a", position: "relative" }}><span style={{ position: "absolute", left: 0, right: 0, top: 2, borderTop: "2px solid #71717a" }} /></span>
          </button>
          {["B","I","U","≡","≣"].map((x,i)=><span key={x} style={{ width:18,height:18,borderRadius:4,border:"1px solid #e4e4e7",display:"grid",placeItems:"center",fontSize:9,color:i===0?"#6d5efc":"#71717a",background:i===0?"#eeeafe":"#fff" }}>{x}</span>)}
        </div>
        <div style={{ flex: 1, background: "#f4f4f5", display: "flex", justifyContent: "center", paddingTop: 12 }}>
          <div style={{ width: "70%", minHeight: 130, height: "fit-content", background: "#fff", boxShadow: "0 3px 12px rgba(0,0,0,.08)", padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#27272a" }}>1. 项目背景</div>
            <div style={{ fontSize: 7.5, color: "#71717a", lineHeight: 1.9, marginTop: 6 }}>随着组件库规模扩大，设计师与 AI 之间需要一套共享的视觉语言……</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#27272a", marginTop: 10 }}>2. 目标</div>
            <div style={{ fontSize: 7.5, color: "#a1a1aa", lineHeight: 1.9, marginTop: 6 }}>▸ 统一动效命名　▸ 提供可复制源码</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
