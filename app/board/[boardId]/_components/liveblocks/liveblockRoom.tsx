"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

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
    <LiveblocksProvider publicApiKey={publicApiKey} authEndpoint={undefined}>
      <RoomProvider id={boardId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default LiveblockRoom;
