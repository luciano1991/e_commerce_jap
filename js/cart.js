const CART_INFO_URL_2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json" ;


function costoDeEnvio(id){
    let subTotal = document.getElementById('subTotal').dataset.valor;
    let porcentaje = document.getElementById(id).dataset.valor;

    let costo = subTotal * (porcentaje * 0.01);
    document.getElementById('costoDeEnvio').innerHTML = "UYU " + Math.round(costo) ;
    
    //Calcular total
    let total = parseFloat(subTotal)+parseFloat(porcentaje);
    document.getElementById('total').innerHTML= "UYU " + total ;
}


function convertirMoneda(cartProducts){
    for (let article of cartProducts){
        if(article.currency == "USD"){
            article.currency = "UYU";
            article.unitCost = article.unitCost * 40;
        }   
    }
}


function updateTotal(){
    let totales = document.getElementsByClassName("total");
    let suma = 0;
    for (let i = 0; i < totales.length; i++) {
        suma +=  parseFloat(totales[i].dataset.total);
    };
    document.getElementById('subTotal').innerHTML= "UYU " + suma ;
    document.getElementById('subTotal').dataset.valor= suma ;
}

function desableEnvio(){
      //Disable método de envío
      var envioPremium = document.getElementById('goldradio');
      var envioExpress = document.getElementById('expressRadio');
      var envioEstandar = document.getElementById('standardradio');
      var porcentaje = document.getElementById('costoDeEnvio');
      var total = document.getElementById('total');

    if(envioPremium.checked){
        envioPremium.checked= false;
        porcentaje.innerHTML="";
        total.innerHTML="";
    }

    if(envioExpress.checked){
        envioExpress.checked= false;
        porcentaje.innerHTML="";
        total.innerHTML="";
    }
    
    if(envioEstandar.checked){
        envioEstandar.checked= false;
        porcentaje.innerHTML="";
        total.innerHTML="";
    }
}

function updateProductoSubtotal(cantidad,unitCost,id,currency){
  
    
    desableEnvio();
    
    let subtotalProd= cantidad*unitCost;
    document.getElementById("subTotal"+id).dataset.total = subtotalProd;
    document.getElementById("subTotal"+id).innerHTML = currency + " " +subtotalProd;

    updateTotal();
    
}

function showCarrito(cartProducts){
let htmlToAppend = "";
let i = 0;

    for ( let article of cartProducts){
    

        htmlToAppend +=  
        `
        <table name="product" id="product${i}" class="list-group-item list-group-item-action flex-column product"> 

            <td class="w-50 " >  <input name="input" id="input${i}" type="checkbox" for="product${i}"> <img style="height:50px;" src='${article.src}'></img> ${article.name}</td>
            <td class="w-25" > <span class="moneda">${article.currency}</span> ${article.unitCost} </td>
            <td class ="w-25 "  >
            <input class="w-25"  type="number"  onchange = "updateProductoSubtotal(this.value,${article.unitCost}, ${i}, '${article.currency}')" id="${i}" name="newSocre" min="0"  step="0" value="${article.count}"/>
            </td>
            <td id="subTotal${i}" class="w-25 total" style="text-align: right;" data-total=" ${ article.count * article.unitCost}"> ${article.currency} ${ article.count * article.unitCost} </td>
                    
        </table>    
        `
        i++;

    }
    document.getElementById('showPurchase').innerHTML = htmlToAppend;
    updateTotal();
}

//Funcionalidad de los metodos de pago  

var cuenta = document.getElementById('bankAccount');
var tarjeta = document.getElementById('creditCard');
var cardNumber = document.getElementById('cardNumber');
var securityCode = document.getElementById('securityCode');
var expiration = document.getElementById('expiration');
var accountNumber = document.getElementById('accountNumber');
var metodo = document.getElementById('select');


function updateCard() {
  if (tarjeta.checked) {
    cardNumber.disabled =false;
    securityCode.disabled =false;
    expiration.disabled =false;
    //Disable cuenta bancaria
    accountNumber.disabled = true;
    //Remplazo selección de método
    metodo.innerHTML = 'Tarjeta de crédito' ;

  } else {
    cardNumber.disabled = true;
    securityCode.disabled =true;
    expiration.disabled =true;
  }
  
}

function updateAccount() {
    if (cuenta.checked) {
        accountNumber.disabled =false;
        //Disable tarjeta de crédito
        cardNumber.disabled = true;
        securityCode.disabled =true;
        expiration.disabled =true;
        //Remplazo selección de método
        metodo.innerHTML = 'Cuenta bancaria';
      
    } else {
        accountNumber.disabled = true ;
   
    };
  }
;
tarjeta.addEventListener('change', updateCard);
cuenta.addEventListener('change', updateAccount);



//Función para validar campos completos
function validar(){

    // Validación de los campos personales
    if ($('#calle').val().length == 0) {
        document.getElementById('alertaCalle').removeAttribute('hidden');
    }   else{
        document.getElementById('alertaCalle').setAttribute('hidden', true);
    }

    if ($('#numero').val().length == 0) {
        document.getElementById('alertaNumero').removeAttribute('hidden');
    }   else{
        document.getElementById('alertaNumero').setAttribute('hidden', true);
    }

    if ($('#esquina').val().length == 0) {
        document.getElementById('alertaEsquina').removeAttribute('hidden');
    }else{
        document.getElementById('alertaEsquina').setAttribute('hidden', true);
    }

    //Validación de tarjeta de crédito como método de pago
    if( cuenta.checked !==true && tarjeta.checked !== true){
        document.getElementById('alertaSelect').removeAttribute('hidden');
    }else{
        document.getElementById('alertaSelect').setAttribute('hidden', true);
    }
    if (tarjeta.checked == true){
        if ($('#cardNumber').val().length == 0 ) {
            document.getElementById('alertaNumberCard').removeAttribute('hidden');
            document.getElementById('alertaSelect').removeAttribute('hidden');
        }else{
            document.getElementById('alertaNumberCard').setAttribute('hidden', true);
            document.getElementById('alertaSelect').setAttribute('hidden', true);
        };

        if ($('#securityCode').val().length == 0) {
            document.getElementById('alertaSecurity').removeAttribute('hidden');
            document.getElementById('alertaSelect').removeAttribute('hidden');
        }else{
            document.getElementById('alertaSecurity').setAttribute('hidden', true);
            document.getElementById('alertaSelect').setAttribute('hidden', true);
        };
            
        if ($('#expiration').val().length == 0) {
            document.getElementById('alertaExpiration').removeAttribute('hidden');
            document.getElementById('alertaSelect').removeAttribute('hidden')
        }else{
            document.getElementById('alertaExpiration').setAttribute('hidden', true);
            document.getElementById('alertaSelect').setAttribute('hidden', true);
        };
        if ($('#cardNumber').val().length == 0 ||$('#securityCode').val().length == 0 || $('#expiration').val().length == 0 ){
            document.getElementById('alertaSelect').removeAttribute('hidden');
        };
    }
    //Validación de cuenta bancaria como método de pago
    if (cuenta.checked == true){
        if ($('#accountNumber').val().length == 0 ) {
            document.getElementById('alertaAccount').removeAttribute('hidden');
            document.getElementById('alertaSelect').removeAttribute('hidden')
        }else{
            document.getElementById('alertaAccount').setAttribute('hidden', true)
            document.getElementById('alertaSelect').setAttribute('hidden', true)
        };
    };

    //Validación tipo de envío
    if (document.getElementById('goldradio').checked == false && document.getElementById('expressRadio').checked == false && document.getElementById('standardradio').checked == false ){

        document.getElementById('alertaMetodo').removeAttribute('hidden');
    }else{
        document.getElementById('alertaMetodo').setAttribute('hidden', true)
    };
    if( $('#calle').val().length !== 0 && $('#numero').val().length !== 0 && $('#esquina').val().length !== 0 && document.getElementById('alertaSelect').hasAttribute('hidden') == true &&  document.getElementById('alertaMetodo').hasAttribute('hidden')){
        document.getElementById('alert').innerHTML=
        `
        <div  style="position: fixed; z-index: 1" class="alert alert-success" role="alert">
            La compra se ha realizado con éxito <button class="close" data-dismiss="alert"> <span>&times;</span></button>
        </div>`
    };
};

//Función para eliminar productos del carrito

function removeProduct(){
    let lista = document.getElementsByName('product');
    let inputs = document.getElementsByName('input');
    i = 0;
    for (let producto of lista){
        if(inputs[i].checked == true){
            producto.remove();
        }
        i++
        desableEnvio();
        updateTotal();
    }
    if( document.getElementById('subTotal').innerHTML == 'UYU 0'){
        document.body.innerHTML = `
        <div class="container mt-5">
            <div class="text-center p-4">
                <h1>Carrito vacío. Recarga la página</h1>  
            </div>
        </div>`;
                

    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if(resultObj.status === "ok"){
            let cartProducts = resultObj.data.articles;
            convertirMoneda(cartProducts);
            showCarrito(cartProducts);
        }
    })
});

