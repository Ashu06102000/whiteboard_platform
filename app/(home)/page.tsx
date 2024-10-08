"use client";
import { useOrganization } from "@clerk/nextjs";
import CreateBoardSection from "../boards/_components/dashboard/createBaordSection";
import EmptyDashboardState from "../boards/_components/dashboard/emptyDashboardState";
import Navbar from "../boards/_components/navbar";

const Home = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-col gap-5 p-5">
      <Navbar />
      {!organization ? (
        <EmptyDashboardState />
      ) : (
        <div className="flex gap-9 h-screen justify-between overflow-scroll custom_calc_height_dashboard_boards_section">
          <CreateBoardSection org_id={organization.id} />
        </div>
      )}
    </div>
  );
};
export default Home;
