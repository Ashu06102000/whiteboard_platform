import { Skeleton } from "@/components/ui/skeleton";
import { activeUsers } from "@/lib/utils";

const Particeipents = ({ boardId }: { boardId: string }) => {
  const activeParticepents = activeUsers(boardId as string);
  console.log(activeParticepents, "activeParticepents");
  return (
    <div className="absolute h-12 top-2 right-2 bg-white p-3 rounded-md flex items-center shadow-md">
      particepient
    </div>
  );
};
export default Particeipents;

Particeipents.Skeleton = function () {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white p-3 rounded-md flex items-center shadow-md w-24">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
