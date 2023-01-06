// https://api.openbrewerydb.org

// Gets a reference to the search form and results div
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

// Adds a submit event listener to the search form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Gets the zip code that the user entered
  const zipCode = document.getElementById('zip-code').value;

//console.log(zipCode);

  // Makes a GET request to the OpenBreweryDB API to search for breweries by zip code
  fetch(`https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`)
    .then((response) => {
      // Convert the response to JSON
      return response.json();
    })
    .then((breweries) => {
     // Uses the forEach method to find breweries with the correct postal code
     breweries.forEach((brewery) => {
      if (brewery.postal_code === zipCode) {
        matchingBreweries.push(brewery);
      }
    });
      // Limits the array to the first 5 elements
      const limitedBreweries = breweries.slice(0, 5);

      // Clears the previous search results
      resultsDiv.innerHTML = '';

      // Displays the search results
      limitedBreweries.forEach((brewery) => {
        resultsDiv.innerHTML += `
          <div class="card">
            <div class="card-header">
              <h2>${brewery.name}</h2>
            </div>
            <div class="card-body">
              <p>${brewery.street}</p>
              <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
            </div>
          </div>
        `;
      });
    });
});

// Adds an event listener for the reset button
document.getElementById('reset-button').addEventListener('click', () => {
  // Clears the search results and the zip code input
  resultsDiv.innerHTML = '';
  document.getElementById('zip-code').value = '';
});