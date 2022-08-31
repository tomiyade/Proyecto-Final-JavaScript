let stockProductos = [
    { id: 1, nombre: "Nike Air Max 97", tipo: "zaptallia", cantidad: 4, precio: 25000, talle: 39, img: './img/airmax97.jpg' },
    { id: 2, nombre: "Nike Air Force 1", tipo: "zapatilla", cantidad: 19, precio: 20000, talle: 41, img: './img/airforce1.jpg' },
    { id: 3, nombre: "Nike Air Jordan 4", tipo: "zapatilla", cantidad: 1, precio: 45000, talle: 42, img: './img/airjordan4.jpg' },
    { id: 4, nombre: "Adidas Yeezy 350", tipo: "zapatilla", cantidad: 13, precio: 35000, talle: 41, img: './img/yeezy350.jpg' },
    { id: 5, nombre: "Adidas Yeezy 700", tipo: "zapatilla", cantidad: 2, precio: 34000, talle: 38, img: './img/yeezy700.jpg' },
    { id: 6, nombre: "Puma R78", tipo: "zapatilla", cantidad: 7, precio: 20000, talle: 42, img: './img/pumar78.jpg' },
    { id: 7, nombre: "Adidas Forum Low", tipo: "zapatilla", cantidad: 6, precio: 24000, talle: 43, img: './img/forumlow.jpg' },
    { id: 8, nombre: "Nike SB Dunk Low Travis Scott", tipo: "zapatilla", cantidad: 1, precio: 150000, talle: 41, img: './img/travisscott.jpg' },
]


const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//HAGO UN INNER METIENDOLO AL HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `


    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)


    //AGREGO EL PRODUCTO AL CARRITO MEDIANTE EL ID
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)

    })
})





const agregarAlCarrito = (prodId) => {

    //COMPRUEBO SI YA EXISTE EL PRODUCTO EN EL CARRITO
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => {

            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)//

        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)

    actualizarCarrito()

    console.log(carrito)
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    console.log(carrito)

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


}




const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')

const botonCerrar = document.getElementById('carritoCerrar')

const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

const botonFinalizar = document.getElementById("boton-finalizar")

botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')

})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})



botonFinalizar.addEventListener('click', () => {
    Swal.fire({
        title: "Gracias por su compra!!",
        confirmButtonText: "Aceptar",

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Compra Finalizada', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })

});
botonFinalizar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})




