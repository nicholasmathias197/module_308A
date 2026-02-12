import * as api from "./api.js";
import * as ui from "./ui.js";
import * as Carousel from "./Carousel.js";
import { updateProgress, log } from "./utils.js";

// DOM Elements
const breedSelect = document.getElementById("breedSelect");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

/**
 * Initial load - fetch breeds and load first breed's images
 */
async function initialLoad() {
  try {
    ui.showLoading();
    log('Fetching breeds...', 'info');
    
    const breeds = await api.fetchBreeds();
    ui.populateBreedSelect(breeds);

    if (breeds.length) {
      const firstBreedId = breeds[0].id;
      ui.setBreedSelectValue(firstBreedId);
      await loadBreedImages(firstBreedId);
    }
    
    log(`Successfully loaded ${breeds.length} breeds`, 'success');
  } catch (error) {
    console.error("Failed to load breeds:", error);
    ui.showError(`Failed to load breeds: ${error.message}`);
    log(`Failed to load breeds: ${error.message}`, 'error');
  }
}

/**
 * Load images for a specific breed
 * @param {string} breedId - The breed ID
 */
async function loadBreedImages(breedId) {
  try {
    ui.showLoading();
    log(`Loading images for breed ${breedId}...`, 'info');
    
    const images = await api.fetchBreedImages(breedId);
    const breed = images[0]?.breeds?.[0] || api.breedsCache.get(breedId);
    
    ui.renderBreedInfo(breed);
    ui.renderCarouselFromImages(images);
    
    log(`Loaded ${images.length} images for ${breed?.name || 'breed'}`, 'success');
  } catch (error) {
    console.error("Failed to load breed images:", error);
    ui.showError(`Failed to load breed images: ${error.message}`);
    log(`Failed to load breed images: ${error.message}`, 'error');
  }
}

/**
 * Toggle favourite status for an image
 * @param {string} imgId - The image ID
 */
export async function favourite(imgId) {
  try {
    log(`Toggling favourite for image ${imgId}...`, 'info');
    const result = await api.toggleFavourite(imgId);
    
    if (result.action === "added") {
      log(`Added image ${imgId} to favourites`, 'success');
    } else {
      log(`Removed image ${imgId} from favourites`, 'warning');
    }
  } catch (error) {
    console.error("Failed to toggle favourite:", error);
    log(`Failed to toggle favourite: ${error.message}`, 'error');
  }
}

/**
 * Load and display favourites
 */
async function getFavourites() {
  try {
    ui.showLoading();
    log('Loading favourites...', 'info');
    
    const favourites = await api.fetchFavourites();
    
    Carousel.clear();
    ui.renderFavouritesInfo(favourites.length);
    
    favourites.forEach((favouriteItem) => {
      if (!favouriteItem.image?.url) return;
      const item = Carousel.createCarouselItem(
        favouriteItem.image.url,
        "Favourite cat",
        favouriteItem.image_id
      );
      Carousel.appendCarousel(item);
    });

    if (favourites.length) {
      Carousel.start();
    }
    
    log(`Loaded ${favourites.length} favourites`, 'success');
  } catch (error) {
    console.error("Failed to load favourites:", error);
    ui.showError(`Failed to load favourites: ${error.message}`);
    log(`Failed to load favourites: ${error.message}`, 'error');
  }
}

// ============= EVENT LISTENERS =============

// Breed selection change
breedSelect.addEventListener("change", async (event) => {
  const breedId = event.target.value;
  if (breedId) {
    await loadBreedImages(breedId);
  }
});

// Get favourites button
getFavouritesBtn.addEventListener("click", getFavourites);

// Initialize the application
initialLoad();

// Log that the app has started
log(' Cat API Browser initialized', 'success');