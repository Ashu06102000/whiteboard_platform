"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdColors } from "@/lib/utils";
import { CursorProps } from "@/interface/interface";
import { useOther } from "@/liveblocks.config";

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence?.cursor);

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  const name = info?.username || "Teammate";

  return (
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        style={{
          fill: connectionIdColors(connectionId),
          color: connectionIdColors(connectionId),
        }}
        className="h-5 w-5 newpoint"
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdColors(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});
Cursor.displayName = "Cursor";
