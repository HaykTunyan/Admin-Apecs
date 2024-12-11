import requestAPI from "@/utils/axiosInstance";

export const createComponentAPI = async (data: any): Promise<any> => {
  try {
    const response = await requestAPI.post<any>(`/components`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComponentAPI = async (params: any): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/components`, {
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

export const getComponentByIdAPI = async (params: any): Promise<any> => {
  try {
    const response = await requestAPI.get<any>(`/components/${params.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateComponentAPI = async (
  params: any,
  body: FormData
): Promise<any> => {
  try {
    // Performing PUT request with FormData
    const response = await requestAPI.put<any>(
      `/components/${params.id}`, // URL with dynamic parameter
      body // Send FormData to the server
    );
    return response.data; // Returning response data
  } catch (error) {
    throw error; // If an error occurs, throw it
  }
};

export async function updateComponent(
  id: string,
  category_id: string,
  barcode: string,
  price: any,
  name: string,
  description: string,
  image: File | null
): Promise<any> {
  try {
    const formData = new FormData();

    formData.append("category_id", category_id);
    formData.append("barcode", barcode);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    const response = await requestAPI.put(`/components/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function createComponent(
  category_id: string,
  barcode: string,
  price: any,
  name: string,
  description: string,
  image: File | null
): Promise<any> {
  try {
    const formData = new FormData();

    formData.append("category_id", category_id);
    formData.append("barcode", barcode);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    const response = await requestAPI.post(`/components`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteComponentAPI = async (id: any): Promise<any> => {
  try {
    const response = await requestAPI.delete<any>(`/components/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
