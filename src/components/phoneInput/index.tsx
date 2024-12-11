import React, { FC, useLayoutEffect, useState } from "react";
// import { PhoneNumberUtil } from "google-libphonenumber";

interface PhoneInputFormProps {
  htmlFor?: string;
  labelTitle?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  block?: boolean;
  disabled?: boolean;
  isError?: boolean;
  changeValue: (newValue: string) => void;
  errorMessage?: string;
}

const PhoneInputForm: FC<PhoneInputFormProps> = ({
  htmlFor = "",
  labelTitle = "",
  placeholder = "",
  type = "text",
  value = "",
  block = false,
  disabled = false,
  isError = false,
  errorMessage,
  changeValue,
}) => {
  // const phoneUtil = PhoneNumberUtil.getInstance();

  const [internalValue, setInternalValue] = useState(value);

  // Automatically prepend + to the phone number
  const ensurePlusSign = (phone: string) => {
    if (!phone.startsWith("+")) {
      return `+${phone}`;
    }
    return phone;
  };

  // Format the phone number as the user types it
  // const formatPhoneNumber = (phone: string) => {
  //   const cleaned = phone.replace(/\D/g, ""); // Remove all non-numeric characters
  //   if (cleaned.length <= 4) return `+${cleaned}`;
  //   if (cleaned.length <= 7)
  //     return `+${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  //   if (cleaned.length <= 11)
  //     return `+${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(
  //       7
  //     )}`;
  //   return `+${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(
  //     7,
  //     11
  //   )}`;
  // };

  const handlePhoneChange = (newValue: string) => {
    const withPlus = ensurePlusSign(newValue);
    setInternalValue(withPlus);
    changeValue(withPlus);
  };

  const handleBlur = () => {
    // const formattedPhone = formatPhoneNumber(internalValue);
    // setInternalValue(formattedPhone);
    // changeValue(formattedPhone);
  };

  useLayoutEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className={`block font-medium text-base leading-5 ${
          isError ? "text-fg-disabled" : "text-fg-disabled"
        }`}
      >
        {labelTitle} {isError ? <span></span> : <span> </span>}
      </label>
      <div className="mt-1.5" />
      <input
        type={type}
        id={htmlFor}
        value={value ? value : internalValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => handlePhoneChange(e.target.value)}
        onBlur={handleBlur}
        className={`px-3.5 py-3 block w-full text-grey-seccondary rounded-full border outline-none ${
          isError
            ? "border-error-primary"
            : "border-grey-border focus-visible:border-grey-border focus:border-grey-border active:border-grey-border"
        }`}
      />
      {isError && (
        <div className="absolute right-4 top-11">
          <img src="/icons/error-alert-circle.svg" alt="Error-Alert-Circle" />
        </div>
      )}
      {isError && (
        <div className="mt-1.5">
          <span className="text-error-primary font-normal text-sm leading-3.5 tracking-wider">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default PhoneInputForm;
