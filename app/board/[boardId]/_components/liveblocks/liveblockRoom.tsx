"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import Loading from "../loading";
import { LiveblockRoomProps } from "@/interface/interface";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

const LiveblockRoom: React.FC<LiveblockRoomProps> = ({ boardId, children }) => {
  const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY;

  if (!publicApiKey) {
    return <div>Error: Liveblocks API key is not defined.</div>;
  }

  return (
    <LiveblocksProvider
      // publicApiKey={publicApiKey}
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider
        id={boardId}
        initialPresence={{
          cursor: null,
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<Loading />}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default LiveblockRoom;
