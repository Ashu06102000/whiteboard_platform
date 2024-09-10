import { Circle, Ellipsis, Pencil, Redo2, Shapes, Undo2 } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="absolute top-2/4 -translate-y-1/2 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md flex  flex-col items-center shadow-md gap-4 p-4">
        <div>
          <Pencil size={24} />
        </div>
        <div>
          <Shapes size={20} />
        </div>
        <div>
          <Circle size={24} />
        </div>
        <div>
          <Ellipsis size={24} />
        </div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>
          <Undo2 />
        </div>
        <div>
          <Redo2 />{" "}
        </div>
      </div>
    </div>
  );
};
export default Toolbar;
