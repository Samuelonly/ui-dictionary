import { createContext, useContext, useRef, type ReactNode, type PointerEvent } from "react"

/* ============================================================
   原型卡：把「白底线框」演示区换成「彩色底 + 迷你真实页面」。
   骨架（大 Tab / 三列 / 编号 / 词条信息）不在这里，属于 App.tsx。
   ============================================================ */

type Cat = "c1" | "c2" | "c3" | "c4"
export const CatContext = createContext<Cat>("c1")

/* 每条 = [配色主题, 站点名, 导航(用 | 分隔), 小标, 大标题, 说明, 页脚] */
const SCENES: Record<Cat, string[][]> = {
  c1: [
    ["0","北 岸 商 店","新品|系列|关于","NEW ARRIVAL · 2026","摸得到的质感","把鼠标停在任意一件东西上，看看它怎么回应你。","NORTH SHORE / EST. 2024"],
    ["4","旅 行 笔 记","目的地|行程|收藏","WHERE TO NEXT","下一站去哪","把想去的城市和日子，先收进一张小卡片里。","JOURNAL / VOL. 08"],
    ["2","数 据 看 板","总览|趋势|设置","WEEKLY REPORT","本周概览","数字旁边的小提示，鼠标停一下就出来。","UPDATED 09:41"],
    ["7","云 盘","文件|共享|回收站","MY FILES","你的文件","删掉之前，总要再问一句「确定吗」。","12.4 GB / 50 GB"],
    ["4","项 目 设 置","常规|成员|通知","WORKSPACE","工作区设置","改完记得保存，右上角会告诉你一声。","TEAM PLAN / 4 MEMBERS"],
    ["3","购 物 袋","商品|配送|支付","YOUR BAG","购物袋","从右边滑进来的那一层，装着还没付的东西。","3 ITEMS / FREE SHIPPING"],
    ["1","邮 箱","收件箱|已发送|草稿","INBOX","收件箱","一个按钮，展开一串动作。","24 UNREAD"],
    ["2","帮 助 中 心","常见问题|联系|反馈","FAQ","常见问题","一次只展开一条，别把人吓跑。","LAST UPDATED 10.02"],
    ["5","资 讯 流","推荐|关注|热门","LOADING","正在为你准备","内容还没到，先把位置占好。","FEED / 20 ITEMS"],
    ["0","画 廊","展览|艺术家|门票","LIGHT & FORM","光的形状","看不清后面，是因为前面这层暗了下来。","GALLERY 02 / OPEN"],
    ["6","表 单 实 验 室","注册|登录|样例","CREATE ACCOUNT","创建一个账号","能点、不能点、正在点——三种样子。","STEP 1 OF 1"],
    ["3","仪 表 盘","总览|分析|报表","OVERVIEW","总览","同一个位置，换个标签就是另一屏内容。","REAL-TIME DATA"],
    ["2","智 能 家 居","客厅|卧室|阳台","LIVING ROOM","客厅","轻轻一拨，灯就换了状态。","3 DEVICES ONLINE"],
    ["1","待 办 清 单","今天|本周|完成","TO DO","今天要做","勾掉一件，就少一件。","2 OF 5 DONE"],
    ["7","版 本 日 志","更新|修复|计划","WHAT'S NEW","最近更新","小小的角标，说明它刚来。","v2.4.0 / 2026.10"],
    ["4","团 队","成员|邀请|权限","OUR PEOPLE","一起做东西的人","每张小圆脸后面，都是一个真的人。","6 MEMBERS"],
    ["0","上 传 中 心","队列|历史|设置","UPLOADING","正在上传","走多少，就给它看多少。","3 FILES / 68%"],
    ["6","调 色 台","颜色|字号|导出","COLOR LAB","调出你的颜色","拖一拖，整页的脾气就变了。","HEX #C9793D"],
    ["5","工 作 台","搜索|最近|快捷","QUICK JUMP","快速跳转","一个输入框，通到站里每个角落。","⌘K TO OPEN"],
    ["2","文 档 库","指南|组件|规范","DESIGN GUIDE","设计指南","知道自己站在第几层，才不会迷路。","DOCS / SECTION 3"],
    ["1","收 藏 夹","全部|稍后读|归档","SAVED","这里还空着","空也要空得好看，顺便说一句怎么开始。","0 ITEMS"],
  ],
  c2: [
    ["5","版 面 手 记","目录|样张|笔记","LAYOUT","一页的秩序","页头、正文、页脚，各站各的位置。","GRID STUDY / 01"],
    ["1","素 材 库","色卡|字体|图片","SWATCHES","色卡收藏","三列摆开，间距一致，眼睛才不累。","3 COLS · GAP 8"],
    ["4","导 航 实 验","横向|纵向|对比","FLEX","排成一行","谁先谁后、谁离谁远，一条轴说了算。","ROW / SPACE-BETWEEN"],
    ["2","阅 读 器","书架|正在读|笔记","STACK","往下读","一段接一段，中间留一样多的气。","VERTICAL RHYTHM"],
    ["7","长 文","随笔|专题|关于","CONTAINER","留白的意义","字不能顶到边，两边得空出来。","MAX-WIDTH 680"],
    ["0","专 题","城市|人物|影像","FEATURE","城市切片","一大块内容，自己有头有尾。","SECTION 02 / 04"],
    ["3","组 件 册","按钮|卡片|输入","BLOCK","一块内容","能单独搬走、放哪儿都成立的最小单位。","REUSABLE UNIT"],
  ],
  c3: [
    ["0","夜 灯","开|关|定时","GLOW","亮起来","暗处的一圈光，比整片亮更抓人。","AMBIENT / 2700K"],
    ["7","影 集","全部|年份|相册","FADE","慢慢浮现","不吓人地出现，是最礼貌的出现。","12 PHOTOS"],
    ["4","海 边 的 风","日记|照片|地图","SLIDE","从旁边进来","带一点方向感，就知道它从哪来。","FRAME 04"],
    ["1","放 大 镜","细节|全图|对比","SCALE","靠近一点","变大变小，是注意力在呼吸。","ZOOM 1.0×"],
    ["6","心 率","实时|历史|设置","PULSE","还在跳","轻轻起伏，说明它还活着。","72 BPM"],
    ["3","糖 果 铺","新品|口味|门店","BOUNCE","弹一下","过一点再回来，才有弹性。","SPRING 0.6"],
    ["5","校 验","账号|密码|帮助","SHAKE","再试一次","晃两下，不用说话也知道不对。","INVALID INPUT"],
    ["2","加 载 中","任务|队列|完成","SPIN","稍等片刻","转着圈，告诉人别走开。","LOADING…"],
    ["0","水 面","点击|波纹|涟漪","RIPPLE","点一下","从手指落下的地方，一圈圈散开。","TAP ANYWHERE"],
    ["6","快 讯","头条|滚动|归档","MARQUEE","滚动的字","走马灯一样，慢慢从右边流过去。","LIVE FEED"],
    ["1","打 字 间","稿件|字体|导出","TYPEWRITER","一个字一个字","像有人正在这儿写字。","CURSOR BLINKING"],
    ["2","缓 动 曲 线","曲线|参数|对比","EASING","怎么走过去","同样一段路，快起慢停就舒服了。","CUBIC-BEZIER"],
    ["7","链 接 集","全部|站内|站外","HIGHLIGHTS","划过去","鼠标一停，那行字自己亮起来。","13 LINKS"],
    ["0","夜 行 ・ 摄 影 集","作品|关于|联系","SPOTLIGHT","聚光灯卡片","一团柔光跟着鼠标走。","NO. 01 / 12"],
    ["1","SIDE A · RECORDS","专辑|巡演|商店","3D TILT","3D 跟随倾斜","卡片朝鼠标那边轻轻立体转一下。","12 TRACKS / 42 MIN"],
    ["3","周 五 来 信","往期|关于","MAGNETIC","磁吸按钮","按钮像有磁性，靠近就吸一下。","EVERY FRIDAY"],
    ["5","写 给 自 己","随笔|归档","LINE REVEAL","逐行遮罩升起","标题一行一行从下往上升起。","2026.10 / 随笔"],
    ["2","动 效 小 记","全部|关于","UNDERLINE","下划线展开","链接下划线从左往右画出来。","共 20 篇"],
    ["4","作 品 集","全部|设计|开发","STAGGER","错峰淡入上移","卡片一张接一张，错开时间浮上来。","3 SELECTED WORKS"],
  ],
  c4: [
    ["4","订 单 页","商品|物流|发票","ORDER #2048","你的订单","屏宽一变，导航收起来、三列并成一列。","拖底部滑杆看变化"],
    ["2","小 屏 优 先","手机|平板|桌面","MOBILE FIRST","从手机开始","先照顾最窄的那块屏，再往上加。","320PX UP"],
    ["7","画 框","流动|固定|对比","FLUID","会伸缩的页","有的跟着窗口长，有的守着自己的宽。","MIN 320 / MAX 1200"],
    ["0","长 文","目录|正文|笔记","STICKY","跟着你","读到哪儿，目录还钉在那儿。","POSITION: STICKY"],
  ],
}

/* ---------- 通用迷你页面 ---------- */
function GenericMini({ num, en, children }: { num: number; en: string; children: ReactNode }) {
  const cat = useContext(CatContext)
  const row = SCENES[cat][num - 1] ?? SCENES[cat][0]
  const [theme, brand, nav, eyebrow, title, sub, foot] = row
  const art = (num + cat.charCodeAt(1)) % 4
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <div className={`uix-stage uix-t${theme}`}>
      <div className="uix-mini" ref={ref} onPointerMove={move} onPointerLeave={() => {
        ref.current?.style.setProperty("--mx", "50%")
        ref.current?.style.setProperty("--my", "38%")
      }}>
        <div className={`uix-art a${art}`} />
        <div className="uix-nav">
          <span className="uix-brand">{brand}</span>
          <span className="uix-links">{nav.split("|").map((x, i) => <span key={i}>{x}</span>)}</span>
          <span className="uix-dot" />
        </div>
        <div className="uix-hero">
          <div className="uix-eyebrow">{eyebrow}</div>
          <div className="uix-title">{title}</div>
          <div className="uix-sub">{sub}</div>
        </div>
        <div className="uix-panel">
          <div className="uix-panelbar"><i /><i /><i /><span style={{ marginLeft: 5 }}>{en} · 交互预览</span></div>
          <div className="uix-slot">{children}</div>
        </div>
        <div className="uix-foot"><span>{foot}</span><span>UI DICTIONARY</span></div>
        <div className="uix-glow" />
      </div>
    </div>
  )
}

/* ---------- 6 个专属场景（完整迷你页面，不装 children） ---------- */
function SceneNav({ brand, links }: { brand: string; links: string[] }) {
  return <div className="uix-nav"><span className="uix-brand">{brand}</span><span className="uix-links">{links.map((x, i) => <span key={i}>{x}</span>)}</span><span className="uix-dot" /></div>
}

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div className="uix-stage uix-t0">
      <div className="uix-raw">
        <div className="uix-scene uix-s14" ref={ref} onPointerMove={move} onPointerLeave={() => {
          ref.current?.style.setProperty("--mx", "50%")
          ref.current?.style.setProperty("--my", "36%")
        }}>
          <div className="uix-sky" /><div className="uix-ridge" />
          <SceneNav brand="夜 行 ・ 摄 影 集" links={["作品", "关于", "联系"]} />
          <div className="uix-eyebrow" style={{ marginTop: "auto" }}>2026 · PHOTO ESSAY</div>
          <div className="uix-bigtitle" style={{ marginTop: 6 }}>夜行<small>NIGHT WALK</small></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 11 }}>
            <span className="uix-scap" style={{ maxWidth: 145 }}>城市熄灯之后，光才真正开始说话。</span>
            <span className="uix-scta">看作品 →</span>
          </div>
          <div className="uix-srule" />
          <div className="uix-sfoot"><span>NO. 01 / 12</span><span>SHOT ON 35MM</span></div>
          <div className="uix-glow" />
        </div>
      </div>
    </div>
  )
}

function Tilt() {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - .5
    const py = (e.clientY - r.top) / r.height - .5
    el.style.transform = `perspective(900px) rotateX(${-py * 11}deg) rotateY(${px * 11}deg)`
  }
  return (
    <div className="uix-stage uix-t1">
      <div className="uix-raw">
        <div className="uix-scene uix-s15" ref={ref} onPointerMove={move}
          onPointerLeave={() => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)" }}>
          <SceneNav brand="SIDE A · RECORDS" links={["专辑", "巡演", "商店"]} />
          <div style={{ display: "flex", gap: 13, alignItems: "center", marginTop: "auto", marginBottom: "auto" }}>
            <div className="uix-vinyl" />
            <div>
              <div className="uix-album">第一张专辑<small>THE FIRST ALBUM · 2026</small></div>
              <div className="uix-tracks">01 慢慢来　02 海边<br />03 夜行　　04 写给秋天</div>
              <div className="uix-play">▶ 播放整张</div>
            </div>
          </div>
          <div className="uix-eyebrow" style={{ opacity: .55 }}>12 首 · 42 分钟 · 黑胶限定</div>
        </div>
      </div>
    </div>
  )
}

function Magnetic() {
  const scene = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!scene.current || !btn.current) return
    const r = btn.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const dist = Math.hypot(dx, dy)
    const k = dist < 170 ? .3 * (1 - dist / 170) : 0
    btn.current.style.transform = `translate(${dx * k}px, ${dy * k}px)`
  }
  return (
    <div className="uix-stage uix-t3">
      <div className="uix-raw">
        <div className="uix-scene uix-s16" ref={scene} onPointerMove={move}
          onPointerLeave={() => { if (btn.current) btn.current.style.transform = "translate(0,0)" }}>
          <SceneNav brand="周 五 来 信" links={["往期", "关于"]} />
          <div className="uix-sbig">把灵感<br /><em>留住。</em></div>
          <div className="uix-scap" style={{ marginTop: 10, marginBottom: 12, maxWidth: 210 }}>每周五一封信，聊设计、动效和那些做东西时的小念头。</div>
          <div style={{ display: "flex", gap: 7 }}>
            <span className="uix-input">你的邮箱地址</span>
            <button className="uix-mag" ref={btn}>订阅 →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LineReveal() {
  return (
    <div className="uix-stage uix-t5">
      <div className="uix-raw">
        <div className="uix-scene uix-s17">
          <SceneNav brand="写 给 自 己" links={["随笔", "归档"]} />
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            <div className="uix-line"><span>最要紧的是</span></div>
            <div className="uix-line dim"><span>慢慢来，</span></div>
            <div className="uix-line"><span>每一步都看得见。</span></div>
          </div>
          <div className="uix-scap" style={{ maxWidth: 215, marginBottom: 9 }}>写东西最怕急。句子一行一行落下来，踩稳了再抬脚。</div>
          <div className="uix-eyebrow" style={{ opacity: .5 }}>2026.10 · 随笔 / 第 12 篇</div>
        </div>
      </div>
    </div>
  )
}

function Underline() {
  return (
    <div className="uix-stage uix-t2">
      <div className="uix-raw">
        <div className="uix-scene uix-s18">
          <SceneNav brand="动 效 小 记" links={["全部", "关于"]} />
          <h5>目录</h5>
          <ul>
            <li><span className="t">做一个会呼吸的开屏</span><span className="n">10.12</span></li>
            <li><span className="t">做一个动效目录</span><span className="n">10.03</span></li>
            <li><span className="t">秋天去看海</span><span className="n">09.21</span></li>
            <li><span className="t">把想法做成能用的东西</span><span className="n">09.08</span></li>
          </ul>
          <div className="uix-eyebrow" style={{ marginTop: "auto", opacity: .5 }}>共 20 篇 · 悬停看下划线</div>
        </div>
      </div>
    </div>
  )
}

function Stagger() {
  return (
    <div className="uix-stage uix-t4">
      <div className="uix-raw">
        <div className="uix-scene uix-s19">
          <SceneNav brand="作 品 集" links={["全部", "设计", "开发"]} />
          <h5>精选作品</h5>
          <div className="uix-tiles">
            <div className="uix-tile"><div className="pic" /><div className="t">记账小程序</div><div className="d">2025 · 工具</div></div>
            <div className="uix-tile"><div className="pic" /><div className="t">品牌手册</div><div className="d">2025 · 品牌</div></div>
            <div className="uix-tile"><div className="pic" /><div className="t">个人网站</div><div className="d">2026 · 网页</div></div>
          </div>
          <div className="uix-eyebrow" style={{ marginTop: 10, opacity: .5 }}>全部 3 件 / 悬停依次浮入</div>
        </div>
      </div>
    </div>
  )
}

/* num → 专属场景（放进现有「动效词」Tab，不新增分类） */
export const SCENE_COMPONENTS: Record<number, ReactNode> = {
  14: <Spotlight />, 15: <Tilt />, 16: <Magnetic />,
  17: <LineReveal />, 18: <Underline />, 19: <Stagger />,
}

/* 舞台入口：有专属场景就用它，否则用通用迷你页面把原 demo 装进去 */
export function PrototypeStage({ num, en, scene, children }: { num: number; en: string; scene?: ReactNode; children?: ReactNode }) {
  if (scene) return <>{scene}</>
  return <GenericMini num={num} en={en}>{children}</GenericMini>
}
