import React, { FC, useEffect, useState } from "react";
import { getPermisionAPI } from "@/service/permisions/permisionAPI";
import { FromatRole } from "@/json";

interface AddRoleUserProps {
  isOpen: boolean;
  onClose: () => void;
  setRolesList: (newList: any[]) => void;
  setNewRole?: (perPermisions: any) => void;
  itemRoleInfo?: any;
  title?: string;
  description?: string;
}

const AddRoleUser: FC<AddRoleUserProps> = ({
  isOpen,
  onClose,
  setRolesList,
  setNewRole,
  title,
  description,
  itemRoleInfo,
}) => {
  if (!isOpen) return null;

  const [permissionsState, setPermissionsState] = useState<any>({});
  const [filteringPermision, setFilteringPermision] = useState(
    itemRoleInfo?.length ? itemRoleInfo : FromatRole
  );

  useEffect(() => {
    const fetchPermisions = async () => {
      const response = await getPermisionAPI();
      const list = response?.rows || [];
      const initialState = list.reduce((acc: any, perm: any) => {
        acc[perm.id] = { view: false, add: false, edit: false, delete: false };
        return acc;
      }, {});
      //   setPermissionsState(initialState);
    };
    fetchPermisions();
  }, []);

  const handleCheckboxChange = (title: string, id: string) => {
    setFilteringPermision((prevState: any[]) => {
      const updatedState = prevState.map((group) => {
        if (group.title === title) {
          return {
            ...group,
            info: group.info.map((permission: { id: string; checked: any }) =>
              permission.id === id
                ? { ...permission, checked: !permission.checked }
                : permission
            ),
          };
        }
        return group;
      });

      // Save the updated permissions in the parent component
      if (setNewRole) {
        setNewRole(updatedState);
      }

      return updatedState;
    });
  };

  const handleSave = () => {
    const checkedPermissions = filteringPermision.flatMap(
      (group: { info: any[] }) =>
        group.info.filter((infoItem) => infoItem.checked)
    );

    // @ts-ignore
    const updatedData = checkedPermissions.map(({ checked, ...rest }) => rest);
    if (checkedPermissions.length) {
      setRolesList(updatedData);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative max-w-[640px] w-[640px] max-h-full bg-white rounded-3xl shadow-lg z-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center p-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold leading-7 text-default-primary overflow-hidden whitespace-nowrap truncate">
              <span>Assign permissions</span>
            </h2>
            <div className="pt-1" />
            <p className="text-tertiary text-sm leading-4.5 font-normal">
              Define individual permissions for the role on a per-permission
              basis.
            </p>
          </div>
          <div>
            <button onClick={handleClose}>
              <img src="/icons/userManagement/x-close.svg" alt="X-Close" />
            </button>
          </div>
        </div>
        <div className="pt-5" />
        <div className="relative max-h-[512px] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 -pt-1">
              <tr className="border border-utility-gray-200 bg-white">
                <th scope="col" className="px-6 py-4 text-tertiary text-left">
                  <span className="text-xs font-medium leading-5 ">
                    Permissions
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-tertiary">
                  <span className="text-xs font-medium leading-5">View</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-tertiary">
                  <span className="text-xs font-medium leading-5">Add</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-tertiary">
                  <span className="text-xs font-medium leading-5">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-tertiary">
                  <span className="text-xs font-medium leading-5">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteringPermision.map((item: any) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-utility-gray-200 odd:bg-white odd:dark:bg-gray"
                >
                  <th
                    scope="row"
                    className="px-6 py-7 font-medium text-gray-900 text-left"
                  >
                    {item.title}
                  </th>
                  {item?.info.map((permission: any) => (
                    <td className="px-6 py-7 text-center" key={permission.id}>
                      <label>
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 accent-brand-solid rounded-full"
                          checked={permission.checked}
                          onChange={() =>
                            handleCheckboxChange(item.title, permission.id)
                          }
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-6 py-8">
          <button
            className="bg-white text-center w-[290px] py-2.5 px-5 rounded-full border border-grey-border"
            type="button"
            onClick={handleClose}
          >
            <span className="text-grey-light-700 font-medium text-base ">
              {" "}
              Cancel{" "}
            </span>
          </button>
          <button
            className="bg-orange-innter text-center w-[290px] py-2.5 px-5 rounded-full"
            type="button"
            onClick={handleSave}
          >
            <span className="text-grey-light-700 font-medium text-base ">
              {" "}
              Select and Save{" "}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleUser;
