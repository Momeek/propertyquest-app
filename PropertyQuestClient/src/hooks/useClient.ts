import axios, { AxiosError } from "axios";
import { useCurrentUserStore } from "../store/auth.store";
import axiosRetry from "axios-retry";
import axiosRateLimit from "axios-rate-limit";
import { base2Url, base3Url } from "@/utils/baseUrl";

// Create a rate-limited instance of Axios
const http = axiosRateLimit(
  axios.create({
    baseURL: base2Url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  { maxRequests: 5, perMilliseconds: 1000 } // 5 requests per second
);

const httpPublicRequest = axiosRateLimit(
  axios.create({
    baseURL: base3Url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  { maxRequests: 5, perMilliseconds: 1000 } // 5 requests per second
);

// Retry on failure with exponential backoff
axiosRetry(http, {
  retries: 1, // Retry 3 times before failing
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    // Retry only if it's a 429 or 5xx error
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

http.interceptors.response.use(
  (response) => {
    if (response.headers["x-refresh-token"]) {
      const token = response.headers["x-refresh-token"];
      useCurrentUserStore.getState().setToken(token);
    }
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message?.includes("[TokenError]")) {
        const logout = useCurrentUserStore.getState().logout;
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export const useClient = () => {
  const getToken = () => String(useCurrentUserStore.getState().token);

  const getRequestConfig = () => ({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const postRequest = async <T>(uri: string, payload: T, useToken: boolean = true) => {
    const config = useToken ? getRequestConfig() : {};
    return http.post(uri, payload, config);
  };

  const multiPartPostRequest = async <T>(uri: string, payload: T) => {
    return http.post(uri, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const multiPartPatchRequest = async <T>(uri: string, payload: T) => {
    return http.patch(uri, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const multiPartPutRequest = async <T>(uri: string, payload: T) => {
    return http.put(uri, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const patchRequest = async <T>(uri: string, payload: T) => {
    return http.patch(uri, payload, getRequestConfig());
  };

  const getRequest = async (uri: string, useToken: boolean = true) => {
    const config = useToken ? getRequestConfig() : {};
    const direct = useToken ? http : httpPublicRequest;
    return direct.get(uri, config);
  };

  const putRequest = async <T>(uri: string, payload: T) => {
    return http.put(uri, payload, getRequestConfig());
  };

  const deleteRequest = async (uri: string) => {
    return http.delete(uri, getRequestConfig());
  };

  return {
    post: postRequest,
    multiPartPost: multiPartPostRequest,
    multiPartPatch: multiPartPatchRequest,
    multiPartPut: multiPartPutRequest,
    patch: patchRequest,
    get: getRequest,
    put: putRequest,
    delete: deleteRequest,
  };
};

