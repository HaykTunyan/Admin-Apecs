import requestAPI from "@/utils/axiosInstance";

export const CreateCategoryComponentAPI = async (data: any): Promise<any> => {
  try {
    const response = await requestAPI.post<any>(`/component-categories`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryComponentAPI = async (params: any): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/component-categories`, {
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
    throw error;
  }
};

export const getCategoryComponentByIdAPI = async (
  params: any
): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(
      `/component-categories/${params.id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryComponentAPI = async (
  params: any,
  body: any
): Promise<any> => {
  try {
    const response = await requestAPI.put<any>(
      `/component-categories/${params.id}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryComponentAPI = async (id: any): Promise<any> => {
  try {
    const response = await requestAPI.delete<any>(
      `/component-categories/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
