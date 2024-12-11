// Category Component Types.

export interface getCategoryComponentTypes {
  limit?: number;
  offset?: number;
  orderBy?: string;
  sort?: string;
  q?: string;
}

export interface getCategoryComponentItemTypes {
  id: string;
}

export interface createCategoryComponentTypes {
  name: string;
  description: string;
}

export interface editCategoryComponentTypes {
  name: string;
  description: string;
}

export interface deleteCategoryComponentItemTypes {
  id: string;
}
