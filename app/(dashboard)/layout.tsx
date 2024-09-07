import { ChildrenProp } from "@/interface/interface";
import OrganizationSidebar from "./_components/organizationSidebar";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: ChildrenProp) => {
  return (
    <main className="h-full">
      <div className="flex">
        <div className="h-full flex-1">
          <div className="flex gap-x-3 h-full">
            <Sidebar />
            <OrganizationSidebar />
            <div className="h-full flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
