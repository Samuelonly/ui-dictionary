/**
 * CoverFlow 15 · Elastic Drag Cover Flow
 * 弹性拖拽图片流
 * 场景：照片能拖着走，松手会慢慢弹回来。
 * 来源：shadcnblocks.com/blocks/coverflow 编号 20 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；封面是本地画的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent, ReactNode } from "react"

const SHAPE: string = "photo"
const FAMILY: string = "drum"
const INTERACTION: string = "drag"
const STAGE: string = "#16161f"
const CW: number = 116
const CH: number = 116
const RADIUS: number = 7
const SPACING: number = 100
const ROT: number = 38
const SCALE_STEP: number = 0.12
void SHAPE; void FAMILY; void INTERACTION; void STAGE; void CW; void CH; void RADIUS; void SPACING; void ROT; void SCALE_STEP

type Item = { [k: string]: string }
const ITEMS: Item[] = [{"c1": "#3a6073", "c2": "#16222a", "art": "mountain", "title": "京都", "sub": "JAPAN", "meta": "2026"}, {"c1": "#f7b733", "c2": "#fc4a1a", "art": "sun", "title": "撒哈拉", "sub": "MOROCCO", "meta": "35°C"}, {"c1": "#43cea2", "c2": "#185a9d", "art": "wave", "title": "冰岛", "sub": "ICELAND", "meta": "64°N"}, {"c1": "#c79081", "c2": "#dfa579", "art": "dune", "title": "敦煌", "sub": "CHINA", "meta": "日出"}, {"c1": "#5f72bd", "c2": "#9b23ea", "art": "dots", "title": "挪威", "sub": "NORWAY", "meta": "极夜"}, {"c1": "#ee9ca7", "c2": "#ffdde1", "art": "soft", "title": "威尼斯", "sub": "ITALY", "meta": "黄昏"}, {"c1": "#0f2027", "c2": "#203a43", "art": "mountain", "title": "阿尔卑斯", "sub": "SWISS", "meta": "云海"}, {"c1": "#d38312", "c2": "#a83279", "art": "sun", "title": "里斯本", "sub": "PORTUGAL", "meta": "电车"}]

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
    return <div style={{position:"absolute",inset:0,overflow:"hidden",background:`linear-gradient(160deg,${it.c1},${it.c2})`}}>{geo[it.art]}{gloss}{cap(it.title,it.sub,it.meta,"linear-gradient(transparent,rgba(6,8,16,.8))")}</div>;
}

export default function CoverFlow15() {
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
      <div style={{ position: "absolute", left: 11, bottom: 9, zIndex: 9, fontSize: 8, letterSpacing: ".1em", padding: "4px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>按住拖动 → 松手回弹</div>
    </div>
  )
}
