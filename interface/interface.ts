import { Id } from "@/convex/_generated/dataModel";
import { CanvasState } from "@/types/canvas";
import { LucideIcon } from "lucide-react";

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
  boardId: Id<"boards">;
}
export interface LiveblockRoomProps {
  boardId: string;
  children: React.ReactNode;
}

export interface participatantsAvatarProps {
  email: string;
  username: string;
}
export interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onclick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface ToolBarProps {
  CanvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
export interface CursorProps {
  connectionId: number;
}
