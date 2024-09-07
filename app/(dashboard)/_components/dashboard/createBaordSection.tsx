"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CreateBoardSection = ({ org_id }: { org_id: string }) => {
  const { organization } = useOrganization();

  const [boardName, setBoardName] = useState("");
  const createBoard = useMutation(api?.mutations.board.createMutation);

  const [boardimage, setBoardImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOnclick = () => {
    if (!organization) {
      return;
    }

    const createBoardPromise = () =>
      createBoard({
        orgId: organization.id,
        title: boardName,
        image: boardimage,
      }).then((res) => {
        return { name: "Board" };
      });

    toast.promise(createBoardPromise(), {
      loading: "Creating board...",
      success: (data) => {
        setDialogOpen(false);
        return `${data.name} created successfully!`;
      },
      error: "Something went wrong while creating the board.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-3xl font-Open_Sans">
        Create a new board
        <span className="text-gray-600"> in {organization?.name}</span>
      </h3>
      <div className="flex flex-col gap-2 bg-white rounded-lg p-3">
        <h4 className="font-normal font-Open_Sans leading-none text-sm text-gray-600">
          Recommaned boards
        </h4>
        <div className="flex gap-2.5 h-full items-center">
          <div className="flex justify-center flex-col gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-600 py-10 px-16 rounded-xl cursor-pointer hover:bg-blue-700">
                    <Plus className="text-white" size={34} />
                  </div>
                  <span className="text-xs">New Board</span>
                </div>
              </DialogTrigger>
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
                      defaultValue="Untitled"
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
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleOnclick} type="submit">
                    Create Board
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-2  cursor-pointer">
            <div className="bg-gray-200 w-[162px] h-[114px] rounded-xl cursor-pointer  flex items-center justify-center">
              <div className="text-xs text-gray-600">coming soon !</div>
            </div>
            <div className="text-xs">+ Brainwriting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardSection;
