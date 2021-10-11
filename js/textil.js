let productos = []
let productosSeleccionados = []
let count = 0
let count5 = 0
let count10 = 0

let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incrementoTextil')
let decremento = document.getElementById('decrementoTextil')
let counter = document.getElementById('count1Textil')
let incremento5 = document.getElementById('incremento5Textil')
let decremento5 = document.getElementById('decremento5Textil')
let counter5 = document.getElementById('count5Textil')

let incremento10 = document.getElementById('incremento10Textil')
let decremento10 = document.getElementById('decremento10Textil')
let counter10 = document.getElementById('count10Textil')


let inputGranel = document.getElementById('inputGranelTextil')

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
    
    let nombre =  document.getElementById('title-modalTextil').innerHTML
    let presentacion1 =  document.getElementById('1litroTextil').innerHTML
    let presentacion5 = document.getElementById('5litrosTextil').innerHTML
    let presentacion10 = document.getElementById('10litrosTextil').innerHTML
    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML

    let precio1 = document.getElementById('price1lTextil').value * count
    let precio5 = document.getElementById('price5lTextil').value * count5
    let precio10 = document.getElementById('price1lTextil').value * count10
    let precioG = document.getElementById('priceGranelTextil').value * granel

    
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
    document.getElementById('pedido-textil').value = pedidoForm


}


// *** FUNCION QUE CREA CARDS *** //
function cardsTextil(filter){
    
    const divTextil = document.getElementById('productosTextil')

    
    filter.forEach(item => {
        divTextil.innerHTML +=  ` <div class="card mx-3 my-3 shadow" style="width: 15rem">
                                <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto }" class="card-img-top" alt="${item.DescripcionMat}">
                                <div class="card-body text-center">
                                <p class="card-text mb-4">${item.Subcategoría}</p>
                                <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Producto}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                </div>
                                </div>`
    }
    )
}

let realizarPedido = document.getElementById('btn-pedidoTextil')
realizarPedido.addEventListener('click', tomoInputs ) 




// ***** PRECIOS ***** //

let price1l = document.getElementById('price1lTextil').value
let price5l = document.getElementById('price5lTextil').value
let price10l = document.getElementById('price10lTextil').value
let priceGranel = document.getElementById('priceGranelTextil').value



let precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('totalTextil')

    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML
    

    if (prod[0].Producto === 'Perfumina La vida es bella') {
        
        document.getElementById('price1lTextil').value = prod[0].Precio
        let price1l = document.getElementById('price1lTextil').value

        precioTotal = (count * price1l)


    } else if (prod[2].Producto === 'Perfumina Valery'){
        document.getElementById('price1lTextil').value = prod[0].Precio
        document.getElementById('price5lTextil').value = prod[1].Precio
        document.getElementById('priceGranelTextil').value = prod[2].Precio

        let price1l = document.getElementById('price1lTextil').value
        let price5l = document.getElementById('price5lTextil').value
        let priceGranel = document.getElementById('priceGranelTextil').value

        precioTotal = (count * price1l) + (count5 * price5l) + (granel * priceGranel)

    } else {
        document.getElementById('price1lTextil').value = prod[0].Precio
        document.getElementById('price5lTextil').value = prod[1].Precio
        document.getElementById('price10lTextil').value = prod[2].Precio
        document.getElementById('priceGranelTextil').value = prod[3].Precio

        let price1l = document.getElementById('price1lTextil').value
        let price5l = document.getElementById('price5lTextil').value
        let price10l = document.getElementById('price10lTextil').value
        let priceGranel = document.getElementById('priceGranelTextil').value
    
        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l) + (granel * priceGranel)

    }


    total.innerHTML = `Total $${precioTotal}`
}



function modalShow(event) {

    const title = document.getElementById('title-modalTextil')
    const description = document.getElementById('descr-modalTextil')
    const total = document.getElementById('totalTextil')

    const prod = productos.filter( i => i.Producto == event.target.id)

    document.getElementById('1litroTextil').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
   
    if (prod[0].Producto === 'Perfumina La vida es bella') {
        document.getElementById('price1lTextil').value = prod[0].Precio
        
        document.getElementById('divGranelTextil').setAttribute('style', 'display: none')
        document.getElementById('div10Textil').setAttribute('style', 'display: none')
        document.getElementById('div5Textil').setAttribute('style', 'display: none')
        document.getElementById('price1lTextil').value = prod[0].Precio

    } else if (prod[2].Producto === 'Perfumina Valery') {
        document.getElementById('divGranelTextil').removeAttribute('style', 'display: none')
        document.getElementById('div10Textil').setAttribute('style', 'display: none')

        document.getElementById('5litrosTextil').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('text-granelTextil').innerHTML= `Elegí la Cantidad  $${prod[2].Precio} `
        
        document.getElementById('price1lTextil').value = prod[0].Precio
        document.getElementById('price5lTextil').value = prod[1].Precio
        document.getElementById('priceGranelTextil').value = prod[2].Precio
        
    }else {
        document.getElementById('divGranelTextil').removeAttribute('style', 'display: none')
        document.getElementById('div10Textil').removeAttribute('style', 'display: none')
        document.getElementById('div5Textil').removeAttribute('style', 'display: none')

        document.getElementById('5litrosTextil').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('10litrosTextil').innerHTML= `${prod[2].Presentación}  $${prod[2].Precio} `
        document.getElementById('text-granelTextil').innerHTML= `Elegí la Cantidad  $${prod[3].Precio} `
        
        document.getElementById('price1lTextil').value = prod[0].Precio
        document.getElementById('price5lTextil').value = prod[1].Precio
        document.getElementById('price10lTextil').value = prod[2].Precio
        document.getElementById('priceGranelTextil').value = prod[3].Precio
        
    }
    
    
    document.getElementById('imageTextil').src = prod[0].Foto === '' ? 'sinfoto.png' : prod[0].Foto 

    calculoTotal(prod)
    
    title.innerHTML = prod[0].Producto
    description.innerHTML = prod[0].Descripciones
    total.innerHTML = `Total $${precioTotal}`

}




function verCart(){

    const prodSeleccionados = document.getElementById('productosSeleccionados')

    prodSeleccionados.innerHTML = ''

    pedido.length ? pedido.map( item => prodSeleccionados.innerHTML += ` <i class="far fa-check-circle mt-3"><span class="subtl-productos mx-2" id="">${item.producto} ${item.presentacion} x ${item.cantidad}u</span></i> <i class="far fa-trash-alt" onclick='eliminarItem(${pedido.indexOf(item)})'></i>  <br>`)
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
                
                const filtroTextil = productos.filter( i => i.Categoría === 'Textil' || i.Categoría2 === 'Textil' )

                const filtroCategoria = filtroTextil.filter( i => i.Subcategoría)

                cardsTextil(filtroCategoria)

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
