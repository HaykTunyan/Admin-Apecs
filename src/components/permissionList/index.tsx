import React, { FC } from "react";

interface PermissionProps {
  permission: any[];
}

// type Permissions =
//   | "Product Management"
//   | "Category Management"
//   | "Marketing"
//   | "Logistics"
//   | "Order Management"
//   | "Inventory Managemen"
//   | "Customer Support"
//   | "IT Support"
//   | "Administrator";

const PermissionList: FC<PermissionProps> = ({ permission }) => {
  /**
   *  Permission List Hooks.
   */

  return (
    <div className="flex flex-row gap-1">
      {permission?.length > 0 && (
        <>
          {permission.slice(0, 2).map((item: any, index) => (
            <div
              key={index}
              className="border px-2 py-0.5 rounded-full bg-white border-grey-border"
            >
              <span className="font-medium text-xs leading-4.5 text-utility-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </>
      )}

      {permission?.length > 2 && (
        <div className="bg-utility-gray border border-utility-gray-200 px-2 py-0.5 rounded-full flex flex-row justify-center items-center gap-0.5">
          <span className="font-medium text-xs leading-3 text-utility-gray-700">
            +{permission?.length - 2}
          </span>
        </div>
      )}
    </div>
  );
};

export default PermissionList;
