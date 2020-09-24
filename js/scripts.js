/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

// I would like my project to be rejected if I do not meet the Exceeds Expectations Requirements

/**
 * Globals 
 */
const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');

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


/**
 * Gallery
 */

function generateGallery(employeesObj) {
    // Map the employee objects to an HTML string using template liretals to fill in the relative data
    const employeeCard = employeesObj.map(employee => 
        `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`).join('');

    // Insert the HTML into the DOM
    gallery.insertAdjacentHTML('beforeend', employeeCard);
};

function generateModal(employee) {
    console.log(employee)
    modalHTML =`
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.phone.split("-")[0]} ${employee.phone.split("-")[1]}-${employee.phone.split("-")[2]}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employee.dob.date.slice(0,10).split("-")[1]}/${employee.dob.date.slice(0,10).split("-")[2]}/${employee.dob.date.slice(0,10).split("-")[0]}</p>
                </div>
            </div>
        </div>`;

    return modalHTML;
};

function generateCardModals(employeesObj) {
    const cardElements = document.querySelectorAll(".card");
    const modalDiv = document.createElement('div');
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener('click', () => {
            modalDiv.innerHTML = generateModal(employeesObj[i])
            body.appendChild(modalDiv);
        })
    }
}



// // Use an AJAX call to return 12 random users and add them to the DOM
// let xhr = new XMLHttpRequest();

// xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4 && xhr.status === 200) {
//         // JSON parse the xhr response and assign the results to 'randomEmployeeObject'
//         let randomEmployeeObject = JSON.parse(xhr.responseText).results;

//         console.log(randomEmployeeObject[0].dob.date.slice(0,10).split("-"));
        
//         generateGallery(randomEmployeeObject);

//         } else {
//             // If the AJAX call is not successful display an error with the relative status text
//             Error(xhr.statusText);
//         }
//     }
// // Access the url and get 12 random employees using 'results=12' as a parameter
// xhr.open('GET', 'https://randomuser.me/api/?results=12');
// xhr.send();







function getResponse(url) {
    return new Promise( (resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=us');

        xhr.onload = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let randomEmployeeObject = JSON.parse(xhr.responseText).results;
                resolve(randomEmployeeObject);
            } else {
                reject( Error(xhr.statusText) );
            }
        }
        
        xhr.send();
    })
}

getResponse('https://randomuser.me/api/?results=12')
    .then( response => {
        generateGallery(response)
        generateCardModals(response)
    })
    .catch((response) => console.log(response));






