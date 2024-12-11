"use client";

import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AllertComponent from "@/components/allertComponent";
import InputForm from "@/components/input";
import TextArea from "@/components/textArea";
import { CreateCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import JobSelector from "@/components/jobSelector";

const AddCategory: FC = () => {
  /**
   * Add Category Hooks.
   */

  // Redux State
  const router = useRouter();
  const jobItems = useSelector((state: RootState) => state.job.items);

  // Local State
  const [showAllert, setShowAllert] = useState<string>("");
  const [apiError, setApiError] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [validationActive, setValidationActive] = useState<boolean>(false);

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
      formErrors.name =
        "Name is required and special characters or numbers.";
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
  };

  const handleChangeCategory = (selectCategory: string[]) => {

    //@ts-ignore
    const resultArray = selectCategory.map(item => item?.id);
    setFormData((prevData: any) => ({
      ...prevData,
      category: resultArray,
    }));
  };

  const handleSaveInfo =  async () => {
    const isFormValid = validateForm();
    setValidationActive(isFormValid);

    if(isFormValid) {

      const sendParams = {
        name: formData.name,
        description: formData.description,
        job_types_ids: formData.category,
      };

      try {
        const response = await CreateCategoryComponentAPI(sendParams as any);
        if (response) { 
          setShowAllert("success");
          router.push("/product-management/components");
         }
      } catch (error :  any ) {
        setShowAllert("error");

        if (error?.response?.data?.message) {
          if (error?.response?.data?.message) {
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
      setApiError("Please fill in all the required fields");
    }
  };

  const handleBack = () => {
    // router.back();
    router.push("/product-management/components/?activeTab=0");
  };

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
            Add a category
          </span>
        </div>
      </div>
      <div className="pt-5" />
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
            {" "}
            Add a component category
          </h2>
        </div>
        <div className="flex flex-row gap-3">
          <button className="px-3.5 py-2.5 rounded-full border border-grey-border"
          onClick={handleBack}
          >
            <span className="text-grey-light-700 font-medium text-base leading-5">
              {" "}
              Cancel{" "}
            </span>
          </button>
          <button
            type="button"
            onClick={handleSaveInfo}
            className={`px-3.5 py-2.5 rounded-full 
              
               ${
              !validationActive
                ? "bg-disabled-subtle text-fg-disabled"
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
        </div>
      </div>
      <div className="pt-96" />
      <div className="flex flex-row justify-end">
        <div className="flex flex-row gap-3">
        <button 
          onClick={handleBack}
        className="px-3.5 py-2.5 rounded-full border border-grey-border">
            <span className="text-grey-light-700 font-medium text-base  leading-5">
              {" "}
              Cancel{" "}
            </span>
          </button>
          <button
           type="button"
           onClick={handleSaveInfo}
            className={`px-3.5 py-2.5 rounded-full 
              
               ${
              !validationActive
                ? "bg-disabled-subtle text-fg-disabled"
                : "bg-orange-innter border border-orange-innter"
            }
              border border-grey-border`}
          >
            <span className="text-base font-medium leading-5">Save</span>
          </button>
        </div>
      </div>
    </div>

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

    </Fragment>
  );
};

export default AddCategory;
