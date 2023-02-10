/*Variables*/
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

const defaultZipCode = '10001';

/*Functions*/

//function to search for breweries by zip code
const search = (zipCode) => {
  // makes a get request to the openbrewerydb api to search for breweries by zip code
  fetch(`https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`)

    .then((response) => {
      return response.json();
    })
    .then((breweries) => {

      resultsDiv.innerHTML = '';

      if (breweries.length === 0) {
        resultsDiv.innerHTML = '<h2>No Breweries listed in this area, try another zip code</h2>';
      
      } else {
      
      breweries.forEach((brewery) => {
        
        const card = document.createElement("div");
        card.classList.add("card");

        const header = document.createElement("header")
        header.classList.add("card-header")
        header.innerHTML = `<h2>${brewery.name}</h2>`
        
        const body = document.createElement("div")
        body.classList.add("card-body")
        body.innerHTML = `<p>${brewery.street || 'Not Listed'}</p>

        <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
        <br>
        <p>Phone: ${brewery.phone || 'No phone number available'}</p>
        <p>${brewery.website_url ? `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`:
        'No Website Available'}</p>`

        card.appendChild(header)
        card.appendChild(body)
        resultsDiv.appendChild(card)

      });

      const endOfResults = document.createElement("h2")
      endOfResults.innerText = "End of Search Results"    
      resultsDiv.appendChild(endOfResults)

    }
    });

  };

/*Event Listeners*/

//submit event listener
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const zipCode = document.getElementById('zip-code').value || defaultZipCode;


  search(zipCode);
});



//reset button event listener
document.getElementById('reset-button').addEventListener('click', () => {

  resultsDiv.innerHTML = `
    <h2>Type a zip code above to get started</h2>
     `;
  document.getElementById('zip-code').value = '';
});



//adds functionality to search by pressing enter
searchForm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    

    const zipCode = document.getElementById('zip-code').value || defaultZipCode;
        

    search(zipCode);
  }
});

  //adds a window resize event listener
window.addEventListener('resize', () => {

  const width = window.innerWidth
  const cards = [...document.querySelectorAll('.card')]
  
  cards.map(card => {

    function cardSize(number){
      card.querySelector('h2').style.fontSize = `${1.2 * number}em`;
      card.querySelectorAll('p').forEach(p => {p.style.fontSize = `${1 * number}em`});
    }

    if (width<800) {
      cardSize(1)
    } else if (width>800 && width<=1200){
      cardSize(1.5)
    } else {
      cardSize(2)
    }
  })

});

/*Default event*/

search(defaultZipCode);





 //older code referenced in blog post, originally on line 32


        /* resultsDiv.innerHTML += `
           <div class="card">
             <div class="card-header">
               <h2>${brewery.name}</h2>
             </div>
             <div class="card-body">
               <p>${brewery.street || 'Not Listed'}</p>
               <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
               <br>
               <p>Phone: ${brewery.phone || 'No phone number available'}</p>
               <p>${brewery.website_url ? `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`:
                'No Website Available'}</p>

             </div>
           </div>
         `; */