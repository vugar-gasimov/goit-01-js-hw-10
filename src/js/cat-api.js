
// Define the base URL and API key for The Cat API
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_oEvQ1sP1tGC3ckFuyx9hqr0pWeUXXp3OCENzWXqOKiZhL4nVFLGEN4a3JFZJxbmb';


// Define options with headers including the API key
const options = {
    headers: {
        'x-api-key': API_KEY,
    },
};

// Function to fetch a list of cat breeds
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
    .then(res => {
      // Check if the response is okay (status code 200)
      if (!res.ok) {
        throw new Error(res.status);
      }
      // Parse the JSON response and return it
      return res.json();
    });
        // .catch(error => {
        //     // Handle any errors, log them, and return an empty array as a default value
        //     console.error('Error fetching breeds:', error);
        //     return [];
        // });
}

// Function to fetch cat images by breed ID
export function fetchBreedImgs(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
    .then(res => {
      // Check if the response is okay (status code 200)
      if (!res.ok) {
        throw new Error(res.status);
      }
      // Parse the JSON response and return it
      return res.json();
    });
        // .catch(error => {
        //     // Handle any errors, log them, and return an empty array as a default value
        //     console.error('Error fetching cat by breed:', error);
        //     return [];
        // });
}