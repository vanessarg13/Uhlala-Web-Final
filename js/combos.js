let productos = []
let productosSeleccionados = []
let count = 0


let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incrementoCombos')
let decremento = document.getElementById('decrementoCombos')
let counter = document.getElementById('count1Combos')



let inputGranel = document.getElementById('inputGranelCombos')

totalPedidos = 0
valueGranel = 0


function eliminarItem(index){

    pedido.splice(index, 1)  
    verCart() 

}


class Pedidos {
    constructor (nombre, presentacion, count, precio) { 
    this.producto = nombre,
    this.presentacion = presentacion,
    this.cantidad = count,
    this.precio = precio
    }
}


function restartCount(){
    counter.innerHTML = 0
    count = 0
}

function findIndex(event){
   prod = productos.filter( i => i.Producto === event.target.id)
    calculoTotal(prod)
}


// *** TOMO DATOS Y CREO PEDIDO *** //

function tomoInputs(){
    
    let nombre =  document.getElementById('title-modalCombos').innerHTML
    let presentacion1 =  document.getElementById('1litroCombos').innerHTML

    let count = counter.innerHTML

    let precio1 = document.getElementById('price1lCombos').value * count

    
    count > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion1, count, precio1))

    productosSeleccionados.map(producto => pedido.push(producto))

    sessionStorage.pedidos = JSON.stringify(pedido)

    counter.innerHTML = 0
    verCart()
    restartCount()
    productosSeleccionados = []

    
    pedidoForm = pedido.map(item => JSON.stringify(item)).toString()
    document.getElementById('pedido-combos').value = pedidoForm

}


// *** FUNCION QUE CREA CARDS *** //

function cardsCombos(filter){
    
    const divCombos = document.getElementById('productosCombos')
    
    filter.forEach(item => {
        divCombos.innerHTML +=  `<div class="card mx-3 my-3 shadow" style="width: 15rem">
                                <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto }" class="card-img-top" alt="${item.DescripcionMat}">
                                <div class="card-body text-center">
                                <p class="card-text mb-4">${item.Producto}</p>
                                <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Producto}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                </div>
                                </div>`
    }
    )
}


let realizarPedido = document.getElementById('btn-pedidoCombos')
realizarPedido.addEventListener('click', tomoInputs ) 



// ***** PRECIOS ***** //

let price1l = document.getElementById('price1lCombos').value



precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('totalCombos')
    
    document.getElementById('price1lCombos').value = prod[0].Precio
    let price1l = document.getElementById('price1lCombos').value

    let count = counter.innerHTML

    precioTotal = (count * price1l)
    total.innerHTML = `Total $${precioTotal}`
}



function modalShow(event) {

    const title = document.getElementById('title-modalCombos')
    const description = document.getElementById('descr-modalCombos')
    const total = document.getElementById('totalCombos')
    
    const prod = productos.filter( i => i.Producto === event.target.id)

    
    document.getElementById('imageCombos').src = prod[0].Foto === '' ? 'sinfoto.png' : prod[0].Foto 
    document.getElementById('1litroCombos').innerHTML = `Combo $${prod[0].Precio} `

    
    document.getElementById('price1lCombos').value = prod[0].Precio


    calculoTotal(prod)
    
    title.innerHTML = prod[0].Producto
    description.innerHTML = prod[0].Descripciones
    total.innerHTML = `Total $${precioTotal}`

}




function verCart(){

    const prodSeleccionados = document.getElementById('productosSeleccionadosCombos')

    prodSeleccionados.innerHTML = ' '

    pedido.length ? pedido.map( item => prodSeleccionados.innerHTML += ` <i class="far fa-check-circle mt-3"><span class="subtl-productos mx-2" id="">${item.producto} ${item.presentacion} x ${item.cantidad}u</span></i> <i class="far fa-trash-alt" onclick='eliminarItem(${pedido.indexOf(item)})'></i> <br>`)
    : prodSeleccionados.innerHTML = `No hay productos seleccionados..`

}

verCart()




// ***** LLAMADA AJAX ***** //

document.addEventListener('DOMContentLoaded',getProductos() );

function getProductos(){
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function(){
    
        if(ajaxRequest.readyState == 4){
            
            if(ajaxRequest.status == 200){
                
                productos = JSON.parse(ajaxRequest.responseText)

                const filtroCombo = productos.filter( i => i.Categoría === 'Combo')
                

                cardsCombos(filtroCombo)

            }
            else{
                console.log("Status error: " + ajaxRequest.status);
            }
        }
        else{
            console.log("Ignored readyState: " + ajaxRequest.readyState);
        }
        
    }
    ajaxRequest.open('GET', 'js/productos.json');
    ajaxRequest.send();

}






// ***** CONTADOR ***** //

function suma(){
    count += 1

    counter.innerHTML = count
    calculoTotal(prod)

}

function resta() {
    count -= 1

    if(count <= 0){
        count = 0
    }

    counter.innerHTML = count
    calculoTotal(prod)
}


decremento.addEventListener('click', resta)
incremento.addEventListener('click', suma )
