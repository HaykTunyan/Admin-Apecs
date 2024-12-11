"use client";

import React, {useEffect, useState} from "react";
import Tabs from "@/containers/productManagement/tabs";
import Categories from "@/containers/productManagement/categories";
import SubCategories from "@/containers/productManagement/subCategories";
import {GetAttributesResponse, GetCategoriesResponse, GetSubCategoriesResponse,} from "@/utils/types";
import {getCategories} from "@/api/productManagement/categories/getCategories";
import {getSubcategories} from "@/api/productManagement/subcategories/getSubcategories";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getAttributes} from "@/api/productManagement/attributes/getAttributes";
import Attributes from "@/containers/productManagement/attributes";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const ProductManagementComp = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const decodedToken = useSelector(
        (state: RootState) => state.token.decodedToken
    );

    const accessPermissions = decodedToken?.permissions;

    const initialTab = searchParams.get("filter") || "categories";
    const initialSortOrder = searchParams.get("sortOrder") || "ASC";
    const initialPage = parseInt(searchParams.get("page") || "1", 10) - 1;

    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(
        initialSortOrder as "ASC" | "DESC"
    );
    const [selectedTab, setSelectedTab] = useState<string>(initialTab);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const [currentCategories, setCurrentCategories] =
        useState<GetCategoriesResponse>();
    const [currentSubCategories, setCurrentSubCategories] =
        useState<GetSubCategoriesResponse>();
    const [currentAttributes, setCurrentAttributes] =
        useState<GetAttributesResponse>();

    const [categoriesCount, setCategoriesCount] = useState<number>(0);
    const [subcategoriesCount, setSubcategoriesCount] = useState<number>(0);
    const [attributesCount, setAttributesCount] = useState<number>(0);
    const [searchValue, setSearchValue] = useState(
        searchParams.get("search") || ""
    );

    const enabledViewAttribute =
        accessPermissions?.length && accessPermissions.includes("READ_ATTRIBUTE");
    const enabledViewCategory =
        accessPermissions?.length && accessPermissions.includes("READ_CATEGORY");

    const showProduct = enabledViewAttribute && enabledViewCategory;

    const updateUrl = (tab: string, order: string, page: number) => {
        const params = new URLSearchParams(
            searchParams as unknown as URLSearchParams
        );
        params.set("filter", tab);
        params.set("sortOrder", order);
        router.replace(`${pathname}?${params.toString()}`);
        params.set("page", (page + 1).toString());
    };

    const tabs = [
        {
            name: "categories",
            value: "categories",
            quantity: categoriesCount,
        },
        {
            name: "subcategories",
            value: "subcategories",
            quantity: subcategoriesCount,
        },
        {
            name: "attributes",
            value: "attributes",
            quantity: attributesCount,
        },
    ];

    const tabsCategory = [
        {
            name: "categories",
            value: "attributes",
            quantity: categoriesCount,
        },
        {
            name: "subcategories",
            value: "subcategories",
            quantity: subcategoriesCount,
        },
    ];

    const tabsAtribute = [
        {
            name: "attributes",
            value: "attributes",
            quantity: attributesCount,
        },
    ];

    useEffect(() => {
        const filter = searchParams.get("filter");
        const search = searchParams.get("search");
        const order = searchParams.get("sortOrder") || "ASC";
        const page = parseInt(searchParams.get("page") || "1", 10) - 1;

        if (filter) setSelectedTab(filter);
        setSortOrder(order as "ASC" | "DESC");
        setSearchValue(search || "");
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        getCategories(8, currentPage * 8, "name", sortOrder, searchValue)
            .then(
                (res) => {
                    setCurrentCategories(res);
                    setCategoriesCount(res.count);
                }
            );

        getSubcategories(8, currentPage * 8, "name", sortOrder, searchValue)
            .then(
                (res) => {
                    setCurrentSubCategories(res);
                    setSubcategoriesCount(res.count);
                }
            );

        getAttributes(8, currentPage * 8, "name", sortOrder, searchValue)
            .then(
                (res) => {
                    setCurrentAttributes(res);
                    setAttributesCount(res.count);
                }
            );
    }, [selectedTab, sortOrder, searchValue, currentPage]);

    useEffect(() => {
        updateUrl(selectedTab, sortOrder, currentPage);
    }, [selectedTab, currentPage]);

    useEffect(() => {
        if (!enabledViewCategory) {
            setSelectedTab("attributes");
        }
    }, [accessPermissions]);

    const tabsShow = showProduct
        ? tabs
        : enabledViewCategory && !enabledViewAttribute
            ? tabsCategory
            : !enabledViewCategory && enabledViewAttribute
                ? tabsAtribute
                : tabs;

    return (
        <div className={"flex flex-col gap-8 pb-12 p-8 w-full h-full"}>
            <Tabs
                selectedTab={selectedTab}
                tabs={tabsShow}
                type={"filter"}
            />
            {
                selectedTab === "categories" && currentCategories &&
                <Categories
                    categories={currentCategories}
                    searchValue={searchValue}
                />
            }
            {
                selectedTab === "subcategories" && currentSubCategories &&
                <SubCategories
                    currentSubCategories={currentSubCategories}
                    searchValue={searchValue}
                />
            }
            {
                selectedTab === "attributes" && currentAttributes &&
                <Attributes
                    currentAttributes={currentAttributes}
                    searchValue={searchValue}
                />
            }
        </div>
    );
};

export default ProductManagementComp;
