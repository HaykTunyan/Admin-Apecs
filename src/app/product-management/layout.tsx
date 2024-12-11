"use client";

import { ReactNode } from "react";

import ManagementLayout from "../management/layout";

interface ManagementLayoutProps {
  children: ReactNode;
}

const ProductManagement = ({ children }: ManagementLayoutProps) => {
  return <ManagementLayout>{children}</ManagementLayout>;
};

export default ProductManagement;
