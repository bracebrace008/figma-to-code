interface Paint {
  type:
    | "SOLID"
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND"
    | "IMAGE"
    | "EMOJI"
    | "VIDEO"; // Type of paint as a string enum
  visible?: boolean; // Is the paint enabled? Default is true.
  opacity?: number; // Overall opacity of paint. Default is 1.

  // For solid paints
  color?: Color; // Solid color of the paint

  // For gradient paints
  blendMode?: BlendMode; // How this node blends with nodes behind it
  gradientHandlePositions?: Vector[]; // Three vectors for gradient positioning
  gradientStops?: ColorStop[]; // Positions of key points along the gradient axis

  // For image paints
  scaleMode?: "FILL" | "FIT" | "TILE" | "STRETCH"; // Image scaling mode
  imageTransform?: Transform; // Affine transform applied to the image
  scalingFactor?: number; // Scaling factor for tiling, if applicable
  rotation?: number; // Image rotation, in degrees
  imageRef?: string; // Reference to an embedded image
  filters?: ImageFilters; // Defines what image filters have been applied
  gifRef?: string; // Reference to an embedded GIF

  // Bound variables
  boundVariables?: Map<string, VariableAlias>; // Mapping of field to VariableAlias
}

// Supporting types
interface Color {
  r: number; // Red channel value, between 0 and 1
  g: number; // Green channel value, between 0 and 1
  b: number; // Blue channel value, between 0 and 1
  a: number; // Alpha channel value, between 0 and 1
}

interface Vector {
  x: number; // X coordinate of the vector
  y: number; // Y coordinate of the vector
}

interface ColorStop {
  position: number; // Position of the stop along the gradient axis
  color: Color; // Color of the stop
}

type BlendMode =
  | "NORMAL"
  | "DARKEN"
  | "MULTIPLY"
  | "COLOR_BURN"
  | "LIGHTEN"
  | "SCREEN"
  | "COLOR_DODGE"
  | "OVERLAY"
  | "SOFT_LIGHT"
  | "HARD_LIGHT"
  | "DIFFERENCE"
  | "EXCLUSION"
  | "HUE"
  | "SATURATION"
  | "COLOR"
  | "LUMINOSITY"; // Example blend modes

type Transform = number[][]; // 2D affine transform matrix

interface ImageFilters {
  exposure?: number; // Exposure adjustment
  contrast?: number; // Contrast adjustment
  saturation?: number; // Saturation adjustment
  temperature?: number; // Temperature adjustment
  tint?: number; // Tint adjustment
  highlights?: number; // Highlights adjustment
  shadows?: number; // Shadows adjustment
}

type VariableAlias = string | number | boolean; // Alias type for variables

interface ExportSetting {
  suffix: string; // File suffix to append to all filenames
  format: "JPG" | "PNG" | "SVG"; // Image type, as a string enum
  constraint: Constraint; // Constraints applied to the exported image
}

interface Constraint {
  type: "SCALE" | "WIDTH" | "HEIGHT"; // Constraint type
  value: number; // Numeric value for the constraint
}

interface LayoutConstraint {
  vertical: "TOP" | "BOTTOM" | "CENTER" | "TOP_BOTTOM" | "SCALE"; // Vertical constraint as an enum
  horizontal: "LEFT" | "RIGHT" | "CENTER" | "LEFT_RIGHT" | "SCALE"; // Horizontal constraint as an enum
}

interface Trigger {
  type:
    | "ON_CLICK"
    | "ON_HOVER"
    | "ON_PRESS"
    | "ON_DRAG"
    | "AFTER_TIMEOUT"
    | "MOUSE_ENTER"
    | "MOUSE_LEAVE"
    | "MOUSE_UP"
    | "MOUSE_DOWN"
    | "ON_MEDIA_END"
    | "ON_KEY_DOWN"
    | "ON_KEY_UP"
    | "ON_MEDIA_HIT"; // The type of trigger event

  timeout?: number; // For "AFTER_TIMEOUT" events: the timeout duration in milliseconds
  delay?: number; // For "MOUSE_ENTER", "MOUSE_LEAVE", "MOUSE_UP", and "MOUSE_DOWN" events: the delay in milliseconds
  deprecatedVersion?: boolean; // Whether this is a deprecated version of the trigger

  // For "ON_KEY_DOWN" events
  device?:
    | "KEYBOARD"
    | "XBOX_ONE"
    | "PS4"
    | "SWITCH_PRO"
    | "UNKNOWN_CONTROLLER"; // The device type
  keyCodes?: number[]; // Key codes associated with the trigger

  // For "ON_MEDIA_HIT" events
  mediaHitTime?: number; // The time in the media timeline when the trigger activates
}
