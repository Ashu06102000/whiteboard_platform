export interface ChildrenProp {
  children: React.ReactNode;
}

export interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "left" | "right" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export interface DashboardPageprops {
  searchParams: {
    search?: string;
    favorites?: string;
    recent?: string;
  };
}

export interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export interface Canvasprops {
  boardId: string;
}
