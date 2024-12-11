import { useState } from "react";

interface Option {
  id: number;
  value: string;
  label: string;
}

interface AutocompleteProps {
  options: Option[];
  value?: any;
  changeValue?: (selectedPermissions: any) => void;
  htmlFor?: string;
  labelTitle?: string;
  isError?: boolean;
  searchIcon?: boolean;
  type?: string;
  errorMessage?: string;
  onOpenModal?: () => void;
  listInformation?: any;
  listRoleInformation?: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  htmlFor = "",
  labelTitle = "",
  isError = false,
  searchIcon,
  type,
  errorMessage,
  listInformation,
  listRoleInformation,
  onOpenModal,
}) => {
  /**
   *  AutoComplet Hooks.
   */

  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(query.toLowerCase()) &&
      !selectedItems.some((selected) => selected.id === option.id)
  );

  const handleSelect = (item: Option) => {
    setSelectedItems([...selectedItems, item]);
    setQuery("");
  };

  // const handleRemove = (item: Option) => {
  //   setSelectedItems(
  //     selectedItems.filter((selected) => selected.id !== item.id)
  //   );
  // };

  return (
    <div className="w-full relative">
      <label
        htmlFor={htmlFor}
        className={`
          block font-medium text-base leading-5 text-fg-disabled 
        `}
      >
        {/*   ${isError ? "text-error-primary " : "text-grey-light-700"} */}
        {labelTitle}
      </label>
      <div className="mt-1.5" />
      <div
        className={`${searchIcon ? "pl-10" : "pl-4"} 
          
        ${isError ? "border-error-primary" : " border-gray-300"}
        relative pr-10 py-3 flex items-center flex-row gap-1 border rounded-full cursor-pointer  `}
        onClick={onOpenModal}
      >
        {searchIcon && (
          <div className="absolute left-3">
            <img src="/icons/userManagement/search-lg.svg" alt="Search-Lg" />
          </div>
        )}

        <div className="w-full flex flex-row items-center gap-1 ">
          <div className="flex flex-row gap-x-1 items-center ">
            {listInformation?.length
              ? listInformation.slice(0, 2).map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white rounded-md border border-grey-border  p-0.5  h-[26px] "
                  >
                    {item?.type ? (
                      <span className="text-grey-light-700 text-base font-medium leading-5">
                        {item.type}
                      </span>
                    ) : (
                      <span className="text-grey-light-700 text-base font-medium leading-5">
                        {item.name}
                      </span>
                    )}

                    <button
                    
                  // onClick={() => handleRemove(item)}
                  className="ml-1  focus:outline-none "
                >
                  <img src="/icons/x-close.svg" alt="X-Close" />

                </button>
                  </div>
                ))
              : null}
            {listInformation?.length > 2 && (
              <div className="bg-white px-1 py-0.5 h-[26px] rounded-md border border-grey-border flex justify-center items-center text-center ">
                <span className="text-utility-gray-700">
                  +{listInformation?.length - 2}{" "}
                </span>
              </div>
            )}
          </div>
          <div className="cursor-pointer " onClick={onOpenModal}>
            <input
              type="hidden"
              value={query}
              onClick={onOpenModal}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className=" outline-none "
            />
            {listInformation?.length < 1 && (
              <div className="text-grey-light text-base leading-6 font-medium">
                <span> Search ...</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-3" onClick={onOpenModal}>
          {type === "assign" && (
             <img
             src="/icons/userManagement/paperclip.svg"
             alt="Paperclip"
             onClick={onOpenModal}
           />
          ) }

          {type === "role" && (
            <img
            src="/icons/userManagement/chevron-down.svg"
            alt="Chevron-Down"
            onClick={onOpenModal}
          />
          )}

          {type === "permision" && (
            <img
            src="/icons/userManagement/chevron-down.svg"
            alt="Chevron-Down"
            onClick={onOpenModal}
          />
          )}
        </div>
      </div>
      {/* {isError && (
        <div className="absolute right-4 top-11">
          <img src="/icons/error-alert-circle.svg" alt="Error-Alert-Circle" />
        </div>
      )} */}

      {isError && (
        <div className="mt-1.5">
          <span className="text-error-primary font-normal text-sm leading-3.5 tracking-wider">
            {" "}
            {errorMessage}
          </span>
        </div>
      )}
      {query && filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
