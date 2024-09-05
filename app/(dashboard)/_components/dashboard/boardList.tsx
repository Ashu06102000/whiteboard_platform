"use client";

import EmptyBoards from "./emptyBoards";
import EmptyFavorite from "./emptyFavorites";
import EmptySearch from "./emptySearch";

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
  const Querydata = [];
  if (!Querydata.length && query.search) {
    return <EmptySearch />;
  }
  if (!Querydata.length && query.search) {
    return <EmptyFavorite />;
  }
  if (!Querydata.length) {
    return <EmptyBoards />;
  }
  return (
    <div>
      <div>{JSON.stringify(query)}</div>
    </div>
  );
};

export default BoardsList;
