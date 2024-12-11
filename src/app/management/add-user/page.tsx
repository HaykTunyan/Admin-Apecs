"use client";

import React, { FC, useEffect, useState } from "react";
import InputForm from "@/components/input";
import Autocomplete from "@/components/autocomplete";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import PhoneInputForm from "@/components/phoneInput";
import AddPermisionUser from "@/containers/management/addPermisionUser";
import { PermistionRole } from "@/json";
import { createUserAPI } from "@/service/user/userAPI";
import { getRoleAPI } from "@/service/role/roleAPI";
import { getRoleTypes } from "@/hooks/roleTypes";
// import { PhoneNumberUtil } from "google-libphonenumber";
import AllertComponent from "@/components/allertComponent";
import { useRouter } from "next/navigation";
import RoleComplete from "@/components/roleComplete";
// import AddRoleUser from "@/containers/management/addRoleUser";
import Link from "next/link";
import PhoneCountryComponent from "@/components/phoneCountry";
// API

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

const AddUser: FC = () => {
  /**
   *  AddUser.
   */
  const router = useRouter();
  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  // Permission Access.
  //@ts-ignore
  const enabledAddUser = accessPermissions.includes("CREATE_ADMIN");

  // const phoneUtil = PhoneNumberUtil.getInstance();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isRoleModal, setIsRoleModal] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>("");
  const [errorRole, setErrorRole] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [showAllert, setShowAllert] = useState<string>("");
  const [validationActive, setValidationActive] = useState<boolean>(false);

  // Form State
  const [permissionList, setPermisionList] = useState<any>(null);
  const [newPermison, setNewPermision] = useState<PermissionType[]>([]);
  // const [rolesList, setRolesList] = useState<any>(null);
  // const [newRole, setNewRole] = useState<PermissionType[] | null>(null);
  const [roleData, setRoleData] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    sureName: "",
    emailValue: "",
    phoneValue: "",
    roles: [],
    permissions: [],
    activeStatus: true,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    sureName: "",
    emailValue: "",
    phoneValue: "",
    // roles: "",
  });

  const validateForm = () => {
    const formErrors = {
      fullName: "",
      sureName: "",
      emailValue: "",
      phoneValue: "",
      // roles: ""
    };
    let isValid = true;

    // Validate full name
    if (!formData.fullName) {
      formErrors.fullName =
        "Full name cannot contain special characters or numbers.";
      isValid = false;
    }

    // Validate surname
    if (!formData.sureName) {
      formErrors.sureName =
        "This username is already taken. Please choose another.";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.emailValue || !emailPattern.test(formData.emailValue)) {
      formErrors.emailValue =
        "Please provide a valid email address (e.g., name@example.com).";
      isValid = false;
    }

    // Validate phone number
    if (!formData.phoneValue) {
      formErrors.phoneValue =
        "Phone number must include a country code (e.g., +1).";
      isValid = false;
    }

    // Validate roles
    //   if (!formData.roles || formData.roles.length === 0) {
    //     formErrors.roles = "Please assign at least one role to the user.";
    //     isValid = false; // Set isValid to false if no roles are assigned
    // } else {
    //     // Clear roles error if roles are assigned
    //     formErrors.roles = "";
    //     isValid = true;
    // }

    // @ts-ignore
    setErrors(formErrors);
    return isValid;
  };

  // const addMorePhone = () => {};

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });

    const isFormValid = validateForm();
    setValidationActive(isFormValid);
  };

  const handleRoleChange = (selectedRoles: string[]) => {
    setFormData((prevData: any) => ({
      ...prevData,
      roles: selectedRoles,
    }));

    if (selectedRoles?.length > 0) {
      setErrorRole(false);
    } else {
      setErrorRole(true);
      setValidationActive(true);
    }
    // const isFormValid = validateForm();
    // setValidationActive(isFormValid);
  };

  const handleOpenPermision = () => {
    setIsModalOpen(true);
  };

  // const handleOpenRole = () => {
  //   setIsRoleModal(true);
  // };

  const handleSaveInfo = async () => {
    const isFormValid = validateForm();

    setValidationActive(isFormValid);

    if (formData.roles?.length === 0) {
      setErrorRole(true);
      setValidationActive(true);
    }

    if (isFormValid && formData.roles?.length > 0) {
      const userInfo = {
        full_name: formData.fullName,
        username: formData.sureName,
        email: formData.emailValue,
        phone: formData.phoneValue,
        status: formData.activeStatus,
        roles: formData.roles,
        permissions: formData.permissions,
      };

      try {
        const response = await createUserAPI(userInfo as any);

        if (response) {
          setShowAllert("success");

          router.push("/management");
        }
      } catch (error: any) {
        setShowAllert("error");

        if (error?.response?.data?.message) {
          // console.log(" error?.response?.data ", error?.response?.data)
          if (error?.response?.data?.message) {
            setErrorMessage(error?.response?.data?.message);
          }
          // if (error?.response?.data?.message.length > 3) {
          //   setErrorMessage(error?.response?.data?.message[0]);
          // } else {
          //   setErrorMessage(error?.response?.data?.message);
          // }
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

  // const handleCancel = () => {
  //   setFormData({
  //     fullName: "",
  //     sureName: "",
  //     emailValue: "",
  //     phoneValue: "",
  //     roles: [],
  //     permissions: [],
  //     activeStatus: false,
  //   });
  // };

  const handleBack = () => {
    // router.back();
    router.push("/management?activeTab=0");
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
    }
    // if (rolesList?.length) {
    //   setRolesList(rolesList);

    //   const transdormedRoles = rolesList.map((permission: { id: any }) => ({
    //     id: permission.id,
    //   }));

    //   setFormData((prevFormRoles) => ({
    //     ...prevFormRoles,
    //     roles: transdormedRoles,
    //   }));
    // }
  }, [isModalOpen, permissionList]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const params: getRoleTypes = {
          limit: 50,
          offset: 0,
        };
        const response = await getRoleAPI(params);
        if (response) {
          setRoleData(response.rows);
        }
      } catch (err) {}
    };
    fetchRoles();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-row items-center gap-3">
        <div className="">
          <img src="/icons/userManagement/home-line.svg" alt="Home-Line" />
        </div>
        <img
          src="/icons/userManagement/chevron-right.svg"
          alt="Chevron-Right"
        />
        <Link href={"/management"} className="">
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
            Add a user{" "}
          </span>
        </div>
      </div>
      <div className="pt-5" />
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
            {" "}
            Add a new user{" "}
          </h2>
        </div>
        <div className="flex flex-row gap-3">
          <button
            className="px-3.5 py-2.5 rounded-full border border-grey-border"
            onClick={handleBack}
          >
            <span className="text-grey-light-700 font-medium text-base  leading-5">
              {" "}
              Cancel{" "}
            </span>
          </button>
          <button
            className={`px-3.5 py-2.5 rounded-full  
              ${
              !validationActive
                ? "bg-disabled-subtle text-fg-disabled"
                : "bg-orange-innter border border-orange-innter"
            } border border-grey-border`}
            onClick={enabledAddUser ? handleSaveInfo : undefined}
          >
            <span className="text-base font-medium leading-5">Save</span>
          </button>
        </div>
      </div>
      <div className="pt-8" />
      <div className="flex flex-col">
        {/* Profile information */}
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12">
            <div className="">
              <p className="text-utility-gray-700 font-medium text-base leading-5">
                {" "}
                Profile information{" "}
              </p>
              <p className="text-tertiary font-normal text-sm leading-4.5">
                {" "}
                Basic information about the new admin user.{" "}
              </p>
            </div>
          </div>
          <div className="w-5/12">
            <InputForm
              type="text"
              labelTitle="Full name (*)"
              placeholder="Enter user’s name and surname"
              value={formData.fullName}
              changeValue={(value) => handleChange("fullName", value)}
              isError={!!errors.fullName}
              errorMessage={errors.fullName}
            />
          </div>
        </div>
        <div className="pt-4" />
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12"></div>
          <div className="w-5/12">
            <InputForm
              type="text"
              labelTitle="Username (*)"
              placeholder="Write a username"
              value={formData.sureName}
              changeValue={(value) => handleChange("sureName", value)}
              isError={!!errors.sureName}
              errorMessage={errors.sureName}
            />
          </div>
        </div>
        <div className="pt-5" />
        <div className="bg-utility-gray-200 h-[1px] w-full" />
        <div className="pt-5" />
        {/* Contat details */}
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12">
            <div className="">
              <p className="text-utility-gray-700 font-medium text-base leading-5">
                {" "}
                Contat details{" "}
              </p>
              <p className="text-tertiary font-normal text-sm leading-4.5">
                Business contact details for the admin user.
              </p>
            </div>
          </div>
          <div className="w-5/12">
            <InputForm
              type="email"
              labelTitle="Email (*)"
              placeholder="e.g. name@apecs.com"
              value={formData.emailValue}
              changeValue={(value) => handleChange("emailValue", value)}
              isError={!!errors.emailValue}
              errorMessage={errors.emailValue}
            />
          </div>
        </div>
        {/* Old Version Component . Don't Delete It */}
        {/* <div className="pt-4" />
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12"></div>
          <div className="w-5/12">
            <div className="flex flex-row  gap-4">
              <div className="w-full">
                <PhoneInputForm
                  labelTitle="Phone number (*)"
                  placeholder="e.g. +44 7911 123456"
                  value={formData.phoneValue}
                  changeValue={(value: string | boolean) =>
                    handleChange("phoneValue", value)
                  }
                  isError={!!errors.phoneValue}
                  errorMessage={errors.phoneValue}
                />
              </div>

              <div className="pt-9 hidden">
                <button
                  type="button"
                  onClick={addMorePhone}
                  className="rounded-full border border-grey-border w-9 h-9 flex justify-center items-center "
                >
                  <img
                    src="/icons/userManagement/plus-icon.svg"
                    alt="Plus-Icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* New Input Component */}
        <div className="pt-4" />
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12"></div>
          <div className="w-5/12">
            <div className="flex flex-row  gap-4">
              <div className="w-full">
                <PhoneCountryComponent
                  labelTitle="Phone number (*)"
                  placeholder="e.g. +44 7911 123456"
                  value={formData.phoneValue}
                  changeValue={(value: string | boolean) =>
                    handleChange("phoneValue", value)
                  }
                  isError={!!errors.phoneValue}
                  errorMessage={errors.phoneValue}
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="pt-5" />
        <div className="bg-utility-gray-200 h-[1px] w-full" />
        <div className="pt-5" />
        {/* User roles */}
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12">
            <div className="">
              <p className="text-utility-gray-700 font-medium text-base leading-5">
                {" "}
                User roles
              </p>
              <p className="text-tertiary font-normal text-sm leading-4.5">
                {" "}
                Assign roles that the new user will be responsible for.
              </p>
            </div>
          </div>
          <div className="w-5/12">
            <RoleComplete
              listRoleInformation={roleData?.length ? roleData : []}
              labelTitle="Select role(s) (*)"
              value={formData.roles}
              onChange={handleRoleChange}
              isError={errorRole}
              errorMessage={"Please assign at least one role to the user."}
              type="role"
            />
          </div>
        </div>
        <div className="pt-5" />
        <div className="bg-utility-gray-200 h-[1px] w-full" />
        <div className="pt-5" />
        {/* Custom permissions */}
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12">
            <div className="">
              <p className="text-utility-gray-700 font-medium text-base leading-5">
                {" "}
                Custom permissions (Optional)
              </p>
              <p className="text-tertiary font-normal text-sm leading-4.5">
                {" "}
                Assign specific permissions to the user beyond the standard
                roles to tailor their access.
              </p>
            </div>
          </div>
          <div className="w-5/12">
            <div className="">
              <Autocomplete
                options={PermistionRole}
                onOpenModal={handleOpenPermision}
                listInformation={permissionList?.length ? permissionList : []}
                labelTitle={"Assign permission(s)"}
                type="permision"
              />
            </div>
            <div className="pt-2" />
            <p className="text-sm font-normal leading-4.5 text-tertiary">
              These custom permissions apply only to this user and do not impact
              default roles or other users
            </p>
          </div>
        </div>
        {/* <div className="pt-5" /> */}
        {/* <div className="bg-utility-gray-200 h-[1px] w-full" /> */}
        {/* <div className="pt-5" /> */}
        {/* Status */}
        {/* <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col w-3/12">
            <div className="">
              <p className="text-utility-gray-700 font-medium text-base leading-5">
                {" "}
                Status
              </p>
              <p className="text-tertiary font-normal text-sm leading-4.5">
                {" "}
                Activating a status adjusts the user&apos;s login access,
                feature availability, and permitted actions.
              </p>
            </div>
          </div>
          <div className="w-5/12">
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.activeStatus}
                onChange={handleSwitchChange}
              />
              <div className="relative w-9 h-5 bg-disabled-subtle rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-solid"></div>
              <span className="ms-3 text-base font-medium leading-5 text-grey-light-700">
                Active
              </span>
            </label>
          </div>
        </div> */}
      </div>
      <div className="mt-6" />
      <div className="flex flex-row justify-end">
        <div className="flex flex-row gap-3">
          <button
            className="px-3.5 py-2.5 rounded-full border border-grey-border"
            onClick={handleBack}
          >
            <span className="text-grey-light-700 font-medium text-base  leading-5">
              {" "}
              Cancel{" "}
            </span>
          </button>
          <button
            className={`px-3.5 py-2.5 rounded-full  ${
              !validationActive
                ? "bg-disabled-subtle text-fg-disabled"
                : "bg-orange-innter border border-orange-innter"
            } border border-grey-border`}
            onClick={handleSaveInfo}
          >
            <span className="text-base font-medium leading-5">Save</span>
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
      {/* <AddRoleUser
        isOpen={isRoleModal}
        onClose={() => setIsRoleModal(false)}
        setRolesList={setRolesList}
        setNewRole={setNewRole}
        itemRoleInfo={newRole}
      /> */}
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
          title="You have successfully added User"
          description="If you need any assistance, feel free to reach out to our support team."
          closeAllert={() => setShowAllert("")}
        />
      ) : null}
    </div>
  );
};

export default AddUser;
