import requestAPI from "@/utils/axiosInstance";
import {
  getRoleTypes,
  createRoleTypes,
  deleteRoleTypes,
  getRoleItemTypes,
  updateRoleTypes,
} from "@/hooks/roleTypes";

export const getRoleAPI = async (params: getRoleTypes): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/roles`, {
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
    // console.error("Error fetching role:", error);
    throw error;
  }
};

export const getRoleByIdAPI = async (
  params: getRoleItemTypes
): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/roles/${params.id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching roles with ID ${params.id}:`, error);
    throw error;
  }
};

export const createRoleAPI = async (
  data: createRoleTypes
): Promise<createRoleTypes> => {
  try {
    const response = await requestAPI.post<createRoleTypes>(`/roles`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoleAPI = async (
  params: getRoleItemTypes,
  body: updateRoleTypes
): Promise<any> => {
  try {
    const response = await requestAPI.put<any>(`/roles/${params.id}`, body);
    return response.data;
  } catch (error) {
    // console.error(`Error updating roles with ID ${params.id}:`, error);
    throw error;
  }
};

export const deleteRoleAPI = async (
  id: deleteRoleTypes
): Promise<deleteRoleTypes> => {
  try {
    const response = await requestAPI.delete<deleteRoleTypes>(`/roles/${id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error deleting user with ID `, error);
    throw error;
  }
};
