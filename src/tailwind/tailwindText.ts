function tailwindTextBuilder(textNode: TextNode): string {
    const style = textNode.style;
    const tailwindClasses: string[] = [];

    if (style.fontFamily) {
        tailwindClasses.push(`font-${style.fontFamily.toLowerCase().replace(/\s+/g, '-')}`);
    }
    if (style.fontWeight) {
        tailwindClasses.push(`font-${style.fontWeight}`);
    }
    if (style.fontSize) {
        tailwindClasses.push(`text-${style.fontSize}px`);
    }
    if (style.textAlignHorizontal) {
        tailwindClasses.push(`text-${style.textAlignHorizontal.toLowerCase()}`);
    }
    if (style.textAlignVertical) {
        const verticalAlignMap: { [key: string]: string } = {
            'top': 'start',
            'center': 'middle',
            'bottom': 'end'
        };
        const tailwindVerticalAlign = verticalAlignMap[style.textAlignVertical.toLowerCase()] || style.textAlignVertical.toLowerCase();
        tailwindClasses.push(`align-${tailwindVerticalAlign}`);
    }
    if (style.italic) {
        tailwindClasses.push('italic');
    }
    if (style.textDecoration) {
        tailwindClasses.push(style.textDecoration.toLowerCase());
    }
    if (style.letterSpacing) {
        tailwindClasses.push(`tracking-${style.letterSpacing}px`);
    }
    if (style.lineHeightPx) {
        tailwindClasses.push(`leading-${style.lineHeightPx}px`);
    }

    return tailwindClasses.join(' ');
}
