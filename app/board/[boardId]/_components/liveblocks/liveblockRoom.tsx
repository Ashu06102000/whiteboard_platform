"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import Loading from "../loading";

interface LiveblockRoomProps {
  boardId: string;
  children: React.ReactNode;
}

const LiveblockRoom: React.FC<LiveblockRoomProps> = ({ boardId, children }) => {
  const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY;

  if (!publicApiKey) {
    return <div>Error: Liveblocks API key is not defined.</div>;
  }

  return (
    <LiveblocksProvider
      // publicApiKey={publicApiKey}
      authEndpoint={"/api/liveblocks-auth"}
    >
      <RoomProvider id={boardId}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default LiveblockRoom;
