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

export async function POST(request: Request): Promise<Response> {
  const user = await currentUser();
  const authorization = await auth(); // Fixed typo: 'authrization' to 'authorization'

  if (!user) {
    return new Response("No user found", { status: 401 }); // Changed status to 401 for no user
  }

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.queries.boards.boards, { id: room });

  if (!board) {
    return new Response("Board not found", { status: 404 });
  }

  const boardId = board._id;
  if (board.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
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

  if (status !== 200) {
    return new Response(body, { status });
  }

  const getroom = await liveblocks.getRoom(boardId as string);

  if (!getroom) {
    const createRoom = await liveblocks.createRoom(boardId as string, {
      defaultAccesses: ["room:write"],
    });

    return new Response(JSON.stringify(createRoom), { status: 200 });
  }

  return new Response("Room already exists", { status: 200 });
}
