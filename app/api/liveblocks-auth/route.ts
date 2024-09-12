import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
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
  const authrization = await auth();
  if (!user) {
    return new Response("np user");
  }
  if (!authrization && !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.queries.boards.boards, { id: room });
  const boardId = board?._id;
  if (board?.orgId !== authrization.orgId) {
    return new Response("Unauthorized");
  }

  const userInfo = {
    email: user.emailAddresses[0]?.emailAddress ?? "Collaborator",
    username: user.username || "Collaborator",
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();
  return new Response(body, { status });
  const getroom = await liveblocks.getRoom(boardId as string);
  console.log(getroom, "getroom");
  const createRoom = await liveblocks.createRoom(boardId as string, {
    defaultAccesses: ["room:write"],
  });

  return createRoom;
}
