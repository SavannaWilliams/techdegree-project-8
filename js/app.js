let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gridContainer = document.querySelector('.employee-grid');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// Get employee data and insert into HTML
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    // Loop through all employees to build data cards
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        // Build the employee card HTML
        employeeHTML += `
        <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
                <div class="card-text">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });
    // Insert employee grid content into div
    gridContainer.innerHTML = employeeHTML;
}

// Put employee info in the popup modal
function displayModal(index) {
    console.log('display modal');
    let {name,
        dob,
        phone,
        email,
        location: { city, street, state, postcode},
        picture} = employees[index];
    let date = new Date(dob.date);

    // Build the modal's HTML
    const modalHTML = `
        <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
        <div class="modal-text">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr/>
                <p>${phone}</p>
                <p class="address">${street}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

    // Make the overlay visible
    overlay.classList.remove("hidden");
    // Insert modal HTML content into div
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // Select card and display appropriate modal, as long as not selecting the gridContainer.
    if(e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

//Re-hide the modal when X is clicked.
modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
});

function filterSearch() {
  let input = document.getElementById('search');
  let filter = input.value.toUpperCase();

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < employees.length; i++) {
    let firstName = employees[i].name.first.toUpperCase();
    let lastName = employees[i].name.last.toUpperCase();
    let dataIndex = `[data-index="${i}"]`;
    let currentCard = document.querySelector(dataIndex);
    let currentName = currentCard.querySelector('h2').textContent;
    console.log(currentName);

    if (currentName.indexOf(filter) > -1){
        console.log('match');
        currentCard.style.display = "";

    } else {
        console.log('wrong');
        currentCard.style.display = "none";
    }

  }
}