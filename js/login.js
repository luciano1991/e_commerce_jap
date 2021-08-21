document.addEventListener("DOMContentLoaded", function(){
    

});

//Funcion que checkea que los campos no sean vacíos
function login(name, password){
    
  return (name!=="") && (password!=="")
    
}

//Función que redirige a la pagina principal
function checkLogin(){
    
    let nombre = document.getElementById('user').value
    let password = document.getElementById('pass').value

    if (login(nombre, password)){ 
      window.location.replace("home.html");
      console.log('inicio exitoso');
    } else {
    
       document.getElementById('alerta').removeAttribute('hidden');
    }
}
