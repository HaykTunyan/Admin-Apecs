// User Types.

export interface getAdminTypes {
  limit?: number;
  offset?: number;
  orderBy?: string;
  sort?: string;
  q?: string;
}

export interface getAdminItemTypes {
  id: string;
}

export interface createAdminTypes {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  status: boolean;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
}

export interface editAdminTypes {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  status: boolean;
  avatar: string;
  roles: string[];
  permissions: string[];
  previousData: string;
}

export interface deleteAdminItemTypes {
  id: string;
}

export interface UpdateUserParams {
  id: string;
}
