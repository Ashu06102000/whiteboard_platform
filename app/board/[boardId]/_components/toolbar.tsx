import { Skeleton } from "@/components/ui/skeleton";
import {
  Circle,
  MousePointer2,
  Pen,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import Toolbutton from "./toolButton";
import { ToolBarProps } from "@/interface/interface";
import { CanvasMode, LayerType } from "@/types/canvas";

const Toolbar = ({
  canRedo,
  canUndo,
  CanvasState,
  redo,
  undo,
  setCanvasState,
}: ToolBarProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6">
      <div className="bg-white rounded-md flex items-center shadow-md gap-4 px-2 py-2">
        <Toolbutton
          label={"Select"}
          icon={MousePointer2}
          onclick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            CanvasState.mode === CanvasMode.None ||
            CanvasState.mode === CanvasMode.Translating ||
            CanvasState.mode === CanvasMode.SelectionNet ||
            CanvasState.mode === CanvasMode.Pressing ||
            CanvasState.mode === CanvasMode.Resizing
          }
        />
        <Toolbutton
          label={"  Test"}
          icon={Type}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            CanvasState.mode === CanvasMode.Inserting &&
            CanvasState.layerType === LayerType.Text
          }
        />
        <Toolbutton
          label={"Sticky Note"}
          icon={StickyNote}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            CanvasState.mode === CanvasMode.Inserting &&
            CanvasState.layerType === LayerType.Note
          }
        />
        <Toolbutton
          label={"Rectangle"}
          icon={Square}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            CanvasState.mode === CanvasMode.Inserting &&
            CanvasState.layerType === LayerType.Rectangle
          }
        />
        <Toolbutton
          label={"Ellipsis"}
          icon={Circle}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            CanvasState.mode === CanvasMode.Inserting &&
            CanvasState.layerType === LayerType.Ellipse
          }
        />
        <Toolbutton
          label={"pen"}
          icon={Pen}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.pencil,
            })
          }
          isActive={CanvasState.mode === CanvasMode.pencil}
        />
      </div>
      <div className="bg-white rounded-md py-4 px-8 flex items-center shadow-md gap-8">
        <Toolbutton
          label={"Undo"}
          icon={Undo2}
          onclick={undo}
          isDisabled={!canUndo}
        />
        <Toolbutton
          label={"Redo"}
          icon={Redo2}
          onclick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};
export default Toolbar;

Toolbar.Skelton = function () {
  return (
    <div className="absolute top-2/4 -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white h-96 w-14 shadow-md rounded-md">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
