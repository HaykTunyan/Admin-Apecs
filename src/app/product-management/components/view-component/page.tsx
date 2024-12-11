"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoryComponentByIdAPI } from "@/service/product-management/category-api/getCategory";
import { getComponentByIdAPI } from "@/service/product-management/component-api/getComponent";
import JobsView from "@/containers/productManagementComponent/jobsView";

const ViewComponent: FC = () => {
  /**
   * View Component Hooks.
   */

  // Redux State.
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Local State.
  const [userData, setUserData] = useState<any>(null);
  const [categoryId, setCategoryId] = useState<any | null>(null);
  const [userCategory, setUserCategory] = useState<any | null>(null);

  const handleEditInfo = async () => {
    router.push(`/product-management/components/edit-component?id=${id}`);
  };

  const handleBack = () => {
    // router.back();

    router.push("/product-management/components/?activeTab=1");
  };

  useEffect(() => {
    const fetchGetCategoryItem = async () => {
      if (id) {
        try {
          const data = await getComponentByIdAPI({ id });

          setUserData(data);

          setCategoryId(data?.category?.id);
        } catch (err) {}
      }
    };
    fetchGetCategoryItem();
  }, []);

  useEffect(() => {
    const fetchGetCategoryItem = async () => {
      try {
        // @ts-ignore
        const newID = categoryId;
        // @ts-ignore
        const data = await getCategoryComponentByIdAPI({ id: newID });

        setUserCategory(data);
      } catch (err) {}
    };
    if (categoryId) {
      fetchGetCategoryItem();
    }
  }, [categoryId]);

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
          <Link href={"/product-management/components/?activeTab=1"} className="">
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
              View a component
            </span>
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex flex-row justify-between">
          <div className="">
            <h2 className="text-3.5xl leading-9 font-medium text-default-primary ">
              {" "}
              View {userData?.name}{" "}
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
              className={`px-3.5 py-2.5 rounded-full bg-orange-innter border border-orange-innter
              
              `}
            >
              <span className="text-base font-medium leading-5">Edit</span>
            </button>
          </div>
        </div>
        <div className="pt-8" />
        <div className="w-fullflex flex-col ">
          <div className="border border-utility-gray-200 rounded-lg p-6">
            <div className="flex flex-col">
              {/* Component ID */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Component ID
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="font-normal text-sm leading-6 text-tertiary">
                    {userData?.sku}
                  </p>
                </div>
              </div>
              {/* Component category */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Component category
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="font-normal text-sm leading-6 text-tertiary">
                    {userData?.name}
                  </p>
                </div>
              </div>
              {/* Name */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Name
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="font-normal text-sm leading-6 text-tertiary">
                    Component Name
                  </p>
                </div>
              </div>
              {/* Description */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Description
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="font-normal text-sm leading-6 text-tertiary">
                    {userData?.category?.description}
                  </p>
                </div>
              </div>
              {/* Category jobs */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Category jobs
                  </p>
                </div>
                <div className="w-8/12">
                  {userCategory?.job_types ? (
                    <div className="">
                      <JobsView jobs={userCategory?.job_types as any} />
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Price per unit */}
              <div className="w-full py-4 flex flex-row border-b border-utility-gray-200">
                <div className="w-4/12">
                  <p className="font-medium text-base leading-5  text-utility-gray-700">
                    Price per unit
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="font-normal text-sm leading-6 text-tertiary">
                    <span> £</span> <span>{userData?.price} </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5" />
          <div className="border border-utility-gray-200 rounded-lg p-6">
            <div className="border border-utility-gray-200 rounded-lg w-44 h-[86px] p-4">
              <div className="flex justify-center w-full h-full">
                <img
                  src={userData?.image?.src}
                  alt={userData?.image?.mimetype}
                />
              </div>
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
              onClick={handleEditInfo}
              className={`px-3.5 py-2.5 rounded-full bg-orange-innter border border-orange-innter
              
             `}
            >
              <span className="text-base font-medium leading-5">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewComponent;
