

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}): Promise<any> => {

  const isFormData = init.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(init.headers || {}),
  };

  const response = await fetch(input, { ...init, headers });
  const result = await response.json().catch(() => ({})); // fallback si no hay JSON

  if (!response.ok) {
    throw {
      status: response.status,
      message: result.message || "Unknown error",
    };
  }

  return result;
};