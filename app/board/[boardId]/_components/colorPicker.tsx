import { Button } from "@/components/ui/button";
import { colorToCss } from "@/lib/utils";

import { Color } from "@/types/canvas";

type Props = {
  onChange: (color: Color) => void;
};

export default function ColorPicker({ onChange }: Props) {
  return (
    <div className="flex gap-1">
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 249, b: 178 }} onClick={onChange} />
    </div>
  );
}

function ColorButton({
  onClick,
  color,
}: {
  onClick: (color: Color) => void;
  color: Color;
}) {
  return (
    <Button
      className="w-7 h-7 gap-2 border-none p-px bg-transparent  hover:bg-gray-100"
      onClick={() => onClick(color)}
    >
      <div
        className="w-6 h-6 rounded-sm border border-black/10"
        style={{ background: colorToCss(color) }}
      />
    </Button>
  );
}
