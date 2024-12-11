"use client";

import React, {useEffect, useState} from "react";
import Tabs from "@/containers/productManagement/tabs";
import {useSearchParams} from "next/navigation";
import {GetMainProductsResponse, GetProductItemsResponse} from "@/utils/types";
import MainProducts from "@/containers/productManagement/list/mainProducts";
import ProductItems from "@/containers/productManagement/list/productItems";
import {getMainProducts} from "@/api/productManagement/mainProduct/getMainProducts";
import {getProductItems} from "@/api/productManagement/productItem/getProductItems";

const ProductList = () => {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get("itemType") || "mainProducts";
    const [searchValue, setSearchValue] = useState(
        searchParams.get("search") || ""
    );
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const statusItem = searchParams.get("statusItem") || "";
    const mainProduct = searchParams.get("mainProduct") || "";
    const initialSortOrder = searchParams.get("sortOrder") || "ASC";
    const [mainProductsCount, setMainProductsCount] = useState<number>(0);
    const [productItemsCount, setProductItemsCount] = useState<number>(0);
    const initialPage = parseInt(searchParams.get("page") || "1", 10) - 1;

    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(
        initialSortOrder as "ASC" | "DESC"
    );
    const [selectedTab, setSelectedTab] = useState<string>(initialTab);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const [currentMainProducts, setCurrentMainProducts] =
        useState<GetMainProductsResponse>({count: 0, rows: []});
    const [currentProductItems, setCurrentProductItems] =
        useState<GetProductItemsResponse>({count: 0, rows: []});

    const tabsShow = [
        {
            name: "Main products",
            value: "mainProducts",
            quantity: mainProductsCount,
        },
        {
            name: "Product items",
            value: "productItems",
            quantity: productItemsCount,
        }
    ];

    useEffect(() => {
        getMainProducts(
            8,
            currentPage * 8,
            "name",
            sortOrder,
            searchValue,
            status,
            category,
        ).then((res) => {
            setCurrentMainProducts(res);
            setMainProductsCount(res.count);
        });

        getProductItems(
            8,
            currentPage * 8,
            "sku",
            sortOrder,
            searchValue,
            statusItem,
            mainProduct
        )
            .then(
                (res) => {
                    setCurrentProductItems(res);
                    setProductItemsCount(res.count);
                }
            );
    }, [selectedTab, sortOrder, searchValue, currentPage, statusItem, status, mainProduct, category]);

    useEffect(() => {
        const itemType = searchParams.get("itemType");
        const search = searchParams.get("search");
        const order = searchParams.get("sortOrder") || "ASC";
        const page = parseInt(searchParams.get("page") || "1", 10) - 1;

        if (itemType) setSelectedTab(itemType);
        setSortOrder(order as "ASC" | "DESC");
        setSearchValue(search || "");
        setCurrentPage(page);
    }, [searchParams]);

    return (
        <div className={"flex flex-col gap-8 pb-12 p-8 w-full h-full"}>
            <Tabs
                selectedTab={selectedTab}
                tabs={tabsShow}
                type={"itemType"}
            />
            {
                selectedTab === "mainProducts" && currentMainProducts &&
                <MainProducts
                    products={currentMainProducts}
                    searchValue={searchValue}
                    filtered={category || status}
                />
            }
            {
                selectedTab === "productItems" && currentProductItems &&
                <ProductItems
                    products={currentProductItems}
                    searchValue={searchValue}
                    filtered={mainProduct || statusItem}
                />
            }
        </div>
    );
};

export default ProductList;
