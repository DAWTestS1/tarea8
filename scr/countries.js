$(document).ready(function () {
    const countrySelect = $("#nacionalidad");
    const countriesApi = "https://restcountries.com/v3.1/all";

    // Cargar países desde la API
    function cargarPaises() {
        $.getJSON(countriesApi, function (countries) {
            countrySelect.empty(); // Limpiar opciones previas

            countries.forEach(country => {
                const option = $("<option>")
                    .val(country.cca3) // Código del país
                    .text(country.name.common); // Nombre común del país
                countrySelect.append(option);
            });

            // Seleccionar "Costa Rica" por defecto o el último guardado
            const savedCountry = localStorage.getItem("selectedCountry");
            if (savedCountry) {
                countrySelect.val(savedCountry);
            } else {
                countrySelect.val("CRI");
            }
        }).fail(function (error) {
            console.error("Error al cargar los países:", error);
            alert("No se pudieron cargar los países. Inténtalo más tarde.");
        });
    }

    // Inicializar carga de países
    cargarPaises();

    // Guardar selección de nacionalidad al cambiar
    countrySelect.change(function () {
        const selectedCountry = $(this).val();
        localStorage.setItem("selectedCountry", selectedCountry);
    });
});
