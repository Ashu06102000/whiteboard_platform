"use client";

import Info from "./info";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";
import { Canvasprops } from "@/interface/interface";
import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursorsPresence";
import { PointerEventToCanvasPoint } from "@/lib/utils";

const Canvas = ({ boardId }: Canvasprops) => {
  const MAX_LAYERS = 100;

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const onWheeel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = PointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );
  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      setMyPresence({ cursor: null });
    },
    []
  );
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
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

      <svg
        onWheel={onWheeel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};
export default Canvas;
