let productos = []
let productosSeleccionados = []
let count = 0
let count5 = 0
let count10 = 0

let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incrementoPileta')
let decremento = document.getElementById('decrementoPileta')
let counter = document.getElementById('count1Pileta')
let incremento5 = document.getElementById('incremento5Pileta')
let decremento5 = document.getElementById('decremento5Pileta')
let counter5 = document.getElementById('count5Pileta')


let incremento10 = document.getElementById('incremento10Pileta')
let decremento10 = document.getElementById('decremento10Pileta')
let counter10 = document.getElementById('count10Pileta')


let inputGranel = document.getElementById('inputGranelPileta')

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
    
    let nombre =  document.getElementById('title-modalPileta').innerHTML
    let presentacion1 =  document.getElementById('1litroPileta').innerHTML
    let presentacion5 = document.getElementById('5litrosPileta').innerHTML
    let presentacion10 = document.getElementById('10litrosPileta').innerHTML
    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML

    let precio1 = document.getElementById('price1lPileta').value * count
    let precio5 = document.getElementById('price5lPileta').value * count5
    let precio10 = document.getElementById('price1lPileta').value * count10
    let precioG = document.getElementById('priceGranelPileta').value * granel

    
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
    document.getElementById('pedido-pileta').value = pedidoForm

}


// *** FUNCION QUE CREA CARDS *** //

function cardsPileta(filter){
    
    const divPileta = document.getElementById('productosPileta')
    
    filter.forEach(item => {
        divPileta.innerHTML +=  `<div class="card mx-3 my-3 shadow" style="width: 15rem">
                                <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto }" class="card-img-top" alt="${item.DescripcionMat}">
                                <div class="card-body text-center">
                                <p class="card-text mb-4">${item.Subcategoría}</p>
                                <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Producto}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                </div>
                                </div>`
    }
    )
}


let realizarPedido = document.getElementById('btn-pedidoPileta')
realizarPedido.addEventListener('click', tomoInputs ) 




// ***** PRECIOS ***** //

let price1l = document.getElementById('price1lPileta').value
let price5l = document.getElementById('price5lPileta').value
let price10l = document.getElementById('price10lPileta').value
let priceGranel = document.getElementById('priceGranelPileta').value



let precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('totalPileta')
    
    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML

 

    if(prod[0].Producto == 'Cloro para piletas'){

        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('price5lPileta').value = prod[1].Precio

        let price1l = document.getElementById('price1lPileta').value
        let price5l = document.getElementById('price5lPileta').value

        precioTotal = (count * price1l) + (count5 * price5l)
    
    } else if (prod[0].Presentación === '200ml + envase'){
        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('priceGranelPileta').value = prod[1].Precio
       
        let price1l = document.getElementById('price1lPileta').value
        let priceGranel = document.getElementById('priceGranelPileta').value
    
        precioTotal = (count * price1l) + (granel * priceGranel)
    
    } else {

        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('price5lPileta').value = prod[1].Precio
        document.getElementById('price10lPileta').value = prod[2].Precio
        document.getElementById('priceGranelPileta').value = prod[3].Precio

        let price1l = document.getElementById('price1lPileta').value
        let price5l = document.getElementById('price5lPileta').value
        let price10l = document.getElementById('price10lPileta').value
        let priceGranel = document.getElementById('priceGranelPileta').value

        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l) + (granel * priceGranel)

    }

    total.innerHTML = `Total $${precioTotal}`
}



function modalShow(event) {

    restartCount()

    const title = document.getElementById('title-modalPileta')
    const description = document.getElementById('descr-modalPileta')
    const total = document.getElementById('totalPileta')

    const prod = productos.filter( i => i.Producto === event.target.id)
    
    document.getElementById('imagePileta').src = prod[0].Foto
    document.getElementById('1litroPileta').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
    document.getElementById('5litrosPileta').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
    
    if(prod[0].Producto == 'Cloro para piletas'){
       
        document.getElementById('divGranelPileta').setAttribute('style', 'display: none')
        document.getElementById('div10Pileta').setAttribute('style', 'display: none')
        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('price5lPileta').value = prod[1].Precio

    } else if (prod[0].Presentación == '200ml + envase') {
        document.getElementById('div1Pileta').removeAttribute('style', 'display: none')
       
        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('1litroPileta').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
        document.getElementById('text-granelPileta').innerHTML= `Elegí la Cantidad  $${prod[1].Precio} `
        document.getElementById('priceGranelPileta').value = prod[0].Precio

        document.getElementById('div5Pileta').setAttribute('style', 'display: none')
        document.getElementById('div10Pileta').setAttribute('style', 'display: none')
        document.getElementById('divGranelPileta').removeAttribute('style', 'display: none')


     } else {

        document.getElementById('divGranelPileta').removeAttribute('style', 'display: none')
        document.getElementById('div10Pileta').removeAttribute('style', 'display: none')
        document.getElementById('10litrosPileta').innerHTML= `${prod[2].Presentación}  $${prod[2].Precio} `
        document.getElementById('text-granelPileta').innerHTML= `Elegí la Cantidad  $${prod[3].Precio} `

        document.getElementById('price1lPileta').value = prod[0].Precio
        document.getElementById('price5lPileta').value = prod[1].Precio
        document.getElementById('price10lPileta').value = prod[2].Precio
        document.getElementById('priceGranelPileta').value = prod[3].Precio
    }
    

    calculoTotal(prod)
    
    title.innerHTML = prod[0].Producto
    description.innerHTML = prod[0].Descripciones
    total.innerHTML = `Total $${precioTotal}`

}




function verCart(){

    const prodSeleccionados = document.getElementById('productosSeleccionadosPileta')

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

                const filtroPileta = productos.filter( i => i.Categoría === 'Piletas' || i.Categoría2 === 'Piletas' )
                const filtroCategoria = filtroPileta.filter( i => i.Subcategoría)
                cardsPileta(filtroCategoria)
                

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