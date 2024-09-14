"use client";
import { memo } from "react";

import { Camera, Color } from "@/types/canvas";
import useSelectionBounds from "@/hooks/useSelectionBounds";
import IconButton from "./iconButton";
import ColorPicker from "./colorPicker";
import { useMutation, useSelf } from "@/liveblocks.config";
import useDeleteLayers from "@/hooks/useDeleteLayers";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import Hint from "@/components/hint";

type SelectionToolsProps = {
  isAnimated: boolean;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({
  isAnimated,
  camera,
  setLastUsedColor,
}: SelectionToolsProps) {
  const selection = useSelf((me) => me.presence.selection);

  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    },
    [selection]
  );

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  const deleteLayers = useDeleteLayers();

  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;
  return (
    <div
      className="absolute p-3 rounded-lg shadow-popup bg-white select-none flex flex-col gap-2"
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
    >
      <ColorPicker onChange={setFill} />

      <div className="flex gap-2">
        <IconButton onClick={moveToFront}>
          <Hint label="move to front" side="bottom" sideOffset={14}>
            <BringToFront size={18} />
          </Hint>
        </IconButton>

        <IconButton onClick={moveToBack}>
          <Hint label="send to back" side="bottom" sideOffset={14}>
            <SendToBack size={18} />
          </Hint>
        </IconButton>
        <div className="flex items-center pl-2 ml-2 border-l border-[#eee]">
          <IconButton onClick={deleteLayers}>
            <Trash2 />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default memo(SelectionTools);
