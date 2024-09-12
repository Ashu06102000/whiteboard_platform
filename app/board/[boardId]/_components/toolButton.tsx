"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ToolButtonProps } from "@/interface/interface";

const Toolbutton = ({
  label,
  icon: Icon,
  onclick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="top" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onclick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default Toolbutton;
