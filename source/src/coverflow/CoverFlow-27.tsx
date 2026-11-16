/**
 * CoverFlow 27 · Pointer Scrub Cover Flow
 * 指针擦洗封面流
 * 来源：shadcnblocks.com/blocks/coverflow 编号 27 的做法，独立实现（非原版代码）。
 * 单文件可复制：只依赖 React，不依赖本站其它模块；封面是本地生成的假图，无外链。
 */
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as RPointerEvent, WheelEvent as RWheelEvent } from "react"

const FAMILY: string = "drum"
const INTERACTION: string = "pointer"
const STAGE: string = "#d9cdf7"

const COVERS = [{"c1": "#c94b4b", "c2": "#4b134f", "art": "ring", "title": "TERRA", "sub": "EARTH TONES"}, {"c1": "#0b486b", "c2": "#f56217", "art": "wave", "title": "NOCTURNE", "sub": "SIDE A · 2026"}, {"c1": "#3a1c71", "c2": "#d76d77", "art": "dots", "title": "GOLDEN HOUR", "sub": "VOL.02 · LP"}, {"c1": "#2b1055", "c2": "#e94057", "art": "circle", "title": "DEEP BLUE", "sub": "OCEAN SESSIONS"}, {"c1": "#f12711", "c2": "#f5af19", "art": "sun", "title": "BLOOM", "sub": "SPRING / 12"}, {"c1": "#0f2027", "c2": "#2c5364", "art": "wave", "title": "VERDANT", "sub": "FIELD NOTES"}, {"c1": "#ff6b9d", "c2": "#c44569", "art": "petal", "title": "EMBER", "sub": "LIVE AT DUSK"}, {"c1": "#0f3443", "c2": "#34e89e", "art": "ring", "title": "NEBULA", "sub": "COSMIC DRIFT"}]

function wrap(d: number, n: number) { return ((d + n / 2) % n + n) % n - n / 2 }

/* 排布算法：返回这张封面相对焦点的位置与姿态 */
function place(i: number, n: number, off: number) {
  const d = wrap(i - off, n)
const t=d/n*Math.PI*2, R=178; const concave=FAMILY==="concave";
  const r=concave?-R:R;
  return {x:Math.sin(t)*R, y:0, z:Math.cos(t)*r-r, ry:-t*180/Math.PI, rx:0, rz:0,
    sc:Math.max(.34,1-Math.abs(d)/9.5), op:Math.max(.28,1-Math.abs(d)/6.5), blur:Math.min(2.2,Math.abs(d)*.25)};
}

/* 装饰图形：用纯 CSS 画，不依赖图片 */
function Art({ kind }: { kind: string }) {
  const base = { position: "absolute", inset: 0, overflow: "hidden" } as const
  if (kind === "circle") return <div style={base}><span style={{ position:"absolute",width:78,height:78,borderRadius:"50%",border:"11px solid rgba(255,255,255,.42)",left:16,top:-17 }} /><span style={{ position:"absolute",width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,.5)",right:9,bottom:12 }} /></div>
  if (kind === "sun") return <div style={base}><span style={{ position:"absolute",width:88,height:88,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,252,210,.95),rgba(255,190,80,.15) 62%,transparent 70%)",left:11,top:-11 }} /></div>
  if (kind === "wave") return <div style={base}><span style={{ position:"absolute",left:-20,right:-20,bottom:-24,height:80,borderRadius:"50% 50% 0 0",border:"2px solid rgba(255,255,255,.35)",transform:"rotate(-8deg)" }} /><span style={{ position:"absolute",left:-20,right:-20,bottom:-34,height:80,borderRadius:"50% 50% 0 0",border:"2px solid rgba(255,255,255,.2)",transform:"rotate(-8deg)" }} /></div>
  if (kind === "petal") return <div style={base}><span style={{ position:"absolute",inset:16,borderRadius:"60px 8px 60px 8px",background:"rgba(255,255,255,.34)",transform:"rotate(24deg)" }} /></div>
  if (kind === "ring") return <div style={base}><span style={{ position:"absolute",width:90,height:90,borderRadius:"50%",border:"1px solid rgba(255,255,255,.7)",left:10,top:8,boxShadow:"0 0 0 8px rgba(255,255,255,.09)" }} /></div>
  if (kind === "tri") return <div style={base}><span style={{ position:"absolute",left:"50%",top:20,width:0,height:0,borderLeft:"36px solid transparent",borderRight:"36px solid transparent",borderBottom:"58px solid rgba(255,255,255,.32)",transform:"translateX(-50%)" }} /></div>
  if (kind === "dots") return <div style={base}><span style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,.5) 1.5px,transparent 1.6px)",backgroundSize:"13px 13px" }} /></div>
  return <div style={base}><span style={{ position:"absolute",width:140,height:140,borderRadius:"50%",borderTop:"20px solid rgba(255,255,255,.35)",left:-15,top:-40,transform:"rotate(28deg)" }} /></div>
}

export default function CoverFlow27() {
  const [off, setOff] = useState(0)
  const [hover, setHover] = useState(false)
  const start = useRef<{ x: number; off: number }>({ x: 0, off: 0 })

  useEffect(() => {
    if (!hover || INTERACTION === "drag") return
    if (INTERACTION === "scroll" || INTERACTION === "pointer") return
    const id = window.setInterval(() => setOff(o => o + 1), 1700)
    return () => window.clearInterval(id)
  }, [hover])

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (INTERACTION === "pointer") {
      const r = e.currentTarget.getBoundingClientRect()
      setOff(((e.clientX - r.left) / r.width) * COVERS.length)
    } else if (INTERACTION === "drag" && start.current) {
      setOff(start.current.off + (e.clientX - start.current.x) / 26)
    }
  }
  const onDown = (e: RPointerEvent<HTMLDivElement>) => { start.current = { x: e.clientX, off: off }; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const onWheel = (e: RWheelEvent<HTMLDivElement>) => { if (INTERACTION === "scroll") setOff(o => o + Math.sign(e.deltaY) * .6) }

  return (
    <div
      onPointerEnter={() => { setHover(true); start.current = { x: 0, off } }}
      onPointerLeave={() => setHover(false)}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onWheel={onWheel}
      style={{ position:"relative",minHeight:252,padding:14,borderRadius:10,overflow:"hidden",background:STAGE,cursor:INTERACTION==="drag"?"grab":"default",touchAction:"none" }}
    >
      <div style={{ position:"relative",width:"100%",height:224,perspective:950,overflow:"hidden" }}>
        <div style={{ position:"absolute",left:"50%",top:"48%",width:0,height:0,transformStyle:"preserve-3d" }}>
          {COVERS.map((c, i) => {
            const p = place(i, COVERS.length, off)
            return (
              <div key={i} style={{
                position:"absolute",left:-55,top:-55,width:110,height:110,borderRadius:7,
                transformStyle:"preserve-3d",willChange:"transform,opacity",
                transform:`translate3d(${p.x}px,${p.y}px,${p.z}px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) scale(${p.sc})`,
                opacity:p.op, zIndex:Math.round(60 - Math.abs(wrap(i-off,COVERS.length))),
                filter:`blur(${p.blur}px)`, transition:"transform .75s cubic-bezier(.22,1,.36,1),opacity .6s,filter .6s",
                background:`linear-gradient(150deg,${c.c1},${c.c2})`,
                boxShadow:"0 16px 30px rgba(0,0,0,.4),inset 0 0 0 1px rgba(255,255,255,.12)",
                overflow:"hidden",
                WebkitBoxReflect: FAMILY==="drum" && 27%3===0 ? "below 7px linear-gradient(transparent 58%,rgba(255,255,255,.24))" : undefined,
              }}>
                <Art kind={c.art} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(125deg,rgba(255,255,255,.3),transparent 40%,transparent 62%,rgba(0,0,0,.2))" }} />
                <div style={{ position:"absolute",left:10,right:10,top:9,color:"#fff",fontSize:6.5,letterSpacing:".18em",opacity:.78 }}>{c.sub}</div>
                <div style={{ position:"absolute",left:10,right:10,bottom:9,color:"#fff" }}>
                  <b style={{ display:"block",fontSize:14,lineHeight:1.05,letterSpacing:"-.02em" }}>{c.title}</b>
                  <small style={{ fontSize:6.5,letterSpacing:".12em",opacity:.72 }}>NO.0{i+1} / 08</small>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ position:"absolute",left:11,bottom:10,zIndex:6,fontSize:8,letterSpacing:".1em",padding:"4px 8px",borderRadius:99,background:"rgba(20,20,30,.58)",color:"#fff" }}>
        左右划 · 指针擦洗
      </div>
    </div>
  )
}
