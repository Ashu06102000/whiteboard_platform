import CreateSidebarButton from "./createSidebarButton";
import OrganizationListComponent from "./organizationList";

const Sidebar = () => {
  return (
    <aside className=" bg-slate-100 h-screen w-16 flex p-3 flex-colgap-y-4 text-white  flex-col gap-2">
      <OrganizationListComponent />
      <CreateSidebarButton />
    </aside>
  );
};

export default Sidebar;
