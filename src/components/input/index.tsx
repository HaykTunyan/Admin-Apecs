import React, { FC } from "react";

interface InputFormProps {
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

const InputForm: FC<InputFormProps> = ({
  htmlFor = "",
  labelTitle = "",
  placeholder = "",
  type = "",
  value = "",
  block = false,
  disabled = false,
  isError = false,
  errorMessage,
  changeValue,
}) => {
  /**
   *  Input From Props.
   */

  return (
    <div className="relative">
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
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => changeValue(e.target.value)}
        className={`
          px-3.5 py-3 block w-full text-grey-seccondary  rounded-full border  outline-none

          ${
            isError
              ? "border-error-primary"
              : "border-grey-border focus-visible:border-grey-border focus:border-grey-border active:border-grey-border"
          }
     
        `}
      />
      {isError && (
        <div className="absolute right-4 top-11">
          <img src="/icons/error-alert-circle.svg" alt="Error-Alert-Circle" />
        </div>
      )}
      {isError && (
        <div className="mt-1.5">
          <span className="text-error-primary font-normal text-sm leading-3.5 tracking-wider">
            {" "}
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputForm;
