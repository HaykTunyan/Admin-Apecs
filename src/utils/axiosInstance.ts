import axios from "axios";

const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
};

const getRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken");
};

const requestAPI = axios.create({
    baseURL: "https://apecs-api.selfstudio.dev",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

requestAPI.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

requestAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();

            if (refreshToken) {
                try {
                    const {data} = await axios.post(
                        "https://apecs-api.selfstudio.dev/auth/refresh-token",
                        {
                            refreshToken: refreshToken,
                        }
                    );

                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return requestAPI(originalRequest);
                } catch {
                    localStorage.clear();
                }
            } else {
                localStorage.clear();
            }
        }

        return Promise.reject(error);
    }
);

export default requestAPI;
