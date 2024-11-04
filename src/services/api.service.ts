export const BASE_URL = "http://localhost:3000";

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "An error occurred");
  }

  return response.json();
};
