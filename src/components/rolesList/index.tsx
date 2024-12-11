import React, { FC } from "react";

// interface AdminRole {
//   id: number;
//   userId: number;
//   name: string;
//   description: string;
// }

interface RolesListProps {
  roles: any;
}

// type Role =
//   | "Category Management"
//   | "Administrator"
//   | "Customer Support"
//   | "Marketing Manager"
//   | "IT Support"
//   | "Category Manager"
//   | "Content Manager"
//   | "Product Manager"
//   | "Super administrator";

const RolesList: FC<RolesListProps> = ({ roles }) => {
  /**
   *  Roles List
   */

  // const roleStyles = useMemo(
  //   () => ({
  //     "Category Management": {
  //       border: "border-utility-gray-200",
  //       background: "bg-utility-gray",
  //       text: "text-utility-gray-700",
  //     },
  //     Administrator: {
  //       border: "border-utility-blue-200",
  //       background: "bg-utility-blue",
  //       text: "text-utility-blue-700",
  //     },
  //     "Customer Support": {
  //       border: "border-utility-success-200",
  //       background: "bg-utility-success-50",
  //       text: "text-utility-success",
  //     },
  //     "Marketing Manager": {
  //       border: "border-utility-brand-200",
  //       background: "bg-utility-brand-50",
  //       text: "text-brand-secondary",
  //     },
  //     "IT Support": {
  //       border: "border-utility-gray-blue-200",
  //       background: "bg-utility-gray-blue-50",
  //       text: "text-utility-gray-blue-700",
  //     },
  //     "Category Manager": {
  //       border: "border-utility-orange-200",
  //       background: "bg-utility-orange-50",
  //       text: "text-utility-orange-700",
  //     },
  //     "Content Manager": {
  //       border: "border-utility-orange-200",
  //       background: "bg-utility-pink-50",
  //       text: "text-utility-pink-700",
  //     },
  //     "Product Manager": {
  //       border: "border-utility-gray-200",
  //       background: "bg-utility-gray",
  //       text: "text-utility-gray-700",
  //     },
  //     "Super administrator": {
  //       border: "border-utility-gold-200",
  //       background: "bg-utility-gold-50",
  //       text: "text-utility-gold-700",
  //     },
  //   }),
  //   []
  // );

  return (
    <div className="flex flex-row gap-1">
      {/* {roles?.length > 0 && roleStyles[roles[0].name as Role] && (
        <div
          className={`border px-2 py-0.5 rounded-full ${
            roleStyles[roles[0].name as Role].border
          } ${roleStyles[roles[0].name as Role].background}`}
        >
          <span
            className={`font-medium text-xs leading-4.5 ${
              roleStyles[roles[0].name as Role].text
            }`}
          >
            {roles[0].name}
          </span>
        </div>
      )} */}

      {/* {roles?.length > 0 && (
        <div
          className={` px-2 py-0.5 rounded-full  bg-utility-gray border border-utility-gray-200`}
        >
          <span className={`font-medium text-xs leading-4.5 `}>
            {roles[0].name}
          </span>
        </div>
      )} */}

{roles?.length > 0 && (
        <>
          {roles.slice(0, 2).map((item: any, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="px-2 py-0.5 rounded-full  bg-utility-gray border border-utility-gray-200"
            >
              <span className="font-medium text-xs leading-4.5 text-grey-light-700 ">
                {item.name}
              </span>
            </div>
          ))}
        </>
      )}

      {roles?.length > 2 && (
        <div className="bg-utility-gray border border-utility-gray-200 px-2 py-0.5 rounded-full flex flex-row justify-center items-center gap-0.5">
          <span className="font-medium text-xs leading-3 text-utility-gray-700">
            +{roles?.length - 2}
          </span>
        </div>
      )}
    </div>
  );
};

export default RolesList;
