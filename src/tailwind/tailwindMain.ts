import { getTailwindAutoLayout } from "./tailwindAutoLayout";
import { getTailwindBg, getTailwindColor } from "./tailwindColor";
import { getTailwindPadding } from "./tailwindPadding";
import { getTailwindSize } from "./tailwindSize";
import { tailwindTextBuilder } from "./tailwindText";
import prettier from "prettier";

export async function figmaToTailwind(node: FrameNode) {
    const code = tailwindGenerator(node);
    const formattedCode = await prettier.format(code, {
        parser: "html",
        plugins: ["prettier-plugin-tailwindcss"],
    });
    return formattedCode;
}

function tailwindFrame(node: FrameNode) {
    const tailwindClass = [
        getTailwindColor(node),
        getTailwindBg(node),
        getTailwindSize(node),
        getTailwindPadding(node),
        getTailwindAutoLayout(node),
    ]
        .join(" ")
        .trim();
    return `<div class="${tailwindClass}">  ${node.children
        .map(tailwindGenerator)
        .join("")}
    </div>`;
}

export function tailwindGenerator(node: FrameNode | TextNode): string {
    let content = "";
    switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "INSTANCE":
        case "COMPONENT_SET":
        case "GROUP":
            content = tailwindFrame(node);
            break;
        case "TEXT":
            content = tailwindTextBuilder(node as TextNode);
            break;
    }
    return content;
}
