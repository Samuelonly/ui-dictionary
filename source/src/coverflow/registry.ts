// CoverFlow 组件索引：编号 → 组件。AI 找编号请直接看 CoverFlow-XX.tsx。
import type { ComponentType } from "react"
import C1 from "./CoverFlow-01"
import C3 from "./CoverFlow-03"
import C4 from "./CoverFlow-04"
import C5 from "./CoverFlow-05"
import C6 from "./CoverFlow-06"
import C8 from "./CoverFlow-08"
import C11 from "./CoverFlow-11"
import C12 from "./CoverFlow-12"
import C14 from "./CoverFlow-14"
import C15 from "./CoverFlow-15"
import C16 from "./CoverFlow-16"
import C18 from "./CoverFlow-18"
import C19 from "./CoverFlow-19"
import C20 from "./CoverFlow-20"
import C21 from "./CoverFlow-21"
import C23 from "./CoverFlow-23"
import C28 from "./CoverFlow-28"
import C29 from "./CoverFlow-29"
import C47 from "./CoverFlow-47"
import C48 from "./CoverFlow-48"
import C49 from "./CoverFlow-49"
import C50 from "./CoverFlow-50"
import C51 from "./CoverFlow-51"

export type CoverFlowEntry = { num: number; en: string; cn: string; def: string; family: string; interaction: string; Comp: ComponentType }
export const COVERFLOWS: CoverFlowEntry[] = [
  { num: 1, en: "Album Cover Flow With Reflections", cn: "带倒影的专辑流", def: "一排专辑封面沿滚轮轨道翻动，中间那张底下带一道倒影。", family: "drum", interaction: "hover", Comp: C1 },
  { num: 3, en: "Draggable 3D Image Ring", cn: "可拖拽的 3D 图片环", def: "照片围成一圈，按住拖就转，松手慢下来。", family: "ring", interaction: "drag", Comp: C3 },
  { num: 4, en: "Widescreen 3D Image Ring", cn: "宽屏视频 3D 环", def: "横版视频封面围成环转，像一圈播放中的影片。", family: "ring", interaction: "drag", Comp: C4 },
  { num: 5, en: "Arc Card Carousel", cn: "弧形幻灯片轮播", def: "幻灯片沿一段圆弧摊开，像演示现场的切页。", family: "arc", interaction: "hover", Comp: C5 },
  { num: 6, en: "Vertical Cover Flow With Details", cn: "竖向商品流带详情", def: "商品竖着排，选中那张旁边浮出规格和价格。", family: "spine", interaction: "hover", Comp: C6 },
  { num: 8, en: "Bookshelf Spine Carousel", cn: "书架书脊轮播", def: "一本本书立着排，书脊朝外，横向划过去。", family: "spine", interaction: "hover", Comp: C8 },
  { num: 11, en: "Autoplay Story Ring", cn: "限时动态计时流", def: "竖版动态一张张换，顶部进度条慢慢走完。", family: "row", interaction: "hover", Comp: C11 },
  { num: 12, en: "Timeline Scrubber Cover Flow", cn: "时间轴照片流", def: "照片沿年份排开，下方一条时间轴拖着跳。", family: "row", interaction: "hover", Comp: C12 },
  { num: 14, en: "Product Cover Flow With Sizes", cn: "多尺寸商品流", def: "同一类商品按大小排开，中间大两边小，带价格。", family: "drum", interaction: "hover", Comp: C14 },
  { num: 15, en: "Film Poster Cover Flow", cn: "电影海报流", def: "竖版海报错落排开，带片名和评分。", family: "drum", interaction: "hover", Comp: C15 },
  { num: 16, en: "Soft Focus Autoplay Row", cn: "柔焦摄影作品行", def: "横版照片一字排开，远处的自己虚掉，焦点最清楚。", family: "row", interaction: "hover", Comp: C16 },
  { num: 18, en: "Fullscreen Cover Flow Hero", cn: "全屏封面主视觉", def: "大图铺满，标题和按钮压在上面，像网站首屏。", family: "row", interaction: "hover", Comp: C18 },
  { num: 19, en: "Tilting Print Cover Flow", cn: "倾斜杂志印刷品流", def: "一摞杂志各自歪一点，像摊在桌上的印刷品。", family: "drum", interaction: "hover", Comp: C19 },
  { num: 20, en: "Elastic Drag Cover Flow", cn: "弹性拖拽图片流", def: "照片能拖着走，松手会慢慢弹回来。", family: "drum", interaction: "drag", Comp: C20 },
  { num: 21, en: "Concave Perspective Carousel", cn: "凹面透视图片流", def: "照片排成往里凹的弧，中间远、两边近。", family: "arc", interaction: "hover", Comp: C21 },
  { num: 23, en: "Autoplay Lookbook Cover Flow", cn: "时装造型册流", def: "一页页造型图慢慢翻过去，带 LOOK 编号。", family: "drum", interaction: "hover", Comp: C23 },
  { num: 28, en: "Speaker Flip Cover Flow", cn: "嘉宾翻页封面流", def: "人像卡沿一条直线排开，点中间那张慢慢翻到嘉宾信息。", family: "row", interaction: "click", Comp: C28 },
  { num: 29, en: "Tunnel Cover Flow", cn: "隧道图片流", def: "照片一层层往里退，越远越小，像望进隧道。", family: "tunnel", interaction: "hover", Comp: C29 },
  { num: 47, en: "Velocity Cover Flow", cn: "速度感图片流", def: "横版画面带着速度线飞过，适合运动、汽车。", family: "row", interaction: "hover", Comp: C47 },
  { num: 48, en: "Edge-On Cover Flow", cn: "侧立卡片流", def: "卡片几乎侧着身子排，焦点那张才转正。", family: "edge", interaction: "hover", Comp: C48 },
  { num: 49, en: "Panorama Cover Flow", cn: "全景长卷流", def: "风景照片一字铺开，像在看一幅长卷。", family: "row", interaction: "hover", Comp: C49 },
  { num: 50, en: "Pleated Drum Cover Flow", cn: "褶皱鼓形图片流", def: "鼓形环上一张深一张浅，像打了褶的图片带。", family: "drum", interaction: "hover", Comp: C50 },
  { num: 51, en: "Scroll Tunnel Cover Flow", cn: "滚动隧道流", def: "往下滚，照片从隧道深处一张张迎面来。", family: "tunnel", interaction: "scroll", Comp: C51 },
]
