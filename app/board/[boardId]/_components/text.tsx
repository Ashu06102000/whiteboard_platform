import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { TextProps } from "@/interface/interface";

const font = Kalam({ subsets: ["latin"], weight: ["400"] });
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
};
export const Text = ({
  layer,
  id,
  onPointerDown,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;
  const updateValue = useMutation(
    async ({ storage }: { storage: any }, newValue: string) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.get(id)) {
        liveLayers.get(id)?.set("value", newValue);
      }
    },
    []
  );
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "text"}
        onChange={(e) => {
          updateValue(e.target.value);
        }}
        className={cn(
          "h-full w-full flex flex-col justify-center items-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
