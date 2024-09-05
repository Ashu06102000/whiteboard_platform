"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ItemProps } from "@/interface/interface";
import Hint from "@/components/hint";

const OranizationListItems = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isSetActive = organization?.id === id;

  const setActiveOrganization = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div>
      <Hint label={name} side="right" align="center" sideOffset={5}>
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          onClick={setActiveOrganization}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isSetActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

export default OranizationListItems;
