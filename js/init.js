const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Barra navegadora

const profile =` 
<nav class=" navbar navbar-expand-lg navbar-dark bg-dark site-header py-1 ">
        
    <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto container d-flex flex-column flex-md-row justify-content-between">
            <li class="nav-item">
              <a class="nav-link" href="home.html">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="categories.html">Categorías</a>
            </li>

             <li class="nav-item">
              <a class="nav-link" href="products.html">Productos</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="sell.html">Vender</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="userNav" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu bg-dark">
                <a class="nav-link" href="cart.html">Ver mi carrito</a>
                <a class="nav-link" href="my-profile.html">Mi perfil</a>
                <a class="nav-link" id="close" href="#" onclick="logout()">Cerrar sesión</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>` 

document.getElementById('nav').innerHTML = profile     

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  const nombre = sessionStorage.getItem('user');
  let inicio = window.location.pathname;
  

  if (nombre === null && inicio !== "/index.html" ){
    window.location.replace("index.html");

  } 
  else{
    const userNav= document.getElementById('userNav');
    userNav.innerHTML = nombre;
  }
});
