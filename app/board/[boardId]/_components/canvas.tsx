"use client";

import { useSelf } from "@/liveblocks.config";
import Info from "./info";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";
import { Canvasprops } from "@/interface/interface";

const Canvas = ({ boardId }: Canvasprops) => {
  const info = useSelf((me) => me.info);
  console.log(info, "current_info");
  return (
    <main className="h-full">
      <div className="h-full w-full relative bg-neutral-100 touch-none">
        <Info />
        <Particeipents boardId={boardId} />
        <Toolbar />
      </div>
    </main>
  );
};
export default Canvas;
