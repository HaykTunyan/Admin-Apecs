"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import InputForm from "@/components/input";
import Autocomplete from "@/components/autocomplete";
import { PermistionRole } from "@/json";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoleByIdAPI, updateRoleAPI } from "@/service/role/roleAPI";
import DeleteModal from "@/containers/management/deleteModal";
import EditPermisionUser from "@/containers/management/editPermisionUser";
import AllertComponent from "@/components/allertComponent";
import TextArea from "@/components/textArea";
import Link from "next/link";

interface infoPermissionType {
  checked: boolean;
  description: string;
  id: number;
  type: string;
}

interface PermissionType {
  title: string;
  info: infoPermissionType[];
}

const EditRole: FC = () => {
  /**
   *  Edit Role.
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  // @ts-ignore
  const enabledEditRole = accessPermissions.includes("UPDATE_ROLE");

  // @ts-ignore
  const enabledDeleteRole = accessPermissions.includes("DELETE_ROLE");

  //
  const [showAllert, setShowAllert] = useState<string>("");
  const [roleData, setRoleData] = useState<any>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [permisionError, setPermisionError] = useState<boolean>(false);
  const [permissionList, setPermisionList] = useState<any | null>(null);
  const [newPermison, setNewPermision] = useState<PermissionType[]>([]);
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPermison, setIsModalPermision] = useState(false);

  // Error Fild
  const [errors, setErrors] = useState({
    roleName: "",
    description: "",
    permissions: "",
  });

  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    permissions: [],
  });

  // Validation
  const validateForm = () => {
    const formErrors = {
      roleName: "",
      description: "",
      permissions: "",
    };

    let isValid = true;

    if (!formData.roleName) {
      formErrors.roleName = "Role name is required";
      isValid = false;
    }

    if (!formData.description) {
      formErrors.description = "Role Description is required";
      isValid = false;
    }

    // if (!formData.permissions) {
    //   formErrors.permissions = "Permissions is required";
    //   isValid = false;
    // }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });

    // const isFormValid = validateForm();
  };

  const handleOpenPermision = () => {
    setIsModalPermision(true);
  };

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setDescriptionModal(
      "Are you sure you want to delete this role? This action cannot be undone."
    );
    setIsModalOpen(true);
  };

  const handleSaveInfo = async () => {
    const isFormValid = validateForm();

    if (formData.permissions?.length === 0) {
      setPermisionError(true);
      // setValidationActive(true)
    }

    const userInfo = {
      name: formData.roleName,
      description: formData.description,
      permissions: formData.permissions,
      previousData: JSON.stringify(roleData),
    };

    if (isFormValid && formData.permissions?.length > 0) {
      try {
        // Correctly pass role ID and user info to API
        const response = await updateRoleAPI(
          { id: roleData.id },
          userInfo as any
        );

        if (response) {
          setShowAllert("success");
          router.push("/management?activeTab=1");
        }
      } catch (error: any) {
        setShowAllert("error");
        const message = error?.response?.data?.message;
        if (message) {
          setErrorMessage(Array.isArray(message) ? message[0] : message);
        } else {
          setErrorMessage(Array.isArray(message) ? message[0] : message);
        }
      }
    } else {
      setShowAllert("error");
      setErrorMessage("Please fix the validation errors before submitting.");
    }
  };

  const handleBack = () => {
    router.push("/management?activeTab=1");
  };

  useEffect(() => {
    const fetchGetItemRole = async () => {
      if (id) {
        try {
          const response = await getRoleByIdAPI({ id });
          setRoleData(response);
          setFormData({
            roleName: response?.name,
            description: response?.description,
            permissions: response?.permissions,
          });

          setPermisionList(response?.permissions);
          setNewPermision(response?.permissions);
        } catch (error) {
        } finally {
        }
      }
    };

    fetchGetItemRole();
  }, [id]);

  useEffect(() => {
    if (permissionList?.length) {
      setPermisionList(permissionList);
      const transformedPermissions = permissionList.map(
        (permission: { id: any }) => ({
          id: permission.id,
        })
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: transformedPermissions,
      }));
    }
    if (permissionList?.length === 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: [],
      }));
    }
    if (permissionList?.length === 0) {
      setPermisionError(true);
    } else {
      setPermisionError(false);
    }
  }, [isModalOpen, permissionList]);

  return (
    <Fragment>
      <div className="p-8">
        <div className="flex flex-row items-center gap-3 ">
          <div className="">
            <img src="/icons/userManagement/home-line.svg" alt="Home-Line" />
          </div>
          <img
            src="/icons/userManagement/chevron-right.svg"
            alt="Chevron-Right"
          />
          <Link href={"/management?activeTab=1"} className="">
            <span className="text-base font-medium leading-5 text-tertiary ">
              {" "}
              User management{" "}
            </span>
          </Link>
          <img
            src="/icons/userManagement/chevron-right.svg"
            alt="Chevron-Right"
          />
          <div className="">
            <span className="text-base font-medium leading-5 text-tertiary ">
              {" "}
              Edit a role
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              Edit the role
            </h2>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="px-3.5 py-2.5 rounded-full border border-grey-border "
              onClick={handleBack}
            >
              <span className="text-grey-light-700 font-medium text-base  leading-5">
                {" "}
                Cancel{" "}
              </span>
            </button>
            <button
              className="px-3.5 py-2.5 rounded-full bg-orange-innter   border border-grey-border "
              onClick={enabledEditRole ? handleSaveInfo : undefined}
            >
              <span className="text-grey-light-700 text-base font-medium leading-5">
                {" "}
                Save{" "}
              </span>
            </button>
          </div>
        </div>
        <div className="pt-8" />
        <div className="flex flex-col">
          {/* Role information */}
          <div className="flex flex-row gap-8 w-full">
            <div className="flex flex-col w-3/12">
              <div className="">
                <p className="text-utility-gray-700 font-medium text-base leading-5">
                  {" "}
                  Role information{" "}
                </p>
                <p className="text-tertiary font-normal text-sm leading-4.5">
                  {" "}
                  Basic information about this role.
                </p>
              </div>
            </div>
            <div className="w-5/12">
              <InputForm
                type="text"
                labelTitle="Role name (*)"
                placeholder="Enter the role name"
                value={formData.roleName}
                changeValue={(value) => handleChange("roleName", value)}
                isError={!!errors.roleName}
                errorMessage={errors.roleName}
              />
            </div>
          </div>
          <div className="pt-4" />
          <div className="flex flex-row gap-8 w-full">
            <div className="flex flex-col w-3/12"></div>
            <div className="w-5/12">
              <TextArea
                type="text"
                labelTitle="Role description (*)"
                placeholder="Provide a concise description about this role"
                value={formData.description}
                changeValue={(value) => handleChange("description", value)}
                block={true}
                isError={!!errors.description}
                errorMessage={errors.description}
              />
            </div>
          </div>
          <div className="pt-5" />
          <div className="bg-utility-gray-200 h-[1px] w-full" />
          <div className="pt-5" />
          {/* Permissions */}
          <div className="flex flex-row gap-8 w-full">
            <div className="flex flex-col w-3/12">
              <div className="">
                <p className="text-utility-gray-700 font-medium text-base leading-5">
                  {" "}
                  Permissions
                </p>
                <p className="text-tertiary font-normal text-sm leading-4.5">
                  {" "}
                  Assign permissions for which this role is responsible.
                </p>
              </div>
            </div>
            <div className="w-5/12">
              <div className="">
                <Autocomplete
                  options={PermistionRole}
                  onOpenModal={handleOpenPermision}
                  isError={permisionError}
                  errorMessage={"Please Assign the Permission for Role"}
                  listInformation={
                    permissionList?.length ? permissionList : permissionList
                  }
                  labelTitle={"Select permission(s) (*)"}
                  type="permision"
                />
              </div>
              <div className="pt-2" />
              <p className="text-sm font-normal leading-4.5 text-tertiary">
                By clicking here, the system will display the list of
                permissions along with options for you to choose for the role
              </p>
            </div>
          </div>
          <div className="pt-5" />
          <div className="bg-utility-gray-200 h-[1px] w-full" />
          <div className="pt-5" />
          {/* Role deletion */}
          <div className="flex flex-row gap-8 w-full">
            <div className="flex flex-col w-3/12">
              <div className="">
                <p className="text-utility-gray-700 font-medium text-base leading-5">
                  {" "}
                  Role deletion
                </p>
                <p className="text-tertiary font-normal text-sm leading-4.5">
                  {" "}
                  Clicking &apos;Delete Role button&apos; will permanently
                  delete role and automatically be detached from its users.
                </p>
              </div>
            </div>
            <div className="w-5/12">
              <button
                type="button"
                onClick={
                  enabledDeleteRole ? () => handleDelete(roleData) : undefined
                }
                className={`py-2 px-3  rounded-xl
                  ${enabledDeleteRole ? "cursor-pointer bg-error-primary text-white" : "cursor-not-allowed bg-disabled-subtle text-grey-light-700 "}
                  
                  `}
              >
                <span className=" font-medium text-base leading-5 ">
                  {" "}
                  Delete this role
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-36" />
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-3">
            <button
              className="px-3.5 py-2.5 rounded-full border border-grey-border "
              onClick={handleBack}
            >
              <span className="text-grey-light-700 font-medium text-base  leading-5">
                {" "}
                Cancel{" "}
              </span>
            </button>
            <button
              className="px-3.5 py-2.5 rounded-full bg-orange-innter   border border-grey-border "
              onClick={enabledEditRole ? handleSaveInfo : undefined}
            >
              <span className="text-grey-light-700 text-base font-medium leading-5">
                {" "}
                Save{" "}
              </span>
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
        type="role"
      />

      {/* Edit Permision User */}
      <EditPermisionUser
        isOpen={isModalPermison}
        onClose={() => setIsModalPermision(false)}
        setPermisionList={setPermisionList}
        setNewPermision={setNewPermision}
        itemPermisinInfo={newPermison}
      />

      {showAllert === "error" ? (
        <AllertComponent
          type={"error"}
          title="There was a problem with that action"
          description={errorMessage}
          closeAllert={() => setShowAllert("")}
        />
      ) : showAllert === "success" ? (
        <AllertComponent
          type={"success"}
          title="You have successfully added Role"
          description="If you need any assistance, feel free to reach out to our support team."
          closeAllert={() => setShowAllert("")}
        />
      ) : null}

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

export default EditRole;
