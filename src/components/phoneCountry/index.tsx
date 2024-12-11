import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneCountryComponentProps {
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

const PhoneCountryComponent: React.FC<PhoneCountryComponentProps> = ({
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

    /**
     * 
     * @param phone 
     * @returns  PhoneCountryComponent
     */

  const ensurePlusSign = (phone: string) => {
    if (!phone.startsWith("+")) {
      return `+${phone}`;
    }
    return phone;
  };

  const handlePhoneChange = (newValue: string) => {
    const withPlus = ensurePlusSign(newValue); 
    changeValue(withPlus);
  };

  return (
    <div className="relative phone-country">
      <label
        htmlFor={htmlFor}
        className={`block font-medium text-base leading-5 ${
          isError ? "text-fg-disabled" : "text-fg-disabled"
        }`}
      >
        {labelTitle} {isError ? <span></span> : <span> </span>}
      </label>
      <div className="mt-1.5" />
      <PhoneInput
        country=""
        value={value ? value : ""}
        placeholder={placeholder}
        onChange={handlePhoneChange}
        inputClass={`form-control  ${
            isError
            ? "error-border"
            : "border-grey-border focus-visible:border-grey-border focus:border-grey-border active:border-grey-border"
            }`}
        containerClass="phone-input"
        buttonClass="selected-flag"
        aria-label="Enter your phone number with country code"
      />
      {isError && (
        <div className="absolute right-4 top-11">
          <img src="/icons/error-alert-circle.svg" alt="Error-Alert-Circle" />
        </div>
      )}
      {isError && errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default PhoneCountryComponent;
