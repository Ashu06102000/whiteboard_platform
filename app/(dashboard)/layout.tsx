import { ChildrenProp } from "@/interface/interface";

import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: ChildrenProp) => {
  return (
    <main className="h-full p-5">
      <div className="flex">
        <div className="h-full flex-1">
          <div className="flex h-full gap-5 flex-col">
            <div className="flex gap-4 items-center h-16">
              <Navbar />
            </div>
            {/* <Sidebar /> */}

            <div className="h-full flex-1 bg-mainBg rounded-3xl">
              {/* <Navbar /> */}

              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
