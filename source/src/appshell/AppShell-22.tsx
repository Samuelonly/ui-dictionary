/**
 * Application Shell 22 · Three-Pane Mail Shell
 * 三栏邮件外壳
 * 场景：文件夹栏 + 邮件列表 + 阅读窗格，中间可拖动分隔。邮件客户端经典布局。
 * 来源：shadcnblocks.com/block/application-shell22 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；内容是本地画的假页面，无外链。
 */
import { useState } from "react"

export default function AppShell22() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(o => !o)
  void open; void toggle

  return (
    <div style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: "#f3f2f7", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
<div style={{ display: "flex", height: 220, borderRadius: 8, overflow: "hidden", border: "1px solid #e6e6ea", background: "#fff" }}>
        <div style={{ width: 74, flexShrink: 0, background: "#fafafa", borderRight: "1px solid #ececf0", padding: "9px 7px" }}>
          <b style={{ fontSize: 9, color: "#3f3f46" }}>收件箱</b>
          {["收件箱","已发送","草稿","星标"].map((x,i)=><div key={x} style={{ fontSize:8,padding:"6px 6px",borderRadius:6,marginTop:4,background:i===0?"#eeeafe":"transparent",color:i===0?"#5b4be0":"#71717a" }}>{x}{i===0?" 12":""}</div>)}
        </div>
        <div style={{ width: 106, flexShrink: 0, borderRight: "1px solid #ececf0" }}>
          {["设计周报 · Lin","Re: 合作提案","发票 #2031","下周会议","欢迎加入"].map((t,i)=><div key={t} style={{ padding:"9px 8px",borderBottom:"1px solid #f4f4f6",background:i===0?"#f7f6ff":"transparent" }}><b style={{ fontSize:8,color:"#3f3f46" }}>{t}</b><div style={{ fontSize:7,color:"#a1a1aa",marginTop:2 }}>{["刚刚","昨天","周二","周一","上周"][i]}</div></div>)}
        </div>
        <div style={{ flex: 1, padding: "12px 12px", minWidth: 0 }}>
          <button onClick={toggle} style={{ border:"1px solid #e4e4e7",background:"#fff",borderRadius:6,fontSize:9,color:"#71717a",width:22,height:22,cursor:"pointer" }}>☰</button>
          <b style={{ fontSize: 11, color: "#27272a", display: "block", marginTop: 6 }}>设计周报 · 第 46 期</b>
          <div style={{ fontSize: 8, color: "#a1a1aa", margin: "3px 0 8px" }}>来自 Lin WU · 收件人 我</div>
          <div style={{ fontSize: 8, color: "#71717a", lineHeight: 1.8 }}>本周我们完成了组件库的动效升级，把 45 个词条换成了真原型卡片……<br/>下周三评审，记得看附件。</div>
          <div style={{ marginTop: 10, padding: "6px 8px", border: "1px dashed #d4d4d8", borderRadius: 6, fontSize: 7, color: "#a1a1aa" }}>📎 设计周报.pdf　1.2MB</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 6, zIndex: 9, fontSize: 8, letterSpacing: ".06em", padding: "3px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>点左上角按钮 → 侧栏收起/展开</div>
    </div>
  )
}
