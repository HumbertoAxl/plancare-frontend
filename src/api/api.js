export const getCars = async (make) => {
  const url = new URL('https://localhost:7071/api/getCars');
  const params = new URLSearchParams();

  if (make) {
    params.append('make', make);
  }

  url.search = params.toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  return await response.json();
};

export const getCarById = async (id) => {
  if (!id) {
    throw new Error('Car ID is required');
  }

  const url = new URL(`https://localhost:7071/api/getCarById/${id}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch car details');
  }

  return await response.json();
};
