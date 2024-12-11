import React, { useState, useRef , useEffect } from "react";
import useOnClickOutside from "@/utils/useOnClickOutside";

interface Option {
  id: string;
  title: string;
  type: string;
}

interface JobSelectorProps {
  htmlFor?: string;
  labelTitle?: string;
  isError?: boolean;
  searchIcon?: boolean;
  value: any[];
  onChange: (value: any[]) => void;
  errorMessage?: string;
  listRoleInformation?: Option[];
  selectedRole?: any;
}

const JobSelector: React.FC<JobSelectorProps> = ({
  htmlFor = "",
  labelTitle = "",
  isError = false,
  searchIcon = false,
  value,
  onChange,
  errorMessage,
  listRoleInformation = [],
  selectedRole,
}) => {
  /**
   *  Role Complete Component
   */

  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (selectedRole && selectedRole.length > 0) {
      setSelectedItems(selectedRole);
    }
  }, [selectedRole]);

  const handleSelect = (item: Option) => {
    const updatedItems = selectedItems.some(
      (selected) => selected.id === item.id
    )
      ? selectedItems.filter((selected) => selected.id !== item.id)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
    setQuery("");

    if (query) {
    }

    onChange(updatedItems.map((selectItem) => ({ id: selectItem.id })));
  };

  const handleDeleteItem = (
    item: Option,
    e: { stopPropagation: () => void }
  ) => {
    e.stopPropagation();
    handleSelect(item);
  };

  const handleOpenDropdown = () => {
    () => setShowDropdown((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="w-full relative flex flex-col">
      <label
        htmlFor={htmlFor}
        className={`
          block font-medium text-base leading-5 
          ${isError ? "text-fg-disabled" : "text-fg-disabled"}
        `}
      >
        {labelTitle}
      </label>
      <div className="mt-1.5" />
      <div
        className={`relative pr-10 py-3 flex items-center gap-1 border rounded-full cursor-pointer  ${
          searchIcon ? "pl-10" : "pl-4"
        } 
          ${isError ? "border-error-primary" : "border-gray-300"}
         ${showDropdown ? "border-[#DEC7A1] shadow-[0_0_8px_2px_#DEC7A1]" : ""}

          `}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {searchIcon && (
          <div className="absolute left-3">
            <img src="/icons/userManagement/search-lg.svg" alt="Search" />
          </div>
        )}
        <div className="flex flex-row items-center gap-1 w-full h-6 ">
          {selectedItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white rounded-md border border-grey-border  p-0.5  h-[26px]"
              onClick={(e) => handleDeleteItem(item, e)}
            >
              <span className="text-grey-light-700 text-base font-medium">
                {item.title}
              </span>
              <button
                onClick={(e) => handleDeleteItem(item, e)}
                className="ml-1 focus:outline-none"
              >
                <img src="/icons/x-close.svg" alt="Remove" />
              </button>
            </div>
          ))}
          {selectedItems.length > 2 && (
            <span className="text-gray-500">+{selectedItems.length - 2}</span>
          )}
          {selectedItems?.length === 0 && (
            <div
              className="text-grey-light text-base leading-6 font-medium"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <span> Search ...</span>
            </div>
          )}
        </div>
        <div
          className="absolute right-3 cursor-pointer"
          onClick={() => handleOpenDropdown()}
        >
          <img
            src="/icons/userManagement/chevron-down.svg"
            alt="Toggle Dropdown"
          />
        </div>
      </div>
      {isError && (
        <div className="text-red-600 text-sm mt-1">{errorMessage}</div>
      )}
      {showDropdown && listRoleInformation.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute flex flex-col gap-2 w-full top-full mt-2 bg-white rounded-lg p-2 border border-grey-extra z-50 max-h-60 overflow-auto scrollbar"
        >
          {listRoleInformation.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelect(role)}
              className={` ${
                selectedItems.some((selected) => selected.id === role.id)
                  ? "bg-utility-gray"
                  : ""
              }  flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer`}
            >
              <span className="text-sm font-normal text-default-primary">
                {role.title}
              </span>
              {selectedItems.some((selected) => selected.id === role.id) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6668 5L7.50016 14.1667L3.3335 10"
                    stroke="#A58C52"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSelector;
