import requestAPI from "@/utils/axiosInstance";

export const getCategoryJobAPI = async (): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/jobs/types`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
