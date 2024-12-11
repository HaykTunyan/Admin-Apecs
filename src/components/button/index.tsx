import React, { FC } from "react";

interface ButtonTypes {
  title: string;
  onClick?: () => void;
}

const Button: FC<ButtonTypes> = ({ title, onClick }) => {
  return (
    <button className={`w-full    outline-none  `} onClick={onClick}>
      <span>{title}</span>
    </button>
  );
};

export default Button;
