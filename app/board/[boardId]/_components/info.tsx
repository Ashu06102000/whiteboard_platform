import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";

const Info = ({ boardId }: { boardId: Id<"boards"> }) => {
  const boardData = useQuery(api.queries.boards.getBoardsById, { id: boardId });
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-4 h-12 flex items-center shadow-md py-2 gap-2">
      <h3 className="font-semibold text-xl font-Open_Sans text-primary">
        IdeaCanvas
      </h3>
      <Separator orientation="vertical" />
      <div>
        <span>{boardData?.title}</span>
      </div>
      <Separator orientation="vertical" />
      <Menu className="cursor-pointer" />
    </div>
  );
};
export default Info;
Info.displayName = "Info";
// Info.Skeleton = function () {
//   return (
//     <div className="absolute top-2 left-2 bg-white rounded-md px1.5 h-12 flex items-center shadow-md w-80">
//       <Skeleton className="h-full w-full bg-muted-400" />
//     </div>
//   );
// };
