/**
 * Application Shell 27 · Music Player Shell
 * 音乐播放器外壳
 * 场景：歌单侧栏 + 内容 shelves + 底部常驻播放条，带进度和音量。音乐/播客应用。
 * 来源：shadcnblocks.com/block/application-shell27 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell27() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#141416", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", flexDirection: "column", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #2b2b33", background: "#141416" }}>
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <div style={{ width: 92, flexShrink: 0, background: "#1b1b1e", color: "#a1a1aa", padding: "10px 8px" }}>
            <b style={{ fontSize: 9, color: "#fff" }}>♪ Soundwave</b>
            <div style={{ fontSize: 7, marginTop: 10, color: "#71717a" }}>你的歌单</div>
            {["深夜驾驶","周末清单","专注写代码","已收藏"].map((x,i)=><div key={x} style={{ fontSize:8,padding:"6px",borderRadius:5,marginTop:3,background:i===1?"#2a2a2f":"transparent",color:i===1?"#fff":"#a1a1aa" }}>▸ {x}</div>)}
          </div>
          <div style={{ flex: 1, padding: 12, minWidth: 0 }}>
            <b style={{ fontSize: 11, color: "#fff" }}>周末清单</b>
            {["日落之后 · LIN WU","深蓝 · OCEAN","夜曲 · NOCTURNE"].map((t,i)=><div key={t} style={{ display:"flex",gap:8,alignItems:"center",padding:"6px 0",borderBottom:"1px solid #26262b" }}><span style={{ width:22,height:22,borderRadius:4,background:["#ef7d57","#2c5364","#e94057"][i] }} /><span style={{ fontSize:8,color:"#b8b8c4" }}>{t}</span></div>)}
          </div>
        </div>
        <div style={{ height: 42, flexShrink: 0, background: "#1b1b1e", borderTop: "1px solid #2b2b33", display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }}>
          <span style={{ fontSize: 12, color: "#a78bfa" }}>▶</span>
          <span style={{ fontSize: 7, color: "#b8b8c4", whiteSpace: "nowrap" }}>日落之后</span>
          <span style={{ flex:1,height:3,borderRadius:2,background:"#3a3a42",position:"relative" }}><span style={{ position:"absolute",left:0,top:0,bottom:0,width:"38%",borderRadius:2,background:"#a78bfa" }} /></span>
          <span style={{ fontSize: 7, color: "#71717a" }}>1:24 / 3:40</span>
          <span style={{ fontSize: 9, color: "#71717a" }}>♪</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
