const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const botonVaciar = document.querySelector('.compra')

let carrito = []


Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
});



function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent
    const itemPrecio = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src

    const newItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }
    addLocalStorage()
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null
        }
    }

    carrito.push(newItem)
    addLocalStorage()
    renderCarrito()

    CarritoTotal()

}

function renderCarrito() {
    tbody.innerHTML = ''

    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
            <td class="table__productos">
                <img src= ${item.img} width="20%" alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__precio">
                <p>${item.precio}</p>
            </td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector('.input__elemento').addEventListener('change', sumarCantidad)

    })
}


function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`

    sumarCantidad()

    CarritoTotal()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    addLocalStorage()
    CarritoTotal()
}



function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    const alert2 = document.querySelector('.alert2')

    setTimeout(function () {
        alert2.classList.add('hide')
    }, 12000)
    alert2.classList.remove('hide')
    // Renderizamos los cambios
    renderCarrito();
    // Cargamos los datos en localStorage
    addLocalStorage();
    CarritoTotal();

}

botonVaciar.addEventListener('click', vaciarCarrito);

function sumarCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            item.cantidad = sumaInput.value;
            addLocalStorage()
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('.carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('.carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}

$(document).ready(function () {
    $("#hide").click(function () {
        $("p").hide();
    });

    $("#show").click(function () {
        $("p").show();
    });

    $("#toggle").click(function () {
        $("p").toggle();
    });
});



// ACA VAN LOS PARAMETROS DE LA API DE COINBASE PARA CONSULTAR VALOR CRIPTOMONEDAS //

$(() => {
    const URL = 'https://api.coinbase.com/v2/prices/BTC-USD/buy'

    $.get(URL, (response, status) => {
        if (status == 'success') {
            // const { data: {amount:precio}} = response
            const precio = response.data.amount
            const origen = response.data.base
            console.log(precio, origen);
            $('#btc').text(precio)
        }
    })
})

$(() => {
    const URL = 'https://api.coinbase.com/v2/prices/ETH-USD/buy'

    $.get(URL, (response, status) => {
        if (status == 'success') {
            // const { data: {amount:precio}} = response
            const precio = response.data.amount
            const origen = response.data.base
            console.log(precio, origen);
            $('#eth').text(precio)
        }
    })
})

$(() => {
    const URL = 'https://api.coinbase.com/v2/prices/ADA-USD/buy'

    $.get(URL, (response, status) => {
        if (status == 'success') {
            // const { data: {amount:precio}} = response
            const precio = response.data.amount
            const origen = response.data.base
            console.log(precio, origen);
            $('#ada').text(precio)
        }
    })
})