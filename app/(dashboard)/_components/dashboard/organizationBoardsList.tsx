"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { CircuitBoard, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const organizationBoardsList = ({ org_id }: { org_id: string }) => {
  const boardsData = useQuery(api.queries.boards.getBoards, { orgId: org_id });
  const { organization } = useOrganization();
  const [boardName, setBoardName] = useState("");
  const [boardimage, setBoardImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [boardId, setBoardId] = useState("");

  const updateBoard = useMutation(api?.mutations.board.updateMutation);

  const handleOnclick = () => {
    if (!organization) {
      return;
    }

    const createBoardPromise = () =>
      updateBoard({
        id: boardId,
        title: boardName,
        image: boardimage,
      }).then((res) => {
        console.log(res, "res");
        return { name: "Board" };
      });

    toast.promise(createBoardPromise(), {
      loading: "Creating board...",
      success: (data) => {
        setDialogOpen(false);
        return `${data.name} updated successfully!`;
      },
      error: "Something went wrong while creating the board.",
    });
  };

  return (
    <div className=" flex flex-col gap-6">
      <h3 className="text-3xl font-Open_Sans">
        Boards in this team
        <span>
          <span className="text-gray-600"> - in {organization?.name}</span>
        </span>
      </h3>
      <div className="bg-white rounded-lg p-3 flex gap-3">
        {" "}
        {boardsData?.map((data: any) => {
          return (
            <>
              <Dialog>
                <div
                  key={data.orgId}
                  className="flex flex-col gap-0  cursor-pointer max-w-52"
                >
                  <div className="bg-antiqeWhite h-44 w-52 rounded-t-md cursor-pointer border-gray-400 border-b-0 border flex items-center justify-center relative">
                    <DialogTrigger asChild onClick={() => setBoardId(data._id)}>
                      <EllipsisVertical
                        className="absolute top-1 right-1"
                        onClick={() => setDialogOpen(true)}
                        color="black"
                      />
                    </DialogTrigger>
                    <Image
                      src={data.imageUrl}
                      width={30}
                      height={30}
                      alt="image"
                    />
                  </div>
                  <div className="text-xs text-start px-4 bg-white py-4 rounded-b-md border-gray-400 border">
                    {data.title}
                  </div>
                </div>

                {data._id === boardId && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create a new Board</DialogTitle>
                      <DialogDescription>
                        Fill all the fields to create a new board
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="name" className="text-right">
                          Board Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                          onChange={(e) => setBoardName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="username" className="text-right">
                          Board image
                        </Label>
                        <Input
                          id="username"
                          type="file"
                          className="col-span-3"
                          onChange={(e: any) => {
                            const file = e?.target?.files[0];
                            if (file) {
                              setBoardImage(URL.createObjectURL(file));
                              console.log(boardimage);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleOnclick} type="submit">
                        Update Board
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default organizationBoardsList;
