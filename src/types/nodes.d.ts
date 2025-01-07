interface BaseNode {
  id: string; // A string uniquely identifying this node within the document.
  name: string; // The name given to the node by the user in the tool.
  visible?: boolean; // Whether or not the node is visible on the canvas. Defaults to true.
  type: string; // The type of the node.
  rotation?: number; // The rotation of the node, if not 0.
  pluginData?: any; // Data written by plugins that is visible only to the plugin that wrote it.
  sharedPluginData?: any; // Data written by plugins that is visible to all plugins.
  componentPropertyReferences?: Map<string, string>; // A mapping of a layer's property to component property name.
  boundVariables?: Map<
    string,
    VariableAlias | VariableAlias[] | Map<string, VariableAlias>
  >; // A mapping of field to variables applied to this field.
  explicitVariableModes?: Map<string, string>; // A mapping of variable collection ID to mode ID.
}

interface FrameNode extends BaseNode {
  children?: Node[]; // An array of nodes that are direct children of this node
  locked?: boolean; // If true, layer is locked and cannot be edited. Default is false.
  backgroundPaint?: Paint[]; // [DEPRECATED] Background of the node.
  backgroundColor?: Color; // [DEPRECATED] Background color of the node.
  fills?: Paint[]; // An array of fill paints applied to the node. Default is [].
  strokes?: Paint[]; // An array of stroke paints applied to the node. Default is [].
  strokeWeight?: number; // The weight of strokes on the node.
  strokeAlign?: "INSIDE" | "OUTSIDE" | "CENTER"; // Position of stroke relative to vector outline.
  strokeDashes?: number[]; // Pattern of dash length and gap lengths. Default is [].
  cornerRadius?: number; // Radius of each corner of the frame if a single radius is set for all corners.
  rectangleCornerRadii?: number[]; // Array of length 4 for each corner radius. Default is same as cornerRadius.
  cornerSmoothing?: number; // How smooth the corners are (0 to 1). Default is 0.
  exportSettings?: ExportSetting[]; // An array of export settings for images. Default is [].
  blendMode?: BlendMode; // How this node blends with nodes behind it in the scene.
  preserveRatio?: boolean; // Keep height and width constrained to same ratio. Default is false.
  constraints?: LayoutConstraint; // Horizontal and vertical layout constraints for the node.
  layoutAlign?: "INHERIT" | "STRETCH" | "MIN" | "CENTER" | "MAX"; // Alignment in auto-layout frames.
  interactions?: Interaction[]; // List of prototype interactions on this node.
  transitionNodeID?: string | null; // Node ID for prototyping transition. Default is null.
  transitionDuration?: number | null; // Transition duration in milliseconds. Default is null.
  transitionEasing?: EasingType | null; // Easing curve used for prototyping transition. Default is null.
  opacity?: number; // Opacity of the node. Default is 1.
  absoluteBoundingBox?: Rectangle; // Bounding box in absolute space coordinates.
  absoluteRenderBounds?: Rectangle | null; // Actual bounds of the node. Null if invisible.
  size?: Vector; // Width and height of the element.
  minWidth?: number | null; // Minimum width of the frame. Default is null.
  maxWidth?: number | null; // Maximum width of the frame. Default is null.
  minHeight?: number | null; // Minimum height of the frame. Default is null.
  maxHeight?: number | null; // Maximum height of the frame. Default is null.
  relativeTransform?: Transform; // 2D transform relative to its parent.
  clipsContent?: boolean; // Whether this node clips content outside its bounds.
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL"; // Whether this layer uses auto-layout. Default is "NONE".
  layoutSizingHorizontal?: "FIXED" | "HUG" | "FILL"; // Horizontal sizing in auto-layout frames.
  layoutSizingVertical?: "FIXED" | "HUG" | "FILL"; // Vertical sizing in auto-layout frames.
  layoutWrap?: "NO_WRAP" | "WRAP"; // Whether wrapping is enabled in auto-layout. Default is "NO_WRAP".
  primaryAxisSizingMode?: "FIXED" | "AUTO"; // Primary axis length setting. Default is "AUTO".
  counterAxisSizingMode?: "FIXED" | "AUTO"; // Counter axis length setting. Default is "AUTO".
  primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"; // Alignment in primary axis direction.
  counterAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "BASELINE"; // Alignment in counter axis direction.
  counterAxisAlignContent?: "AUTO" | "SPACE_BETWEEN"; // Alignment in wrapped tracks.
  paddingLeft?: number; // Padding between the left border and children. Default is 0.
  paddingRight?: number; // Padding between the right border and children. Default is 0.
  paddingTop?: number; // Padding between the top border and children. Default is 0.
  paddingBottom?: number; // Padding between the bottom border and children. Default is 0.
  horizontalPadding?: number; // Deprecated horizontal padding. Default is 0.
  verticalPadding?: number; // Deprecated vertical padding. Default is 0.
  itemSpacing?: number; // Distance between children. Can be negative. Default is 0.
  counterAxisSpacing?: number; // Distance between wrapped tracks. Default is 0.
  layoutPositioning?: "AUTO" | "ABSOLUTE"; // Size and position determination. Default is "AUTO".
  itemReverseZIndex?: boolean; // Canvas stacking order of layers. Default is false.
  strokesIncludedInLayout?: boolean; // Strokes included in layout calculations. Default is false.
  layoutGrids?: LayoutGrid[]; // Layout grids attached to the node. Default is [].
  overflowDirection?:
  | "NONE"
  | "HORIZONTAL_SCROLLING"
  | "VERTICAL_SCROLLING"
  | "HORIZONTAL_AND_VERTICAL_SCROLLING"; // Scrolling behavior. Default is "NONE".
  effects?: Effect[]; // Effects attached to the node. Default is [].
  isMask?: boolean; // Whether this node masks sibling nodes. Default is false.
  isMaskOutline?: boolean; // [DEPRECATED] Use maskType instead.
  maskType?: "ALPHA" | "VECTOR" | "LUMINANCE"; // Mask operation type.
  styles?: Map<StyleType, string>; // Mapping of style type to style ID.
  devStatus?: "READY_FOR_DEV" | "COMPLETED" | null; // Node's dev status. Default is null.
  annotations?: Annotation[]; // [Private beta] Annotations in dev mode. Default is [].
}

interface VectorNode extends BaseNode {
  locked?: boolean; // If true, layer is locked and cannot be edited. Default is false.
  exportSettings?: ExportSetting[]; // Array of export settings for images. Default is [].
  blendMode?: BlendMode; // How this node blends with nodes behind it.
  preserveRatio?: boolean; // Keep height and width constrained to same ratio. Default is false.
  layoutAlign?: "INHERIT" | "STRETCH" | "MIN" | "CENTER" | "MAX"; // Alignment in auto-layout frames.
  layoutGrow?: number; // Stretch factor along parent's primary axis. Default is 0.
  constraints?: LayoutConstraint; // Horizontal and vertical layout constraints.
  transitionNodeID?: string | null; // Node ID for prototyping transition. Default is null.
  transitionDuration?: number | null; // Transition duration in milliseconds. Default is null.
  transitionEasing?: EasingType | null; // Easing curve for prototyping transition.
  opacity?: number; // Opacity of the node. Default is 1.
  absoluteBoundingBox?: Rectangle; // Bounding box in absolute space coordinates.
  absoluteRenderBounds?: Rectangle | null; // Actual bounds including effects.
  effects?: Effect[]; // Array of effects attached to the node. Default is [].
  size?: Vector; // Width and height of element.
  relativeTransform?: Transform; // 2D transform relative to parent.
  isMask?: boolean; // Whether node masks sibling nodes. Default is false.
  fills?: Paint[]; // Array of fill paints applied to the node. Default is [].
  fillGeometry?: Path[]; // Paths representing the object fill.
  fillOverrideTable?: Map<number, PaintOverride>; // Fill override lookup table.
  strokes?: Paint[]; // Array of stroke paints applied to the node. Default is [].
  strokeWeight?: number; // Weight of strokes on the node.
  individualStrokeWeights?: StrokeWeights; // Individual stroke weights per side.
  strokeCap?: "NONE" | "ROUND" | "SQUARE" | "LINE_ARROW" | "TRIANGLE_ARROW" | "DIAMOND_FILLED" | "CIRCLE_FILLED" | "TRIANGLE_FILLED" | "WASHI_TAPE_1" | "WASHI_TAPE_2" | "WASHI_TAPE_3" | "WASHI_TAPE_4" | "WASHI_TAPE_5" | "WASHI_TAPE_6"; // End caps of vector paths.
  strokeJoin?: "MITER" | "BEVEL" | "ROUND"; // How corners are rendered. Default is "MITER".
  strokeDashes?: number[]; // Pattern of dash and gap lengths. Default is [].
  strokeMiterAngle?: number; // Angle for miter strokeJoin. Default is 28.96.
  strokeGeometry?: Path[]; // Paths representing the object stroke.
  strokeAlign?: "INSIDE" | "OUTSIDE" | "CENTER"; // Position of stroke relative to vector outline.
  styles?: Map<StyleType, string>; // Mapping of style type to style ID.
  annotations?: Annotation[]; // Annotations in Dev Mode. Default is [].
}

interface TextNode extends VectorNode {
  characters: string; // Text contained within a text box
  style: TypeStyle; // Style of text including font family and weight
  characterStyleOverrides: number[]; // Array of character style overrides
  styleOverrideTable: Map<number, TypeStyle>; // Map from ID to TypeStyle for style overrides
  lineTypes: string[]; // Array of list types for each line
  lineIndentations: number[]; // Array of indentation levels for each line
}

interface TypeStyle {
  fontFamily?: string;
  fontPostScriptName?: string;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  listSpacing?: number;
  italic?: boolean;
  fontWeight?: number;
  fontSize?: number;
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE" | "SMALL_CAPS" | "SMALL_CAPS_FORCED";
  textDecoration?: "NONE" | "STRIKETHROUGH" | "UNDERLINE";
  textAutoResize?: "NONE" | "HEIGHT" | "WIDTH_AND_HEIGHT" | "TRUNCATE";
  textTruncation?: "DISABLED" | "ENDING";
  maxLines?: number | null;
  textAlignHorizontal?: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFIED";
  textAlignVertical?: "TOP" | "CENTER" | "BOTTOM";
  letterSpacing?: number;
  fills?: Paint[];
  hyperlink?: Hyperlink;
  opentypeFlags?: Map<string, number>;
  lineHeightPx?: number;
  lineHeightPercent?: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit?: "PIXELS" | "FONT_SIZE_%" | "INTRINSIC_%";
  isOverrideOverTextStyle?: boolean;
  semanticWeight?: "BOLD" | "NORMAL";
  semanticItalic?: "ITALIC" | "NORMAL";
}

type Interaction = any; // Define based on interaction structure
type EasingType = any; // Define based on easing type structure
type Rectangle = any; // Define based on rectangle structure
type LayoutGrid = any; // Define based on layout grid structure
type Effect = any; // Define based on effect structure
type StyleType = any; // Define based on style type structure
type Annotation = any; // Define based on annotation structure
