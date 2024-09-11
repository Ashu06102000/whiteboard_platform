import { Loader2 } from "lucide-react";
import Info from "./info";
import Particeipents from "./particepents";
import Toolbar from "./toolbar";

const Loading = () => {
  return (
    <main className="h-full relative w-full bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Particeipents.Skeleton />
      <Toolbar.Skelton />
    </main>
  );
};

export default Loading;
