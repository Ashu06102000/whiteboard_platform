"use client";
import Image from "next/image";
import logo from "../../../../public/note.svg";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const createBoard = useMutation(api.board.createMutation);

  const handleOnclick = () => {
    if (!organization) {
      return;
    }
    createBoard({
      orgId: organization.id,
      title: "untitiled",
    })
      .then((id) => {
        toast.success("Board created successfully");
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center">
      <Image src={logo} alt="no board result" height={140} width={140} />
      <h3 className="font-semibold text-2xl">
        No boards found. Please try by creating one.
      </h3>
      <Button onClick={handleOnclick} size="lg" className="mt-4">
        Create a new board
      </Button>
    </div>
  );
};

export default EmptyBoards;
