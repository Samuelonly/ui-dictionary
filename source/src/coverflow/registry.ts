// 54 个 CoverFlow 组件索引：编号 → 组件。AI 找编号请直接看 CoverFlow-XX.tsx。
import type { ComponentType } from "react"
import C1 from "./CoverFlow-01"
import C2 from "./CoverFlow-02"
import C3 from "./CoverFlow-03"
import C4 from "./CoverFlow-04"
import C5 from "./CoverFlow-05"
import C6 from "./CoverFlow-06"
import C7 from "./CoverFlow-07"
import C8 from "./CoverFlow-08"
import C9 from "./CoverFlow-09"
import C11 from "./CoverFlow-11"
import C12 from "./CoverFlow-12"
import C13 from "./CoverFlow-13"
import C14 from "./CoverFlow-14"
import C15 from "./CoverFlow-15"
import C16 from "./CoverFlow-16"
import C18 from "./CoverFlow-18"
import C19 from "./CoverFlow-19"
import C20 from "./CoverFlow-20"
import C21 from "./CoverFlow-21"
import C23 from "./CoverFlow-23"
import C24 from "./CoverFlow-24"
import C25 from "./CoverFlow-25"
import C26 from "./CoverFlow-26"
import C27 from "./CoverFlow-27"
import C28 from "./CoverFlow-28"
import C29 from "./CoverFlow-29"
import C30 from "./CoverFlow-30"
import C31 from "./CoverFlow-31"
import C32 from "./CoverFlow-32"
import C33 from "./CoverFlow-33"
import C34 from "./CoverFlow-34"
import C35 from "./CoverFlow-35"
import C36 from "./CoverFlow-36"
import C37 from "./CoverFlow-37"
import C38 from "./CoverFlow-38"
import C39 from "./CoverFlow-39"
import C40 from "./CoverFlow-40"
import C41 from "./CoverFlow-41"
import C42 from "./CoverFlow-42"
import C43 from "./CoverFlow-43"
import C44 from "./CoverFlow-44"
import C45 from "./CoverFlow-45"
import C46 from "./CoverFlow-46"
import C47 from "./CoverFlow-47"
import C48 from "./CoverFlow-48"
import C49 from "./CoverFlow-49"
import C50 from "./CoverFlow-50"
import C51 from "./CoverFlow-51"
import C52 from "./CoverFlow-52"
import C53 from "./CoverFlow-53"
import C54 from "./CoverFlow-54"
import C55 from "./CoverFlow-55"
import C56 from "./CoverFlow-56"
import C57 from "./CoverFlow-57"

export type CoverFlowEntry = { num: number; en: string; cn: string; def: string; family: string; interaction: string; Comp: ComponentType }
export const COVERFLOWS: CoverFlowEntry[] = [
  { num: 1, en: "Album Cover Flow With Reflections", cn: "带倒影的专辑流", def: "封面绕成一圈，中间那张底下一道倒影，慢慢转。", family: "drum", interaction: "auto", Comp: C1 },
  { num: 2, en: "Infinite Album Cover Flow", cn: "无限循环封面流", def: "封面首尾接上，永远转不到头。", family: "ring", interaction: "auto", Comp: C2 },
  { num: 3, en: "Draggable 3D Image Ring", cn: "可拖拽的 3D 环", def: "封面围成环，按住拖就转，松手带一点惯性。", family: "drum", interaction: "drag", Comp: C3 },
  { num: 4, en: "Widescreen 3D Image Ring", cn: "宽屏 3D 环", def: "环拉得更宽更扁，适合横着铺满一屏。", family: "drum", interaction: "auto", Comp: C4 },
  { num: 5, en: "Arc Card Carousel", cn: "弧形卡片轮播", def: "卡片只排一小段弧，像摊开的扇形。", family: "arc", interaction: "auto", Comp: C5 },
  { num: 6, en: "Vertical Cover Flow With Details", cn: "竖向封面流带详情", def: "封面竖着往上排，选中的那张旁边带详情。", family: "spine", interaction: "auto", Comp: C6 },
  { num: 7, en: "Vinyl Record Cover Flow", cn: "黑胶唱片封面流", def: "封面做成一张张唱片，转起来像在放歌。", family: "disc", interaction: "auto", Comp: C7 },
  { num: 8, en: "Bookshelf Spine Carousel", cn: "书架书脊轮播", def: "一本本书立着排，书脊朝外，横向划过去。", family: "spine", interaction: "auto", Comp: C8 },
  { num: 9, en: "Autoplay Tower Helix", cn: "自动塔式螺旋", def: "封面绕着一根看不见的轴往上螺旋。", family: "helix", interaction: "auto", Comp: C9 },
  { num: 11, en: "Autoplay Cover Flow With Ring Timer", cn: "环形计时封面流", def: "封面外圈有一道慢慢走完的计时环。", family: "drum", interaction: "auto", Comp: C11 },
  { num: 12, en: "Timeline Scrubber Cover Flow", cn: "时间轴擦洗封面流", def: "下面一条时间轴，拖着它在封面之间跳。", family: "row", interaction: "pointer", Comp: C12 },
  { num: 13, en: "Video Reel Cover Flow", cn: "视频卷轴封面流", def: "一帧帧画面连成卷轴，像胶片在走。", family: "reel", interaction: "auto", Comp: C13 },
  { num: 14, en: "Product Cover Flow With Sizes", cn: "多尺寸产品封面流", def: "同一件商品按大小排开，中间大两边小。", family: "drum", interaction: "auto", Comp: C14 },
  { num: 15, en: "Film Poster Cover Flow", cn: "电影海报封面流", def: "竖版海报错落排开，像影院走廊。", family: "spine", interaction: "auto", Comp: C15 },
  { num: 16, en: "Soft Focus Autoplay Row", cn: "柔焦自动播放行", def: "远处的封面自己虚掉，焦点那张最清楚。", family: "row", interaction: "auto", Comp: C16 },
  { num: 18, en: "Fullscreen Cover Flow Hero", cn: "全屏封面主视觉", def: "封面铺满整个屏，一进来就是主角。", family: "drum", interaction: "auto", Comp: C18 },
  { num: 19, en: "Tilting Print Cover Flow", cn: "倾斜印刷品封面流", def: "每张封面各自歪一点，像摊在桌上的印刷品。", family: "drum", interaction: "auto", Comp: C19 },
  { num: 20, en: "Elastic Drag Cover Flow", cn: "弹性拖拽封面流", def: "拖的时候封面被拉着走，松手弹回来。", family: "drum", interaction: "drag", Comp: C20 },
  { num: 21, en: "Concave Perspective Carousel", cn: "凹面透视轮播", def: "环是往里凹的，中间远、两边近。", family: "drum", interaction: "auto", Comp: C21 },
  { num: 23, en: "Autoplay Lookbook Cover Flow", cn: "自动播放造型册", def: "一页页造型图自己翻过去。", family: "drum", interaction: "auto", Comp: C23 },
  { num: 24, en: "Lightbox Cover Flow", cn: "灯箱封面流", def: "封面排成网格，点开一张放大看。", family: "grid", interaction: "auto", Comp: C24 },
  { num: 25, en: "Scroll Pinned Cover Flow", cn: "滚动钉住封面流", def: "往下滚，封面一级级钉在阶梯上不动。", family: "stair", interaction: "scroll", Comp: C25 },
  { num: 26, en: "Filterable Project Cover Flow", cn: "可筛选项目封面流", def: "上面几个标签，点一下只留那一类封面。", family: "grid", interaction: "auto", Comp: C26 },
  { num: 27, en: "Pointer Scrub Cover Flow", cn: "指针擦洗封面流", def: "鼠标左右划，封面跟着一段段翻。", family: "drum", interaction: "pointer", Comp: C27 },
  { num: 28, en: "Speaker Flip Cover Flow", cn: "音箱翻页封面流", def: "封面像音箱的翻页牌，啪一下翻过去。", family: "flip", interaction: "auto", Comp: C28 },
  { num: 29, en: "Tunnel Cover Flow", cn: "隧道封面流", def: "封面一层层往里退，越远越小。", family: "tunnel", interaction: "auto", Comp: C29 },
  { num: 30, en: "Concertina Cover Flow", cn: "手风琴封面流", def: "封面像风琴褶一样一开一合。", family: "wave", interaction: "auto", Comp: C30 },
  { num: 31, en: "Staircase Cover Flow", cn: "阶梯封面流", def: "封面沿斜梯一级级排，一张张推到眼前。", family: "stair", interaction: "auto", Comp: C31 },
  { num: 32, en: "Isometric Cover Flow", cn: "等距封面流", def: "封面按等距视角摆，像游戏里的斜方格。", family: "isometric", interaction: "auto", Comp: C32 },
  { num: 33, en: "Slanted Cascade Cover Flow", cn: "倾斜瀑布封面流", def: "封面斜着往下淌，一层压一层。", family: "cascade", interaction: "auto", Comp: C33 },
  { num: 34, en: "Orbit Cover Flow", cn: "轨道封面流", def: "封面沿一条椭圆轨道慢慢绕。", family: "orbit", interaction: "auto", Comp: C34 },
  { num: 35, en: "Index Drum Cover Flow", cn: "索引鼓封面流", def: "鼓形环旁边带刻度，转到哪张一眼知道。", family: "drum", interaction: "auto", Comp: C35 },
  { num: 36, en: "Picker Wheel Cover Flow", cn: "选择轮盘封面流", def: "封面排在轮盘上，像抽奖转盘。", family: "wheel", interaction: "auto", Comp: C36 },
  { num: 37, en: "Rolling Disc Cover Flow", cn: "滚动圆盘封面流", def: "圆盘一边转一边往前滚。", family: "disc", interaction: "auto", Comp: C37 },
  { num: 38, en: "Ascending Stair Cover Flow", cn: "上升阶梯封面流", def: "封面沿阶梯往上升，越走越高。", family: "stair", interaction: "auto", Comp: C38 },
  { num: 39, en: "Split Stair Cover Flow", cn: "分叉阶梯封面流", def: "阶梯从中间分成两路，左右各走一边。", family: "stair", interaction: "auto", Comp: C39 },
  { num: 40, en: "Perspective Stair Cover Flow", cn: "透视阶梯封面流", def: "阶梯拉出很深的透视，一眼望到头。", family: "stair", interaction: "auto", Comp: C40 },
  { num: 41, en: "Drum Cover Flow", cn: "鼓形封面流", def: "封面围成一只鼓，中间大两边小，带倒影。", family: "drum", interaction: "auto", Comp: C41 },
  { num: 42, en: "Minimal Drum Cover Flow", cn: "极简鼓形流", def: "同样一只鼓，去掉所有装饰只留封面。", family: "drum", interaction: "auto", Comp: C42 },
  { num: 43, en: "Tilted Drum Cover Flow", cn: "倾斜鼓形流", def: "整只鼓歪着摆，转起来更有劲。", family: "drum", interaction: "auto", Comp: C43 },
  { num: 44, en: "Twin Drum Cover Flow", cn: "双鼓封面流", def: "两只鼓并排各转各的。", family: "drum", interaction: "auto", Comp: C44 },
  { num: 45, en: "Wave Ribbon Cover Flow", cn: "波浪丝带封面流", def: "封面连成一条丝带，上下起伏。", family: "wave", interaction: "auto", Comp: C45 },
  { num: 46, en: "Double Helix Cover Flow", cn: "双螺旋封面流", def: "两串封面绕成 DNA 那样交错上升。", family: "helix", interaction: "auto", Comp: C46 },
  { num: 47, en: "Velocity Cover Flow", cn: "速度封面流", def: "封面横向飞过，带一点速度模糊。", family: "row", interaction: "auto", Comp: C47 },
  { num: 48, en: "Edge-On Cover Flow", cn: "侧边封面流", def: "封面几乎侧着身子排，只露一条边。", family: "edge", interaction: "auto", Comp: C48 },
  { num: 49, en: "Panorama Cover Flow", cn: "全景封面流", def: "封面一字铺开，像在看一幅长卷。", family: "row", interaction: "auto", Comp: C49 },
  { num: 50, en: "Pleated Drum Cover Flow", cn: "褶皱鼓形流", def: "鼓形环上一张深一张浅，像打了褶。", family: "drum", interaction: "auto", Comp: C50 },
  { num: 51, en: "Scroll Tunnel Cover Flow", cn: "滚动隧道流", def: "往下滚，封面从隧道深处一张张迎面来。", family: "tunnel", interaction: "scroll", Comp: C51 },
  { num: 52, en: "Möbius Ribbon Cover Flow", cn: "莫比乌斯带封面流", def: "封面连成一条扭了半圈的带子。", family: "wave", interaction: "auto", Comp: C52 },
  { num: 53, en: "Cone Cover Flow", cn: "圆锥封面流", def: "封面绕成一个圆锥，越往上越小。", family: "cone", interaction: "auto", Comp: C53 },
  { num: 54, en: "Dome Cover Flow", cn: "穹顶封面流", def: "封面撑成一个半球，像罩在头上。", family: "dome", interaction: "auto", Comp: C54 },
  { num: 55, en: "Curl Tail Cover Flow", cn: "卷尾封面流", def: "封面绕上去之后尾巴卷了个圈。", family: "helix", interaction: "auto", Comp: C55 },
  { num: 56, en: "Bottom Edge Cover Flow Hero", cn: "底边主视觉封面流", def: "封面压在画面底边，只露半个弧。", family: "drum", interaction: "auto", Comp: C56 },
  { num: 57, en: "Flow to Grid Cover Flow", cn: "流转网格封面流", def: "先是环形流动，一散开变成整齐网格。", family: "grid", interaction: "auto", Comp: C57 },
]
