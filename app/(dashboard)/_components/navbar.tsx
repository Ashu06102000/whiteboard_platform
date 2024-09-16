"use client";

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteOrganization from "./inviteOrganization";

const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center gap-4 w-full bg-white h-full rounded-full p-2">
      <div className="hidden lg:flex lg:flex-1 h-full">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
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
                maxWidth: "250px",
              },
              organizationSwitcherTrigger: {
                padding: "8px 12px",
                width: "100%",
                cursor: "pointer",
                borderRadius: "999px",
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
      </div>
      {organization && <InviteOrganization />}

      <UserButton
        appearance={{
          elements: {
            rootBox: {
              height: "100%",
              justifyContent: "flex-end",
            },
            userButtonAvatarBox: {
              height: "100%",
              width: "100%",
            },
            userButtonBox: {
              height: "100%",
            },
          },
        }}
      />
    </div>
  );
};

export default Navbar;
