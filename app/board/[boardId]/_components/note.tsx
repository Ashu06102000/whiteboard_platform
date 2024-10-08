import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { NoteLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { NoteProps } from "@/interface/interface";

const font = Kalam({ subsets: ["latin"], weight: ["400"] });
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
};
export const Note = ({
  layer,
  id,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
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
        backgroundColor: fill ? colorToCss(fill) : "#ccc",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "text"}
        onChange={(e) => {
          updateValue(e.target.value);
        }}
        className={cn(
          "h-full w-full flex flex-col justify-center items-center text-center outline-none",
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
