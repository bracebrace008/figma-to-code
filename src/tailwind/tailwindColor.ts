import { paintToCSS } from "../utils/colorUtil"

export function getTailwindColor(node: FrameNode) {
    return `text-[${paintToCSS(node.strokes[0])}]`
}

export function getTailwindBg(node: FrameNode) {
    return `bg-[${paintToCSS(node.fills[0])}]`
}