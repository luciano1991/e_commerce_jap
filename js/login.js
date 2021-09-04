document.addEventListener("DOMContentLoaded", function(){
    

});

//Funcion que checkea que los campos no sean vacíos
function login(name, password){
    
  return (name!=="") && (password!=="");
    
}

//Función que redirige a la pagina principal
function checkLogin(){
  let nombre = document.getElementById('user').value;
  let password = document.getElementById('pass').value;
  
   if (login(nombre, password)){
     
    sessionStorage.setItem('user', nombre);
    window.location.replace("home.html");
  }
}

function logout(){
  let cerrarSesion = document.getElementById('close');
  sessionStorage.clear('nombre')

  cerrarSesion.innerHTML = window.location.replace("index.html");
}