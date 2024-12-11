import React, { FC, useEffect, useState, useCallback  } from "react";
import { getPermisionAPI } from "@/service/permisions/permisionAPI";
import { useSelector  } from "react-redux";
import { RootState } from "@/store/store";

interface AddPermisionUserProps {
  isOpen: boolean;
  onClose: () => void;
  setPermisionList: (newList: any[]) => void;
  setNewPermision?: (perPermisions: any) => void;
  itemPermisinInfo?: any;
}

interface Permission {
  id: string;
  checked: boolean;
  name: string;
  [key: string]: any;
}

interface PermissionGroup {
  title: string;
  info: Permission[];
}

const AddPermisionUser: FC<AddPermisionUserProps> = ({
  isOpen,
  onClose,
  setPermisionList,
  setNewPermision,
  itemPermisinInfo,
}) => {

  /**
   *  Add Permision User
   */

  if (!isOpen) return null;

  const userPermission = useSelector( (state: RootState) => state.permission.categories);

  const [filteringPermision, setFilteringPermision] = useState(
    userPermission?.length ? userPermission : userPermission
  );

  const [showPermision, setShowPermision] = useState<PermissionGroup[] | null>(
    null
  );


  const [headerCheckboxes, setHeaderCheckboxes] = useState<{
    [key: string]: boolean;
  }>({
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [anyItemChecked, setAnyItemChecked] = useState<{
    [key: string]: boolean;
  }>({
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  // const saveList = useState<any>(
  //   itemPermisinInfo?.length ? itemPermisinInfo : filteringPermision
  // )[0];

  // const showItems = itemPermisinInfo?.length
  //   ? itemPermisinInfo
  //   : filteringPermision;

  // useEffect(() => {
  //   const fetchPermisions = async () => {
  //     const response = await getPermisionAPI();
  //     const list = response?.rows || [];
  //     const initialState = list.reduce((acc: any, perm: any) => {
  //       acc[perm.id] = { view: false, add: false, edit: false, delete: false };
  //       return acc;
  //     }, {});
  //     if(initialState) {

  //     }
  //     // setPermissionsState(initialState);
  //   };
  //   fetchPermisions();
  // }, []);

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

      setNewPermision?.(updatedState);
      updateHeaderCheckboxes(updatedState);

      return updatedState;
    });
  };

  const updateHeaderCheckboxes = (permissions: PermissionGroup[]) => {
    const headers = ["View", "Add", "Edit", "Delete"];
    const newHeaderState: { [key: string]: boolean } = {};
    const newAnyItemChecked: { [key: string]: boolean } = {};

    headers.forEach((header) => {
      const allChecked = permissions.every((group) =>
        group.info.some(
          (permission) => permission.name === header && permission.checked
        )
      );
      const anyChecked = permissions.some((group) =>
        group.info.some(
          (permission) => permission.name === header && permission.checked
        )
      );

      newHeaderState[header] = allChecked;
      newAnyItemChecked[header] = anyChecked;
    });

    setHeaderCheckboxes(newHeaderState);
    setAnyItemChecked(newAnyItemChecked);
  };

  const handleSave = () => {
    const checkedPermissions = filteringPermision.flatMap(
      (group: { info: any[] }) =>
        group.info.filter((infoItem) => infoItem.checked)
    );

    // @ts-ignore
    const updatedData = checkedPermissions.map(({ checked, ...rest }) => rest);
    if (checkedPermissions.length) {
      setPermisionList(updatedData);
    } else {
      setPermisionList([]);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleHeaderCheckboxChange = (header: string) => {
    setFilteringPermision((prevState: any[]) => {
      const updatedState = prevState.map((group) => ({
        ...group,
        info: group.info.map((permission: { name: string; }) =>
          permission.name === header
            ? { ...permission, checked: !headerCheckboxes[header] }
            : permission
        ),
      }));

      setNewPermision?.(updatedState);
      updateHeaderCheckboxes(updatedState);
      return updatedState;
    });
  };

  const fetchPermisions = useCallback(async () => {
    try {
      const response = await getPermisionAPI();
      const list = response?.rows || [];
      if(list) {

      } 
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    fetchPermisions();
  }, [fetchPermisions]);

  useEffect(() => {
    const permissionIds = itemPermisinInfo.map((item: any) => item.id);

    const updatedFilteringPermision = filteringPermision.map((group: { info: { id: any; checked: any; }[]; }) => ({
      ...group,
      info: group.info.map((item: { id: any; checked: any; }) => ({
        ...item,
        checked: permissionIds.includes(item.id) || item.checked,
      })),
    }));
    // @ts-ignore
    setFilteringPermision(updatedFilteringPermision);
    // @ts-ignore
    setShowPermision(updatedFilteringPermision);
    // @ts-ignore
    updateHeaderCheckboxes(updatedFilteringPermision);
  }, [itemPermisinInfo]);

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative max-w-[680px] w-[680px] max-h-full bg-white rounded-3xl shadow-lg z-100"
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
        <div className="relative max-h-[512px] overflow-y-auto overflow-x-hidden modal-scrollbar">
          <table className="w-full">
            <thead className="sticky top-0 -pt-1">
              <tr className="border border-utility-gray-200 bg-white">
                <th scope="col" className="px-6 py-4 text-tertiary text-left">
                  <span className="text-xs font-medium leading-5 ">
                    Permissions
                  </span>
                </th>
                {["View", "Add", "Edit", "Delete"].map((col) => (
                  <th key={col} scope="col" className="px-6 py-3 text-tertiary">
                    <div className="flex flex-row gap-3">
                      {/* <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 accent-brand-solid rounded-full"
                        checked={headerCheckboxes[col]}
                        onChange={() => handleHeaderCheckboxChange(col)}
                      /> */}

                      {headerCheckboxes[col] ? (
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 accent-brand-solid rounded-full cursor-pointer"
                          checked={true}
                          onChange={() => handleHeaderCheckboxChange(col)}
                        />
                      ) : anyItemChecked[col] ? (
                        <div
                          className="w-5 h-5 bg-brand-solid rounded-md flex items-center justify-center cursor-pointer"
                          onClick={() => handleHeaderCheckboxChange(col)}
                        >
                          <span className="text-white text-base leading-none text-center h-[18px] w-3">
                            −
                          </span>
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 accent-brand-solid rounded-full cursor-pointer"
                          checked={false}
                          onChange={() => handleHeaderCheckboxChange(col)}
                        />
                      )}
                      <span className="text-xs font-medium leading-5">
                        {col}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll modal-scrollbar ">
              {/* {filteringPermision.map((item: any) => (
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
              ))} */}
                  {showPermision?.map((item, index ) => (
                <tr
                  key={item.title}
                  className={ `
                    
                    ${typeof index === "number" && index % 2 === 0
                    ? "bg-utility-gray"
                    : "bg-white"}
                     border-b border-utility-gray-200  `  }
                >
                  <th
                    scope="row"
                    className="px-6 py-6 font-medium text-gray-900 text-left"
                  >
                    {item.title}
                  </th>
                  {item.info.map((permission) => (
                    <td className="px-6 py-6" key={permission.id}>
                      <label>
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 rounded-[6px]  accent-brand-solid"
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

export default AddPermisionUser;
