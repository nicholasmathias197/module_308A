// DOM Elements
const progressBar = document.getElementById("progressBar");

/**
 * Update progress bar during downloads
 * @param {Object} progressEvent - Axios progress event
 */
export function updateProgress(progressEvent) {
  if (!progressEvent.total) return;
  const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.setAttribute('aria-valuenow', percent);
  
  // Reset progress bar after reaching 100%
  if (percent === 100) {
    setTimeout(() => {
      progressBar.style.width = '0%';
    }, 1000);
  }
}

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format time duration
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Log with timestamp
 * @param {string} message - Message to log
 * @param {string} type - Log type (info, success, error)
 */
export function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: '[INFO]',
    success: '[SUCCESS]',
    error: '[ERROR]',
    warning: '[WARNING]'
  }[type] || '[INFO]';
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}