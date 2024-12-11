"use client";

import React, { FC, useState, useEffect } from "react";

interface AllertComponentProps {
  type: string;
  title: string;
  description: string;
  closeAllert: () => void;
}

const AllertComponent: FC<AllertComponentProps> = ({
  type,
  title,
  description,
  closeAllert,
}) => {
  /**
   *  Allert Component Hooks.
   */

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility to true to trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`absolute top-8 right-8 z-30 bg-white w-[600px] rounded-xl border border-grey-border p-2 transform transition-transform duration-500 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-row ">
        <div className="px-1">
          {type === "error" ? (
            <img
              src="/icons/featured-icon-outline.svg"
              alt="Featured-Icon-Outline"
            />
          ) : (
            <img
              src="icons/check-circle-success.svg"
              alt="Check-Circle-Success"
            />
          )}
        </div>
        <div className="flex flex-col px-1">
          <p className="text-base font-medium leading-5 text-utility-gray-700 ">
            {" "}
            {title}{" "}
          </p>
          <div className="pt-1" />
          <p className="text-tertiary font-normal text-sm leading-3.5 ">
            {" "}
            {description}{" "}
          </p>
          <div className="pt-3 py-2 cursor-pointer" onClick={() => closeAllert()} >
            <span className="font-medium text-base leading-5 text-tertiary ">
              {" "}
              {type === "error" ? "Close" : "Dismiss"}
            </span>
          </div>
        </div>
        <div className="ml-auto p-1 ">
          <button className="" type="button" onClick={() => closeAllert()}>
            <img src="/icons/userManagement/x-close.svg" alt="X-Close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllertComponent;
