import React, { useState, useRef, useEffect } from "react";
import useOnClickOutside from "@/utils/useOnClickOutside";

interface Option {
  id: string;
  title?: string;
  type?: string;
  value?: string;
  label?: string;
  name?: string;
}

interface SelectorProps {
  htmlFor?: string;
  labelTitle?: string;
  isError?: boolean;
  searchIcon?: boolean;
  value?: any;
  onChange: (value: any) => void;
  errorMessage?: string;
  listItem?: Option[];
  selected?: Option | null;
}

const Selector: React.FC<SelectorProps> = ({
  htmlFor = "",
  labelTitle = "",
  isError = false,
  searchIcon = false,
  value,
  onChange,
  errorMessage,
  listItem = [],
  selected,
}) => {
  /**
   * Selector Component
   */

  // const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (selected) {
      setSelectedItem(selected);
    }
  }, [selected]);

  const handleSelect = (item: Option) => {
    setSelectedItem(item);
    setShowDropdown(false);
    onChange({ id: item.id });
  };

  return (
    <div ref={containerRef} className="w-full relative flex flex-col">
      <label
        htmlFor={htmlFor}
        className={`block font-medium text-base leading-5 ${
          isError ? "text-fg-disabled" : "text-fg-disabled"
        }`}
      >
        {labelTitle}
      </label>
      <div className="mt-1.5" />
      <div
        className={`relative pr-10 py-3 flex items-center gap-1 border rounded-full cursor-pointer ${
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
        <div className="flex items-center gap-1 w-full h-6">
          {selectedItem ? (
            <div className="" onClick={(e) => e.stopPropagation()}>
              <span className="text-grey-seccondary  text-base font-medium">
                {selectedItem.name}
              </span>
            </div>
          ) : (
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
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            src="/icons/userManagement/chevron-down.svg"
            alt="Toggle Dropdown"
          />
        </div>
      </div>
      {isError && (
        <div className="mt-1.5">
          <span className="text-error-primary font-normal text-sm leading-3.5 tracking-wider">
            {" "}
            {errorMessage}
          </span>
        </div>
      )}
      {showDropdown && listItem?.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute flex flex-col gap-2 w-full top-full mt-2 bg-white rounded-lg p-2 border border-grey-extra z-50 max-h-60 overflow-auto scrollbar scrollbar-thin scrollbar-track-inherit "
        >
          {listItem.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelect(role)}
              className={`${
                selectedItem?.id === role.id ? "bg-utility-gray" : ""
              } flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer`}
            >
              <span className="text-sm font-normal text-default-primary">
                {role.name}
              </span>
              {selectedItem?.id === role.id && (
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
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

export default Selector;
