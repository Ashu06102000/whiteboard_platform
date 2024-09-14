"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@/liveblocks.config";
import AvatarComponent from "./avatar";

const Particeipents = ({ boardId }: { boardId: string }) => {
  const currentUser = useSelf((me) => me.info);
  const otherUsers = useOthers();

  return (
    <div className="absolute h-12 top-2 right-2 bg-white p-3 rounded-md flex items-center shadow-md gap-2">
      <AvatarComponent isCurrentUser userInfo={currentUser} />
      {otherUsers.map((otherUsers) => {
        return (
          <AvatarComponent key={otherUsers.id} userInfo={otherUsers.info} />
        );
      })}
    </div>
  );
};
export default Particeipents;
Particeipents.displayName = "Particeipents";
// Particeipents.Skeleton = function () {
//   return (
//     <div className="absolute h-12 top-2 right-2 bg-white p-3 rounded-md flex items-center shadow-md w-24">
//       <Skeleton className="h-full w-full bg-muted-400" />
//     </div>
//   );
// };
