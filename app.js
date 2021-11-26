//VARIABLES
//const checkColor = document.getElementById('check-color')
const cards9 = document.getElementById('cards9');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {}



document.addEventListener("DOMContentLoaded", ()=> {
    fetchData();
})



cards9.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e =>{
    botonAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        mostrarCards(data)
    }catch (error) {
        console.log(error)
    }
}
       
const mostrarCards = data => {
   
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.articulo
        templateCard.querySelector('b').textContent = producto.precio
        templateCard.querySelector('h6').textContent = producto.rango
        templateCard.querySelector('img').setAttribute("src", producto.url)
        templateCard.querySelector('.btn-comprar').dataset.id = producto.id

       const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
        cards9.appendChild(fragment)
}


 

const addCarrito = e  =>{
  
  if(e.target.classList.contains('btn-comprar')){
     //console.log()  
     setCarrito(e.target.parentElement)
  }
  e.stopPropagation()//para evitar que se hereden los eventos del contenedor padre
}


const setCarrito = objeto =>{
    const producto = {
        
        id: objeto.querySelector('.btn-comprar').dataset.id,
        articulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('b','p').textContent,
        rango: objeto.querySelector('h6').textContent,
        cantidad: 1    
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    mostrarCarrito()
}



const mostrarCarrito = ()=> {
   // console.log(carrito)
   items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.articulo
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
       // templateCarrito.querySelector('.btn-agregar').dataset.id = producto.id
       // templateCarrito.querySelector('.btn-borrar').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    mostrarFooter()

}

const mostrarFooter =()=>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">
        Carrito vacío - comience a comprar!</th>
        `;
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) =>acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito  = {}
        mostrarCarrito()
    })
}












