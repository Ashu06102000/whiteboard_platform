"use client";

import Info from "./info";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";
import { Canvasprops } from "@/interface/interface";
import { useCallback, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XTWH,
} from "@/types/canvas";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursorsPresence";
import {
  connectionIdColors,
  PointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./layerPreview";
import SelectionBox from "./selectionBox";

const Canvas = ({ boardId }: Canvasprops) => {
  const MAX_LAYERS = 100;
  const layerIds = useStorage((root) => root.layerIds);
  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;
      console.log(user, "user");

      if (!Array.isArray(selection)) {
        console.error("selection is not an array or iterable", selection);
        continue;
      }

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdColors(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 252,
    g: 142,
    b: 42,
  });
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,

      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.cornor,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );
  const onWheeel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current?.x,
        y: point.y - canvasState.current?.y,
      };

      const liveLayers = storage.get("layers");
      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState]
  );
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = PointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      }
      setMyPresence({ cursor: current });
    },
    [camera, canvasState, resizeSelectedLayer, translateSelectedLayers]
  );
  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      setMyPresence({ cursor: null });
    },
    []
  );
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = PointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }
      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();
      const point = PointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection?.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );
  const onResizeHandlePointerDown = useCallback(
    (cornor: Side, initialBounds: XTWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        cornor,
      });
    },
    [history]
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
        onPointerUp={onPointerUp}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};
export default Canvas;
