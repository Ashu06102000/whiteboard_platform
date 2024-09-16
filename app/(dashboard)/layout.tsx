import { ChildrenProp } from "@/interface/interface";
import OrganizationSidebar from "./_components/organizationSidebar";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: ChildrenProp) => {
  return (
    <main className="h-full">
      <div className="flex">
        <div className="h-full flex-1">
          <div className="flex h-full gap-5 flex-col">
            <div className="flex justify-between items-center">
              <OrganizationSidebar />
              <Navbar />
            </div>
            {/* <Sidebar /> */}

            <div className="h-full flex-1 bg-white rounded-3xl">
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
