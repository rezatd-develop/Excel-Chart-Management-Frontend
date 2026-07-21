import axiosInstance from "./axios";

export const apiGet = async (url, config, isFile = false) => {
  try {
    const safeConfig = typeof config === "object" && config !== null ? config : {};

    const res = await axiosInstance.get(url, {
      ...safeConfig,
      responseType: isFile ? "blob" : safeConfig.responseType || "json",
    });

    return isFile ? res : res.data;
  } catch (err) {
    console.error("apiGet error:", err);
    throw err;
  }
};

export const apiPost = async (url, data, config) => {
  try {
    const safeData = typeof data === "object" && data !== null ? data : {};
    const safeConfig = typeof config === "object" && config !== null ? config : {};

    const res = await axiosInstance.post(url, safeData, safeConfig);
    return res.data;
  } catch (err) {
    console.error("apiPost error:", err);
    throw err;
  }
};

export const apiPut = async (url, data, config) => {
  try {
    const safeData = typeof data === "object" && data !== null ? data : {};
    const safeConfig = typeof config === "object" && config !== null ? config : {};

    const res = await axiosInstance.put(url, safeData, safeConfig);
    return res.data;
  } catch (err) {
    console.error("apiPut error:", err);
    throw err;
  }
};

export const apiDelete = async (url, config) => {
  try {
    const safeConfig = typeof config === "object" && config !== null ? config : {};
    const res = await axiosInstance.delete(url, safeConfig);
    return res.data;
  } catch (err) {
    console.error("apiDelete error:", err);
    throw err;
  }
};
