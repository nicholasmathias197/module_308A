import * as Carousel from "./Carousel.js";
import { breedsCache } from "./api.js";

// DOM Elements
const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");

/**
 * Populate the breed select dropdown
 * @param {Array} breeds - Array of breed objects
 */
export function populateBreedSelect(breeds) {
  // Clear existing options
  breedSelect.innerHTML = '<option value="">Select a breed...</option>';
  
  breeds.forEach((breed) => {
    // Cache the breed data
    breedsCache.set(breed.id, breed);
    
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

/**
 * Render breed information in the info dump section
 * @param {Object} breed - Breed object
 */
export function renderBreedInfo(breed) {
  if (!breed) {
    infoDump.innerHTML = '<p class="text-muted">Select a breed to see information</p>';
    return;
  }

  infoDump.innerHTML = `
    <div class="breed-info-card">
      <h3 class="mb-3">${breed.name}</h3>
      <p class="lead">${breed.description || "No description available."}</p>
      <div class="row mt-4">
        <div class="col-md-6">
          <p><strong> Origin:</strong> ${breed.origin || "Unknown"}</p>
          <p><strong> Temperament:</strong> ${breed.temperament || "Unknown"}</p>
        </div>
        <div class="col-md-6">
          <p><strong> Life span:</strong> ${breed.life_span || "Unknown"} years</p>
          <p><strong>Weight:</strong> ${breed.weight?.metric || "Unknown"} kg</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render favourites information
 * @param {number} count - Number of favourites
 */
export function renderFavouritesInfo(count) {
  infoDump.innerHTML = `
    <div class="favourites-info-card">
      <h3> Favourite Cats</h3>
      <p class="lead">You have ${count} favourite cat${count !== 1 ? 's' : ''}</p>
    </div>
  `;
}

/**
 * Render carousel from array of images
 * @param {Array} images - Array of image objects
 */
export function renderCarouselFromImages(images) {
  Carousel.clear();

  images.forEach((image) => {
    const breedName = image.breeds?.[0]?.name || "Cat";
    const item = Carousel.createCarouselItem(
      image.url,
      breedName,
      image.id
    );
    Carousel.appendCarousel(item);
  });

  if (images.length) {
    Carousel.start();
  }
}

/**
 * Set the breed select value
 * @param {string} breedId - The breed ID to select
 */
export function setBreedSelectValue(breedId) {
  breedSelect.value = breedId;
}

/**
 * Get the currently selected breed ID
 * @returns {string} Selected breed ID
 */
export function getSelectedBreedId() {
  return breedSelect.value;
}

/**
 * Show error message in info dump
 * @param {string} message - Error message
 */
export function showError(message) {
  infoDump.innerHTML = `
    <div class="alert alert-danger" role="alert">
       ${message}
    </div>
  `;
}

/**
 * Show loading state
 */
export function showLoading() {
  infoDump.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading...</p>
    </div>
  `;
}