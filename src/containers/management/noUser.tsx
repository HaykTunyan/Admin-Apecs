import React, { FC } from "react";
import { useRouter } from "next/navigation";

interface NoUserComponentType {
  permission: any;
};

const NoUserComponent: FC<NoUserComponentType> = ({permission}) => {
  /**
   *  No User Component
   */

  const router = useRouter();

  const handleOpenUser = () => {
    router.push("/management/add-user");
  };

  const enabledAddUser = permission?.length && permission.includes("CREATE_ADMIN");

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col ">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-lg border border-utility-gray-200 p-3 flex justify-center items-center">
            <img src="/icons/userManagement/users-plus.svg" alt="Users-Plus" />
          </div>
        </div>

        <div className="mt-5" />
        <div className="w-[352px]  ">
          <h3 className="font-semibold text-center text-lg leading-7 text-default-primary">
            {" "}
            No users found{" "}
          </h3>
          <div className="pt-2" />
          <p className="font-normal text-sm leading-5 text-center text-tertiary">
            Click ‘Add User’ button to create and manage users within the admin
            panel
          </p>
          <div className="pt-8" />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={enabledAddUser ? handleOpenUser : undefined}
              className={`flex justify-between items-center border  rounded-full p-2.5 gap-1
                ${enabledAddUser ? "cursor-pointer border-orange-innter bg-orange-innter" : "cursor-not-allowed bg-disabled-subtle" }
                `} 
            >
              <img src="/icons/userManagement/plus.svg" alt="Plus" />
              <span className="font-medium text-base leading-4  text-grey-light-500">
                {" "}
                Add a user{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoUserComponent;
