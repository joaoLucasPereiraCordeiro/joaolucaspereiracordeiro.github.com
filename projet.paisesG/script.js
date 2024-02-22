function list() {
  fetch("https://restcountries.com/v3.1/all")
    .then((json) => json.json())
    .then((countries) => {
      const row = document.querySelector("#row");

      function renderCountries(countries) {
        let countriesHtml = "";
        for (let index = 0; index < countries.length; index++) {
          const country = countries[index];
          countriesHtml += `
            <div class="col-4 mt-3">
              <div class="card" style="width: 18rem">
                <img src="${country.flags.png}" class="card-img-top" alt="${country.flags.alt}">
                <div class="card-body">
                  <h5 class="card-title">${country.translations.por.common}</h5>
                  <p class="card-text">
                    Região: ${country.region}
                  </p>
                  <button class="btn btn-primary btn-open-modal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-country-index="${index}">Abrir modal</button>
                </div>
              </div>
            </div>
          `;
        }

        row.innerHTML = countriesHtml;

        const openModalButtons = document.querySelectorAll(".btn-open-modal");
        openModalButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const countryIndex = this.getAttribute("data-country-index");
            const country = countries[countryIndex];
            updateModal(country.translations.por.common, country.region);
          });
        });
      }

    
      renderCountries(countries);

    
      const searchInput = document.querySelector("#search");
      searchInput.addEventListener("input", function () {
        const search = this.value.toLowerCase(); 
        const filteredCountries = countries.filter((country) =>
          country.translations.por.common.toLowerCase().includes(search)
        );

        renderCountries(filteredCountries);
      });


      function updateModal(countryName, region) {
        const modalTitle = document.querySelector("#exampleModalLabel");
        const modalBody = document.querySelector(".modal-body");

        modalTitle.textContent = countryName;
        modalBody.innerHTML = `
          <p>País: ${countryName}</p>
          <p>Região: ${region}</p>
        `;
      }
    });
}

list();
