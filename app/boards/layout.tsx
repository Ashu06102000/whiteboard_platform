import { ChildrenProp } from "@/interface/interface";

import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: ChildrenProp) => {
  return (
    <div className="h-full flex-1 bg-mainBg rounded-3xl">
      {/* <Navbar /> */}

      {children}
    </div>
  );
};

export default DashboardLayout;
