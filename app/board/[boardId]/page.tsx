import { BoardIdPageProps } from "@/interface/interface";
import Canvas from "./_components/canvas";
import LiveblockRoom from "./_components/liveblocks/liveblockRoom";

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <div className="h-full">
      <LiveblockRoom boardId={params.boardId}>
        <Canvas boardId={params.boardId} />
      </LiveblockRoom>
    </div>
  );
};
export default BoardIdPage;
