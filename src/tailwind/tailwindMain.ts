import { getTailwindAutoLayout } from "./tailwindAutoLayout";
import { getTailwindBg, getTailwindColor } from "./tailwindColor";
import { getTailwindPadding } from "./tailwindPadding";
import { getTailwindSize } from "./tailwindSize";
import { tailwindTextBuilder } from "./tailwindText";

function tailwindFrame(node: FrameNode) {
    const tailwindClass = [
        getTailwindColor(node),
        getTailwindBg(node),
        getTailwindSize(node),
        getTailwindPadding(node),
        getTailwindAutoLayout(node)
    ].join(' ').trim();
    return `<div class="${tailwindClass}"></div>`;
}

export function tailwindGenerator(node: FrameNode | TextNode): string {
    let content = '';
    switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "INSTANCE":
        case "COMPONENT_SET":
            content += tailwindFrame(node);
            break;
        case "TEXT":
            content += tailwindTextBuilder(node as TextNode);
            break;
    }
    return content;
}

