"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { EllipsisVertical, Info, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { format } from "date-fns";
import BoardDetails from "./boardDetails";

const OrganizationBoardsList = ({ org_id }: { org_id: string }) => {
  const boardsData = useQuery(api.queries.boards.getBoards, { orgId: org_id });
  const { organization } = useOrganization();
  const [boardName, setBoardName] = useState("");
  const [boardImage, setBoardImage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [boardId, setBoardId]: any = useState("");

  const updateBoard = useMutation(api.mutations.board.updateMutation);

  const handleOnClick = () => {
    if (!organization) {
      return;
    }

    const updatedFields: any = {};
    if (boardName) {
      updatedFields.title = boardName;
    }
    if (boardImage) {
      updatedFields.image = boardImage;
    }

    toast.promise(
      updateBoard({
        id: boardId,
        ...updatedFields,
      }).then((res) => {
        return { name: "Board" };
      }),
      {
        loading: "Updating board...",
        success: (data) => {
          setEditDialogOpen(false);
          return `${data.name} updated successfully!`;
        },
        error: "Something went wrong while updating the board.",
      }
    );
  };

  const copyToClipboard = () => {
    const currentUrl = window.location.origin + location.pathname;
    console.log(currentUrl);
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Url copied successfully");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-Open_Sans sticky-container">
          Boards in this team
          <span>
            <span className="text-gray-600"> - in {organization?.name}</span>
          </span>
        </h3>
        <div className="rounded-lg p-0 flex gap-3 flex-wrap">
          {boardsData?.map((data: any) => (
            <div
              key={data._id}
              className="flex flex-col gap-0 cursor-pointer max-w-52"
            >
              <div className="bg-antiqeWhite h-52 w-52 rounded-t-md cursor-pointer border-gray-100 border-b-0 border flex items-center justify-center relative transition-all duration-300 ease-in-out hover:brightness-75 ">
                <Menubar className="absolute top-2 right-1 p-0 m-0 flex cursor-pointer max-w-10 bg-transparent border-none items-center justify-center focus:bg-transparent menu_btn_bg_focus_remove">
                  <MenubarMenu>
                    <MenubarTrigger>
                      <EllipsisVertical
                        className="focus:bg-transparent cursor-pointer z-10"
                        color="black"
                        onClick={() => setBoardId(data._id)}
                      />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem
                        onClick={() => {
                          setBoardId(data._id);
                          setEditDialogOpen(true);
                        }}
                        className="flex gap-2 "
                      >
                        <Pencil size={12} /> Edit
                      </MenubarItem>
                      <MenubarItem className="flex gap-2">
                        <Trash2 size={12} /> Delete
                      </MenubarItem>

                      <MenubarSeparator />
                      <MenubarItem
                        onClick={() => {
                          setBoardId(data._id);
                          setDetailsDialogOpen(true);
                        }}
                        className="flex gap-2"
                      >
                        <Info size={12} /> Board details
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          setBoardId(data._id);
                          copyToClipboard();
                        }}
                        className="flex gap-2 cursor-pointer"
                      >
                        <Info size={12} /> Copy url
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>

                <Image
                  src={data.imageUrl}
                  fill
                  className="object-cover p-9"
                  alt="image"
                />
              </div>
              <div className="text-sm font-light text-start px-2 bg-white py-2 rounded-b-md border-gray-100 border flex flex-col">
                {data.title}
                <span className="text-xs font-extralight">
                  Last updated:{" "}
                  {format(new Date(data.updatedAt), "MMM do, yyyy")}
                </span>
              </div>
              {data._id === boardId && (
                <div>
                  <Dialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                  >
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Board</DialogTitle>
                        <DialogDescription>
                          Fill all the fields to edit the board
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-start gap-4">
                          <Label htmlFor="name" className="text-right">
                            Board Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue={data.title}
                            className="col-span-3"
                            onChange={(e) => setBoardName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                          <Label htmlFor="image" className="text-right">
                            Board image
                          </Label>
                          <Input
                            id="image"
                            type="file"
                            className="col-span-3"
                            accept=".svg, .png, .jpg, .jpeg"
                            onChange={(e: any) => {
                              const file = e?.target?.files[0];
                              if (file) {
                                setBoardImage(URL.createObjectURL(file));
                              } else {
                                alert(
                                  "Please select a valid image file (SVG, PNG, JPG)"
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleOnClick} type="submit">
                          Update Board
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={detailsDialogOpen}
                    onOpenChange={setDetailsDialogOpen}
                  >
                    <DialogContent className="sm:max-w-[500px] gap-4">
                      <BoardDetails id={boardId} />
                      <DialogFooter>
                        <Button onClick={() => setDetailsDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Board Dialog */}

      {/* Board Details Dialog */}
    </div>
  );
};

export default OrganizationBoardsList;
