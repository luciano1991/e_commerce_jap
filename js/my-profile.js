
function previewFile(){
    let preview = document.getElementById('picture');
    let file = document.getElementById('inputP').files[0];

    let reader = new FileReader();//Instancia de objeto

    if (file) {
        reader.readAsDataURL(file);
    } else{
        preview.src = "https://i.ibb.co/GccxNkq/images.png";
    }
    reader.onloadend = function (){

        preview.src = reader.result;
    }
}

function saveProfile(){
    let data={};
    let preview = document.getElementById('picture');
    data.firstName = document.getElementById("firstName").value;
    data.secondName= document.getElementById("secondName").value;
    data.firstSurname = document.getElementById("firstSurname").value;
    data.secondSurname = document.getElementById("secondSurname").value;
    data.age = document.getElementById("age").value;
    data.email = document.getElementById("email").value;
    data.number = document.getElementById("number").value;
    data.img = preview.src

    localStorage.setItem("profile", JSON.stringify(data));
    document.getElementById('alert').innerHTML=
    `
    <div class="alert alert-success" role="alert">
        Perfil guardado <button class="close" data-dismiss="alert"> <span>&times;</span></button>
    </div>`
}

document.addEventListener('DOMContentLoaded', function(e){
    let preview = document.getElementById('picture');
    let profile = JSON.parse(localStorage.getItem('profile'));

    if (profile != null){

        document.getElementById("firstName").value = profile.firstName
        document.getElementById("secondName").value = profile.secondName
        document.getElementById("firstSurname").value = profile.firstSurname
        document.getElementById("secondSurname").value = profile.secondSurname
        document.getElementById("age").value = profile.age
        document.getElementById("email").value = profile.email
        document.getElementById("number").value = profile.number
        document.getElementById("picture").src = profile.img

    } else {
        preview.src = "https://i.ibb.co/GccxNkq/images.png";
    }
})
