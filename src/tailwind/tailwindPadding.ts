export function getTailwindPadding(node: FrameNode) {
    const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node;

    const tailwindPadding: string[] = [];

    // 如果所有 padding 都是 null、undefined 或 0，直接返回空字符串
    if (!paddingLeft && !paddingRight && !paddingTop && !paddingBottom) {
        return '';
    }

    const isHorizontalEqual = paddingLeft === paddingRight;
    const isVerticalEqual = paddingTop === paddingBottom;

    // 如果所有 padding 相等且不为 null、undefined 或 0
    if (isHorizontalEqual && isVerticalEqual && paddingLeft) {
        tailwindPadding.push(`p-[${paddingLeft}px]`);
    } else {
        // 如果水平 (左右) 相等且不为 null、undefined 或 0
        if (isHorizontalEqual && paddingLeft) {
            tailwindPadding.push(`px-[${paddingLeft}px]`);
        } else {
            if (paddingLeft) tailwindPadding.push(`pl-[${paddingLeft}px]`);
            if (paddingRight) tailwindPadding.push(`pr-[${paddingRight}px]`);
        }

        // 如果垂直 (上下) 相等且不为 null、undefined 或 0
        if (isVerticalEqual && paddingTop) {
            tailwindPadding.push(`py-[${paddingTop}px]`);
        } else {
            if (paddingTop) tailwindPadding.push(`pt-[${paddingTop}px]`);
            if (paddingBottom) tailwindPadding.push(`pb-[${paddingBottom}px]`);
        }
    }

    return tailwindPadding.join(' ');
}
