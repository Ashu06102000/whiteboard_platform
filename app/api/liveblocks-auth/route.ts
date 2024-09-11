import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCK_SECRET_KEY as string,
});
const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.queries.boards.boards, { id: room });
  const boardId = board?._id;
  console.log(board, "board");
  if (!room) {
    return new Response("Board ID is required", { status: 400 });
  }

  const userInfo = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    username: user.username,
  };

  // Identify the user in Liveblocks
  const { status: identifyStatus, body: identifyBody } =
    await liveblocks.identifyUser(
      {
        userId: user.id,
        groupIds: [],
      },
      { userInfo }
    );

  if (identifyStatus !== 200) {
    return new Response("Failed to identify user", {
      status: identifyStatus,
    });
  }

  const getroom = await liveblocks.getRoom(boardId as string);
  console.log(getroom, "getroom");
  const createRoom = await liveblocks.createRoom(boardId as string, {
    defaultAccesses: ["room:write"],
  });

  return createRoom;
}
