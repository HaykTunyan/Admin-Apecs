import requestAPI from "@/utils/axiosInstance";
import {
  createAdminTypes,
  getAdminTypes,
  getAdminItemTypes,
  editAdminTypes,
  UpdateUserParams,
} from "@/hooks/userTypes";

export const createUserAPI = async (
  data: createAdminTypes
): Promise<any> => {
  try {
    const response = await requestAPI.post<any>(`/admins`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAPI = async (params: getAdminTypes): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/admins`, {
      params: {
        limit: params.limit,
        offset: params.offset,
        orderBy: params.orderBy,
        sort: params.sort,
        q: params.q,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserByIdAPI = async (
  params: getAdminItemTypes
): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/admins/${params.id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching user with ID ${params.id}:`, error);
    throw error;
  }
};

export const updateUserAPI = async (
  params: UpdateUserParams,
  body: editAdminTypes
): Promise<any> => {
  try {
    const response = await requestAPI.put<any>(`/admins/${params.id}`, body);
    return response.data;
  } catch (error) {
    // console.error(`Error updating user with ID ${params.id}:`, error);
    throw error;
  }
};

export const deleteUserAPI = async (
  id: any
): Promise<any> => {
  try {
    const response = await requestAPI.delete<any>(`/admins/${id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error deleting user with ID `, error);
    throw error;
  }
};
