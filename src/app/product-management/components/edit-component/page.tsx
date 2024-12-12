"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import AllertComponent from "@/components/allertComponent";
import InputForm from "@/components/input";
import TextArea from "@/components/textArea";
import UploadFile from "@/containers/productManagementComponent/upload";
import Selector from "@/components/selector";
import PriceInputForm from "@/components/priceInput";
import DeleteModal from "@/containers/management/deleteModal";
import {
  getComponentByIdAPI,
  updateComponent,
} from "@/service/product-management/component-api/getComponent";

const EditComponent: FC = () => {
  /**
   * Edit Category Hooks.
   */

  // Redux State.
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Local State.
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAllert, setShowAllert] = useState<string>("");
  const [apiError, setApiError] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryComponentList, setCategoryComponentList] = useState<
    any | null
  >(null);

  // Modal Information.
  const [itemInformation, setItemInformation] = useState<any>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");

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

    // Validate Name
    if (!formData.category_id) {
      formErrors.category_id = "Category is required and select some one.";
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

  const handleChangeCategory = (selectCategory: string[]) => {
    // @ts-ignore
    const resultId = selectCategory?.id;
    // const resultArray = selectCategory.map((item) => item.id);

    setFormData((prevData) => ({
      ...prevData,
      category_id: resultId,
    }));
  };

  const handleEditInfo = () => {
    const isFormValid = validateForm();
    setValidationActive(isFormValid);

    if (!isFormValid) return;

    const categorisId = searchParams.get("id");

    const paramsID: any = { id: categorisId };

    if (paramsID && categorisId) {
      updateComponent(
        categorisId,
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

  const handleDelete = (itemList: any) => {
    setItemInformation(itemList);
    setTitleModal("Delete role ‘Order Manager’");
    setTitleModal(itemList?.full_name);
    setDescriptionModal(
      "Are you sure you want to delete the product component?"
    );
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchGetCategoryItem = async () => {
      if (id) {
        try {
          const data = await getComponentByIdAPI({ id });

          setUserData(data);

          setFormData({
            conponentID: data?.sku,
            category_id: data?.category?.id,
            barcode: data?.barcode,
            price: data?.price,
            name: data?.name,
            description: data?.description,
            image: data?.image?.src,
          });
        } catch (err) {}
      }
    };
    fetchGetCategoryItem();
  }, []);

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
              Edit a component
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              Edit a component
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
              Component information
            </h4>
            <div className="pt-4" />
            <div className="flex flex-row justify-between w-full gap-4 ">
              {/* Input Form Container */}
              <div className="w-full md:w-1/2">
                <InputForm
                  type="text"
                  labelTitle="Component ID"
                  placeholder=""
                  value={formData.conponentID}
                  changeValue={(value) => handleChange("conponentID", value)}
                  disabled={true}
                />
              </div>

              {/* Role Selection Container */}
              <div className="w-full md:w-1/2">
                <Selector
                  listItem={categoryComponentList as any}
                  selected={userData?.category as any}
                  labelTitle="Select component category"
                  onChange={handleChangeCategory}
                  errorMessage={"Please assign at one of the category job"}
                />
              </div>
            </div>
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
                initialImage={userData?.image?.src ? userData.image.src : ""}
                setImage={setCategoryImage}
                width={800}
                height={400}
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
                Delete Category
              </span>
            </button>
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
        type="component-component"
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
    </Fragment>
  );
};

export default EditComponent;
