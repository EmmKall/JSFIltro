const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 11;

const datosBusquedad = {
    marca: '',
    year: '',
    precioMin: '',
    precioMax: '',
    puertas: '',
    transmision: '',
    color: '',
}

document.addEventListener('DOMContentLoaded', () => {
    
    mostrarAutos(autos);
    
    llenarSelectYear();

});

//Select Event Listener
marca.addEventListener('change',e => {
    datosBusquedad.marca = e.target.value;
    filtrarBusquedad();
});
year.addEventListener('change',e => {
    datosBusquedad.year = Number(e.target.value);
    filtrarBusquedad();
});
precioMin.addEventListener('change', e => {
    datosBusquedad.precioMin = Number(precioMin.value);
    filtrarBusquedad();
});
precioMax.addEventListener('change', e => {
    datosBusquedad.precioMax = Number(e.target.value);
    filtrarBusquedad();
});
puertas.addEventListener('change', e => {
    datosBusquedad.puertas = parseInt(e.target.value);
    filtrarBusquedad();
});
transmision.addEventListener('change', e => {
    datosBusquedad.transmision = e.target.value;
    filtrarBusquedad();
});
color.addEventListener('change', e => {
    datosBusquedad.color = e.target.value;
    filtrarBusquedad();
});

function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Color: ${color} - Precio $ ${precio}
        `;

        resultado.appendChild(autoHTML);

    } );
}

function limpiarHTML(){
    while( resultado.firstChild ){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelectYear(){
    for(let indice = max; indice >= min; indice--){
        const opcion = document.createElement('option');
        opcion.value = indice;
        opcion.textContent = indice;
        year.appendChild(opcion);
    }
}

function filtrarBusquedad(){
    const resultados = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarPuertas ).filter( filtrarPrecioMin ).filter( filtrarPrecioMax ).filter( filtrarTransmision ).filter( filtrarColor );

    if(resultados.length > 0){
        mostrarAutos(resultados);
    } else {
        noResultado();
    }
}

function filtrarMarca(auto){
    const { marca } = datosBusquedad;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

function noResultado(){
    limpiarHTML();
    const mensaje = document.createElement('P');
    mensaje.textContent = "Sin resultados de acuerdo a los filtros de busquedad";
    mensaje.classList.add('alerta', 'error');
    resultado.appendChild(mensaje);
}

function filtrarYear(auto){
    const { year } = datosBusquedad;
    if (year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarPrecioMin(auto){
    const { precioMin } = datosBusquedad;
    if ( precioMin ) {
        return auto.precio >= precioMin;
    }
    return auto;
}

function filtrarPrecioMax(auto){
    const { precioMax } = datosBusquedad;
    if ( precioMax ){
        return auto.precio <= precioMax;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusquedad;
    if ( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusquedad;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusquedad;
    if( color ){
        return auto.color === color;
    }
    return auto;
}