"use client";

import { memo } from "react";

import { LayerType, Side } from "@/types/canvas";
import { SelectionBoxProps } from "@/interface/interface";
import { useSelf, useStorage } from "@/liveblocks.config";
import useSelectionBounds from "@/hooks/useSelectionBounds";

const HANDLE_WIDTH = 8;

const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection?.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();
    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
            stroke: "#0044ff",
            strokeWidth: "1px",
          }}
          className="fill-transparent stroke-primary stroke-[1px] pointer-events-none"
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2
                }px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2
                }px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2 + bounds.height
                }px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            <rect
              x={0}
              y={0}
              className="fill-white stroke-primary stroke-[1px]"
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2
                }px)`,
                fill: "white",
                stroke: "#0044ff",
                strokeWidth: "1px",
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Left, bounds);
              }}
            />
          </>
        )}
      </>
    );
  }
);

export default SelectionBox;
SelectionBox.displayName = "SelectionBox";
