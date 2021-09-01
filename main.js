const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const countryContainer = document.getElementById('country-container');
const countrySingleContainer = document.getElementById('details');
const errorText = document.getElementById('error');
const spinner = document.getElementById('spinner');

searchButton.addEventListener('click', function () {
  const searchText = searchInput.value;

  // error handling
  if (searchText === '') {
    errorText.innerText = 'Search field cannot be empty.';
    return;
  }
  //spinner on
  spinner.classList.remove('d-none');

  //clear
  searchInput.value = '';
  errorText.innerText = '';
  countryContainer.textContent = '';
  countrySingleContainer.innerHTML = '';

  //get data from api
  const url = `https://restcountries.eu/rest/v2/name/${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data));
});

const showData = (countries) => {
  // spinner of
  spinner.classList.add('d-none');

  // error handling
  if (countries.message === 'Not Found') {
    errorText.innerText = 'Result not found !';
  } else {
    errorText.innerText = '';
  }

  countries.forEach((country) => {
    const { name, capital, flag, alpha2Code } = country;
    const div = document.createElement('div');
    div.classList.add('col');

    div.innerHTML = `
    <div class="card">
        <img class="img-thumbnail" src="${flag}" alt="..." />

        <div class="card-body">
            <h5 class="card-title">${name}</h5>

            <p class="card-text">Capital: 
            <span class="fw-bold">${capital}</span>
            </p>

            <button onclick="getDetails('${alpha2Code}')" class="btn btn-info fw-bold text-white">See Details</button>
        </div>
    </div>
    `;
    countryContainer.appendChild(div);
  });
};

// single country details
const getDetails = (code) => {
  window.scrollTo(0, 40);
  const url = `https://restcountries.eu/rest/v2/name/${code}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => setDetails(data));
};
const setDetails = (data) => {
  data.forEach((country) => {
    const { name, capital, flag, population, region } = country;

    countrySingleContainer.innerHTML = `
        <div class="col my-3">
            <div class="card">
                <img class="img-thumbnail" src="${flag}" alt="..." />
        
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
        
                    <p class="card-text">Capital: 
                    <span class="fw-bold">${capital}</span>
                    </p>
                    <p class="card-text">Ppulation: <span class="fw-bold">${population}</span>
                    </p>
                    <p class="card-text">Region: <span class="fw-bold">${region}</span>
                    </p>
                    
                    <button onclick="hideDetails()" class="btn btn-info fw-bold text-white">See Details</button>
                </div>
            </div>
        </div>
        `;
  });
};

const hideDetails = () => {
  countrySingleContainer.innerHTML = '';
};
