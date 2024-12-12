"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import {
  createComponent,
} from "@/service/product-management/component-api/getComponent";
import AllertComponent from "@/components/allertComponent";
import InputForm from "@/components/input";
import TextArea from "@/components/textArea";
import UploadFile from "@/containers/productManagementComponent/upload";
import Selector from "@/components/selector";
import PriceInputForm from "@/components/priceInput";

const AddComponent: FC = () => {
  /**
   * Add Category Hooks.
   */

  // Redux State
  const router = useRouter();

  // Local State
  const [showAllert, setShowAllert] = useState<string>("");
  const [apiError, setApiError] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryComponentList, setCategoryComponentList] = useState<
    any | null
  >(null);
  const [categoryItem, setCategoryItem] = useState<any | null>(null);
  const [errorCategory, setErrorCategory] = useState<boolean>(false);

  const oldImage = "";

  const [formData, setFormData] = useState({
    conponentID: "",
    category_id: "",
    barcode: "",
    price: "",
    name: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    category_id: "",
    name: "",
  });

  const validateForm = () => {
    const formErrors = {
      name: "",
      category_id: "",
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

    if (!categoryItem?.id) {
      setValidationActive(false);
    }

    if (categoryItem?.id && formData?.name) {
      setValidationActive(true);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (typeof value === "string" && field === "price") {
      // Prevent setting negative values
      if (Number(value) >= 0 || value === "") {
        handleChange(field, value);
      }
    } else {
      handleChange(field, value);
    }
  };

  const handleChangeCategory = (selectCategory: { id: string }[]) => {
    // @ts-ignore
    setCategoryItem(selectCategory);
    setFormData({ ...formData, category_id: selectCategory[0]?.id });
    // @ts-ignore
    const resultId = selectCategory?.id;
    setFormData((prevData) => ({
      ...prevData,
      category_id: resultId,
    }));

    // @ts-ignore
    if (formData?.name && selectCategory?.id) {
      setValidationActive(true);
      setErrorCategory(false);
      // @ts-ignore
    } else if (!formData?.name && !selectCategory?.id) {
      setValidationActive(false);
      setErrorCategory(true);
      // @ts-ignore
    } else if (formData?.name && !selectCategory?.id) {
      setErrorCategory(true);
      setValidationActive(false);
      // @ts-ignore
    } else if (!formData?.name && selectCategory?.id) {
      setErrorCategory(false);
      setValidationActive(false);
    }
  };

  const handleSaveInfo = () => {
    const isFormValid = validateForm();
    setValidationActive(isFormValid);

    if (!categoryItem?.id) {
      setValidationActive(false);
      setErrorCategory(true);
    }

    if (isFormValid && categoryItem?.id) {
      createComponent(
        formData.category_id,
        formData.barcode,
        formData.price,
        formData.name,
        formData.description,
        categoryImage
      )
        .then(() => {
          setShowAllert("success");
          router.push("/product-management/components/?activeTab=1");
        })
        .catch((error) => {
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
        });
    }
  };

  const handleBack = () => {
    router.push("/product-management/components/?activeTab=1");
  };

  useEffect(() => {
    const getComponentData = async () => {
      try {
        const response = await getCategoryComponentAPI({
          params: {
            offset: "",
            limit: "",
            orderBy: "",
            sort: "",
            q: "",
          },
        });

        if (response) {
          const list = response?.rows;

          const filteringItem = list.map((item: { id: any; name: any }) => ({
            id: item.id,
            name: item.name,
          }));

          setCategoryComponentList(filteringItem);
        }
      } catch (err) {
      } finally {
      }
    };
    getComponentData();
  }, []);

  useEffect(() => {
    if (categoryImage?.name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: categoryImage.name,
      }));
    }
  }, [categoryImage]);

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
          <Link
            href={"/product-management/components/?activeTab=1"}
            className=""
          >
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
              Add a component
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              Add a component
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
              Component information
            </h4>
            {/*  */}
            <div className="pt-4" />
            <div className="flex flex-row justify-between w-full gap-4 ">
              {/* Input Form Container */}
              <div className="w-full md:w-1/2">
                <InputForm
                  type="text"
                  labelTitle="Component ID"
                  placeholder=""
                  value={formData.conponentID}
                  changeValue={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      conponentID: value,
                    }))
                  }
                  disabled={true}
                />
              </div>

              {/* Role Selection Container */}
              <div className="w-full md:w-1/2">
                <Selector
                  listItem={categoryComponentList as any}
                  value={
                    formData?.category_id ? [{ id: formData.category_id }] : []
                  }
                  labelTitle="Select component category"
                  onChange={handleChangeCategory}
                  isError={errorCategory}
                  // isError={categoryItem?.id ? false : !!errors.category_id}
                  // errorMessage={errors.category_id}
                  errorMessage={"Category is required. Please select one."}
                />
              </div>
            </div>
            {/*  */}
            <div className="pt-4" />
            <div className="flex flex-row justify-between w-full gap-4 ">
              {/* Input Form Container */}
              <div className="w-full md:w-1/2">
                <InputForm
                  type="text"
                  labelTitle="Name (*)"
                  placeholder="Enter a name for the component"
                  value={formData.name}
                  changeValue={(value) => handleChange("name", value)}
                  isError={!!errors.name}
                  errorMessage={errors.name}
                />
              </div>

              <div className="w-full md:w-1/2">
                <PriceInputForm
                  htmlFor="price"
                  type="number"
                  labelTitle="Price per unit (optional)"
                  placeholder="£0"
                  value={formData.price}
                  changeValue={(newValue) =>
                    handleInputChange("price", newValue)
                  }
                />
              </div>
            </div>
            {/*  */}
            <div className="pt-4" />
            <div className="flex flex-row justify-between w-full gap-4">
              {/* Input Form B code */}
              <div className="w-full md:w-1/2">
                <InputForm
                  type="text"
                  labelTitle="B code"
                  placeholder="Enter a B code for the component"
                  value={formData.barcode}
                  changeValue={(value) => handleChange("barcode", value)}
                />
              </div>
            </div>
            {/*  */}
            <div className="pt-6" />
            <div className="">
              <TextArea
                type="text"
                labelTitle="Description (optional)"
                placeholder="Enter a description about the category"
                value={formData.description}
                changeValue={(value) => handleChange("description", value)}
                block={true}
              />
            </div>
            <div className="pt-6" />
            <div className="">
              <label
                className={` block font-medium text-base leading-5 text-fg-disabled `}
              >
                Image (optional)
              </label>
              <div className="pt-1.5" />

              <UploadFile
                initialImage={oldImage || ""}
                setImage={setCategoryImage}
                width={800}
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="pt-20" />
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
      ): null}
    </Fragment>
  );
};

export default AddComponent;
