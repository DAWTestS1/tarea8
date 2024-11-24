$(document).ready(function () {
    const startDateInput = $("input[name='fechaRetiro']");
    const endDateInput = $("input[name='fechadevolucion']");
    const vehicleSelect = $("#tipoVehiculo");
    const insuranceSelect = $("#seguro");
    const calculateButton = $("input[value='Calcular']");
    const daysInput = $("input[name='dias']");
    const dailyRateInput = $("input[name='td']");
    const totalInput = $("input[name='totalPagar']");

 

    // Calcular días entre las fechas
    function calculateDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            alert("Por favor selecciona fechas válidas.");
            return null;
        }

        const timeDifference = end - start;
        const days = timeDifference / (1000 * 60 * 60 * 24);

        if (days < 3 || days > 365) {
            alert("El número de días debe estar entre 3 y 365.");
            return null;
        }

        return days;
    }

    // Calcular tarifa diaria
    function calculateDailyRate(vehicleRate, insuranceRate) {
        return parseFloat(vehicleRate) + parseFloat(insuranceRate);
    }

    // Calcular total a pagar
    function calculateTotal(days, dailyRate, countryRegion) {
        let discount = 0;

        if (countryRegion === "Americas" || countryRegion === "Europe") {
            discount = 0.10;
        } else if (countryRegion === "Africa") {
            discount = 0.05;
        }

        const total = dailyRate * days;
        const totalWithDiscount = total - total * discount;
        return { total, totalWithDiscount, discount };
    }

    // Evento "Calcular"
    calculateButton.click(async function () {
        const startDate = startDateInput.val();
        const endDate = endDateInput.val();
        const vehicleRate = vehicleSelect.find(":selected").val();
        const insuranceRate = insuranceSelect.find(":selected").val();
        const countryCca3 = $("#nacionalidad").val();

        // Calcular días
        const days = calculateDays(startDate, endDate);
        if (!days) return;

        // Calcular tarifa diaria
        const dailyRate = calculateDailyRate(vehicleRate, insuranceRate);

        // Obtener región del país
        let countryRegion = "";
        try {
            const response = await $.getJSON(`https://restcountries.com/v3.1/alpha?codes=${countryCca3}`);
            countryRegion = response[0]?.region || "";
        } catch (error) {
            alert("No se pudo obtener la región del país seleccionado.");
            return;
        }

        // Calcular total
        const { total, totalWithDiscount, discount } = calculateTotal(days, dailyRate, countryRegion);

        // Mostrar resultados
        daysInput.val(days);
        dailyRateInput.val(`$${dailyRate.toFixed(2)}`);
        totalInput.val(`$${totalWithDiscount.toFixed(2)}`);
    });

    

});

function MensajeTipoSeguro() {
    const insuranceSelect = $("#seguro");
    const selectedInsurance = insuranceSelect.find(":selected").attr("id");
    let message = "";

    switch (selectedInsurance) {
        case "PBO":
            message = "Protección Básica Obligatoria (PBO):\nCubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.\nCosto de alquiler diario: $10.45.";
            break;
        case "PED":
            message = "Protección Extendida de Daños (PED):\nIncluye PBO más daños a propiedades de terceros, incendio e inundaciones.\nCosto de alquiler diario: $15.50.";
            break;
        case "PGM":
            message = "Protección Gastos Médicos (PGM):\nIncluye PED más gastos médicos para los ocupantes del vehículo.\nCosto de alquiler diario: $18.25.";
            break;
        default:
            message = "Por favor, selecciona un tipo de seguro.";
    }

    // Mostrar el mensaje como una alerta
    alert(message);
}
