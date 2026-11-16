/**
 * CoverFlow 11 · Film Poster Cover Flow
 * 电影海报流
 * 场景：竖版海报错落排开，带片名和评分。
 * 来源：shadcnblocks.com/blocks/coverflow 编号 15 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React；封面是本地画的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent, ReactNode } from "react"

const SHAPE: string = "poster"
const FAMILY: string = "drum"
const INTERACTION: string = "hover"
const STAGE: string = "#0e0e14"
const CW: number = 100
const CH: number = 142
const RADIUS: number = 6
const SPACING: number = 88
const ROT: number = 30
const SCALE_STEP: number = 0.12
void SHAPE; void FAMILY; void INTERACTION; void STAGE; void CW; void CH; void RADIUS; void SPACING; void ROT; void SCALE_STEP

type Item = { [k: string]: string }
const ITEMS: Item[] = [{"c1": "#141e30", "c2": "#243b55", "art": "city", "title": "星际回响", "sub": "科幻 · 剧情", "meta": "8.7"}, {"c1": "#3a1c71", "c2": "#d76d77", "art": "ring", "title": "日落之前", "sub": "爱情 · 剧情", "meta": "8.2"}, {"c1": "#0f2027", "c2": "#2c5364", "art": "wave", "title": "深潜", "sub": "冒险 · 动作", "meta": "7.9"}, {"c1": "#42275a", "c2": "#734b6d", "art": "dots", "title": "记忆碎片", "sub": "悬疑 · 惊悚", "meta": "8.9"}, {"c1": "#c31432", "c2": "#240b36", "art": "sun", "title": "燃情岁月", "sub": "剧情 · 传记", "meta": "8.4"}, {"c1": "#1d2b64", "c2": "#f8cdda", "art": "soft", "title": "蓝色黄昏", "sub": "文艺 · 短片", "meta": "7.6"}, {"c1": "#232526", "c2": "#414345", "art": "tri", "title": "暗涌", "sub": "犯罪 · 悬疑", "meta": "8.1"}, {"c1": "#f2994a", "c2": "#2c2c54", "art": "mountain", "title": "沙丘之上", "sub": "史诗 · 科幻", "meta": "8.6"}]

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
    return <div style={{position:"absolute",inset:0,overflow:"hidden",background:`linear-gradient(160deg,${it.c1},${it.c2})`}}>{geo[it.art]}{gloss}
      <span style={{position:"absolute",left:0,right:0,top:0,padding:"9px 8px",color:"rgba(255,255,255,.7)",fontSize:6,letterSpacing:".22em"}}>NOW SHOWING</span>
      <span style={{position:"absolute",left:0,right:0,bottom:0,padding:"30px 9px 11px",background:"linear-gradient(transparent,rgba(6,6,12,.92))",color:"#fff"}}>
        <b style={{display:"block",fontSize:15,lineHeight:1.05,letterSpacing:".04em"}}>{it.title}</b>
        <span style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:7,opacity:.9}}><span>{it.sub}</span><span style={{color:"#f5c451"}}>★ {it.meta}</span></span></span></div>;
}

export default function CoverFlow11() {
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
      <div style={{ position: "absolute", left: 11, bottom: 9, zIndex: 9, fontSize: 8, letterSpacing: ".1em", padding: "4px 8px", borderRadius: 99, background: "rgba(15,15,25,.55)", color: "#fff" }}>鼠标划过 → 海报翻动</div>
    </div>
  )
}
