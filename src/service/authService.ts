import requestAPI from "@/utils/axiosInstance";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  login: "string";
  password: "string";
}

export const loginAPI = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await requestAPI.post<LoginResponse>(
      "/auth/login",
      loginData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
