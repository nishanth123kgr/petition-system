/**
 * Toast utility for use outside of React components
 * This implementation uses an event-based approach to trigger toasts from anywhere
 */

// Create a custom event for toast notifications
export const showToast = (options) => {
  // Define a custom event with toast options
  const event = new CustomEvent('show-toast', { 
    detail: options 
  });
  
  // Dispatch the event that will be caught by our ToastListener component
  if (typeof window !== 'undefined') {
    window.dispatchEvent(event);
  }
};

// Utility functions for common toast types
export const showSuccessToast = (title, description) => {
  showToast({
    title,
    description,
    variant: "success"
  });
};

export const showErrorToast = (title, description) => {
  showToast({
    title,
    description,
    variant: "destructive"
  });
};

export const showWarningToast = (title, description) => {
  showToast({
    title,
    description,
    variant: "warning"
  });
};

export const showInfoToast = (title, description) => {
  showToast({
    title,
    description,
    variant: "default"
  });
};