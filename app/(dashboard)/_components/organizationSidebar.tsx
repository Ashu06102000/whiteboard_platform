"use client";

import Link from "next/link";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Clock4, LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const OrganizationSidebar = () => {
  const params = useSearchParams();
  const favorites = params.get("favorites");
  const recent = params.get("recent");

  return (
    <div className="hidden lg:flex  h-full w-full gap-4">
      <div className="flex justify-center items-center gap-4">
        <Link href={"/"} className="flex items-start gap-2">
          <div className="flex items-center justify-center gap-1">
            <h1
              className={cn(
                "font-Lato text-2xl text-primary leading-none bg-white px-8 py-5 rounded-full",
                font.className
              )}
            >
              IdeaCanvas
            </h1>
          </div>
        </Link>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                fontWeight: "bold",
                fontSize: "0.8 rem",
                width: "100%",
                borderWidth: "0.5px",
                borderRadius: "999px",
                height: "100%",
              },
              organizationSwitcherTrigger: {
                padding: " 18px 32px",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                borderRadius: "999px",
                backgroundColor: "white",
                transition: "background-color 0.3s ease",
                justifyContent: "space-between",
              },
              organizationPreviewMainIdentifier: {
                fontSize: "0.8rem",
              },
              organizationPreviewAvatarBox: {
                color: "black",
              },
            },
          }}
        />
      </div>
      <div className="flex items-center gap-20 justify-between bg-white px-8 py-5 rounded-full">
        <div className="w-full flex gap-8">
          <Button
            className={`p-0 w-full flex items-center gap-4 h-auto justify-start bg-transparent hover:bg-transparent  ${recent ? "text-blue-600" : "text-gray-600"}`}
            asChild
            size="lg"
          >
            <Link
              className="font-normal text-[16px]"
              href={{
                pathname: "/",
                // query: { recent: true },
              }}
            >
              <Clock4 size={18} />
              Recent Boards
            </Link>
          </Button>
          <Button
            className={`p-0 w-full flex items-center gap-4 h-auto justify-start bg-transparent hover:bg-transparent  ${!favorites && !recent ? "text-blue-600" : "text-gray-600"}`}
            asChild
            size="lg"
          >
            <Link href={"/"} className=" text-[16px]">
              <LayoutDashboard size={18} />
              This Team&apos;s Boards
            </Link>
          </Button>
          <Button
            className={`p-0 w-full flex items-center gap-4 h-auto justify-start bg-transparent hover:bg-transparent    ${favorites ? "text-blue-600" : "text-gray-600"}`}
            asChild
            size="lg"
          >
            <Link
              className="font-normal text-[16px]"
              href={{
                pathname: "/",
                query: { favorites: true },
              }}
            >
              <Star size={18} />
              My Starred Boards
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default OrganizationSidebar;
