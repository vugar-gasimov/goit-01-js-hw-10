
import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import 'notiflix';
import 'notiflix/dist/notiflix.min.css';

axios.defaults.headers.common["x-api-key"] = "01941b135f914f4eba82ad58b4ea1060";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const slim = new SlimSelect(breedSelect, {
  placeholder: 'Select a breed',
});

function updateCatInfo(cat) {
  // Display cat information in the UI
  const { name, description, temperament } = cat.breeds[0];
  catInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Description: ${description}</p>
    <p>Temperament: ${temperament}</p>
    <img src="${cat.url}" alt="${name}" />
  `;
  catInfo.style.display = 'block';
}

// Event listener for breed selection change
breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;

  // Clear previous cat information
  catInfo.innerHTML = '';
  catInfo.style.display = 'none';

  // Show loader while fetching cat data
  loader.style.display = 'block';

  // Fetch cat information by breed ID
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      updateCatInfo(catData);

      // Hide loader after request is complete
      loader.style.display = 'none';
    })
    .catch((error) => {
      // Handle errors and display error message
      console.error('Error fetching cat by breed:', error);

      // Hide loader and display error element
      loader.style.display = 'none';
      errorElement.style.display = 'block';
    });
});

// Initial fetch of breeds when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Fetch breeds and populate the breed dropdown
  fetchBreeds()
    .then((breeds) => {
      slim.setData(breeds.map((breed) => ({ text: breed.name, value: breed.id })));
    })
    .catch((error) => {
      // Handle errors and display error message
      console.error('Error fetching breeds:', error);
      errorElement.style.display = 'block';
    });
});