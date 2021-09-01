const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const countryContainer = document.getElementById('country-container');

searchButton.addEventListener('click', function () {
  const searchText = searchInput.value;

  // clear input value
  searchInput.value = '';

  //clear
  countryContainer.textContent = '';

  //get data from api
  const url = `https://restcountries.eu/rest/v2/name/${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data));
});

const showData = (countries) => {
  countries.forEach((country) => {
    const { name, capital, flag } = country;
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

            <button class="btn btn-info fw-bold text-white">See Details</button>
        </div>
    </div>
    `;
    countryContainer.appendChild(div);
  });
};
