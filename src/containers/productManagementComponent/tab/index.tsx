import React from "react";
// import Tab from "@/containers/productManagement/tabs/tab";
// import { ITab } from "@/utils/types";
// import { useRouter, useSearchParams } from "next/navigation";

interface ITabs {
  tabs: any[];
  selectedTab?: string;
  activeTab: number;
  setActiveTab: (tab: number) => void ;
}

const Tabs = ({ tabs, selectedTab, setActiveTab, activeTab  }: ITabs) => {
  /**
   *  Tabs Hooks.
   */

  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const handleSelect = (tabName: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.delete("sortOrder");
  //   params.delete("search");
  //   params.delete("page");
  //   params.set("filter", tabName);
  //   router.push(`?${params.toString()}`);
  // };

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[32px] font-medium leading-none tracking-tight">
        Components
      </span>
      <div className="text-sm font-medium text-center text-grey-light border-b border-utility-gray-200 ">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <li key={index} className="me-2">
              {!tab.disabled ? (
                <button
                  onClick={() => setActiveTab(index)}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === index
                      ? "text-brand-secondary border-brand-secondary"
                      : "border-transparent"
                  }`}
                  aria-current={activeTab === index ? "page" : undefined}
                >
                  <div className="flex flex-row items-center gap-1">
                    <span>{tab.label}</span>

                    {tab.count === null ? (
                      <></>
                    ) : (
                      <span
                        className={`border border-utility-gray-200 rounded-full w-[30px] h-6 ${
                          activeTab === index
                            ? "bg-utility-brand-50"
                            : "bg-utility-gray"
                        }`}
                      >
                        {tab?.count ? tab?.count : 0}
                      </span>
                    )}
                  </div>
                </button>
              ) : (
                <span className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                  {tab.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
