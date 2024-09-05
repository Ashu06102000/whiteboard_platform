import Hint from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const CreateSidebarButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full aspect-square">
          <Hint
            side="right"
            align="start"
            sideOffset={18}
            label={"Create organization"}
          >
            <button className="bg-green-500 text-white px-2 py-2 rounded-md w-full flex">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent>
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
export default CreateSidebarButton;
