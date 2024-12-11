"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InputForm from "@/components/input";
import TextArea from "@/components/textArea";
import AllertComponent from "@/components/allertComponent";
import {
  updateCategoryComponentAPI,
  getCategoryComponentByIdAPI,
} from "@/service/product-management/category-api/getCategory";
import DeleteModal from "@/containers/management/deleteModal";
import JobSelector from "@/components/jobSelector";

const EditCategory: FC = () => {
  /**
   * Edit Category Hooks.
   */

  // Redux State.
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const jobItems = useSelector((state: RootState) => state.job.items);

  // Local State.
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAllert, setShowAllert] = useState<string>("");
  const [apiError, setApiError] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [jobsData, setJobData] = useState<any | null>(null);

  // Modal Information.
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");
  const [oldCategory, setOldCategory] = useState<any | null>([]);

  const [formData, setFormData] = useState({
    name: "",
    category: [],
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const validateForm = () => {
    const formErrors = {
      name: "",
    };
    let isValid = true;

    // Validate Name
    if (!formData.name) {
      formErrors.name = "Name is required and special characters or numbers.";
      isValid = false;
    }

    // @ts-ignore
    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });

    const isFormValid = validateForm();
    setValidationActive(isFormValid);

    if (jobsData[0].type) {
      const formSelect = jobsData;
      // @ts-ignore
      const resultArray = formSelect.map((item) => item?.id);

      setFormData((prevData: any) => ({
        ...prevData,
        category: resultArray,
      }));
    }
  };

  const handleChangeCategory = (selectCategory: string[]) => {
    // @ts-ignore
    const resultArray = selectCategory.map((item) => item?.id);
    setFormData((prevData: any) => ({
      ...prevData,
      category: resultArray,
    }));

    setOldCategory(resultArray);
  };

  const handleEditInfo = async () => {
    const isFormValid = validateForm();
    setValidationActive(isFormValid);

    const updatedCategory =
      jobsData[0]?.type && oldCategory?.length === 0
        ? jobsData.map((item: any) => item?.id)
        : formData.category;

    const sendParams = {
      name: formData.name,
      description: formData.description,
      job_types_ids: updatedCategory,
    };

    if (isFormValid) {
      const categorisId = searchParams.get("id");

      try {
        const paramsID: any = { id: categorisId };

        const response = await updateCategoryComponentAPI(paramsID, sendParams);
        if (response) {
          setShowAllert("success");
          router.push("/product-management/components");
        }
      } catch (error: any) {
        setShowAllert("error");

        if (error?.response?.data?.message) {
          if (error?.response?.data?.message) {
            setErrorMessage(
              Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message
            );
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
      setApiError("Please fill in all the required fields");
    }
  };

  const handleBack = () => {
    // router.back();
    router.push("/product-management/components/?activeTab=0");
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

  useEffect(() => {
    const fetchGetCategoryItem = async () => {
      if (id) {
        try {
          const data = await getCategoryComponentByIdAPI({ id });

          setUserData(data);

          setFormData({
            name: data.name,
            description: data.description,
            category: data.job_types,
          });

          setJobData(data?.job_types);
        } catch (err) {}
      }
    };
    fetchGetCategoryItem();
  }, []);

  return (
    <Fragment>
      <div className="add-category p-8">
        <div className="flex flex-row items-center gap-3">
          <div className="">
            <img src="/icons/userManagement/home-line.svg" alt="Home-Line" />
          </div>
          <img
            src="/icons/userManagement/chevron-right.svg"
            alt="Chevron-Right"
          />
          <Link href={"/product-management/components"} className="">
            <span className="text-base font-medium leading-5 text-tertiary ">
              {" "}
              Components
            </span>
          </Link>
          <img
            src="/icons/userManagement/chevron-right.svg"
            alt="Chevron-Right"
          />
          <div className="">
            <span className="text-base font-medium leading-5 text-tertiary ">
              {" "}
              Edit a category
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              Edit a component category
            </h2>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="px-3.5 py-2.5 rounded-full border border-grey-border"
              onClick={handleBack}
            >
              <span className="text-grey-light-700 font-medium text-base leading-5">
                {" "}
                Cancel{" "}
              </span>
            </button>
            <button
              type="button"
              onClick={handleEditInfo}
              className={`px-3.5 py-2.5 rounded-full 
              
               ${
                 !validationActive
                   ? "bg-orange-innter border border-orange-innter"
                   : "bg-orange-innter border border-orange-innter"
               }
              border border-grey-border`}
            >
              <span className="text-base font-medium leading-5">Save</span>
            </button>
          </div>
        </div>
        <div className="pt-8" />
        <div className="w-full">
          <div className="">
            <h4 className="font-medium text-base leading-5 grey-light-700">
              Category information
            </h4>
            <div className="pt-4" />
            <div className="flex flex-row justify-between w-full gap-4 ">
              {/* Input Form Container */}
              <div className="w-full md:w-1/2">
                <InputForm
                  type="text"
                  labelTitle="Name (*)"
                  placeholder="Enter a name for the category"
                  value={formData.name}
                  changeValue={(value) => handleChange("name", value)}
                  isError={!!errors.name}
                  errorMessage={errors.name}
                />
              </div>

              {/* Role Selection Container */}
              <div className="w-full md:w-1/2">
                <JobSelector
                  listRoleInformation={jobItems as any}
                  selectedRole={jobsData?.length ? jobsData : []}
                  labelTitle="Select category job"
                  value={formData.category}
                  onChange={handleChangeCategory}
                  errorMessage={"Please assign at one of the category job"}
                />
              </div>
            </div>
            <div className="pt-6" />
            <div className="">
              <TextArea
                type="text"
                labelTitle="Description (optional)"
                placeholder="Enter a description about the category"
                value={formData.description}
                changeValue={(value) => handleChange("description", value)}
                block={true}
                isError={!!errors.description}
                errorMessage={errors.description}
              />
            </div>
            <div className="pt-4" />
            <button
              type="button"
              onClick={() => handleDelete(userData)}
              className={`py-2 px-3 rounded-xl cursor-pointer bg-error-primary text-white`}
            >
              <span className=" font-medium text-base leading-5 ">
                {" "}
                Delete component category
              </span>
            </button>
          </div>
        </div>
        <div className="pt-96" />
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-3">
            <button
              onClick={handleBack}
              className="px-3.5 py-2.5 rounded-full border border-grey-border"
            >
              <span className="text-grey-light-700 font-medium text-base  leading-5">
                {" "}
                Cancel{" "}
              </span>
            </button>
            <button
              type="button"
              onClick={handleEditInfo}
              className={`px-3.5 py-2.5 rounded-full 
               ${
                 !validationActive
                   ? "bg-orange-innter border border-orange-innter"
                   : "bg-orange-innter border border-orange-innter"
               }
              border border-grey-border`}
            >
              <span className="text-base font-medium leading-5">Save</span>
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
        type="category-component"
      />

      {showAllert === "error" ? (
        <AllertComponent
          type={"error"}
          title="There was a problem. Please try again."
          description={errorMessage}
          closeAllert={() => setShowAllert("")}
        />
      ) : showAllert === "success" ? (
        <AllertComponent
          type={"success"}
          title="You have successfully update Category"
          description="If you need any assistance, feel free to reach out to our support team."
          closeAllert={() => setShowAllert("")}
        />
      ) : null}

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

export default EditCategory;
