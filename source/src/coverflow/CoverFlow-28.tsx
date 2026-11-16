/**
 * CoverFlow 28 · Speaker Flip Cover Flow
 * 嘉宾翻页封面流
 * 场景：人像卡沿一条直线排开，点中间那张慢慢翻到嘉宾信息。
 * 来源：shadcnblocks.com/blocks/coverflow 编号 28 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；封面是本地画的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent, ReactNode } from "react"

const SHAPE: string = "person"
const FAMILY: string = "row"
const INTERACTION: string = "click"
const STAGE: string = "#f6f6fb"
const CW: number = 96
const CH: number = 138
const RADIUS: number = 8
const SPACING: number = 112
const ROT: number = 0
const SCALE_STEP: number = 0.1
void SHAPE; void FAMILY; void INTERACTION; void STAGE; void CW; void CH; void RADIUS; void SPACING; void ROT; void SCALE_STEP

type Item = { [k: string]: string }
const ITEMS: Item[] = [{"c1": "#7c8fa8", "c2": "#3d4a63", "title": "陈屿", "sub": "产品负责人", "meta": "产品", "bio": "关注协作工具与信息架构，做过三款千万级产品的从零到一。", "tags": "产品,工具"}, {"c1": "#d9a3a8", "c2": "#8c5a6b", "title": "苏黎", "sub": "创意总监", "meta": "品牌", "bio": "品牌视觉与动态设计十余年，主张动效要说人话。", "tags": "品牌,动效"}, {"c1": "#8fb7ae", "c2": "#466b66", "title": "周砚", "sub": "主讲嘉宾", "meta": "交互", "bio": "一线交互设计师，专注动效与可访问性。今天分享界面动效如何讲清楚功能。", "tags": "交互,14:00"}, {"c1": "#a99ad1", "c2": "#5b4a8a", "title": "何川", "sub": "设计工程师", "meta": "前端", "bio": "在设计与工程之间搭桥，写组件库也写动效引擎。", "tags": "组件,前端"}, {"c1": "#d6b189", "c2": "#8a6547", "title": "林一", "sub": "研究负责人", "meta": "用研", "bio": "用户研究与可用性测试，让每个决定有据可依。", "tags": "用研,数据"}, {"c1": "#9fb0c9", "c2": "#565f78", "title": "唐宁", "sub": "独立设计师", "meta": "独立", "bio": "自由职业八年，作品覆盖 App 与品牌。", "tags": "独立,App"}]

function wrap(d: number, n: number) { return ((d + n / 2) % n + n) % n - n / 2 }
function place(i: number, n: number, off: number) {
  const d = wrap(i - off, n)
  return {x:d*SPACING,y:0,z:-Math.abs(d)*18,ry:0,rx:0,rz:0,
    sc:Math.max(.5,1-Math.abs(d)*SCALE_STEP),op:Math.max(.32,1-Math.abs(d)/6.5),blur:Math.min(1.4,Math.abs(d)*.22)};
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
    return <div style={{position:"absolute",inset:0}}>
      <div style={{position:"absolute",inset:0,borderRadius:8,overflow:"hidden",background:`linear-gradient(150deg,${it.c1},${it.c2})`,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(0deg)",boxShadow:"0 12px 24px rgba(40,30,80,.2)"}}>
        <span style={{position:"absolute",left:"50%",top:16,width:42,height:34,borderRadius:"22px 22px 9px 9px",background:"#3b2b25",transform:"translateX(-50%)"}}/>
        <span style={{position:"absolute",left:"50%",top:27,width:36,height:36,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#ffd9b8,#e8a97c)",transform:"translateX(-50%)"}}/>
        <span style={{position:"absolute",left:"50%",bottom:-16,width:88,height:70,borderRadius:"44px 44px 0 0",background:"rgba(20,22,32,.9)",transform:"translateX(-50%)"}}/>
        <span style={{position:"absolute",left:0,right:0,bottom:0,padding:"18px 8px 8px",color:"#fff",background:"linear-gradient(transparent,rgba(10,10,20,.85))",fontSize:11,fontWeight:700}}>{it.title}<small style={{display:"block",fontSize:7,fontWeight:500,opacity:.85,marginTop:1}}>{it.sub}</small></span>
      </div>
      <div style={{position:"absolute",inset:0,borderRadius:8,overflow:"hidden",background:"#fff",color:"#27272a",padding:"10px 9px",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",boxShadow:"0 12px 24px rgba(40,30,80,.2)"}}>
        <b style={{fontSize:11,display:"block"}}>{it.title}</b><div style={{fontSize:7,color:"#71717a",marginTop:1}}>{it.sub}</div>
        <div style={{fontSize:7.5,lineHeight:1.6,color:"#52525b",marginTop:8}}>{it.bio}</div>
        <div style={{marginTop:7,display:"flex",flexWrap:"wrap",gap:3}}>{(it.tags||"").split(",").map((t:string)=><span key={t} style={{fontSize:7,background:"#eef2ff",color:"#4f46e5",borderRadius:8,padding:"2px 5px"}}>{t}</span>)}</div>
      </div></div>;
}

export default function CoverFlow28() {
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
      <div style={{ position: "absolute", left: 11, bottom: 9, zIndex: 9, fontSize: 8, letterSpacing: ".1em", padding: "4px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>鼠标划过 → 直线滚动 · 点中间 → 翻面</div>
    </div>
  )
}
