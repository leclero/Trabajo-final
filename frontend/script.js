const backendURL = 'http://192.168.1.17:3000';  // Cambia esto por la IP real de tu backend

let elementos = [];
let carrito = [];

function cargarElementos() {
axios.get(`${backendURL}/api/elementos`).then(res => {
    elementos = res.data;
    renderizarProductos();
    renderizarVideos();
});
}

function renderizarProductos() {
const contenedor = document.getElementById('carousel-inner');
contenedor.innerHTML = "";

const productos = elementos.filter(e => e.tipo === "imagen");

productos.forEach((prod, index) => {
    const div = document.createElement('div');
    div.className = 'carousel-item' + (index === 0 ? ' active' : '');
    div.innerHTML = `
    <img src="${backendURL}${prod.archivo}" class="d-block mx-auto" style="max-height: 400px;">
    <div class="carousel-caption">
        <h5>${prod.nombre}</h5>
        <p>$${prod.precio}</p>
        <button class="btn btn-primary" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    </div>
    `;
    contenedor.appendChild(div);
});
}

function renderizarVideos() {
const contenedor = document.getElementById('galeria-videos');
contenedor.innerHTML = "";

const videos = elementos.filter(e => e.tipo === "video");

videos.forEach(video => {
    const div = document.createElement('div');
    div.className = "col-md-4 mb-4";
    div.innerHTML = `
    <video controls width="100%" height="240">
        <source src="${backendURL}${video.archivo}" type="video/mp4">
    </video>
    `;
    contenedor.appendChild(div);
});
}

// Carrito (igual a tu código anterior)
// (Puedes dejar esta parte sin cambios)

cargarElementos();
