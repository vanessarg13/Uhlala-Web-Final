let productos = []
let productosSeleccionados = []
let count = 0
let count5 = 0
let count10 = 0

let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incrementoSuperf')
let decremento = document.getElementById('decrementoSuperf')
let counter = document.getElementById('count1Superf')
let incremento5 = document.getElementById('incremento5Superf')
let decremento5 = document.getElementById('decremento5Superf')
let counter5 = document.getElementById('count5Superf')


let incremento10 = document.getElementById('incremento10Superf')
let decremento10 = document.getElementById('decremento10Superf')
let counter10 = document.getElementById('count10Superf')


let inputGranel = document.getElementById('inputGranelSuperf')

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
    
    let nombre =  document.getElementById('title-modalSuperf').innerHTML
    let presentacion1 =  document.getElementById('1litroSuperf').innerHTML
    let presentacion5 = document.getElementById('5litrosSuperf').innerHTML
    let presentacion10 = document.getElementById('10litrosSuperf').innerHTML

    if (presentacion10){
        document.getElementById('10litrosSuperf').innerHTML
    }


    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML

    let precio1 = document.getElementById('price1lSuperf').value * count
    let precio5 = document.getElementById('price5lSuperf').value * count5
    let precio10 = document.getElementById('price1lSuperf').value * count10
    let precioG = document.getElementById('priceGranelSuperf').value * granel

    
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
    document.getElementById('pedido-superf').value = pedidoForm

}


// *** FUNCION QUE CREA CARDS *** //

function cardsSuperficie(filter){
    
    const divSuperficie = document.getElementById('productosSuperficie')
    
    filter.forEach(item => {
        divSuperficie.innerHTML +=  ` <div class="card mx-3 my-3 shadow" style="width: 15rem">
                                <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto }" class="card-img-top" alt="${item.DescripcionMat}">
                                <div class="card-body text-center">
                                <p class="card-text mb-4">${item.Subcategoría}</p>
                                <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Subcategoría}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                </div>
                                </div>`
    }
    )
}



let realizarPedido = document.getElementById('btn-pedidoSuperf')
realizarPedido.addEventListener('click', tomoInputs ) 




// ***** PRECIOS ***** //

let price1l = document.getElementById('price1lSuperf').value
let price5l = document.getElementById('price5lSuperf').value
let price10l = document.getElementById('price10lSuperf').value
let priceGranel = document.getElementById('priceGranelSuperf').value



let precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('totalSuperf')
    
    document.getElementById('price1lSuperf').value = prod[0].Precio
    
    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML


    if (prod[0].Producto === 'Hipoclorito de Sodio 100 g/l'){

        document.getElementById('priceGranelSuperf').value = prod[0].Precio
        let priceGranel = document.getElementById('priceGranelSuperf').value

    } else if(prod[0].Producto === 'Sanitizante Listo'){
       
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio
        let price1l = document.getElementById('price1lSuperf').value
        let price5l = document.getElementById('price5lSuperf').value

        precioTotal = (count * price1l) + (count5 * price5l)

    } else if (prod[0].Presentación == '600 ml'){
        document.getElementById('price1lSuperf').value = prod[0].Precio
        let price1l = document.getElementById('price1lSuperf').value
       
        precioTotal = (count * price1l)

    } else if (prod[3]){
    
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio
        document.getElementById('price5lSuperf').value = prod[2].Precio
        document.getElementById('priceGranelSuperf').value = prod[3].Precio

        let priceGranel = document.getElementById('priceGranelSuperf').value
        let price10l = document.getElementById('price10lSuperf').value
        let price1l = document.getElementById('price1lSuperf').value
        let price5l = document.getElementById('price5lSuperf').value

        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l) + (granel * priceGranel)


    }else if (prod[2].Presentación == 'Granel'){

        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio
        document.getElementById('priceGranelSuperf').value = prod[2].Precio

        let priceGranel = document.getElementById('priceGranelSuperf').value
        let price1l = document.getElementById('price1lSuperf').value
        let price5l = document.getElementById('price5lSuperf').value
        
        precioTotal = (count * price1l) + (count5 * price5l) + (granel * priceGranel)


    }else {
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio
        document.getElementById('price10lSuperf').value = prod[2].Precio

        let price10l = document.getElementById('price10lSuperf').value
        let price1l = document.getElementById('price1lSuperf').value
        let price5l = document.getElementById('price5lSuperf').value
        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l)

    }

    total.innerHTML = `Total $${precioTotal}`
}


function modalShow(event) {

    const title = document.getElementById('title-modalSuperf')
    const description = document.getElementById('descr-modalSuperf')
    const total = document.getElementById('totalSuperf')

    const prod = productos.filter( i => i.Producto === event.target.id)

    console.log(prod)
 
    document.getElementById('1litroSuperf').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
    
    
    if (prod[0].Producto === 'Hipoclorito de Sodio 100 g/l'){

        document.getElementById('inputGranelSuperf').removeAttribute('type', 'hidden')
        document.getElementById('text-granelSuperf').setAttribute('style', 'display: none')
        document.getElementById('div1').setAttribute('style', 'display: none')
        document.getElementById('div10').setAttribute('style', 'display: none')
        document.getElementById('div5').setAttribute('style', 'display: none')
        document.getElementById('text-granelSuperf').innerHTML = `Elegí la Cantidad  $${prod[0].Precio}`
        document.getElementById('priceGranelSuperf').value = prod[0].Precio


    } else if(prod[0].Producto === 'Sanitizante Listo'){
        document.getElementById('div1').removeAttribute('style', 'display: none')
        document.getElementById('inputGranelSuperf').setAttribute('type', 'hidden')
        document.getElementById('text-granelSuperf').setAttribute('style', 'display: none')
        document.getElementById('div10').setAttribute('style', 'display: none')
        document.getElementById('1litroSuperf').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
        document.getElementById('5litrosSuperf').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio

    } else if (prod[0].Presentación == '600 ml'){
        document.getElementById('div1').removeAttribute('style', 'display: none')
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('inputGranelSuperf').setAttribute('type', 'hidden')
        document.getElementById('text-granelSuperf').setAttribute('style', 'display: none')
        document.getElementById('div10').setAttribute('style', 'display: none')
        document.getElementById('div5').setAttribute('style', 'display: none')

    } else if (prod[3]) {
        document.getElementById('div1').removeAttribute('style', 'display: none')
        document.getElementById('div10').removeAttribute('style', 'display: none')
        document.getElementById('div5').removeAttribute('style', 'display: none')
        document.getElementById('inputGranelSuperf').removeAttribute('style', 'display: none')
        document.getElementById('text-granelSuperf').removeAttribute('style', 'display: none')
        document.getElementById('5litrosSuperf').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('10litrosSuperf').innerHTML = `${prod[2].Presentación}  $${prod[2].Precio} `
        document.getElementById('text-granelSuperf').innerHTML = `Elegí la Cantidad  $${prod[3].Precio}`
        document.getElementById('priceGranelSuperf').value = prod[3].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio


    } else if (prod[2].Presentación === 'Granel'){
        document.getElementById('div1').removeAttribute('style', 'display: none')
        document.getElementById('div5').removeAttribute('style', 'display: none')
        document.getElementById('inputGranelSuperf').removeAttribute('style', 'display: none')
        document.getElementById('div10').setAttribute('style', 'display: none')
        document.getElementById('5litrosSuperf').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('text-granelSuperf').innerHTML = `Elegí la Cantidad  $${prod[2].Precio}`
        document.getElementById('priceGranelSuperf').value = prod[2].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio



    }else if ((prod[2].Presentación === '10 L') && (!prod[3])){
        document.getElementById('div5').removeAttribute('style', 'display: none')
        document.getElementById('div10').removeAttribute('style', 'display: none')
        document.getElementById('5litrosSuperf').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('price10lSuperf').value = prod[2].Precio
        document.getElementById('10litrosSuperf').innerHTML = `${prod[2].Presentación}  $${prod[2].Precio} `
        document.getElementById('price5lSuperf').value = prod[1].Precio

        document.getElementById('inputGranelSuperf').setAttribute('style', 'display: none')
        document.getElementById('text-granelSuperf').innerHTML = ''

    }else if(prod[0].Producto === 'Sanitizante Listo'){
        document.getElementById('inputGranelSuperf').setAttribute('type', 'hidden')
        document.getElementById('text-granelSuperf').setAttribute('style', 'display: none')
        document.getElementById('div10').setAttribute('style', 'display: none')
        document.getElementById('1litroSuperf').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
        document.getElementById('5litrosSuperf').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('price1lSuperf').value = prod[0].Precio
        document.getElementById('price5lSuperf').value = prod[1].Precio

    } else { }


    document.getElementById('imageSuperf').src = prod[0].Foto === '' ? 'sinfoto.png' : prod[0].Foto 
    document.getElementById('price1lSuperf').value = prod[0].Precio
    


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

                
                const filtroSuperficie = productos.filter( i => i.Categoría === 'Superficies' || i.Categoría2 === 'Superficies' )
                const filtroCategoria = filtroSuperficie.filter( i => i.Subcategoría)
                
                cardsSuperficie(filtroCategoria)

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


// {
  //   "DescripcionMat": "Cera autobrillo x 2 L",
  //   "codigoMat": "PT008",
  //   "Producto": "Cera autobrillo",
  //   "Presentación": "2 L",
  //   "IdUnidad": "UNI",
  //   "Precio": 200,
  //   "Categoría": "Superficies",
  //   "Categoría2": "",
  //   "Categoría 3": "",
  //   "Subcategoría": "Cera autobrillo",
  //   "Descripciones": "Hace que tus pisos queden brillantes y relucientes. Ideal para zonas altamente transitadas. Para darle un mejor toque se recomienda pasar la enceradora después de utilizar el producto.",
  //   "Foto": "",
  //   "Link": "",
  //   "Link 2": "",
  //   "Link 3": "",
  //   "": "",
  //   "__1": "",
  //   "__2": "",
  //   "__3": "",
  //   "__4": ""
  // },
  // {
  //   "DescripcionMat": "Cera autobrillo x 5 L",
  //   "codigoMat": "PT029",
  //   "Producto": "Cera autobrillo",
  //   "Presentación": "5 L",
  //   "IdUnidad": "UNI",
  //   "Precio": 900,
  //   "Categoría": "Superficies",
  //   "Categoría2": "",
  //   "Categoría 3": "",
  //   "Subcategoría": "",
  //   "Descripciones": "",
  //   "Foto": "",
  //   "Link": "",
  //   "Link 2": "",
  //   "Link 3": "",
  //   "": "",
  //   "__1": "",
  //   "__2": "",
  //   "__3": "",
  //   "__4": ""
  // },
  // {
  //   "DescripcionMat": "Cera autobrillo x 10 L",
  //   "codigoMat": "PT050",
  //   "Producto": "Cera autobrillo",
  //   "Presentación": "10 L",
  //   "IdUnidad": "UNI",
  //   "Precio": 1600,
  //   "Categoría": "Superficies",
  //   "Categoría2": "",
  //   "Categoría 3": "",
  //   "Subcategoría": "",
  //   "Descripciones": "",
  //   "Foto": "",
  //   "Link": "",
  //   "Link 2": "",
  //   "Link 3": "",
  //   "": "",
  //   "__1": "",
  //   "__2": "",
  //   "__3": "",
  //   "__4": ""
  // },