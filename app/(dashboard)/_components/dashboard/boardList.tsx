"use client";

import CreateBoardSection from "./createBaordSection";
import EmptyFavorite from "./emptyFavorites";
import EmptySearch from "./emptySearch";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CircuitBoard } from "lucide-react";
import OrganizationBoardsList from "./organizationBoardsList";

const BoardsList = ({
  org_id,
  query,
}: {
  org_id: string;
  query: {
    search?: string;
    favorites?: string;
    recent?: string;
  };
}) => {
  const boardsData = useQuery(api.queries.boards.getBoards, {
    orgId: org_id,
    ...query,
  });
  console.log(query, "boardsData");
  if (!boardsData?.length && query.search) {
    return <EmptySearch />;
  }
  if (!boardsData?.length && query.search) {
    return <EmptyFavorite />;
  }

  return (
    <div>
      <OrganizationBoardsList org_id={org_id} boardsData={boardsData} />
    </div>
  );
};

export default BoardsList;
