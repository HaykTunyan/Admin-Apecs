"use client";

import React, { FC, useEffect, useState } from "react";
import InputForm from "@/components/input";
import { useSelector  } from "react-redux";
import { RootState } from "@/store/store";
import Autocomplete from "@/components/autocomplete";
import { PermistionRole } from "@/json";
import TextArea from "@/components/textArea";
import { createRoleAPI } from "@/service/role/roleAPI";
import AddPermisionUser from "@/containers/management/addPermisionUser";
import AllertComponent from "@/components/allertComponent";
import { useRouter } from "next/navigation";
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

const AddRole: FC = () => {
  /**
   *  AddRole.
   */

  const router = useRouter();
  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>("");
  const [permisionError, setPermisionError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAllert, setShowAllert] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<any>("");

  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  // @ts-ignore
  const enabledAddRole = accessPermissions.includes("CREATE_ROLE");

  // Form State
  const [permissionList, setPermisionList] = useState<any>(null);
  const [newPermison, setNewPermision] = useState<PermissionType[]>([]);

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

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });

  };

  const handleChnagePermision = (selectedPermissions: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      permissions: selectedPermissions,
    }));


    if (selectedPermissions?.length > 0) {
      setPermisionError(false);
    } else {
      setPermisionError(true);
    }
  };

  const handleOpenPermision = () => {
    setIsModalOpen(true);
  };

  const handleBack = () => {
    router.push("/management?activeTab=1");
  };

  const handleSaveInfo = async () => {
    const isFormValid = validateForm();

    setValidationActive(isFormValid);

    if (formData.permissions?.length === 0) {
      setPermisionError(true);
    }

    if (isFormValid && formData.permissions?.length > 0) {
    }

    const userInfo = {
      name: formData.roleName,
      description: formData.description,
      permissions: formData.permissions,
    };

    if (isFormValid && formData.permissions?.length > 0) {
      try {
        const response = await createRoleAPI(userInfo);

        if (response) {
          setShowAllert("success");
          router.push("/management?activeTab=1");
        }
      } catch (error: any) {
        setShowAllert("error");

        if (error?.response?.data?.message) {
          if (error?.response?.data?.message?.length > 3) {
            setErrorMessage(error?.response?.data?.message[0]);
          } else {
            setErrorMessage(error?.response?.data?.message);
          }
        }

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setApiError(error.response.data.message);
          if (apiError) {
          }
        } else {
          setApiError("An unknown error occurred");
        }
      }
    } else {
    }
  };

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

      const isFormValid = validateForm();
      setValidationActive(isFormValid);
    } else {
    }

    if (permissionList?.length === 0) {
      setPermisionError(true);
    } else {
      setPermisionError(false);
    }
  }, [isModalOpen, permissionList]);

  return (
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
            Add a role
          </span>
        </div>
      </div>
      <div className="pt-5" />
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
            {" "}
            Add a new role
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
            className={`px-3.5 py-2.5 rounded-full  
               border border-grey-border 
              ${
                !validationActive
                  ? "bg-disabled-subtle text-fg-disabled"
                  : "bg-orange-innter border border-orange-innter"
              }

              ${enabledAddRole ? "cursor-pointer"  : "cursor-not-allowed"}
              
              `}
            onClick={enabledAddRole ? handleSaveInfo : undefined }
          >
            <span
              className={`  
              ${validationActive ? "text-grey-light-700" : "text-fg-disabled"}
               text-base font-medium leading-5 `}
            >
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
                value={formData.permissions}
                changeValue={handleChnagePermision}
                onOpenModal={handleOpenPermision}
                isError={permisionError}
                errorMessage={"Please Assign the Permission for Role"}
                listInformation={permissionList?.length ? permissionList : []}
                labelTitle={"Select permission(s) (*)"}
                type="permision"
              />
            </div>
            <div className="pt-2" />
            <p className="text-sm font-normal leading-4.5 text-tertiary">
              By clicking here, the system will display the list of permissions
              along with options for you to choose for the role
            </p>
          </div>
        </div>
      </div>
      <div className="mt-56"></div>
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
            className={`px-3.5 py-2.5 rounded-full   border border-grey-border 
              
              ${validationActive ? "bg-orange-innter  " : "bg-disabled-subtle"}

              ${enabledAddRole ? "cursor-pointer"  : "cursor-not-allowed"}
              `}
              onClick={enabledAddRole ? handleSaveInfo : undefined }
          >
            <span
              className={`  
              ${validationActive ? "text-grey-light-700" : "text-fg-disabled"}
               text-base font-medium leading-5 `}
            >
              {" "}
              Save{" "}
            </span>
          </button>
        </div>
      </div>
      {/* AddPermisionUser */}
      <AddPermisionUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default AddRole;
