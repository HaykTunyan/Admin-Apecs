"use client";

import React, { FC, Fragment, useState } from "react";
import PermissionList from "@/components/permissionList";
import { useRouter } from "next/navigation";
import AllertComponent from "@/components/allertComponent";
import DeleteModal from "@/containers/management/deleteModal";
import Image from "next/image";

interface TabRoleType {
  dataList: any;
  sortType: string;
  userValue: string;
  permission: any;
  setSorting: (orderByRole: string) => void;
  itemDelete?: (isDeleteItem: boolean) => void;
  setUserValue: (value: string) => void;
  isItem?: boolean;
}

const TableRole: FC<TabRoleType> = ({
  dataList,
  sortType,
  userValue,
  permission,
  setSorting,
  itemDelete,
  setUserValue,
  isItem,
}) => {
  /**
   * Table Role Hooks
   *
   */

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("");
  const [showAllert, setShowAllert] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");
  const [itemInformation, setItemInformation] = useState<any>(null);

  // Permission Access.

  const enabledAddRole =
    permission?.length && permission.includes("CREATE_ROLE");
  const enabledEditRole =
    permission?.length && permission.includes("UPDATE_ROLE");
  // const enabledViewRole = permission.includes("READ_ROLE");
  const enabledDeleteRole =
    permission?.length && permission.includes("DELETE_ROLE");

  const handleDelete = (itemList: any) => {
    // Handle delete action here
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setDescriptionModal(
      "Are you sure you want to delete this role? This action cannot be undone."
    );
    setIsModalOpen(true);
  };

  const handleOpenRole = () => {
    router.push("/management/add-role");
  };

  const editRoleInfo = (item: any) => {
    router.push(`/management/edit-role?id=${item?.id}`);
  };

  return (
    <Fragment>
      <div className="role-tabler flex flex-col border border-utility-gray-200 rounded-xl ">
        <div className="flex flex-row justify-between items-center h-full  pt-5 pb-2 px-5">
          <div className="">
            <h3 className="font-semibold text-lg leading-7 text-default-primary ">
              {" "}
              Team members{" "}
            </h3>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center justify-center  ">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Search..."
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 border border-gray-300 rounded-full focus:outline-none "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {/* <img
                    src="/icons/userManagement/search-lg.svg"
                    alt="search-lg"
                  /> */}

                  <Image
                    src="/icons/userManagement/search-lg.svg"
                    alt="search-lg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={enabledAddRole ? handleOpenRole : undefined}
              className={` flex justify-between items-center border rounded-full p-2.5 gap-1 
                
                ${
                  enabledAddRole
                    ? "border-orange-innter bg-orange-innter "
                    : "bg-disabled-subtle cursor-not-allowed"
                }
                `}
            >
              {/* <img 
              src="/icons/userManagement/plus.svg" 
              alt="Plus" 
              /> */}
              <Image
                src="/icons/userManagement/plus.svg"
                alt="Plus"
                width={20}
                height={20}
              />

              <span className="font-medium text-base leading-4  text-grey-light-500">
                {" "}
                Add a role{" "}
              </span>
            </button>
          </div>
        </div>
        <div className="pt-7" />
        <div className="w-full h-[1px] bg-utility-gray-200 " />
        <div className=" ">
          <table className="w-full bg-white border border-utility-gray-200 rounded-lg">
            <thead className="bg-white">
              <tr>
                <th className="px-6  py-3 text-left text-gray-700  tracking-wider items-center flex gap-1">
                  <span className="font-medium text-xs leading-4.5">Name </span>
                  <button type="button" onClick={() => setSorting("name")}>
                    {sortType === "ASC" ? (
                      <img
                        src="/icons/userManagement/arrow-up.svg"
                        alt="Arrow-Up"
                      />
                    ) : (
                      <img
                        src="/icons/userManagement/arrow-down.svg"
                        alt="Arrow-Down"
                      />
                    )}
                  </button>
                </th>

                <th className="px-6 py-3 text-left text-gray-700  tracking-wider">
                  <span className="font-medium text-xs leading-4.5">
                    {" "}
                    Permissions{" "}
                  </span>
                </th>
                <th className="px-6 py-3 text-right  text-gray-700  tracking-wider">
                  <span className="font-medium text-xs leading-4.5">
                    {" "}
                    Actions{" "}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-white divide-y divide-utility-gray-200 border-t border-utility-gray-200">
              {dataList.map(
                (item: any, index: React.Key | null | undefined) => (
                  <tr
                    key={index}
                    className={
                      typeof index === "number" && index % 2 === 0
                        ? "bg-utility-gray"
                        : "bg-white"
                    }
                    onClick={
                      enabledEditRole ? () => editRoleInfo(item) : undefined
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex flex-row items-center gap-3 last:rounded-br-lg last:rounded-bl-lg cursor-pointer">
                      <span className="font-medium text-base leading-5 text-default-primary">
                        {item?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                      <div className="flex justify-start">
                        <PermissionList permission={item?.permissions} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  cursor-pointer">
                      <div
                        className="flex flex-row items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {enabledEditRole && (
                          <button
                            type="button"
                            className={`p-2.5 ${
                              enabledEditRole
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            }`}
                            onClick={
                              enabledEditRole
                                ? () => editRoleInfo(item)
                                : undefined
                            }
                          >
                            <Image
                              src="/icons/userManagement/edit.svg"
                              alt="edit"
                              width={20}
                              height={20}
                            />
                          </button>
                        )}

                        {enabledDeleteRole && (
                          <button
                            type="button"
                            className={`p-2.5  ${
                              enabledDeleteRole
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            }`}
                            onClick={
                              enabledDeleteRole
                                ? () => handleDelete(item)
                                : undefined
                            }
                          >
                            <Image
                              src="/icons/userManagement/trash.svg"
                              alt="Trash"
                              width={20}
                              height={20}
                            />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showAllert={setShowAllert}
        itemInfo={itemInformation}
        title={titleModal}
        description={descriptionModal}
        itemDelete={itemDelete}
        isItem={isItem}
        type={"role"}
      />

      {showAllert === "delete" && (
        <AllertComponent
          type={"error"}
          title="There was a problem with API try again"
          description={" Please try again, some thing is wrong"}
          closeAllert={() => setShowAllert("")}
        />
      )}
    </Fragment>
  );
};

export default TableRole;
