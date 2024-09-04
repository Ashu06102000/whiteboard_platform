import { ChildrenProp } from "@/interface/interface";

import OrganizationSidebar from "./_components/organizationSidebar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: ChildrenProp) => {
  return (
    <main className="h-full">
      <div>
        {<Sidebar />}
        <div className="pl-16 h-full">
          <div className="flex gap-x-3 h-full">
            <OrganizationSidebar />
            <div className="h-full flex-1">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
