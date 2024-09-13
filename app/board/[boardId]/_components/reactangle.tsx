"use client";
import { RectangleProps } from "@/interface/interface";
import { colorToCss } from "@/lib/utils";

const Rectangle = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      fill={fill ? colorToCss(fill) : "#CCC"}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
    />
  );
};
export default Rectangle;
