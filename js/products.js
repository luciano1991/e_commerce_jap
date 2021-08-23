
const ORDER_ASC_BY_COST = "High";
const ORDER_DESC_BY_COST = "Low";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost> b.cost){ return -1; }
            if ( a.cost< b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.soldCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                        <p class="text-muted">` + "Precio: " + category.cost +" " + category.currency + `</p>
                        <small class="text-muted">` + "Unidades vendidas: " + category.soldCount + `</small>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});









//Función prevía utilizada par obtener la lista de productos

//1. Obtener la información. Para eso usamos la función FETCH o la función GETJSONDATA definida en init.js. 
//2. Hacer procedimiento para insertar en HTML el primer producto. 
//3. Hacer prodecimiento para insertar todos los productos en el HTML.

/*fetch(PRODUCTS_URL)
.then(Response => Response.json() )
.then(data => {
let contenedor=document.getElementById('contenedor')
let contenido="";
for (let p = 0; p < data.length; p++) {
    contenido+=
    `
        <h1  class="d-flex w-100 justify-content-between">${data[p].name}</h1>
        <p><img src=${data[p].imgSrc} +  alt="" + " class="img-thumbnail"></p>
        <h4 class="description">${data[p].description}</h4>
        <br>
        <h5 class="mb-1 text-muted ">${'Valor: ' + " " + data[p].cost} ${data[p].currency} </h5>
        
        <h5 class="mb-1 text-muted ">${'Unidades vendidas: ' + data[p].soldCount}</h5>
        <br><br>


    `
}    
contenedor.innerHTML= contenido;
     

})
.catch(err=>console.log(err));







document.addEventListener("DOMContentLoaded", function (e){
   
});*/



