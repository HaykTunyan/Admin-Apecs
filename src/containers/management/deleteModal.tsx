import React, { FC } from "react";
import { deleteUserAPI } from "@/service/user/userAPI";
import { deleteRoleAPI } from "@/service/role/roleAPI";
import { deleteCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import { deleteComponentAPI } from "@/service/product-management/component-api/getComponent";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  showAllert: (allert: string) => void;
  itemInfo?: any;
  title: string;
  description: string;
  itemDelete?: (isDeleteItem: boolean) => void;
  isItem?: boolean;
  type: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  showAllert,
  title,
  description,
  itemInfo,
  itemDelete,
  isItem,
  type,
}) => {
  /**
   * DeleteModal
   */
  const router = useRouter();

  if (!isOpen) return null;

  const handleDeleteItem = async () => {
    const userId = itemInfo?.id;

    if (!userId) {
      return;
    }

    try {
      let res;
      if (type === "role") {
        res = await deleteRoleAPI(userId);
        if (res) {
        }
        router.push("/management?activeTab=1");
        onClose();
      } else if (type === "user") {
        res = await deleteUserAPI(userId);
        if (res) {
        }
        router.push("/management");
        onClose();
      } else if (type === "category-component") {
        res = await deleteCategoryComponentAPI(userId);

        if (res) {
        }
        router.push("/product-management/components");
        onClose();
      } else if (type === "component-component") {
        res = await deleteComponentAPI(userId);

        if (res) {
        }
        router.push("/product-management/components/?activeTab=1");
        onClose();
      } else {
      }
      // @ts-ignore
      itemDelete(!isItem);
      onClose();

      if (type === "role") {
        router.push("/management?activeTab=1");
      }
      if (type === "category-component") {
        router.push("/product-management/components");
      }
      if(type === "component-component") {
        router.push("/product-management/components/?activeTab=1");
      }
    } catch (error) {
      showAllert("delete");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-3xl shadow-lg w-[400px] p-6 z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <div className="bg-error-secondary rounded-full  w-12 h-12 flex justify-center items-center">
              <Image
                src="/icons/userManagement/trash-red.svg"
                alt="Trash-Red"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="">
            <button onClick={onClose} className=" ">
              <Image
                src="/icons/userManagement/x-close.svg"
                alt="X-Close"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="pt-4" />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold leading-7 text-default-primary  overflow-hidden whitespace-nowrap truncate ">
            <span>
              Delete{" "}
              {type === "role"
                ? "role"
                : type === "user"
                ? "user account"
                : type === "category-component"
                ? "category component"
                : type === "component-component"
                ? "priduct component"
                : ""}{" "}
              <span className="mx-1"></span>{" "}
              {type === "role" ? (
                <span className=""> {itemInfo?.name}</span>
              ) : type === "user" ? (
                <span className=""> {title}</span>
              ) : type === "category-component" ? (
                <span className=""> {itemInfo?.name}</span>
              ) : type === "component-component" ? (
                <span className=""> {itemInfo?.name}</span>
              ) : (
                <span className=""> {title}</span>
              )}
              {/* <span className=""> {itemInfo?.full_name}</span> */}
            </span>
          </h2>
          <div className="pt-1" />
          <p className="text-tertiary text-sm leading-4.5 font-normal ">
            {description}
          </p>
        </div>
        <div className="pt-8" />
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 w-[170px] bg-white text-utility-gray-700 rounded-full border border-grey-border "
          >
            <span className="font-medium text-base leading-6 ">Cancel</span>
          </button>
          <button
            onClick={handleDeleteItem}
            className="px-4 py-2.5 w-[170px] bg-error-primary text-white rounded-full  border border-error-primary "
          >
            <span className="font-medium text-base leading-6 ">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
