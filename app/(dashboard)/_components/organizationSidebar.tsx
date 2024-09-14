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
    <div className="hidden lg:flex flex-col h-screen spacr-y-6 max-w-72 w-full p-2 pt-5 gap-6 ">
      <Link href={"/"} className="flex items-start gap-2">
        <div className="flex flex-col gap-1">
          <h1
            className={cn(
              "font-semibold text-4xl text-primary leading-none",
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
              borderColor: "black",
              borderRadius: "8px",
            },
            organizationSwitcherTrigger: {
              padding: "12px 18px",
              width: "100%",
              cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: "slate-100",
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
      <div className="w-full flex flex-col gap-4 pt-4">
        <Button
          className={`p-0 w-full flex items-center gap-2 h-auto justify-start bg-transparent hover:bg-transparent  ${recent ? "text-blue-600" : "text-gray-600"}`}
          asChild
          size="lg"
        >
          <Link
            className="font-normal"
            href={{
              pathname: "/",
              // query: { recent: true },
            }}
          >
            <Clock4 size={16} />
            Recent Boards
          </Link>
        </Button>
        <Button
          className={`p-0 w-full flex items-center gap-2 h-auto justify-start bg-transparent hover:bg-transparent  ${!favorites && !recent ? "text-blue-600" : "text-gray-600"}`}
          asChild
          size="lg"
        >
          <Link href={"/"} className=" font-normal">
            <LayoutDashboard size={16} />
            This Team&apos;s Boards
          </Link>
        </Button>
        <Button
          className={`p-0 w-full flex items-center gap-2 h-auto justify-start bg-transparent hover:bg-transparent    ${favorites ? "text-blue-600" : "text-gray-600"}`}
          asChild
          size="lg"
        >
          <Link
            className="font-normal"
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star size={16} />
            My Starred Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default OrganizationSidebar;
