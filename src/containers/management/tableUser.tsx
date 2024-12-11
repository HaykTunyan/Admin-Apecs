"use client";

import React, { FC, Fragment, useState, useEffect } from "react";
import RolesList from "@/components/rolesList";
import DeleteModal from "@/containers/management/deleteModal";
import AllertComponent from "@/components/allertComponent";
import { useRouter } from "next/navigation";
import Pagination from "../../components/pagination";
import Image from "next/image";

interface TableUserType {
  dataList: any;
  sortType: string;
  userValue: string;
  userLimit: number;
  countUser: number;
  permission: any;
  setSorting: (orderBy: string) => void;
  itemDelete?: (isDeleteItem: boolean) => void;
  setUserValue: (value: string) => void;
  isItem?: boolean;
  toGoButton: (page: any) => void;
  setUserOffset: (page: any) => void;
}

const TableUser: FC<TableUserType> = ({
  dataList,
  sortType,
  userValue,
  userLimit,
  permission,
  setSorting,
  itemDelete,
  setUserValue,
  isItem,
  toGoButton,
  setUserOffset,
  countUser,
}) => {
  /**
   *  Table User Hooks.
   */

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllert, setShowAllert] = useState<string>("");
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");
  const [itemInformation, setItemInformation] = useState<any>(null);

  // Permission Access.

  const enabledAddUser =
    permission?.length && permission.includes("CREATE_ADMIN");
  const enabledEditUser =
    permission?.length && permission.includes("UPDATE_ADMIN");
  // const enabledViewUser = permission.includes("READ_ADMIN");
  const enabledDeleteUser =
    permission?.length && permission.includes("DELETE_ADMIN");

  useEffect(() => {
    const pages = Math.ceil(countUser / 10);
    setTotalPages(pages);
  }, [dataList, userLimit]);

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal(itemList?.full_name);
    setDescriptionModal(
      "Are you sure you want to delete this user’s account? This action cannot be undone."
    );
    setIsModalOpen(true);
  };

  const handleOpenUser = () => {
    router.push("/management/add-user");
  };

  const editUserInfo = (item: any) => {
    router.push(`/management/edit-user?id=${item?.id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newOffset = currentPage * userLimit;
      setUserOffset(newOffset);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newOffset = (currentPage - 2) * userLimit;
      setUserOffset(newOffset);
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newOffset = (page - 1) * userLimit;
      setUserOffset(newOffset);
      setCurrentPage(page);
    }
  };

  return (
    <Fragment>
      <div className="user-tabler flex flex-col border border-utility-gray-200 rounded-xl ">
        <div className="flex flex-row justify-between items-center h-full  pt-5 pb-2 px-5">
          <div className="">
            <h3 className="font-semibold text-lg leading-7 text-default-primary">
              {" "}
              Team members{" "}
            </h3>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center justify-center">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Search..."
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 border border-gray-300 rounded-full focus:outline-none "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
              onClick={enabledAddUser ? handleOpenUser : undefined}
              className={`flex justify-between items-center border rounded-full p-2.5 gap-1 
                ${
                  enabledAddUser
                    ? "cursor-pointer border-orange-innter bg-orange-innter "
                    : "cursor-not-allowed bg-disabled-subtle"
                }
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
        <div className="pt-7" />
        <div className="w-full h-[1px] bg-utility-gray-200" />
        <div className=" ">
          <table className="w-full bg-white border border-utility-gray-200 rounded-lg">
            <thead className="bg-white">
              <tr>
                {/* full_name */}
                <th className="px-6  py-3 text-left  text-gray-700 tracking-wider items-center flex gap-1">
                  <span className="font-medium text-xs leading-4.5">Name </span>
                  <button type="button" onClick={() => setSorting("full_name")}>
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
                {/* status */}
                {/* <th className="px-6 py-3 text-left  text-gray-700  tracking-wider  items-center  gap-1">
                  <span className="font-medium text-xs leading-4.5">
                    {" "}
                    Status{" "}
                  </span>
                  <button type="button" onClick={() => setSorting("status")}>
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
                </th> */}
                {/* email */}
                <th className="px-6 py-3 text-left text-gray-700 tracking-wider">
                  <span className="font-medium text-xs leading-4.5">
                    {" "}
                    Email address{" "}
                  </span>
                  {/* <button type="button" onClick={() => setSorting("email")}>
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
                  </button> */}
                </th>
                {/* Role */}
                <th className="px-6 py-3 text-left  text-gray-700  tracking-wider">
                  <span className="font-medium text-xs leading-4.5">
                    {" "}
                    Role{" "}
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
            <tbody className="bg-white divide-y divide-utility-gray-200 border-t border-utility-gray-200">
              {dataList.map(
                (item: any, index: React.Key | null | undefined) => (
                  <tr
                    key={index}
                    className={
                      typeof index === "number" && index % 2 === 0
                        ? "bg-utility-gray "
                        : "bg-white"
                    }
                    onClick={
                      enabledEditUser ? () => editUserInfo(item) : undefined
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex flex-row  items-center gap-3 cursor-pointer">
                      {item?.avatar ? (
                        <Image
                          src="/icons/userManagement/avatar-user.svg"
                          alt="Avatar-User"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          src="/icons/userManagement/avatar-user.svg"
                          alt="Avatar-User"
                          width={40}
                          height={40}
                        />
                      )}

                      <span className="font-medium text-base leading-5 text-default-primary w-56 overflow-hidden whitespace-nowrap truncate">
                        {item?.full_name}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="">
                        <Status status={item?.status} />
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer ">
                      <span className="font-normal text-sm leading-4.5 text-tertiary">
                        {" "}
                        {item.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  cursor-pointer">
                      <RolesList roles={item?.roles as any} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  cursor-pointer ">
                      <div
                        className="flex flex-row items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {enabledEditUser && (
                          <button
                            type="button"
                            className={`p-2.5 ${
                              enabledEditUser
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } `}
                            onClick={
                              enabledEditUser
                                ? () => editUserInfo(item)
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

                        {enabledDeleteUser && (
                          <button
                            type="button"
                            onClick={
                              enabledDeleteUser
                                ? () => handleDelete(item)
                                : undefined
                            }
                            className={`p-2.5  ${
                              enabledDeleteUser
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } `}
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
        <div className="pt-5" />
        <div className="flex flex-row justify-between  items-center px-6 pt-3.5 pb-5">
          <div className="flex items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3.5 py-2 border border-utility-gray-200 rounded-full ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Image
                src="/icons/userManagement/arrow-left.svg"
                alt="Arrow-Left"
                width={20}
                height={20}
              />
              <span
                className={`text-utility-gray-700 font-medium text-base  leading-5`}
              >
                {" "}
                Previous
              </span>
            </button>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={goToPage}
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3.5 py-2 border border-utility-gray-200 rounded-full ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="text-utility-gray-700 font-medium text-base  leading-5">
                {" "}
                Next{" "}
              </span>
              <Image
                src="/icons/userManagement/arrow-right.svg"
                alt="Arrow-Rsight"
                width={20}
                height={20}
              />
            </button>
          </div>
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
        type={"user"}
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

export default TableUser;
