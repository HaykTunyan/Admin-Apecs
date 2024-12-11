"use client";

import React, { FC, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { getComponentAPI } from "@/service/product-management/component-api/getComponent";
import Pagination from "@/components/pagination";
import AllertComponent from "@/components/allertComponent";
import DeleteModal from "@/containers/management/deleteModal";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface CategoriesTableProps {
  allData: any;
  isItem?: boolean;
  itemDelete?: (isDeleteItem: boolean) => void;
}

const ComponentTable: FC<CategoriesTableProps> = ({
  allData,
  isItem,
  itemDelete,
}) => {
  /**
   *  Component Table Hooks.
   */

  // Redux State
  const router = useRouter();
  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );
  const accessPermissions = decodedToken?.permissions;

  const enabledAddComponent =
    accessPermissions?.length && accessPermissions.includes("CREATE_COMPONENT");
  const enabledEditComponent =
    accessPermissions?.length && accessPermissions.includes("UPDATE_COMPONENT");
  const enabledDeleteComponent =
    accessPermissions?.length && accessPermissions.includes("DELETE_COMPONENT");

  // Local State.
  const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");
  const [orderTable, setOrderTable] = useState<string>("name");
  const [searchInput, setSearchInput] = useState<string>("");
  const [tableList, setTableList] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAllert, setShowAllert] = useState<string>("");
  const [userOffset, setUserOffset] = useState<number>(0);
  const [userLimit] = useState<number>(10);

  // Modal Information.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");

  const handleAddComponent = () => {
    router.push("/product-management/components/add-component");
  };

  const editCategories = (item: any) => {
    router.push(`/product-management/components/edit-component?id=${item?.id}`);
  };

  const viewComponent = (item: any) => {
    router.push(`/product-management/components/view-component?id=${item?.id}`);
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

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setTitleModal(itemList?.full_name);
    setDescriptionModal(
      "Are you sure you want to delete the product component?"
    );
    setIsModalOpen(true);
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
        const response = await getComponentAPI(params);

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
          <div className="flex flex-row justify-between items-center h-full pt-4 pb-2 px-6">
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
              {enabledAddComponent && (
                <button
                  type="button"
                  className={`flex justify-between items-center border rounded-full p-2.5 gap-1 
               cursor-pointer border-orange-innter bg-orange-innter
             
               `}
                  onClick={handleAddComponent}
                >
                  <img src="/icons/userManagement/plus.svg" alt="Plus" />
                  <span className="font-medium text-base leading-4  text-grey-light-500">
                    {" "}
                    Add a component
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
                  {/* Name */}
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
                  {/* Component ID */}
                  <th className="px-6 py-3 text-left  text-gray-700  tracking-wider">
                    <span className="font-medium text-xs leading-4.5">
                      {" "}
                      Component ID
                    </span>
                  </th>
                  {/* Price */}
                  <th className="px-6 py-3 text-left  text-gray-700  tracking-wider">
                    <span className="font-medium text-xs leading-4.5">
                      {" "}
                      Price
                    </span>
                  </th>
                  {/* B code */}
                  <th className="px-6 py-3 text-left  text-gray-700  tracking-wider">
                    <span className="font-medium text-xs leading-4.5">
                      {" "}
                      B code
                    </span>
                  </th>
                  {/* Actions */}
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
                          : "bg-utility-gray  items-center "
                      }
                      onClick={
                        enabledEditComponent
                          ? () => editCategories(item)
                          : undefined
                      }
                    >
                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap flex flex-row  items-center gap-3 cursor-pointer h-[72px]">
                        {item.image && (
                          <img
                            className="w-10 h-10"
                            src={item.image.src}
                            alt="product image"
                          />
                        )}
                        <span className="font-medium text-base leading-5 text-default-primary w-56 overflow-hidden whitespace-nowrap truncate ">
                          {item?.name}
                        </span>
                      </td>
                      {/* Description */}
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer max-w-[160px] overflow-hidden text-ellipsis">
                        <span className="font-normal text-sm leading-4.5 text-tertiary truncate block">
                          {item.description}
                        </span>
                      </td>
                      {/* Component ID */}
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer ">
                        <span className="font-normal text-sm leading-4.5 text-tertiary">
                          {" "}
                          {item?.sku}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer ">
                        <span className="font-normal text-sm leading-4.5 text-tertiary">
                          {" "}
                          {"£"}
                          {item.price}
                        </span>
                      </td>
                      {/* Bar Code */}
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer ">
                        <p className="font-normal text-sm leading-4.5 text-tertiary">
                          {" "}
                          {item?.barcode}{" "}
                        </p>
                      </td>
                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap  cursor-pointer ">
                        <div
                          className="flex flex-row items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => viewComponent(item)}
                            className={`p-2.5 
                           
                           `}
                          >
                            <Image
                              src="/icons/product/file-icon.svg"
                              alt="file-icon"
                              width={20}
                              height={20}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={
                              enabledEditComponent
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
                              enabledDeleteComponent
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
                No components found
              </h3>
              <div className="pt-2" />
              <p className="font-normal text-sm leading-5 text-center text-tertiary">
                Component list is currently empty. Add components to easily
                manage by adding them to workshop products or directly to
                customer orders.
              </p>
              <div className="pt-8" />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddComponent}
                  className={`flex justify-between items-center border  rounded-full p-2.5 gap-1
                cursor-pointer border-orange-innter bg-orange-innter
             
                `}
                >
                  <img src="/icons/userManagement/plus.svg" alt="Plus" />
                  <span className="font-medium text-base leading-4  text-grey-light-500">
                    {" "}
                    Add a component
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showAllert={setShowAllert}
        itemInfo={itemInformation}
        title={titleModal}
        description={descriptionModal}
        itemDelete={itemDelete}
        isItem={isItem}
        type="component-component"
      />

      {showAllert === "delete" && (
        <AllertComponent
          type={"error"}
          title="There was a problem. Please try again."
          description={
            " Can not delete a component component with related components"
          }
          closeAllert={() => setShowAllert("")}
        />
      )}
    </Fragment>
  );
};

export default ComponentTable;
