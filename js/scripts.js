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
noSearchMatches.style.display = "none";
gallery.appendChild(noSearchMatches);

/**
 * Search container and events
 */
function createSearch(employeesObj) {
    // Create the HTML form element and insert it into the DOM
    const searchFormHTML =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>`;
    searchContainer.insertAdjacentHTML('beforeend', searchFormHTML);

    searchInput = document.querySelector('#search-input');
    searchSubmit = document.querySelector('#search-submit');

    // Listen out for a keyup event on 'searchInput' and call 'searchEmployees()'
    searchInput.addEventListener('keyup', () => {
        searchEmployees(searchInput.value, employeesObj);
    });

    // Listen out for click event on 'searchSubmit' and call 'searchEmployees()'
    searchSubmit.addEventListener('click', () => {
        searchEmployees(searchInput.value, employeesObj);
    });
};

/**
 * Search Employees Functionality
 */
function searchEmployees(searchInput, employeesObj) {

    // Set 'noSearchMatches' to an empty string at the start of every function call
    noSearchMatches.innerHTML = '';
    noSearchMatches.style.display = "none";

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
    // Access the prev and next button of the modal passed as an argument 'modalDiv'
    const prev = modalDiv.children[0].children[1].children[0];
    const next = modalDiv.children[0].children[1].children[1];
    
    // Assign all the current card elements to 'cards'
    const cards = document.querySelectorAll('.card');
    
    // On click of 'prev' get the index of the current modal, then if the current index - 1 is not undefined add that modal to the body
    // Then call 'toggleModal()' and 'removeModal()'
    prev.addEventListener('click', e => {
        const nameModal = e.target.parentNode.parentNode.children[0].children[1].children[1].innerHTML;
        const emailModal = e.target.parentNode.parentNode.children[0].children[1].children[2].innerHTML;

        let indexOfCard;
        
        // Loop through each card and get the full name and email of each card
        // If that value matches the the name and the email on the modal get the index of that card
        for(let i = 0; i < cards.length; i++) {
            const fullnameCard = cards[i].children[1].children[0].innerHTML;
            const emailCard = cards[i].children[1].children[1].innerHTML;

            if(nameModal === fullnameCard && emailModal === emailCard) {
                indexOfCard = i;
            }
        };

        // If there is a previous card display it and call modal functions
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
        
        /// Loop through each card and get the full name and email of each card
        // If that value matches the the name and the email on the modal get the index of that card
        for(let i = 0; i < cards.length; i++) {
            const fullnameCard = cards[i].children[1].children[0].innerHTML;
            const emailCard = cards[i].children[1].children[1].innerHTML;

            if(nameModal === fullnameCard && emailModal === emailCard) {
                indexOfCard = i;
            }
        };

        // If there is a next card display it and call modal functions
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
    const modalClose = modalDiv.children[0].children[0].children[0];

    // On click of 'modalClose' hide the modal
    modalClose.addEventListener('click', () => {
        modalDiv.style.display = "none";
    })

};

/**
 * HTTP request to Random User Generator API
 */
// Use .then() and turn the response of the fetch into JSON, use .then() again to access the emoloyee objects using data.results
// Call 'generateGallery()', 'generateCardModals()' and 'createSearch()'
// Catch any errors and console log the error
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => {
        generateGallery(data.results)
        generateCardModals(data.results)
        createSearch(data.results)
    })
    .catch(error => console.log(error))




