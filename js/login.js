//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Definiremos un evento "submit" para capturar el instante en el que el usuario enviará el formulario.
//Una vez capturado el evento submit del formulario con Javascript, vamos bloquear el envío, evitando que pueda enviar con datos incorrectos.
//Validaremos todos los campos del formulario.
//Si todos los campos se validan correctamente, entonces realizaremos el envío nosotros mediante Javascript.
document.addEventListener("DOMContentLoaded", function(){
    

});


function login(name, password){
    
    if (name == ""){
      return true;
    }

    if (password == ""){
      return true;
    }

    
    
}


function checkLogin(){
    
    let nombre = document.getElementById('user').value
    let password = document.getElementById('pass').value

    if (login(nombre, password) == true){
    alert('Campos incompletos, por favor completar');
    } else {
          window.location.replace("home.html");
        console.log('inicio exitoso');
    }
}





//document.getElementById("login").addEventListener('submit', validarAcceso); 

/*function validarAcceso(evento) {
    evento.preventDefault();
    let user = document.getElementById('user').value;
    if(user.length == 0) {
      alert('No has escrito nada en el usuario');
      return;
    }
    let pass = document.getElementById('password').value;
    if (pass.length ==0) {
      alert('La clave no es válida');
      return;
    }
    this.submit();
  }*/

/*let usuario = document.getElementById("user").value ;
let usuario = document.getElementById("password").value ;*/
