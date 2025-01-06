import { getTailwindBg, getTailwindColor } from "./tailwindColor";
import { getTailwindPadding } from "./tailwindPadding";
import { getTailwindSize } from "./tailwindSize";

function tailwindFrame(node: FrameNode) {
    const tailwindClass = [
        getTailwindColor(node),
        getTailwindBg(node),
        getTailwindSize(node),
        getTailwindPadding(node)
    ].join(' ');
    return `<div class="${tailwindClass}"></div>`;
}

function tailwindText(node: FrameNode) {
    return `<div class=""></div>`;
}

export function tailwindGenerator(node: FrameNode) {
    let content = '';
    switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "INSTANCE":
        case "COMPONENT_SET":
            content = tailwindFrame(node);
            break;
        case "TEXT":
            content = tailwindText(node);
            break;
    }
    return content;
}

