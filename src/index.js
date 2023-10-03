// Import necessary modules and CSS
import SlimSelect from 'slim-select'; // Import SlimSelect for dropdown
import 'slim-select/dist/slimselect.css'; // Import SlimSelect CSS
import Notiflix from 'notiflix'; // Import Notiflix for notifications
import { fetchBreedImgs, fetchBreeds } from './js/cat-api'; // Import your API functions


// Select DOM elements
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Initialize SlimSelect for the breed selection dropdown
const slim = new SlimSelect(breedSelect, {
  placeholder: 'Select a breed',
});

// Add a change event listener to the breed selection dropdown
breedSelect.addEventListener('change', OnSelectChange);

// Hide the loader initially
loader.classList.remove('visually-hidden');

// Function to handle breed selection change
function OnSelectChange(e) {
    // Get the selected breed ID from the dropdown
    const breedsId = e.target.value;

    // Hide elements and show loader while fetching data
    breedSelect.classList.add('visually-hidden');
    loader.classList.remove('visually-hidden');
    errorElement.classList.add('visually-hidden');
    catInfo.classList.add('visually-hidden');
    
    // Fetch breed images for the selected breed
    fetchBreedImgs(breedsId)
        .then(data => {
           // Check if data has images
           if (data.length > 0) {
                const { url } = data[0];
                const breedInfo = data[0].breeds[0];
                const { name, description, temperament } = breedInfo;

                // Create HTML markup for displaying cat information
                const markup = `
                <img src="${url}" alt="${name}"/>
                <h3>${name}</h3>
                <p>${description}</p>
                <p>${temperament}</p>`;

                // Update the catInfo section with the markup
                catInfo.innerHTML = markup;

                // Show the breed selection and hide the loader and error
                breedSelect.classList.remove('visually-hidden');
                loader.classList.add('visually-hidden');
                catInfo.classList.remove('visually-hidden');
            } else {
                // Notify the user if no images were found for the breed
                Notiflix.Notify.failure('No images found for this breed.');

                // Show the breed selection and hide the loader and error
                breedSelect.classList.remove('visually-hidden');
                loader.classList.add('visually-hidden');
                errorElement.classList.add('visually-hidden');
                catInfo.classList.add('visually-hidden');
            }
        })
        .catch(error => {
            // Handle errors by showing a notification to the user
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
                closeButton: true,
                cssAnimationStyle: 'from-top',
                timeout: 3000,
            });

            // Show the breed selection and hide the loader and error
            breedSelect.classList.remove('visually-hidden');
            loader.classList.add('visually-hidden');
            errorElement.classList.add('visually-hidden');
            catInfo.classList.add('visually-hidden');
        });
}

// Fetch and populate the breed selection dropdown initially
fetchBreeds()
    .then(res => {
        // Create the HTML markup for breed options and populate the dropdown
        const markup = res.map(el => {
            return `<option value="${el.id}">${el.name}</option>`;
        }).join("");

        breedSelect.innerHTML = markup;

        // Hide the loader and show the breed selection
        loader.classList.add('visually-hidden');
        breedSelect.classList.remove('visually-hidden');

    }).catch(error => {
        // Handle errors by showing a notification to the user
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
            closeButton: true,
            cssAnimationStyle: 'from-top',
            timeout: 3000,
        });

        // Hide the error element and breed selection
        errorElement.classList.remove('visually-hidden');
        breedSelect.classList.add('visually-hidden');
    }).finally(() => {
        // Hide the loader after fetching breeds
        loader.classList.add('visually-hidden');
    });
