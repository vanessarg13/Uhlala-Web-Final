let productos = []
let productosSeleccionados = []
let count = 0
let count5 = 0
let count10 = 0

let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incremento')
let decremento = document.getElementById('decremento')
let counter = document.getElementById('count1')
let incremento5 = document.getElementById('incremento5')
let decremento5 = document.getElementById('decremento5')
let counter5 = document.getElementById('count5')


let incremento10 = document.getElementById('incremento10')
let decremento10 = document.getElementById('decremento10')
let counter10 = document.getElementById('count10')

let pedidoForm = pedido.map(item => JSON.stringify(item)).toString()
document.getElementById('pedido-cocina').value = pedidoForm


let inputGranel = document.getElementById('inputGranel')

let totalPedidos = 0
let valueGranel = 0

inputGranel.addEventListener('change', () => {
    valueGranel = inputGranel.value
    calculoTotal(prod)
} )


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
    inputGranel.value = ''
    counter.innerHTML = 0
    counter5.innerHTML = 0
    counter10.innerHTML = 0

    count = 0
    count5 = 0
    count10 = 0
}

function findIndex(event){
   prod = productos.filter( i => i.Producto === event.target.id)
    calculoTotal(prod)
}


// *** TOMO DATOS Y CREO PEDIDO *** //

function tomoInputs(){
    
    let nombre =  document.getElementById('title-modal').innerHTML
    let presentacion1 =  document.getElementById('1litro').innerHTML
    let presentacion5 = document.getElementById('5litros').innerHTML
    let presentacion10 = document.getElementById('10litros').innerHTML
    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML

    let precio1 = document.getElementById('price1l').value * count
    let precio5 = document.getElementById('price5l').value * count5
    let precio10 = document.getElementById('price1l').value * count10
    let precioG = document.getElementById('priceGranel').value * granel

    
    count > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion1, count, precio1))

    count5 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion5, count5, precio5))
    
    count10 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion10, count10, precio10))

    granel > 0 && productosSeleccionados.push(new Pedidos(nombre, 'granel', granel, precioG))
    
    
    productosSeleccionados.forEach(producto => pedido.push(producto))

    sessionStorage.pedidos = JSON.stringify(pedido)

    restartCount()
    verCart()
    productosSeleccionados = []
   
    let pedidoForm = pedido.map(item => JSON.stringify(item)).toString()
    document.getElementById('pedido-cocina').value = pedidoForm

}


// *** FUNCION QUE CREA CARDS *** //

function cardsCocina(filter){
    
    const divCocina = document.getElementById('productosCocina')
    
    
    filter.forEach(item => {
        divCocina.innerHTML +=  ` <div class="card mx-3 my-3 shadow" style="width: 15rem">
                                <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto }" class="card-img-top" alt="${item.DescripcionMat}">
                                <div class="card-body text-center">
                                <p class="card-text mb-4">${item.Subcategor??a}</p>
                                <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Subcategor??a}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                </div>
                                </div>
    `
    }
    )
}


let realizarPedido = document.getElementById('btn-pedido')
realizarPedido.addEventListener('click', tomoInputs ) 




// ***** PRECIOS ***** //

let price1l = document.getElementById('price1l').value
let price5l = document.getElementById('price5l').value
let price10l = document.getElementById('price10l').value
let priceGranel = document.getElementById('priceGranel').value



let precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('total')
    
    document.getElementById('price1l').value = prod[0].Precio
    document.getElementById('price5l').value = prod[1].Precio
    document.getElementById('price10l').value = prod[2].Precio
    document.getElementById('priceGranel').value = prod[3].Precio
    
    let price1l = document.getElementById('price1l').value
    let price5l = document.getElementById('price5l').value
    let price10l = document.getElementById('price10l').value
    let priceGranel = document.getElementById('priceGranel').value

    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML


    precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l) + (granel * priceGranel)
    total.innerHTML = `Total $${precioTotal}`
}



function modalShow(event) {

    const title = document.getElementById('title-modal')
    const description = document.getElementById('descr-modal')
    const total = document.getElementById('total')

    const prod = productos.filter( i => i.Producto === event.target.id)

    document.getElementById('1litro').innerHTML = `${prod[0].Presentaci??n}  $${prod[0].Precio} `
    document.getElementById('5litros').innerHTML = `${prod[1].Presentaci??n}  $${prod[1].Precio} `
    document.getElementById('10litros').innerHTML= `${prod[2].Presentaci??n}  $${prod[2].Precio} `
    document.getElementById('text-granel').innerHTML= `Eleg?? la Cantidad  $${prod[3].Precio} `
    document.getElementById('image').src = prod[0].Foto === '' ? 'sinfoto.png' : prod[0].Foto 
    
    document.getElementById('price1l').value = prod[0].Precio
    document.getElementById('price5l').value = prod[1].Precio
    document.getElementById('price10l').value = prod[2].Precio
    document.getElementById('priceGranel').value = prod[3].Precio


    calculoTotal(prod)
    
    title.innerHTML = prod[0].Producto
    description.innerHTML = prod[0].Descripciones
    total.innerHTML = `Total $${precioTotal}`

}




function verCart(){

    const prodSeleccionados = document.getElementById('productosSeleccionados')

    prodSeleccionados.innerHTML = ''

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

                
                const filtroCocina = productos.filter( i => i.Categor??a === 'Cocina y Ba??o' || i.Categor??a2 === 'Cocina y Ba??o' )
                const filtroCategoria = filtroCocina.filter( i => i.Subcategor??a)
                
                cardsCocina(filtroCategoria)

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

const suma = () => {
    count += 1

    counter.innerHTML = count
    calculoTotal(prod)

}

const resta = () => {
    count -= 1

    if(count <= 0){
        count = 0
    }

    counter.innerHTML = count
    calculoTotal(prod)
}


decremento.addEventListener('click', resta)
incremento.addEventListener('click', suma )





const suma5 = () => {
    count5 += 1

    counter5.innerHTML = count5
    calculoTotal(prod)

}

const resta5 = () => {
    count5 -= 1

    if(count5 <= 0){
        count5 = 0
    }

    counter5.innerHTML = count5
    calculoTotal(prod)
}

decremento5.addEventListener('click', resta5 )
incremento5.addEventListener('click', suma5 )




const suma10 = () => {
    count10 += 1

    counter10.innerHTML = count10
    calculoTotal(prod)
}


const resta10 = () => {
    count10 -= 1

    if(count10 <= 0){
        count10 = 0
    }

counter10.innerHTML = count10
calculoTotal(prod)
}


decremento10.addEventListener('click', resta10 )
incremento10.addEventListener('click', suma10 )


