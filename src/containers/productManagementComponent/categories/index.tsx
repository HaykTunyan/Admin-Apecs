"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination";
import AllertComponent from "@/components/allertComponent";
import DeleteModal from "@/containers/management/deleteModal";
import { getCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import JobsView from "@/containers/productManagementComponent/jobsView";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface CategoriesTableProps {
  allData: any;
  isItem?: boolean;
  itemDelete?: (isDeleteItem: boolean) => void;
}

const CategoriesTable: FC<CategoriesTableProps> = ({
  allData,
  isItem,
  itemDelete,
}) => {
  /**
   *  Categories Table Hooks.
   */

  // Redux State
  const router = useRouter();
  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );
  const accessPermissions = decodedToken?.permissions;

  const enabledAddComponentCategory =
    accessPermissions?.length &&
    accessPermissions.includes("CREATE_COMPONENT_CATEGORY");
  const enabledEditComponentCategory =
    accessPermissions?.length &&
    accessPermissions.includes("UPDATE_COMPONENT_CATEGORY");
  const enabledDeleteComponentCategory =
    accessPermissions?.length &&
    accessPermissions.includes("DELETE_COMPONENT_CATEGORY");

  // Local State.
  const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");
  const [userOffset, setUserOffset] = useState<number>(0);
  const [userLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderTable, setOrderTable] = useState<string>("name");
  const [searchInput, setSearchInput] = useState<string>("");
  const [tableList, setTableList] = useState<any | null>(null);
  const [showAllert, setShowAllert] = useState<string>("");

  // Modal Information.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");

  const handleAddCategories = () => {
    router.push("/product-management/components/add-category");
  };

  const editCategories = (item: any) => {
    router.push(`/product-management/components/edit-category?id=${item?.id}`);
  };

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setTitleModal(itemList?.full_name);
    setDescriptionModal(
      "Are you sure you want to delete the categories component?"
    );
    setIsModalOpen(true);
  };

  const handleSortByCategory = (column: string) => {
    if (orderTable === column) {
      const newSortType = sortType === "ASC" ? "DESC" : "ASC";
      if (sortType === "ASC") {
        setSortType(newSortType);
      } else {
        setSortType(newSortType);
      }
    } else {
      setSortType("ASC");
    }
    setOrderTable(column);
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
    if (userOffset) {
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newOffset = (page - 1) * userLimit;
      setUserOffset(newOffset);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        const params = {
          limit: userLimit,
          offset: userOffset,
          orderBy: orderTable ? orderTable : orderTable,
          sort: sortType,
          q: searchInput,
        };
        const response = await getCategoryComponentAPI(params);

        setTableList(response);
      } catch (err) {
      } finally {
      }
    };
    fetchComponentData();
  }, [sortType, searchInput, orderTable, userOffset, userLimit]);

  useEffect(() => {
    const pages = Math.ceil(allData?.count / 10);
    setTotalPages(pages);
  }, [tableList, userLimit]);

  return (
    <Fragment>
      {allData?.rows?.length ? (
        <div className="categories-table flex flex-col border border-utility-gray-200 rounded-[20px] ">
          <div className="flex flex-row justify-between items-center h-full  pt-4 pb-2 px-6">
            <div className="">
              <h3 className="font-semibold text-lg leading-7 text-default-primary">
                {" "}
                Product components
              </h3>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center justify-center">
                <div className="relative w-full ">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
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
              {enabledAddComponentCategory && (
                <button
                  type="button"
                  className={`flex justify-between items-center border rounded-full p-2.5 gap-1 
                cursor-pointer border-orange-innter bg-orange-innter
              
                `}
                  onClick={handleAddCategories}
                >
                  <img src="/icons/userManagement/plus.svg" alt="Plus" />
                  <span className="font-medium text-base leading-4  text-grey-light-500">
                    {" "}
                    Add a category
                  </span>
                </button>
              )}
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
                    <span className="font-medium text-xs leading-4.5">
                      Name{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSortByCategory("name")}
                    >
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

                  {/* Description */}
                  <th className="px-6 py-3 text-left text-gray-700 tracking-wider">
                    <span className="font-medium text-xs leading-4.5">
                      {" "}
                      Description
                    </span>
                  </th>
                  {/* Jobs */}
                  <th className="px-6 py-3 text-left  text-gray-700  tracking-wider">
                    <span className="font-medium text-xs leading-4.5">
                      {" "}
                      Jobs{" "}
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
                {tableList?.rows.map(
                  (item: any, index: React.Key | null | undefined) => (
                    <tr
                      key={index}
                      className={
                        typeof index === "number" && index % 2 === 0
                          ? "bg-white  items-center "
                          : "bg-white  items-center "
                      }
                      onClick={
                        enabledEditComponentCategory
                          ? () => editCategories(item)
                          : undefined
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap flex flex-row  items-center gap-3 cursor-pointer h-[72px]">
                        <span className="font-medium text-base leading-5 text-default-primary w-56 overflow-hidden whitespace-nowrap truncate ">
                          {item?.name}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer max-w-[336px] overflow-hidden text-ellipsis">
                        <span className="font-normal text-sm leading-4.5 text-tertiary truncate block">
                          {item.description}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap  cursor-pointer">
                        <JobsView jobs={item?.job_types as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  cursor-pointer">
                        <div
                          className="flex flex-row items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={
                              enabledEditComponentCategory
                                ? () => editCategories(item)
                                : undefined
                            }
                            className={`p-2.5 
                            
                            `}
                          >
                            <Image
                              src="/icons/userManagement/edit.svg"
                              alt="edit"
                              width={20}
                              height={20}
                            />
                          </button>

                          <button
                            type="button"
                            className={`p-2.5  `}
                            onClick={
                              enabledDeleteComponentCategory
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
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col ">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg border border-utility-gray-200 p-3 flex justify-center items-center">
                <img
                  src="/icons/userManagement/users-plus.svg"
                  alt="Users-Plus"
                />
              </div>
            </div>

            <div className="mt-5" />
            <div className="w-[352px]  ">
              <h3 className="font-semibold text-center text-lg leading-7 text-default-primary">
                {" "}
                No component categories found
              </h3>
              <div className="pt-2" />
              <p className="font-normal text-sm leading-5 text-center text-tertiary">
                Category list is currently empty. Add categories to easily
                manage by attaching them to components.
              </p>
              <div className="pt-8" />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddCategories}
                  className={`flex justify-between items-center border  rounded-full p-2.5 gap-1
                cursor-pointer border-orange-innter bg-orange-innter
             
                `}
                >
                  <img src="/icons/userManagement/plus.svg" alt="Plus" />
                  <span className="font-medium text-base leading-4  text-grey-light-500">
                    {" "}
                    Add a category
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showAllert={setShowAllert}
        itemInfo={itemInformation}
        title={titleModal}
        description={descriptionModal}
        itemDelete={itemDelete}
        isItem={isItem}
        type="category-component"
      />

      {showAllert === "delete" && (
        <AllertComponent
          type={"error"}
          title="There was a problem. Please try again."
          description={"Can not delete a component category with related components"}
          closeAllert={() => setShowAllert("")}
        />
      )}
    </Fragment>
  );
};

export default CategoriesTable;
