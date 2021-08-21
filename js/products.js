//1. Obtener la información. Para eso usamos la función FETCH o la función GETJSONDATA definida en init.js. 
//2. Hacer procedimiento para insertar en HTML el primer producto. 
//3. Hacer prodecimiento para insertar todos los productos en el HTML.


fetch(PRODUCTS_URL)
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
   
});

