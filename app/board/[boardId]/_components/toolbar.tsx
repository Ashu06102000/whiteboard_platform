import { Skeleton } from "@/components/ui/skeleton";
import { Circle, Ellipsis, Pencil, Redo2, Shapes, Undo2 } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
      <div className="bg-white rounded-md flex items-center shadow-md gap-8 px-8 py-4">
        <div className="cursor-pointer">
          <Pencil size={24} />
        </div>
        <div className="cursor-pointer">
          <Shapes size={20} />
        </div>
        <div className="cursor-pointer">
          <Circle size={24} />
        </div>
        <div className="cursor-pointer">
          <Ellipsis size={24} />
        </div>
      </div>
      <div className="bg-white rounded-md py-4 px-8 flex items-center shadow-md gap-8">
        <div className="cursor-pointer">
          <Undo2 />
        </div>
        <div className="cursor-pointer">
          <Redo2 />{" "}
        </div>
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
