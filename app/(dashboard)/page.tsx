"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyDashboardState from "./_components/dashboard/emptyDashboardState";
import { DashboardPageprops } from "@/interface/interface";
import BoardsList from "./_components/dashboard/boardList";

const Dashboard = ({ searchParams }: DashboardPageprops) => {
  const { organization } = useOrganization();
  return (
    <div className="bg-white p-4 dashboard_wrapper">
      {!organization ? (
        <EmptyDashboardState />
      ) : (
        <BoardsList org_id={organization.id} query={searchParams} />
      )}
    </div>
  );
};
export default Dashboard;
