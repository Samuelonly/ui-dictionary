/**
 * CoverFlow 14 · Product Cover Flow With Sizes
 * 多尺寸商品流
 * 场景：同一类商品按大小排开，中间大两边小，带价格。
 * 来源：shadcnblocks.com/blocks/coverflow 编号 14 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；封面是本地画的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent, ReactNode } from "react"

const SHAPE: string = "product"
const FAMILY: string = "drum"
const INTERACTION: string = "hover"
const STAGE: string = "#f5f4f0"
const CW: number = 124
const CH: number = 124
const RADIUS: number = 8
const SPACING: number = 96
const ROT: number = 32
const SCALE_STEP: number = 0.13
void SHAPE; void FAMILY; void INTERACTION; void STAGE; void CW; void CH; void RADIUS; void SPACING; void ROT; void SCALE_STEP

type Item = { [k: string]: string }
const ITEMS: Item[] = [{"c1": "#eef1f6", "c2": "#dfe4ee", "art": "headphone", "title": "降噪耳机 Pro", "sub": "音频", "meta": "黑色", "price": "¥1,299", "badge": "新品"}, {"c1": "#f6efe8", "c2": "#e8dccb", "art": "shoe", "title": "轻量跑鞋 2", "sub": "运动", "meta": "42 码", "price": "¥699", "badge": "热卖"}, {"c1": "#eef2f6", "c2": "#dbe3ec", "art": "watch", "title": "智能手表 S", "sub": "穿戴", "meta": "银色", "price": "¥2,399", "badge": ""}, {"c1": "#f3eef6", "c2": "#e4d9ee", "art": "bag", "title": "通勤托特包", "sub": "箱包", "meta": "米白", "price": "¥459", "badge": ""}, {"c1": "#eef4f1", "c2": "#d8e6df", "art": "camera", "title": "复古相机 M", "sub": "影像", "meta": "银黑", "price": "¥3,899", "badge": "限量"}, {"c1": "#f6f1ee", "c2": "#eadfd8", "art": "chair", "title": "人体工学椅", "sub": "家居", "meta": "灰色", "price": "¥1,899", "badge": ""}, {"c1": "#eef1f6", "c2": "#dce2ea", "art": "lamp", "title": "护眼台灯", "sub": "家居", "meta": "白色", "price": "¥329", "badge": ""}, {"c1": "#f4eef0", "c2": "#e8dbe1", "art": "bottle", "title": "保温随行杯", "sub": "生活", "meta": "500ml", "price": "¥159", "badge": ""}]

function wrap(d: number, n: number) { return ((d + n / 2) % n + n) % n - n / 2 }
function place(i: number, n: number, off: number) {
  const d = wrap(i - off, n)
  return {x:d*SPACING,y:0,z:-Math.abs(d)*40,ry:-d*ROT,rx:0,rz:0,
    sc:Math.max(.5,1-Math.abs(d)*SCALE_STEP),op:Math.max(.3,1-Math.abs(d)/6.5),blur:Math.min(1.2,Math.abs(d)*.18)};
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
    const shapes:Record<string,React.ReactNode>={
      headphone:<span style={{position:"absolute",left:"50%",top:"40%",width:56,height:44,border:"9px solid #3f4a5a",borderBottom:"none",borderRadius:"30px 30px 0 0",transform:"translate(-50%,-50%)"}}/>,
      shoe:<span style={{position:"absolute",left:"50%",top:"46%",width:66,height:26,background:"#9aa7b8",borderRadius:"30px 12px 12px 14px",transform:"translate(-50%,-50%) rotate(-8deg)"}}/>,
      watch:<span style={{position:"absolute",left:"50%",top:"44%",width:38,height:38,background:"#374151",borderRadius:10,transform:"translate(-50%,-50%)"}}/>,
      bag:<span style={{position:"absolute",left:"50%",top:"46%",width:50,height:40,background:"#cbb79f",borderRadius:"8px 8px 12px 12px",transform:"translate(-50%,-50%)"}}/>,
      camera:<span style={{position:"absolute",left:"50%",top:"46%",width:54,height:36,background:"#2f3640",borderRadius:8,transform:"translate(-50%,-50%)"}}/>,
      chair:<span style={{position:"absolute",left:"50%",top:"46%",width:46,height:50,background:"#7b8794",borderRadius:"12px 12px 6px 6px",transform:"translate(-50%,-50%)"}}/>,
      lamp:<span style={{position:"absolute",left:"50%",top:"44%",width:44,height:34,background:"#e8e2cf",borderRadius:"50% 50% 8px 8px",transform:"translate(-50%,-50%)"}}/>,
      bottle:<span style={{position:"absolute",left:"50%",top:"46%",width:28,height:52,background:"#b9c5cf",borderRadius:"8px 8px 12px 12px",transform:"translate(-50%,-50%)"}}/>,
    };
    return <div style={{position:"absolute",inset:0,overflow:"hidden",background:`linear-gradient(160deg,${it.c1},${it.c2})`}}>
      {it.badge&&<span style={{position:"absolute",right:7,top:7,background:"#e11d48",color:"#fff",fontSize:6.5,padding:"2px 6px",borderRadius:99}}>{it.badge}</span>}
      {shapes[it.art]}
      <span style={{position:"absolute",left:0,right:0,bottom:0,padding:"26px 9px 9px",background:"linear-gradient(transparent,rgba(255,255,255,.96) 58%)",color:"#1f2937"}}>
        <small style={{display:"block",fontSize:6.5,color:"#6b7280"}}>{it.sub} · {it.meta}</small>
        <b style={{display:"block",fontSize:10,lineHeight:1.15}}>{it.title}</b>
        <span style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}><b style={{fontSize:12,color:"#e11d48"}}>{it.price}</b><span style={{fontSize:6.5,background:"#1f2937",color:"#fff",padding:"4px 8px",borderRadius:99}}>加购</span></span>
      </span></div>;
}

export default function CoverFlow14() {
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
      <div style={{ position: "absolute", left: 11, bottom: 9, zIndex: 9, fontSize: 8, letterSpacing: ".1em", padding: "4px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>鼠标划过 → 滚轮翻动</div>
    </div>
  )
}
