"use client";

import Info from "./info";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";
import { Canvasprops } from "@/interface/interface";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo } from "@/liveblocks.config";

const Canvas = ({ boardId }: Canvasprops) => {
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  return (
    <main className="h-full">
      <div className="h-full w-full relative bg-neutral-100 touch-none">
        <Info boardId={boardId} />
        <Particeipents boardId={boardId} />
        <Toolbar
          CanvasState={canvasState}
          setCanvasState={setCanvasState}
          canRedo={canRedo}
          canUndo={canUndo}
          undo={history.undo}
          redo={history.redo}
        />
      </div>
    </main>
  );
};
export default Canvas;
