import requestAPI from "@/utils/axiosInstance";

export const getPermisionAPI = async (): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/permissions`);

    return response.data;
  } catch (error) {
    // console.error("Error fetching permisions:", error);
    throw error;
  }
};
