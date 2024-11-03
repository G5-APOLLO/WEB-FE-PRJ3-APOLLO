import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
      {/* Icono de error */}
      <div className="bg-red-100 p-4 sm:p-5 rounded-full mb-6 animate-bounce">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v6m-6 4h12a2 2 0 002-2V8a2 2 0 00-.6-1.4l-6-6a2 2 0 00-1.4-.6H6a2 2 0 00-2 2v16a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Mensaje de error */}
      <h2 className="text-xl sm:text-2xl font-semibold text-red-500 mb-4">Something went wrong!</h2>
      <p className="text-md sm:text-lg text-gray-600 mb-6">{message}</p>

      {/* Botón de recargar */}
      <button
        className="px-5 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};
export default ErrorComponent;