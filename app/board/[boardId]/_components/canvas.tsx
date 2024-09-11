"use client";

import { Info } from "lucide-react";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";
import { Canvasprops } from "@/interface/interface";

const Canvas = ({ boardId }: Canvasprops) => {
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
