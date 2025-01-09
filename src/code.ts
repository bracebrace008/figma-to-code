/// <reference types="@figma/plugin-typings" />

import { tailwindMain } from "./tailwind/tailwindMain";

figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'convert-to-tailwind') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'No selection' });
      return;
    }

    const node = selection[0] as FrameNode;
    const tailwindContent = await tailwindMain(node);
    figma.ui.postMessage({ type: 'result', content: tailwindContent });
  }
};
