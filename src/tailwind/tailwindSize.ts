export function getTailwindSize(node: FrameNode) {
    if (node.absoluteBoundingBox) {
        const { width, height } = node.absoluteBoundingBox;
        return `${width ? `w-[${width}px]` : ''} ${height ? `h-[${height}px]` : ''}`.trim();
    }
}