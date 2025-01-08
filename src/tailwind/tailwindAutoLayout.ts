function getFlexDirection(node: FrameNode) {
  return node.layoutMode === "HORIZONTAL" ? "" : "flex-col";
}

function getJustifyContent(node: FrameNode) {
  switch (node.primaryAxisAlignItems) {
    case "MIN":
      return "justify-start";
    case "CENTER":
      return "justify-center";
    case "MAX":
      return "justify-end";
    case "SPACE_BETWEEN":
      return "justify-between";
    default:
      return "";
  }
}

function getAlignItems(node: FrameNode) {
  switch (node.counterAxisAlignItems) {
    case "MIN":
      return "items-start";
    case "CENTER":
      return "items-center";
    case "MAX":
      return "items-end";
    case "BASELINE":
      return "items-baseline";
    default:
      return "";
  }
}

function getGap(node: FrameNode) {
  if (
    node.itemSpacing &&
    node.itemSpacing > 0 &&
    node.primaryAxisAlignItems !== "SPACE_BETWEEN"
  ) {
    return `gap-[${node.itemSpacing}px]`;
  }
}

export function getTailwindAutoLayout(node: FrameNode) {
  if (!node.layoutMode) {
    return "";
  }
  return Object.values({
    flex: "flex",
    flexDirection: getFlexDirection(node),
    justifyContent: getJustifyContent(node),
    alignItems: getAlignItems(node),
    gap: getGap(node),
  })
    .filter((value) => value != "")
    .join(" ");
}
