//Obteniendo la información de los productos
getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        let product = resultObj.data;
        
        //Inserto los datos en el HTML  
        let productNameHTML  = document.getElementById("productName");
        let productDescriptionHTML = document.getElementById("productDescription");
        let productCountHTML = document.getElementById("productCount");
        let productCriteriaHTML = document.getElementById("productCriteria");
            
        
        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCountHTML.innerHTML = product.soldCount;
        productCriteriaHTML.innerHTML = product.category;
            
        //Muestro las imágenes en forma de galería
        showRelatedProducts(product.relatedProducts);  
        //Mando imágenes al carousel
        showImages(product.images);
        
    }
    
});


function showImages(array){
//Función para cargar imágenes en el carousel
let imagesToAppend ="";
let indicators ="";

for (let i = 0; i < array.length; i++) {
   let imageSrc = array[i];
   if (i == 0){
       indicators += `<li data-target="#carouselExampleCaptions" data-slide-to="${i}" class="active">`;

       imagesToAppend +=`
       <div class="carousel-item active">
            <img class="d-block w-100" data-src="" alt="" src="${imageSrc}" data-holder-rendered="true">
       </div>`
   }else{
        indicators += `<li data-target="#carouselExampleCaptions" data-slide-to="${i}"></li>`   

        imagesToAppend +=`
            <div class="carousel-item">
                <img class="d-block w-100" data-src="" alt="" src="${imageSrc}" data-holder-rendered="true">
            </div>`;
        
   }
    
}
document.getElementById("productsImages").innerHTML += imagesToAppend
document.getElementById("indicators").innerHTML += indicators

}



//Función que muestra los productos relacionados
function showRelatedProducts(array){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let products = resultObj.data;
            let htmlContentToAppend = "";
            
            for(let i = 0; i < array.length; i++){
                let productSrc = array[i];
                //console.log(products[productSrc])
            
                htmlContentToAppend = `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + products[productSrc].imgSrc + `" alt="">
                    </div>
                </div> `
                document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
            }
        }
    });
}

//Función que despliega estrellas
function drawStars(stars){

    let number = parseInt(stars);
    let html = "";
    for (let i = 1; i <= number; i++) {
        html += `<span class="fa fa-star checked"></span>`   
    }
    for (let i= number+1; i<=5 ; i++) {
        html += `<span class="fa fa-star"></span>` 
    }
    return html;
    
}

//Obtengo comentaros de los productos
fetch(PRODUCT_INFO_COMMENTS_URL)
.then(Response => Response.json())
.then(data => {

//Despliego comentarios de los productos
    let contenido=[];
    for (let p = 0; p < data.length; p++) {
        contenido+= `
        <div class="card w-50">
            <div class="card-header">
             <dt class="d-flex w-100 justify-content-between">${data[p].user }  
            </div>
            <div class="card-body">
                <dd class="description">${data[p].description}</dd>
            </div>
            <div class="card-body">
                <dd class="description" id="score" >${drawStars(data[p].score)}</dd>
            </div>
            <div class="card-footer">
                <span class="mb-1 text-muted "></dt>${data[p].dateTime}</span>
            </div>    
        </div>
        <br><br>`
    };    

    let oldComments= document.getElementById('oldComments')
    oldComments.innerHTML= contenido;
    document.getElementById('refUser').innerHTML = sessionStorage.getItem('user');

})


//Función que desplega nuevo comentario
function showComment(){
    let html ="";
    for (let i = comments.length - 1; i >= 0 ; i--) {
        let comment = comments[i];
        html +=`
        <br><br>
            <div class="card w-50">
                <div class="card-header">
                    <dt class="d-flex w-100 justify-content-between ">${comment.user }  
                </div>
                <div class="card-body">
                    <dd class="description">${comment.description}</dd>
                </div>
                <div class="card-body">
                    <dd class="description" id="score" >${drawStars(comment.score)}</dd>
                </div>
                <div class="card-footer">
                    <span class="mb-1 text-muted "></dt>${comment.dataTime}</span>  
                </div>    
            </div>
            
        `
    }
    document.getElementById('showNewComments').innerHTML = html;
    document.getElementById('formulario').reset()
}


//Función que guarda el comentario
let comments =[];

function saveComment(){
    //Definiendo datatime
    let today = new Date();
    let date = today.getFullYear()  + '-' + (today.getMonth() + 1) + '-' + today.getDate() ;
    let time = today.getHours() + ':' + today.getMinutes()  + ':' + today.getSeconds();
    let newDataTime = date + ' ' + time ;
    //Definiendo nuevo comentario
        comment ={
            user: sessionStorage.getItem('user'),
            description: document.getElementById('newDescription').value,
            score: document.getElementById('newScore').value,
            dataTime:newDataTime
        }
    comments.push(comment);
    showComment();
}