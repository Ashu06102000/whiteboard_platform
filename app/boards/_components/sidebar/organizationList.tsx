"use client";

import { useOrganizationList } from "@clerk/nextjs";
import OranizationListItems from "./oranizationListItems";

const OrganizationListComponent = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((data) => {
        return (
          <OranizationListItems
            key={data.organization.id}
            id={data.organization.id}
            name={data.organization.name}
            imageUrl={data.organization.imageUrl}
          />
        );
      })}
    </ul>
  );
};

export default OrganizationListComponent;
