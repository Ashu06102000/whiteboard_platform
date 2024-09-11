import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Liveblocks } from "@liveblocks/node";
const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCK_SECRET_KEY as string,
});
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (func: any, delay: number) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const activeUsers = (boardId: string) => {
  const activeRoomUsers = liveblocks.getActiveUsers(boardId);
  return activeRoomUsers;
};
