"use client";

import React, { useState, useEffect, Fragment } from "react";
import Tabs from "./tab";
import CategoriesTable from "./categories";
import { getCategoryComponentAPI } from "@/service/product-management/category-api/getCategory";
import { getComponentAPI } from "@/service/product-management/component-api/getComponent";
import ComponentTable from "./components";
import LoadingSpinner from "@/components/loadingSpinner";
import { useSearchParams } from "next/navigation";
import { getCategoryJobAPI } from "@/service/category-job/jobsAPI";
import { setItems } from "@/store/slices/jobsSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  count?: any;
}

const ProductManagementComponents = () => {
  /**
   *  Product Management Components Hooks.
   */

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  
  const [allCategory, setAllCategory] = useState<any | null>(null);
  const [allComponent, setAllComponent] = useState<any | null>(null);
  const [isDeleteItem, setIsDeleteItem] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  const enabledViewComponentCategory =
    accessPermissions?.length &&
    accessPermissions.includes("READ_COMPONENT_CATEGORY");

  const enabledViewComponent =
    accessPermissions?.length && accessPermissions.includes("READ_COMPONENT");

  const tabs: TabItem[] = [
    { label: "Categories", content: <div></div>, count: allCategory?.count },
    { label: "Components", content: <div></div>, count: allComponent?.count },
  ];

  const tabsComponent: TabItem[] = [
    { label: "Components", content: <div></div>, count: allComponent?.count },
  ];

  const tabsComponentCategory: TabItem[] = [
    { label: "Categories", content: <div></div>, count: allCategory?.count },
  ];

  useEffect(() => {
    const getComponentData = async () => {
      try {
        setLoading(true);

        const response = await getCategoryComponentAPI({
          params: {
            offset: "",
            limit: "",
            orderBy: "",
            sort: "",
            q: "",
          },
        });

        setAllCategory(response);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    getComponentData();
  }, [activeTab, isDeleteItem]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await getComponentAPI({
          params: {
            offset: "",
            limit: "",
            orderBy: "",
            sort: "",
            q: "",
          },
        });

        setAllComponent(response);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [activeTab, isDeleteItem]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await getCategoryJobAPI();

        const jobsList = response?.rows;

        if (response?.rows?.length) {
          dispatch(setItems(jobsList));
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  useEffect(() => {
    const tab = searchParams.get("activeTab");
    if (tab !== null) {
      setActiveTab(Number(tab));
    }
  }, [searchParams]);

  const tabsShow = !enabledViewComponentCategory ? tabsComponent : !enabledViewComponent ? tabsComponentCategory : tabs;

  return (
    <div className={"flex flex-col gap-8  pb-12 p-8 w-full h-full"}>
      <div className="">
        <Tabs
          // selectedTab={selectedTab}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabs={tabsShow}
        />
      </div>
      {loading ? (
        <Fragment>
          <LoadingSpinner />
        </Fragment>
      ) : (
        <Fragment>
          {/* CategoriesTable */}

          {enabledViewComponentCategory && (
            <Fragment>
              {activeTab === 0 && (
                <CategoriesTable
                  allData={allCategory}
                  itemDelete={setIsDeleteItem}
                  isItem={isDeleteItem}
                />
              )}
            </Fragment>
          )}

          {/* ComponentTable */}

          {enabledViewComponent && (
            <Fragment>
              {activeTab === 1 && (
                <ComponentTable
                  allData={allComponent}
                  itemDelete={setIsDeleteItem}
                  isItem={isDeleteItem}
                />
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProductManagementComponents;
