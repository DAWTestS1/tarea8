function mostrarTodo() {
    // Obtener el valor seleccionado del tipo de vehículo
    const tipoVehiculo = document.getElementById("tipoVehiculo").value;

    // Rutas de las imágenes y descripciones para cada tipo de vehículo
    let vehiculos = {
        // Compacto
        "10.45": {
            imgPrincipal: "images/Compacto1.png",
            descripcion: "KIA PICANTO, Año 2016",
            miniaturas: [
                { src: "images/Compacto1.png", descripcion: "KIA PICANTO, Año 2016" },
                { src: "images/Compacto2.png", descripcion: "FORD FIESTA ST, Año 2015" },
                { src: "images/Compacto3.png", descripcion: "PEUGEOT 308, Año 2018" }
            ]
        },
        // Mediano
        "15.50": {
            imgPrincipal: "images/Mediano1.png",
            descripcion: "HONDA CITY CAR, Año 2017",
            miniaturas: [
                { src: "images/Mediano1.png", descripcion: "HONDA CITY CAR, Año 2017" },
                { src: "images/Mediano2.png", descripcion: "MERCEDES SLS, Año 2015" },
                { src: "images/Mediano3.png", descripcion: "FORD FIESTA ST, Año 2016" }
            ]
        },
        // Todo Terreno
        "25.25": {
            imgPrincipal: "images/TodoTerreno1.png",
            descripcion: "TOYOTA FJ CRUISER, Año 2016",
            miniaturas: [
                { src: "images/TodoTerreno1.png", descripcion: "TOYOTA FJ CRUISER, Año 2016" },
                { src: "images/TodoTerreno2.png", descripcion: "TOYOTA Prado, Año 2018" },
                { src: "images/TodoTerreno3.png", descripcion: "NISSAN JUKE, Año 2017" }
            ]
        },
        // Familiar
        "20.30": {
            imgPrincipal: "images/Familiar1.png",
            descripcion: "TOYOTA SIENNA, Año 2018",
            miniaturas: [
                { src: "images/Familiar1.png", descripcion: "TOYOTA SIENNA, Año 2018" },
                { src: "images/Familiar2.png", descripcion: "DODGE GRAND CARAVANE, Año 2015" },
                { src: "images/Familiar3.png", descripcion: "HYUNDAI ELANTRA, Año 2016" }
            ]
        }
    };

    // Obtener la información según el tipo de vehículo seleccionado
    const vehiculoSeleccionado = vehiculos[tipoVehiculo];

    // Actualizar la imagen principal
    document.getElementById("imgVista").src = vehiculoSeleccionado.imgPrincipal;
    document.getElementById("infTCar").textContent = vehiculoSeleccionado.descripcion;

    // Actualizar las miniaturas
    for (let i = 0; i < vehiculoSeleccionado.miniaturas.length; i++) {
        document.getElementById("img" + (i + 1)).src = vehiculoSeleccionado.miniaturas[i].src;
        document.getElementById("img" + (i + 1)).alt = vehiculoSeleccionado.miniaturas[i].descripcion;
        document.getElementById("img" + (i + 1)).style.display = "inline-block"; // Asegurarse de que se muestren
    }
}

// Función para mostrar la imagen seleccionada al hacer clic en la miniatura
function mostrarImagen(num) {
    const miniatura = document.getElementById("img" + num).src;
    const descripcion = document.getElementById("img" + num).alt;
    document.getElementById("imgVista").src = miniatura;
    document.getElementById("infTCar").textContent = descripcion;
}
