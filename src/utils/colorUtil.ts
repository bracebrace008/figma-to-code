/**
 * Converts a Figma color object to a CSS hex color string.
 * @param color The Figma color object.
 * @returns The hex color string (e.g., "#RRGGBB").
 */
export const colorToHex = (color: Color): string => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? Math.round(color.a * 255) : 255;
  return `#${toHexComponent(r)}${toHexComponent(g)}${toHexComponent(b)}${a == 255 ? "" : toHexComponent(a)}`;
};

/**
 * Converts a Figma color object to a CSS rgba color string.
 * @param color The Figma color object.
 * @returns The rgba color string (e.g., "rgba(255, 255, 255, 0.5)").
 */
export const colorToRgba = (color: Color): string => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : 1; // Default alpha to 1 if not provided
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Converts a number to a 2-digit hexadecimal string.
 * @param value The number to convert (0-255).
 * @returns The 2-digit hexadecimal string.
 */
const toHexComponent = (value: number): string => {
  return value.toString(16).padStart(2, "0");
};

export const paintToCSS = (paint: Paint, isRgba?: boolean): string | null => {
  if (paint.visible == false) return null; // Skip if the paint is not visible

  switch (paint.type) {
    case "SOLID":
      if (!paint.color) throw new Error("Solid paint must have a color.");
      return isRgba ? colorToRgba(paint.color) : colorToHex(paint.color);
    case "GRADIENT_LINEAR":
      return linearGradientToCSS(paint);
    case "GRADIENT_RADIAL":
      return radialGradientToCSS(paint);
    case "GRADIENT_ANGULAR":
      return angularGradientToCSS(paint); // Simulate angular gradient using conic-gradient
    default:
      console.warn(`Unsupported paint type: ${paint.type}`);
      return null;
  }
};

// Convert linear gradient paint to CSS
export const linearGradientToCSS = (paint: Paint): string => {
  if (!paint.gradientStops || !paint.gradientHandlePositions) {
    throw new Error(
      "Gradient paint must have gradient stops and handle positions."
    );
  }

  const angle = calculateLinearGradientAngle(paint.gradientHandlePositions);
  const stops = paint.gradientStops.map((stop) => {
    return `${colorToRgba(stop.color)} ${(stop.position * 100).toFixed(2)}%`;
  });
  return `linear-gradient(${angle}deg, ${stops.join(", ")})`;
};

// Convert radial gradient paint to CSS
export const radialGradientToCSS = (paint: Paint): string => {
  if (!paint.gradientStops) {
    throw new Error("Gradient paint must have gradient stops.");
  }

  const stops = paint.gradientStops.map((stop) => {
    return `${colorToRgba(stop.color)} ${(stop.position * 100).toFixed(2)}%`;
  });
  return `radial-gradient(circle, ${stops.join(", ")})`;
};

// Simulate angular gradient using conic-gradient
export const angularGradientToCSS = (paint: Paint): string => {
  if (!paint.gradientStops) {
    throw new Error("Gradient paint must have gradient stops.");
  }

  const stops = paint.gradientStops.map((stop) => {
    return `${colorToRgba(stop.color)} ${(stop.position * 100).toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
};

// Calculate the angle for linear gradient
export const calculateLinearGradientAngle = (handles: Vector[]): number => {
  if (handles.length < 2) return 0;
  const [start, end] = handles;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI; // Convert radians to degrees
};
