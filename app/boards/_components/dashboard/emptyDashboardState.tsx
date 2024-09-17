"use client";

import Image from "next/image";
import emptyLogo from "../../../../public/no_org.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";
const EmptyDashboardState = () => {
  return (
    <div className="flex justify-center items-center flex-col h-full gap-2">
      <Image width={250} src={emptyLogo} alt="No organization" />
      <h3 className="text-4xl pt-4 font-semibold">Welcome to the IdeaCurve</h3>
      <p className="text-base font-normal text-gray-500">
        Create an organization to get started
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full max-w-fit mt-4">
            Create Organization
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-transparent p-0 border-none max-w-[480px]">
          <CreateOrganization
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  fontWeight: "bold",
                  fontSize: "0.8 rem",
                  width: "100%",
                },
              },
            }}
            routing="hash"
          />
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
};

export default EmptyDashboardState;
