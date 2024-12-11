import React, { FC } from "react";

interface StatusType {
  status: string;
}

const Status: FC<StatusType> = ({ status }) => {
  /**
   * Status Hooks.
   */

  return (
    <div
      className={`flex flex-row items-center px-1.5 py-0 border rounded-full w-min gap-1 ${
        status 
          ? "bg-utility-success-50 border-utility-success-200"
          : "bg-utility-gray border-utility-gray-200"
      }`}
    >
      <div className="flex items-center">
        {status  ? (
          <div className="active-icon" />
        ) : (
          <div className="inactive-icon" />
        )}
      </div>
      <div className="flex items-center">
        {status  ? (
          <span className="font-medium text-xs leading-4.5 text-utility-success">
            {" "}
            Active{" "}
          </span>
        ) : (
          <span className="font-medium text-xs leading-4.5  text-utility-gray-700">
            {" "}
            Inactive{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default Status;
