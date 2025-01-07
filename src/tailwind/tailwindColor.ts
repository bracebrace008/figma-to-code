import { paintToCSS } from "../utils/colorUtil";

export function getTailwindColor(node: FrameNode) {
  return node.strokes?.[0] ? `text-[${paintToCSS(node.strokes[0])}]` : "";
}

export function getTailwindBg(node: FrameNode) {
  return node.fills?.[0] && node.fills[0].visible
    ? `bg-[${paintToCSS(node.fills[0])}]`
    : "";
}
