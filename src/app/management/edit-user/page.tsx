"use client";

import React, { FC, Fragment, useState, useEffect } from "react";
import InputForm from "@/components/input";
import Autocomplete from "@/components/autocomplete";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import EditPermisionUser from "@/containers/management/editPermisionUser";
import { PermistionRole } from "@/json";
import { getUserByIdAPI, updateUserAPI } from "@/service/user/userAPI";
import { getRoleAPI } from "@/service/role/roleAPI";
import { getRoleTypes } from "@/hooks/roleTypes";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DeleteModal from "@/containers/management/deleteModal";
import { editAdminTypes, UpdateUserParams } from "@/hooks/userTypes";
import EditRoleInput from "@/containers/management/editRoleInput";
import AllertComponent from "@/components/allertComponent";
import PhoneCountryComponent from "@/components/phoneCountry";

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

const EditUser: FC = () => {
  /**
   *  EditUser.
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  // Permission Access.
  //@ts-ignore
  const enabledEditUser = accessPermissions.includes("UPDATE_ADMIN");
  //@ts-ignore
  const enabledDeleteUser = accessPermissions.includes("DELETE_ADMIN");

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorRole, setErrorRole] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [showAllert, setShowAllert] = useState<string>("");
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [roleData, setRoleData] = useState<any | null>(null);

  const [titleModal, setTitleModal] = useState<string>("");
  const [isModalPermison, setIsModalPermision] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState<string>("");

  const [permissionList, setPermisionList] = useState<any>(null);
  const [newPermison, setNewPermision] = useState<PermissionType[]>([]);
  const [newRole, setNewRole] = useState<PermissionType[] | null>(null);

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
  });

  const validateForm = () => {
    const formErrors = {
      fullName: "",
      sureName: "",
      emailValue: "",
      phoneValue: "",
    };
    let isValid = true;

    if (!formData.fullName) {
      formErrors.fullName =
        "Full name cannot include special characters or numbers";
      isValid = false;
    }

    if (!formData.sureName) {
      formErrors.sureName =
        "This username is already taken. Please choose another";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.emailValue || !emailPattern.test(formData.emailValue)) {
      formErrors.emailValue =
        "Please use a proper email format (e.g., name@example.com)";
      isValid = false;
    }

    if (!formData.phoneValue) {
      formErrors.phoneValue = "Phone number must include a country code (e.g.)";
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

  const handleRoleChange = (selectedRoles: string[]) => {
    setFormData((prevData: any) => ({
      ...prevData,
      roles: selectedRoles,
    }));

    if (selectedRoles?.length > 0) {
      setErrorRole(false);
    } else {
      setErrorRole(true);
    }
  };

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setTitleModal(itemList?.full_name);
    setDescriptionModal(
      "Are you sure you want to delete this role? This action cannot be undone."
    );
    setIsModalOpen(true);
  };

  const handleOpenPermision = () => {
    setIsModalPermision(true);
  };

  const handleEditInfo = async () => {
    const isFormValid = validateForm();

    if (formData.roles?.length === 0) {
      setErrorRole(true);
    }

    if (isFormValid && formData.roles?.length > 0) {
      const userId = searchParams.get("id");

      if (!userId) {
        setErrorMessage("User ID is required.");
        return;
      }

      // @ts-ignore
      const userInfo: editAdminTypes = {
        // @ts-ignore
        full_name: formData.fullName,
        username: formData.sureName,
        email: formData.emailValue,
        phone: formData.phoneValue,
        status: formData.activeStatus,
        roles: formData.roles,
        permissions: formData.permissions,
        previousData: JSON.stringify(userData),
      };

      try {
        const params: UpdateUserParams = { id: userId };

        const response = await updateUserAPI(params, userInfo);

        if (response) {
          setShowAllert("success");
          router.push("/management");
        }
      } catch (error: any) {
        setShowAllert("error");

        if (error?.response?.data?.message) {
          setErrorMessage(
            Array.isArray(error.response.data.message)
              ? error.response.data.message[0]
              : error.response.data.message
          );
        }

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
        } else {
        }
      }
    } else {
    }
  };

  const handleBack = () => {
    router.push("/management?activeTab=0");
  };

  useEffect(() => {
    const fetchEditUserData = async () => {
      if (id) {
        try {
          const data = await getUserByIdAPI({ id });
          setUserData(data);
          setFormData({
            fullName: data?.full_name,
            sureName: data?.username,
            emailValue: data?.email,
            phoneValue: data?.phone,
            roles: data?.roles,
            permissions: data?.permissions,
            activeStatus: data?.status,
          });

          setPermisionList(data?.permissions);
          setNewPermision(data?.permissions);
          setNewRole(data?.roles);
        } catch (err) {
        } finally {
          setLoading(false);
          if (loading) {
          }
        }
      }
    };

    fetchEditUserData();
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
    } else {
    }
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
    <Fragment>
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
              Edit user account
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              Edit user account
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
              onClick={enabledEditUser ? handleEditInfo : undefined}
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
              <EditRoleInput
                listRoleInformation={roleData?.length ? roleData : []}
                selectedRole={newRole?.length ? newRole : []}
                labelTitle="Select role(s) (*)"
                value={formData.roles}
                isError={errorRole}
                errorMessage={"Please assign at least one role to the user."}
                onChange={handleRoleChange}
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
                  listInformation={
                    permissionList?.length ? permissionList : permissionList
                  }
                  labelTitle={"Assign permission(s)"}
                  type="permision"
                />
              </div>
              <div className="pt-2" />
              <p className="text-sm font-normal leading-4.5 text-tertiary">
                These custom permissions apply only to this user and do not
                impact default roles or other users
              </p>
            </div>
          </div>
          <div className="pt-5" />
          <div className="bg-utility-gray-200 h-[1px] w-full" />
          <div className="pt-5" />
          {/* Status */}

          {/* Account deletion */}
          <div className="flex flex-row gap-8 w-full">
            <div className="flex flex-col w-3/12">
              <div className="">
                <p className="text-utility-gray-700 font-medium text-base leading-5">
                  {" "}
                  Account deletion
                </p>
                <p className="text-tertiary font-normal text-sm leading-4.5">
                  {" "}
                  Clicking &apos;Delete Account&apos; will permanently delete
                  this user’s account and cannot be undone.
                </p>
              </div>
            </div>
            <div className="w-5/12">
              <button
                type="button"
                onClick={
                  enabledDeleteUser ? () => handleDelete(userData) : undefined
                }
                className={`py-2 px-3 bg-error-primary rounded-xl 
                  
                  ${
                    enabledDeleteUser
                      ? "cursor-pointer bg-error-primary text-white"
                      : "cursor-not-allowed bg-disabled-subtle text-grey-light-700"
                  }
                  `}
              >
                <span className=" font-medium text-base leading-5 ">
                  {" "}
                  Delete this account
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="" />
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
              className="px-3.5 py-2.5 rounded-full bg-orange-innter   border border-grey-border "
              onClick={enabledEditUser ? handleEditInfo : undefined}
            >
              <span className="text-grey-light-700 text-base font-medium leading-5">
                {" "}
                Save{" "}
              </span>
            </button>
          </div>
        </div>
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          showAllert={setShowAllert}
          itemInfo={itemInformation}
          title={titleModal}
          description={descriptionModal}
          type="user"
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
            title="You have successfully added User"
            description="If you need any assistance, feel free to reach out to our support team."
            closeAllert={() => setShowAllert("")}
          />
        ) : null}
      </div>
    </Fragment>
  );
};

export default EditUser;
