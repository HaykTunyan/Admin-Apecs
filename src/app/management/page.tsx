import React from "react";
import TabsComponent from "@/components/tabsComponent";
import { getUserAPI } from "@/service/user/userAPI";

const UserManagement = async () => {
  /**
   *  Global User Management.
   */

  let initialUserList: any[] | null = null;

  try {
    initialUserList = await getUserAPI({ limit: 50, offset: 0 });
  } catch (error) {}

  return (
    <div className="p-8">
      <div>
        <h2 className="text-[32px] font-medium text-gray-900">
          User Management
        </h2>
        <TabsComponent initialUserList={initialUserList} />
      </div>
      <div></div>
    </div>
  );
};

export default UserManagement;
