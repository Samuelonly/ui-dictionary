/**
 * CoverFlow 5 · Arc Card Carousel
 * 弧形幻灯片轮播
 * 场景：幻灯片沿一段圆弧摊开，像演示现场的切页。
 * 来源：shadcnblocks.com/blocks/coverflow 编号 5 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；封面是本地画的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent, ReactNode } from "react"

const SHAPE: string = "slide"
const FAMILY: string = "arc"
const INTERACTION: string = "hover"
const STAGE: string = "#e9edf3"
const CW: number = 150
const CH: number = 94
const RADIUS: number = 5
const SPACING: number = 108
const ROT: number = 26
const SCALE_STEP: number = 0.12
void SHAPE; void FAMILY; void INTERACTION; void STAGE; void CW; void CH; void RADIUS; void SPACING; void ROT; void SCALE_STEP

type Item = { [k: string]: string }
const ITEMS: Item[] = [{"c1": "#f8fafc", "c2": "#eef2f7", "art": "s1", "title": "2026 产品战略", "sub": "聚焦 · 增长 · 体验", "meta": "01 / 12"}, {"c1": "#f8fafc", "c2": "#eef2f7", "art": "s2", "title": "市场洞察", "sub": "用户规模同比增长 38%", "meta": "02 / 12"}, {"c1": "#f8fafc", "c2": "#eef2f7", "art": "s3", "title": "核心目标", "sub": "留存优先，体验驱动", "meta": "03 / 12"}, {"c1": "#f8fafc", "c2": "#eef2f7", "art": "s4", "title": "路线图", "sub": "Q1 打磨 · Q2 增长", "meta": "04 / 12"}, {"c1": "#f8fafc", "c2": "#eef2f7", "art": "s5", "title": "团队协作", "sub": "设计与工程并肩", "meta": "05 / 12"}, {"c1": "#f8fafc", "c2": "#eef2f7", "art": "s6", "title": "下一步", "sub": "从想法到落地", "meta": "06 / 12"}]

function wrap(d: number, n: number) { return ((d + n / 2) % n + n) % n - n / 2 }
function place(i: number, n: number, off: number) {
  const d = wrap(i - off, n)
  return {x:d*SPACING,y:Math.pow(Math.abs(d),2)*3.4,z:-Math.abs(d)*22,ry:-d*ROT,rx:0,rz:0,
    sc:Math.max(.5,1-Math.abs(d)*SCALE_STEP),op:Math.max(.3,1-Math.abs(d)/6.5),blur:Math.min(1.1,Math.abs(d)*.18)};
}

/* 封面内容：场景细节长在封面里 */
function CoverArt({ it }: { it: Item }) {
  const geo:Record<string,ReactNode>={
      sun:<span style={{position:"absolute",width:"58%",height:"0",paddingBottom:"58%",borderRadius:"50%",right:"8%",top:"12%",background:"radial-gradient(circle at 40% 35%,rgba(255,246,200,.98),rgba(255,190,90,.55) 62%,transparent 72%)"}}/>,
      ring:<span style={{position:"absolute",width:"66%",height:"0",paddingBottom:"66%",borderRadius:"50%",border:"9px solid rgba(255,255,255,.32)",left:"12%",top:"10%"}}/>,
      wave:<><span style={{position:"absolute",left:"-15%",right:"-15%",bottom:"-18%",height:"46%",borderRadius:"50% 50% 0 0",border:"2px solid rgba(255,255,255,.38)",transform:"rotate(-8deg)"}}/><span style={{position:"absolute",left:"-15%",right:"-15%",bottom:"-27%",height:"46%",borderRadius:"50% 50% 0 0",border:"2px solid rgba(255,255,255,.2)",transform:"rotate(-8deg)"}}/></>,
      tri:<span style={{position:"absolute",left:"50%",top:"20%",width:0,height:0,borderLeft:"30px solid transparent",borderRight:"30px solid transparent",borderBottom:"52px solid rgba(255,255,255,.3)",transform:"translateX(-50%)"}}/>,
      petal:<span style={{position:"absolute",inset:"14%",borderRadius:"60px 8px 60px 8px",background:"rgba(255,255,255,.3)",transform:"rotate(22deg)"}}/>,
      dots:<span style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,.5) 1.4px,transparent 1.5px)",backgroundSize:"12px 12px"}}/>,
      mountain:<><span style={{position:"absolute",left:"-6%",bottom:0,width:0,height:0,borderLeft:"52px solid transparent",borderRight:"52px solid transparent",borderBottom:"74px solid rgba(0,0,0,.24)"}}/><span style={{position:"absolute",right:"-6%",bottom:0,width:0,height:0,borderLeft:"46px solid transparent",borderRight:"46px solid transparent",borderBottom:"58px solid rgba(0,0,0,.32)"}}/></>,
      dune:<span style={{position:"absolute",left:"-20%",right:"-20%",bottom:"-26%",height:"56%",borderRadius:"50% 50% 0 0",background:"rgba(0,0,0,.2)",transform:"rotate(-6deg)"}}/>,
      soft:<span style={{position:"absolute",width:"52%",height:"0",paddingBottom:"52%",borderRadius:"50%",right:"6%",top:"16%",background:"radial-gradient(circle,rgba(255,255,255,.7),transparent 68%)"}}/>,
      city:<><span style={{position:"absolute",inset:"18% 8% 22%",background:"repeating-linear-gradient(90deg,rgba(0,0,0,.3) 0 8px,transparent 8px 15px)"}}/></>,
    };
    const gloss=<span style={{position:"absolute",inset:0,background:"linear-gradient(155deg,rgba(255,255,255,.28),transparent 42%,transparent 62%,rgba(0,0,0,.22))"}}/>;
    const cap=(t:string,s:string,m:string,bg:string)=><span style={{position:"absolute",left:0,right:0,bottom:0,padding:"24px 9px 9px",background:bg,color:"#fff"}}><small style={{display:"block",fontSize:6.5,letterSpacing:".14em",opacity:.78,marginBottom:2}}>{s} · {m}</small><b style={{display:"block",fontSize:12,lineHeight:1.1}}>{t}</b></span>;
    void geo; void gloss; void cap;
    return <div style={{position:"absolute",inset:0,overflow:"hidden",background:`linear-gradient(150deg,${it.c1},${it.c2})`,border:"1px solid rgba(20,30,50,.08)"}}>
      <span style={{position:"absolute",left:12,top:11,width:"28%",height:3,background:"#3b6ef5",borderRadius:2}}/>
      <span style={{position:"absolute",left:12,top:24,color:"#1f2937"}}><b style={{display:"block",fontSize:13}}>{it.title}</b><small style={{fontSize:8,color:"#6b7280"}}>{it.sub}</small></span>
      <span style={{position:"absolute",left:12,right:12,top:56,display:"grid",gap:5}}>
        <span style={{height:5,background:"#e5eaf2",borderRadius:3,width:"88%"}}/><span style={{height:5,background:"#e5eaf2",borderRadius:3,width:"72%"}}/><span style={{height:5,background:"#e5eaf2",borderRadius:3,width:"80%"}}/></span>
      <span style={{position:"absolute",right:12,bottom:9,color:"#94a3b8",fontSize:7}}>{it.meta}</span></div>;
}

export default function CoverFlow05() {
  const [off, setOff] = useState(0)
  const [hover, setHover] = useState(false)
  const [flipped, setFlipped] = useState<number | null>(null)
  const start = useRef<{ x: number; off: number }>({ x: 0, off: 0 })

  useEffect(() => {
    if (!hover || INTERACTION === "drag" || INTERACTION === "click") return
    if (INTERACTION === "scroll") return
    const id = window.setInterval(() => setOff(o => o + 0.013), 30)
    return () => window.clearInterval(id)
  }, [hover])

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (INTERACTION === "drag") {
      if (start.current) setOff(start.current.off + (e.clientX - start.current.x) / 90)
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    setOff(((e.clientX - r.left) / r.width) * ITEMS.length)
  }
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, off }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onUp = () => { start.current = { x: 0, off: 0 }; setOff(o => Math.round(o)) }
  const onWheel = (e: RWheelEvent<HTMLDivElement>) => { if (INTERACTION === "scroll") setOff(o => o + Math.sign(e.deltaY) * .5) }

  return (
    <div
      onPointerEnter={() => { setHover(true); start.current = { x: 0, off } }}
      onPointerLeave={() => { setHover(false); start.current = { x: 0, off: 0 } }}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onWheel={onWheel}
      style={{ position: "relative", minHeight: 244, padding: 12, borderRadius: 10, overflow: "hidden", background: STAGE, cursor: INTERACTION === "drag" ? "grab" : "default", touchAction: "none" }}
    >
      <div style={{ position: "relative", width: "100%", height: 220, perspective: 950, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "48%", width: 0, height: 0, transformStyle: "preserve-3d" }}>
          {ITEMS.map((it, i) => {
            const p = place(i, ITEMS.length, off)
            const isFocus = Math.abs(wrap(i - off, ITEMS.length)) < .5
            const isFlip = INTERACTION === "click" && flipped === i
            return (
              <div key={i}
                onClick={() => { if (INTERACTION === "click" && isFocus) setFlipped(flipped === i ? null : i) }}
                style={{
                  position: "absolute", left: -CW / 2, top: -CH / 2, width: CW, height: CH, borderRadius: RADIUS,
                  transformStyle: "preserve-3d", willChange: "transform,opacity",
                  transform: `translate3d(${p.x}px,${p.y}px,${p.z}px) rotateY(${p.ry}deg) scale(${p.sc})`,
                  opacity: p.op, zIndex: Math.round(60 - Math.abs(wrap(i - off, ITEMS.length)) * 10),
                  filter: `blur(${p.blur}px)`,
                  transition: hover ? "transform .18s linear,opacity .3s,filter .3s" : "transform .5s cubic-bezier(.22,1,.36,1),opacity .4s,filter .4s",
                  boxShadow: "0 16px 30px rgba(0,0,0,.4),inset 0 0 0 1px rgba(255,255,255,.12)",
                  WebkitBoxReflect: false ? "below 7px linear-gradient(transparent 60%,rgba(255,255,255,.22))" : undefined,
                  cursor: INTERACTION === "click" && isFocus ? "pointer" : "default",
                }}>
                <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 1s cubic-bezier(.22,.8,.25,1)", transform: isFlip ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                  <CoverArt it={it} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ position: "absolute", left: 11, bottom: 9, zIndex: 9, fontSize: 8, letterSpacing: ".1em", padding: "4px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>鼠标划过 → 弧形切页</div>
    </div>
  )
}
