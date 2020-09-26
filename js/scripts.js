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

// Create and append the span element used to display a message when search returns no results
const noSearchMatches = document.createElement("span");
gallery.appendChild(noSearchMatches);

/**
 * Search container and events
 */
function createSearch(employeesObj) {
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
    searchContainer.appendChild(form);

    // Listen out for click event on 'searchSubmit' and call 'searchEmployees()'
    searchSubmit.addEventListener('click', () => {
        searchEmployees(searchInput.value, employeesObj);
    });

    // Listen out for a keyup event on 'searchSubmit' and call 'searchEmployees()'
    searchInput.addEventListener('keyup', () => {
        searchEmployees(searchInput.value, employeesObj);
    });
};

/**
 * Search Employees Functionality
 */
function searchEmployees(searchInput, employeesObj) {

    // Set 'noSearchMatches' to an empty string at the start of every function call
    noSearchMatches.innerHTML = '';

    // Create a new array 'filteredEmployees' to store the employees returned by the search logic
    let filteredEmployees = [];

    // Count how many matches are returned from the seach logic
    let resultsCounter = 0;

    // loop through 'employeesObj', if 'searchInput' is not 0 and included within 'fullname' then add that object to 'filteredEmployees'
    for(let i = 0; i < employeesObj.length; i++) {
        let fullname = employeesObj[i].name.first + ' ' + employeesObj[i].name.last;
        if( searchInput !== 0 && fullname.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())) {
            filteredEmployees.push(employeesObj[i]);
            resultsCounter++;
        }
    };

    // Create a variable called 'employeeCards' and assign all the employee card elements to it
    const employeeCards = document.querySelectorAll('.card');

    // If 'returnCounter' has no matches update the innerHTML of 'noSearchMatches' and remove all 'employeeCards'
    // Else, remove all 'employeeCards' and update the gallery using 'generateGallery()' with the filtered employees in 'filteredEmployees'
    // Call 'generateCardModals()' to update the filtered employees with their relative modals
    if(resultsCounter == 0) {
        for(let i = 0; i < employeeCards.length; i++) {
            employeeCards[i].remove();
        }
        noSearchMatches.innerHTML = "No matches found";
        noSearchMatches.style.display = "block";
    } else {
        for(let i = 0; i < employeeCards.length; i++) {
            employeeCards[i].remove()
        };
        noSearchMatches.style.display = "none";
        generateGallery(filteredEmployees);
        generateCardModals(filteredEmployees);
    };
};

/**
 * Generate Gallery Function
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


/**
 * Generate Modal Function
 */
function generateModal(employee) {
    // Create and return the modal HTML with the realtive employee data passed as an argument as an object
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
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;

    return modalHTML;
};


/**
 * Display modal of employee card on click
 */
function generateCardModals(employeesObj) {
    const cardElements = document.querySelectorAll(".card");
    const modalDiv = document.createElement('div');
    
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener('click', () => {
            // Display modal, which may be hidden after pervious call of removeModal()
            modalDiv.style.display = "block";
            modalDiv.innerHTML = generateModal(employeesObj[i])
            body.appendChild(modalDiv);
            // Modal toggle
            toggleModal(modalDiv, employeesObj);
            // Call removeModal() 
            removeModal(modalDiv);
        });
    }
};


/**
 * Toggle Modals
 */
function toggleModal(modalDiv, employeesObj) {
    const prev = modalDiv.children[0].children[1].children[0];
    const next = modalDiv.children[0].children[1].children[1];
    
    const cards = document.querySelectorAll('.card');
    
    prev.addEventListener('click', e => {
        const nameModal = e.target.parentNode.parentNode.children[0].children[1].children[1].innerHTML;
        const emailModal = e.target.parentNode.parentNode.children[0].children[1].children[2].innerHTML;

        let indexOfCard;
        
        // The length of the 'employeeObj' and 'cards' will be the same
        // Loop through each card and get the full name and email of each card
        // If that value matches the the name and the email on the modal get the index of that card
        for(let i = 0; i < cards.length; i++) {
            const fullnameCard = cards[i].children[1].children[0].innerHTML;
            const emailCard = cards[i].children[1].children[1].innerHTML;

            if(nameModal === fullnameCard && emailModal === emailCard) {
                indexOfCard = i;
            }
        };

        if(cards[indexOfCard-1] !== undefined) {
            modalDiv.innerHTML = generateModal(employeesObj[indexOfCard-1])
            body.appendChild(modalDiv);
            // Modal toggle
            toggleModal(modalDiv, employeesObj);
            // Call removeModal() 
            removeModal(modalDiv);
        };
    });
    
    next.addEventListener('click', e => {
        const nameModal = e.target.parentNode.parentNode.children[0].children[1].children[1].innerHTML;
        const emailModal = e.target.parentNode.parentNode.children[0].children[1].children[2].innerHTML;

        let indexOfCard;
        
        // The length of the 'employeeObj' and 'cards' will be the same
        // Loop through each card and get the full name and email of each card
        // If that value matches the the name and the email on the modal get the index of that card
        for(let i = 0; i < cards.length; i++) {
            const fullnameCard = cards[i].children[1].children[0].innerHTML;
            const emailCard = cards[i].children[1].children[1].innerHTML;

            if(nameModal === fullnameCard && emailModal === emailCard) {
                indexOfCard = i;
            }
        };

        if(cards[indexOfCard+1] !== undefined) {
            modalDiv.innerHTML = generateModal(employeesObj[indexOfCard+1]);
            body.appendChild(modalDiv);
            // Modal toggle
            toggleModal(modalDiv, employeesObj);
            // Call removeModal() 
            removeModal(modalDiv);
        };
    });
    
}


/**
 * Close Modal
 */
function removeModal(modalDiv) {
    // Access the close modal button
    const modalClose = document.querySelectorAll('#modal-close-btn');

    for(let i = 0; i < modalClose.length; i++) {
        modalClose[i].addEventListener('click', () => {
            modalDiv.style.display = "none";
        })
    }
};



/**
 * HTTP request to Random User Generator API
 */
// Use an AJAX call to return 12 random users within 'getResponse'
// Create a promise that returns a response of the 12 random user objects
function getResponse(url) {
    return new Promise( (resolve, reject) => {

        let xhr = new XMLHttpRequest();
        // Request to random user generator API, with the perameters of 12 users and nationality US.
        xhr.open('GET', url);

        xhr.onload = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let randomEmployeeObject = JSON.parse(xhr.responseText).results;
                resolve(randomEmployeeObject);
            } else {
                reject( Error(xhr.statusText) );
            }
        };
        xhr.send();
    });
};

// Execute 'getResponse()', wait for the Promise to resolve and then carry out functionality in 'then()'
getResponse('https://randomuser.me/api/?results=12&nat=us')
    .then( response => {
        generateGallery(response)
        generateCardModals(response)
        createSearch(response)
    })
    .catch((response) => console.log(response));








