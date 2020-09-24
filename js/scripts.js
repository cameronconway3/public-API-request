/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

// I would like my project to be rejected if I do not meet the Exceeds Expectations Requirements

/**
 * Globals 
 */
const searchContainer = document.querySelector('.search-container');

/**
 * Search Container
 */
// Creating and appending search feature to 'search-container'
// Create a form element and set attributes
let form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method', 'get');

// Create input and set attributes
let searchInput = document.createElement('input');
searchInput.setAttribute('type', 'search');
searchInput.setAttribute('id', 'search-input');
searchInput.setAttribute('class', 'search-input');
searchInput.setAttribute('placeholder', 'Search...');
// Append input to form
form.appendChild(searchInput);

// Create input and set attributes
let searchSubmit = document.createElement('input');
searchSubmit.setAttribute('type', 'submit');
searchSubmit.setAttribute('value', '&#x1F50D;');
searchSubmit.setAttribute('id', 'search-submit');
searchSubmit.setAttribute('class', 'search-submit');
// Append input to form
form.appendChild(searchSubmit);

// Append form to 'searchContainer'
searchContainer.appendChild(form)


function getResponse(url) {
    return new Promise( (resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                resolve(xhr.responseText);
            } else {
                reject( Error(xhr.statusText) );
            }
        }
        
        xhr.send();
    })
}

getResponse('https://randomuser.me/api/?results=5')
    .then((response) => console.log(JSON.parse(response)))
    .catch((response) => console.log(response));






