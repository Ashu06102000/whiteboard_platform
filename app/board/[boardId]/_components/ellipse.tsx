import { EllipseProps } from "@/interface/interface";
import { colorToCss } from "@/lib/utils";

export default function Ellipse({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: EllipseProps) {
  return (
    <ellipse
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : "#CCC"}
      stroke={selectionColor || "transparent"}
      strokeWidth="1"
    />
  );
}
