import React from "react";

const LoadingSpinner = () => {
  /**
   * Loading Spinner Component.
   */

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="loader spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        <p className="mt-4 text-gray-600" aria-live="polite">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
