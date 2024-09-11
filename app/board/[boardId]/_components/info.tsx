import { Skeleton } from "@/components/ui/skeleton";

const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px1.5 h-12 flex items-center shadow-md">
      Info about board
    </div>
  );
};
export default Info;

Info.Skeleton = function () {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px1.5 h-12 flex items-center shadow-md w-80">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
