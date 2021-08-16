fetch(PRODUCTS_URL)
.then(Response => Response.json() )
.then(data => {
let contenedor=document.getElementById('contenedor')
let contenido="";
for (let p = 0; p < data.length; p++) {
    contenido+=
    `
        <h1>${data[p].name}</h1>
        <p><img src=${data[p].imgSrc} +  alt=""></p>
        <h4 style="width:780px">${data[p].description}</h4>
        <br>
        <h5>${data[p].cost} ${data[p].currency} </h6>
        
        <h5>${'Unidades vendidas: ' + data[p].soldCount}</h4>
        <br><br>
    `
}    
contenedor.innerHTML= contenido;
     

})
.catch(err=>console.log(err));


//1. Obtener la información. Para eso usamos la función FETCH o la función GETJSONDATA definida en init.js. 
//2. Hacer procedimiento para insertar en HTML el primer producto. 
//3. Hacer prodecimiento para insertar todos los productos en el HTML.



document.addEventListener("DOMContentLoaded", function (e){
   
});

