import axios from "axios";
import { updateProgress } from "./utils.js";

const API_KEY = "live_MT6IjirPWdz5AYA5nzs2PXrKKBGxkvcVBVrgY75PvrkPF6H9vTplxyWy53W6vGPs";
export const breedsCache = new Map();

// Configure Axios defaults
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() };
    document.body.style.cursor = "progress";
    console.log(` Request started: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    document.body.style.cursor = "";
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(` Request finished in ${duration}ms`);
    document.body.style.cursor = "";
    return response;
  },
  (error) => {
    if (error.config?.metadata?.startTime) {
      const duration = Date.now() - error.config.metadata.startTime;
      console.log(` Request failed in ${duration}ms`);
    }
    document.body.style.cursor = "";
    return Promise.reject(error);
  }
);

/**
 * Fetch all cat breeds
 * @returns {Promise<Array>} Array of breed objects
 */
export async function fetchBreeds() {
  const response = await axios.get("/breeds", {
    onDownloadProgress: updateProgress
  });
  return response.data;
}

/**
 * Fetch images for a specific breed
 * @param {string} breedId - The breed ID
 * @param {number} limit - Number of images to fetch
 * @returns {Promise<Array>} Array of image objects
 */
export async function fetchBreedImages(breedId, limit = 10) {
  const response = await axios.get("/images/search", {
    params: {
      breed_ids: breedId,
      limit
    },
    onDownloadProgress: updateProgress
  });
  return response.data;
}

/**
 * Fetch all favourites
 * @returns {Promise<Array>} Array of favourite objects
 */
export async function fetchFavourites() {
  const response = await axios.get("/favourites", {
    onDownloadProgress: updateProgress
  });
  return response.data;
}

/**
 * Toggle favourite status for an image
 * @param {string} imgId - The image ID
 * @returns {Promise<Object>} Result object with action and id
 */
export async function toggleFavourite(imgId) {
  const favourites = await fetchFavourites();
  const existingFavourite = favourites.find(
    (item) => item.image_id === imgId
  );

  if (existingFavourite) {
    await axios.delete(`/favourites/${existingFavourite.id}`);
    return { action: "removed", id: imgId };
  } else {
    await axios.post("/favourites", { image_id: imgId });
    return { action: "added", id: imgId };
  }
}