import React, { FC } from "react";

interface TextAreaProps {
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

const TextArea: FC<TextAreaProps> = ({
  htmlFor = "",
  labelTitle = "",
  placeholder = "",
  type = "text",
  value = "",
  block = false,
  disabled = false,
  isError = false,
  changeValue,
  errorMessage
}) => {
  return (
    /**
     *  Text Area Hooks.
     */

    <div className="">
      <label
        htmlFor={htmlFor}
        className={`
          block font-medium text-base leading-5 text-fg-disabled
         
        `}
      >
        {/*  ${isError ? "text-error-primary " : "text-grey-light-700"} */}
        {labelTitle}
      </label>
      <div className="mt-1.5" />
      <textarea
        id={htmlFor}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => changeValue(e.target.value)}
        className={`
          px-3.5 py-3 block w-full text-grey-seccondary rounded-lg border outline-none resize-none
          ${isError ? "border-error-primary" : "border-grey-border"}
        `}
        rows={block ? 5 : 3}
      />
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

export default TextArea;
