

export function parseFigmaText(node: TextNode): {
    text: string;
    style: string;
} {
    const styles: string[] = [];

    // Font size
    if (node.fontSize) {
        styles.push(`text-[${node.fontSize}px]`);
    }

    // Font weight
    if (node.fontWeight) {
        const weight = Math.round(node.fontWeight / 100) * 100;
        styles.push(`font-${weight}`);
    }

    // Text alignment
    if (node.textAlignHorizontal) {
        switch (node.textAlignHorizontal.toLowerCase()) {
            case 'left':
                styles.push('text-left');
                break;
            case 'center':
                styles.push('text-center');
                break;
            case 'right':
                styles.push('text-right');
                break;
            case 'justify':
                styles.push('text-justify');
                break;
        }
    }

    // Text color
    if (node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID') {
        const color = node.fills[0].color;
        const hexColor = rgbToHex(color.r, color.g, color.b);
        styles.push(`text-[${hexColor}]`);
    }

    // Font style (italic)
    if (node.fontName && getFontStyle(node.fontName).includes('Italic')) {
        styles.push('italic');
    }

    // Text decoration (underline, strikethrough)
    if (node.textDecoration) {
        switch (node.textDecoration.toLowerCase()) {
            case 'underline':
                styles.push('underline');
                break;
            case 'strikethrough':
                styles.push('line-through');
                break;
        }
    }

    // Line height
    if (node.lineHeight && typeof node.lineHeight === 'number') {
        styles.push(`leading-[${node.lineHeight}px]`);
    }

    // Letter spacing
    if (node.letterSpacing) {
        styles.push(`tracking-[${node.letterSpacing}px]`);
    }

    return {
        text: node.characters,
        style: styles.join(' ')
    };
}
// Test function for the text node parser
export function testParseFigmaText() {
    const testNode: TextNode = {
        type: "TEXT",
        characters: "Brace's Blog",
        fontSize: 18,
        fontWeight: 700,
        textAlignHorizontal: "LEFT",
        fills: [{
            type: "SOLID",
            color: {
                r: 0.10196078568696976,
                g: 0.10196078568696976,
                b: 0.10196078568696976,
                a: 1
            }
        }],
        lineHeight: 24,
        letterSpacing: 0,
        fontName: {
            family: "Inter",
            style: "Bold"
        }
    };

    const result = parseFigmaText(testNode);
    console.log('Parsed Text Result:', result);
    return result;
}