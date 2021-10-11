let productos = []
let productosSeleccionados = []
let count = 0
let count5 = 0
let count10 = 0
let count11 = 0
let count12 = 0


let pedido = sessionStorage.pedidos ? JSON.parse(sessionStorage.pedidos) :  []

let prod = []

let incremento = document.getElementById('incrementoPerfu')
let decremento = document.getElementById('decrementoPerfu')
let counter = document.getElementById('count1Perfu')
let incremento5 = document.getElementById('incremento5Perfu')
let decremento5 = document.getElementById('decremento5Perfu')
let counter5 = document.getElementById('count5Perfu')


let incremento10 = document.getElementById('incremento10Perfu')
let decremento10 = document.getElementById('decremento10Perfu')
let counter10 = document.getElementById('count10Perfu')

let incremento11 = document.getElementById('incremento11Perfu')
let decremento11 = document.getElementById('decremento11Perfu')
let counter11 = document.getElementById('count11Perfu')

let incremento12 = document.getElementById('incremento12Perfu')
let decremento12 = document.getElementById('decremento12Perfu')
let counter12 = document.getElementById('count12Perfu')


let inputGranel = document.getElementById('inputGranelPerfu')

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
    counter11.innerHTML = 0
    counter11.innerHTML = 0


    count = 0
    count5 = 0
    count10 = 0
    count11 = 0
    count12 = 0
}

function findIndex(event){
   prod = productos.filter( i => i.Producto === event.target.id)
    calculoTotal(prod)
}


// *** TOMO DATOS Y CREO PEDIDO *** //

function tomoInputs(){
    
    let nombre =  document.getElementById('title-modalPerfu').innerHTML
    let presentacion1 =  document.getElementById('1litroPerfu').innerHTML
    let presentacion5 = document.getElementById('5litrosPerfu').innerHTML
    let presentacion10 = document.getElementById('10litrosPerfu').innerHTML
    let presentacion11 = document.getElementById('11litrosPerfu').innerHTML
    let presentacion12 = document.getElementById('12litrosPerfu').innerHTML

    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML
    let count11 = counter11.innerHTML
    let count12 = counter12.innerHTML


    let precio1 = document.getElementById('price1lPerfu').value * count
    let precio5 = document.getElementById('price5lPerfu').value * count5
    let precio10 = document.getElementById('price1lPerfu').value * count10
    let precio11 = document.getElementById('price1lPerfu').value * count11
    let precio12 = document.getElementById('price1lPerfu').value * count12
    let precioG = document.getElementById('priceGranelPerfu').value * granel

    
    count > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion1, count, precio1))

    count5 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion5, count5, precio5))
    
    count10 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion10, count10, precio10))
    
    count11 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion11, count11, precio11))

    count12 > 0 && productosSeleccionados.push(new Pedidos(nombre, presentacion12, count12, precio12))

    granel > 0 && productosSeleccionados.push(new Pedidos(nombre, 'granel', granel, precioG))
    
    
    productosSeleccionados.forEach(producto => pedido.push(producto))

    sessionStorage.pedidos = JSON.stringify(pedido)

    restartCount()
    verCart()
    productosSeleccionados = []


    let pedidoForm = pedido.map(item => JSON.stringify(item)).toString()
    document.getElementById('pedido-perfu').value = pedidoForm

}


// *** FUNCION QUE CREA CARDS *** //


function cardsPerfumeria(filter){
    
    const divPerfumeria = document.getElementById('productosPerfumeria')
    
    filter.forEach(item => {
        divPerfumeria.innerHTML +=  ` <div class="card mx-3 my-3 shadow" style="width: 15rem">
                                    <img src="${item.Foto === '' ? 'sinfoto.png' : item.Foto}" class="card-img-top" alt="${item.DescripcionMat}">
                                    <div class="card-body text-center">
                                    <p class="card-text mb-4">${item.Subcategoría}</p>
                                    <button type="button" class="card-link btn-ver" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id='${item.Producto}' onclick='modalShow(event),findIndex(event)'>Ver</button>
                                    </div>
                                    </div>`
    }
    )
}



let realizarPedido = document.getElementById('btn-pedidoPerfu')
realizarPedido.addEventListener('click', tomoInputs ) 




// ***** PRECIOS ***** //

let price1l = document.getElementById('price1lPerfu').value
let price5l = document.getElementById('price5lPerfu').value
let price10l = document.getElementById('price10lPerfu').value
let price11l = document.getElementById('price10lPerfu').value
let price12l = document.getElementById('price10lPerfu').value
let priceGranel = document.getElementById('priceGranelPerfu').value


let precioTotal = 0

function calculoTotal(prod){

    const total = document.getElementById('totalPerfu')

    let granel = inputGranel.value === '' ? 0 : inputGranel.value
    let count = counter.innerHTML
    let count5 = counter5.innerHTML
    let count10 = counter10.innerHTML
    let count11 = counter11.innerHTML
    let count12 = counter12.innerHTML


    if (prod[0].Producto === 'Perfumina La vida es bella') {
        
        document.getElementById('price1lPerfu').value = prod[0].Precio
        let price1l = document.getElementById('price1lPerfu').value

        precioTotal = (count * price1l)

    } else if (prod[0].Producto === 'Perfumina Valery'){
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('priceGranelPerfu').value = prod[2].Precio
        console.log(document.getElementById('price1lPerfu').value = prod[0].Precio)
        console.log(document.getElementById('price5lPerfu').value = prod[1].Precio)
        console.log(document.getElementById('price10lPerfu').value = prod[2].Precio)

        let price1l = document.getElementById('price1lPerfu').value
        let price5l = document.getElementById('price5lPerfu').value
        let priceGranel = document.getElementById('priceGranelPerfu').value

        console.log((count * price1l) + (count5 * price5l) + (granel * priceGranel)) 
        precioTotal = (count * price1l) + (count5 * price5l) + (granel * priceGranel)

    } else if ((prod[0].Presentación == '60ml') && (prod[1].Presentación == '500ml')){
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio

        let price1l = document.getElementById('price1lPerfu').value
        let price5l = document.getElementById('price5lPerfu').value

        precioTotal = (count * price1l) + (count5 * price5l)

    }else if (prod[0].Presentación === '200ml + envase'){
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('priceGranelPerfu').value = prod[1].Precio
       
        let price1l = document.getElementById('price1lPerfu').value
        let priceGranel = document.getElementById('priceGranelPerfu').value
    
        precioTotal = (count * price1l) + (granel * priceGranel)

    }else if (prod[0].Presentación == 'Granel') {

        document.getElementById('priceGranelPerfu').value = prod[0].Precio
        
        let priceGranel = document.getElementById('priceGranelPerfu').value

        precioTotal = (granel * priceGranel)

    
    } else if (prod[0].Presentación == '1 L') {

        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('price10lPerfu').value = prod[2].Precio
    
        let price10l = document.getElementById('price10lPerfu').value
        let price1l = document.getElementById('price1lPerfu').value
        let price5l = document.getElementById('price5lPerfu').value

        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l)

    } else if ((prod[0].Presentación === '60ml + envase') && (prod[1].Presentación === '500ml + envase')){
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('price10lPerfu').value = prod[2].Precio
        document.getElementById('price11lPerfu').value = prod[3].Precio
        document.getElementById('price12lPerfu').value = prod[4].Precio
        document.getElementById('priceGranelPerfu').value = prod[5].Precio

        let price1l = document.getElementById('price1lPerfu').value
        let price5l = document.getElementById('price5lPerfu').value
        let price10l = document.getElementById('price10lPerfu').value
        let price11l = document.getElementById('price11lPerfu').value
        let price12l = document.getElementById('price12lPerfu').value
        let priceGranel = document.getElementById('priceGranelPerfu').value

        precioTotal = (count * price1l) + (count5 * price5l) + (count10 * price10l) + (count11 * price11l) + (count12 * price12l) + (granel * priceGranel) 

    } else{ }
    
    total.innerHTML = `Total $${precioTotal}`
}



function modalShow(event) {

    const title = document.getElementById('title-modalPerfu')
    const description = document.getElementById('descr-modalPerfu')
    const total = document.getElementById('totalPerfu')

    const prod = productos.filter( i => i.Producto === event.target.id)

    document.getElementById('1litroPerfu').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
    document.getElementById('imagePerfu').src = prod[0].Foto === '' ? 'sinfoto.png' : prod[0].Foto

    if (prod[0].Producto === 'Perfumina La vida es bella') {

        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('divGranelPerfu').setAttribute('style', 'display: none')
        document.getElementById('div10Perfu').setAttribute('style', 'display: none')
        document.getElementById('div5Perfu').setAttribute('style', 'display: none')
        document.getElementById('price1lPerfu').value = prod[0].Precio

    } else if (prod[0].Producto === 'Perfumina Valery') {
        document.getElementById('divGranelPerfu').removeAttribute('style', 'display: none')
        document.getElementById('div10Perfu').setAttribute('style', 'display: none')
        document.getElementById('div5Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div11Perfu').setAttribute('style', 'display: none')
        document.getElementById('div12Perfu').setAttribute('style', 'display: none')

        document.getElementById('5litrosPerfu').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
        document.getElementById('text-granelPerfu').innerHTML= `Elegí la Cantidad  $${prod[2].Precio} `
        
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('priceGranelPerfu').value = prod[2].Precio
        
    } else if ((prod[0].Presentación === '60ml') && (prod[1].Presentación === '500ml')){
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('5litrosPerfu').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
    
        document.getElementById('divGranelPerfu').setAttribute('style', 'display: none')
        document.getElementById('div10Perfu').setAttribute('style', 'display: none')
        document.getElementById('div11Perfu').setAttribute('style', 'display: none')
        document.getElementById('div12Perfu').setAttribute('style', 'display: none')

    } else if (prod[0].Presentación == '200ml + envase') {
        document.getElementById('div1Perfu').removeAttribute('style', 'display: none')
       
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('1litroPerfu').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
        document.getElementById('text-granelPerfu').innerHTML= `Elegí la Cantidad  $${prod[1].Precio} `
        document.getElementById('priceGranelPerfu').value = prod[0].Precio

        document.getElementById('div5Perfu').setAttribute('style', 'display: none')
        document.getElementById('div10Perfu').setAttribute('style', 'display: none')
        document.getElementById('div11Perfu').setAttribute('style', 'display: none')
        document.getElementById('div12Perfu').setAttribute('style', 'display: none')
        document.getElementById('divGranelPerfu').removeAttribute('style', 'display: none')


     }else if ((prod[0].Presentación === '60ml + envase') && (prod[1].Presentación === '500ml + envase')) {
    
        document.getElementById('div1Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div5Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div10Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div11Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div12Perfu').removeAttribute('style', 'display: none')
        document.getElementById('divGranelPerfu').removeAttribute('style', 'display: none')
        document.getElementById('inputGranelPerfu').removeAttribute('type', 'hidden')
        document.getElementById('text-granelPerfu').removeAttribute('style', 'display: none')
    
         document.getElementById('price1lPerfu').value = prod[0].Precio
         document.getElementById('price5lPerfu').value = prod[1].Precio
         document.getElementById('price10lPerfu').value = prod[2].Precio
         document.getElementById('price11lPerfu').value = prod[3].Precio
         document.getElementById('price12lPerfu').value = prod[4].Precio


         document.getElementById('1litroPerfu').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `
         document.getElementById('5litrosPerfu').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `
         document.getElementById('10litrosPerfu').innerHTML = `${prod[2].Presentación}  $${prod[2].Precio} `
         document.getElementById('11litrosPerfu').innerHTML = `${prod[3].Presentación}  $${prod[3].Precio} `
         document.getElementById('12litrosPerfu').innerHTML = `${prod[4].Presentación}  $${prod[4].Precio} `
         
        document.getElementById('text-granelPerfu').innerHTML= `Elegí la Cantidad  $${prod[5].Precio} `
        


    } else if (prod[0].Presentación == '1 L'){
        
        document.getElementById('div1Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div5Perfu').removeAttribute('style', 'display: none')
        document.getElementById('div10Perfu').removeAttribute('style', 'display: none')
       
        document.getElementById('price1lPerfu').value = prod[0].Precio
        document.getElementById('1litroPerfu').innerHTML = `${prod[0].Presentación}  $${prod[0].Precio} `

        document.getElementById('price5lPerfu').value = prod[1].Precio
        document.getElementById('5litrosPerfu').innerHTML = `${prod[1].Presentación}  $${prod[1].Precio} `

        document.getElementById('price10lPerfu').value = prod[2].Precio
        document.getElementById('10litrosPerfu').innerHTML = `${prod[2].Presentación}  $${prod[2].Precio} `

        document.getElementById('divGranelPerfu').setAttribute('style', 'display: none')
        document.getElementById('div11Perfu').setAttribute('style', 'display: none')
        document.getElementById('div12Perfu').setAttribute('style', 'display: none')
    

     }else if (prod[0].Presentación === 'Granel'){
        document.getElementById('inputGranelPerfu').removeAttribute('type', 'hidden')
        document.getElementById('text-granelPerfu').removeAttribute('style', 'display: none')
        document.getElementById('divGranelPerfu').removeAttribute('style', 'display: none')
        

        document.getElementById('text-granelPerfu').innerHTML = `Elegí la Cantidad  $${prod[0].Precio}`
        document.getElementById('priceGranelPerfu').value = prod[0].Precio
        
        document.getElementById('div1Perfu').setAttribute('style', 'display: none')
        document.getElementById('div5Perfu').setAttribute('style', 'display: none')
        document.getElementById('div10Perfu').setAttribute('style', 'display: none')
        document.getElementById('div11Perfu').setAttribute('style', 'display: none')
        document.getElementById('div12Perfu').setAttribute('style', 'display: none')

    } else {}

    calculoTotal(prod)
    
    title.innerHTML = prod[0].Producto
    description.innerHTML = prod[0].Descripciones
    total.innerHTML = `Total $${precioTotal}`

}




function verCart(){

    const prodSeleccionados = document.getElementById('productosSeleccionadosPerfu')

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

                const filtroPerfumeria = productos.filter( i => i.Categoría === 'Perfumería' || i.Categoría2 === 'Perfumería' )
                const filtroCategoria = filtroPerfumeria.filter( i => i.Subcategoría)
                console.log(filtroCategoria)
                cardsPerfumeria(filtroCategoria)

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

const suma11 = () => {
    count11 += 1

    counter11.innerHTML = count11
    calculoTotal(prod)
}


const resta11 = () => {
    count11 -= 1

    if(count11 <= 0){
        count11 = 0
    }

counter11.innerHTML = count11
calculoTotal(prod)
}


decremento11.addEventListener('click', resta11 )
incremento11.addEventListener('click', suma11 )

const suma12 = () => {
    count12 += 1

    counter12.innerHTML = count12
    calculoTotal(prod)
}


const resta12 = () => {
    count12 -= 1

    if(count12 <= 0){
        count12 = 0
    }

counter12.innerHTML = count12
calculoTotal(prod)
}


decremento12.addEventListener('click', resta12 )
incremento12.addEventListener('click', suma12 )