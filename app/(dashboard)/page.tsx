"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyDashboardState from "./_components/dashboard/emptyDashboardState";
import { DashboardPageprops } from "@/interface/interface";
import BoardsList from "./_components/dashboard/boardList";
import CreateBoardSection from "./_components/dashboard/createBaordSection";

const Dashboard = ({ searchParams }: DashboardPageprops) => {
  const { organization } = useOrganization();

  return (
    <div className="p-4 dashboard_wrapper">
      {!organization ? (
        <EmptyDashboardState />
      ) : (
        <div className="flex gap-9 h-screen justify-between overflow-scroll custom_calc_height_dashboard_boards_section">
          <BoardsList org_id={organization.id} query={searchParams} />
          <CreateBoardSection org_id={organization.id} />
        </div>
      )}
    </div>
  );
};
export default Dashboard;
