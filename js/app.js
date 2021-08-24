window.onload = function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistroR = document.getElementById("btnRegistroR");
    btnIngresarI = document.getElementById("btnIngresarI");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    btnenviarM = document.getElementById("enviarM");
    txtCorreoM = document.getElementById("correoM");
    txtMensajeM = document.getElementById("mensajeM");
    redactar = document.getElementById("redactar");
    camera = document.getElementById("camera");
    photo = document.getElementById("photo");
    btnOpen = document.getElementById("btnOpen");
    mapa = document.getElementById("mapa");
    
    if (localStorage.getItem("login") !== "1") {
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display = "none";
    }
    else {
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();        
    }
}

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then( () => {
            console.log('Service Worker Registered')
        });
    });
}

document.getElementById("enviarM").addEventListener("click", function() {
    if(txtCorreoM.value == "") {
        alert("Debe escribir el correo");
        txtCorreoM.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreoM.classList.remove("errorCampo");
    } 
    if(txtMensajeM.value == "") {
        alert("Debe escribir el nombre");
        txtMensajeM.classList.add("errorCampo");
        return false;
    }
    else {
        txtMensajeM.classList.remove("errorCampo");
    }
    let datosM = new FormData();
    datosM.append("correoM", txtCorreoM.value);
    datosM.append("mensajeM", txtMensajeM.value);
    
    fetch("http://tpacdcs.orgfree.com/guardarMensaje.php", {
        method: 'POST',
        body: datosM
    })
    .then(function (response){
        if(response.ok){
            alert("Mensaje Registrado");
        }
        else {
            alert("Ocurrio un error al enviar");
            console.log(response);
        }
    })
    .catch(function(err) {
        alert("Ocurrio un error -> " + err);
    });
}); //boton enviar mensaje

btnRegistrar.addEventListener("click", function() {
    ingreso.style.display = "none";
    registro.style.display = "block";
}); //boton Registrar

btnRegistroR.addEventListener("click", function() { 
    if(txtCorreo.value == "") {
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreo.classList.remove("errorCampo");
    } 
    if(txtNombre.value == "") {
        alert("Debe escribir el nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else {
        txtNombre.classList.remove("errorCampo");
    }
    if(txtContrasena.value == "") {
        alert("Debe escribir la contraseña");
        txtContrasena.classList.add("errorCampo");
        return false;
    }
    else {
        txtContrasena.classList.remove("errorCampo");
    }
    if(txtConfirmacion.value == "") {
        alert("Debe escribir la confirmacion");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else {
        txtConfirmacion.classList.remove("errorCampo");
    }
    if(txtContrasena.value !== txtConfirmacion.value) {
        alert("La contraseña y la confirmacion no coinciden");
        return false;
    }
    if(txtFecha.value == "") {
        alert("Debe escribir la fecha");
        return false;
    }
    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);
    
    fetch("http://tpacdcs.orgfree.com/registro.php", {
        method: 'POST',
        body: datos
    })
    .then(function (response){
        if(response.ok){
            alert("Usuario registrado");
            ingreso.style.display = "block";
            registro.style.display = "none";
        }
        else {
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err) {
        alert("Ocurrio un error -> " + err);
    });
}); //boton Registro

btnIngresarI.addEventListener("click",function() {
    if(txtCorreoI.value == "") {
        alert("Debe escribir el correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreoI.classList.remove("errorCampo")
    }
    if(txtContrasenaI.value == "") {
        alert("Debe escribir la contrasena");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else {
        txtContrasenaI.classList.remove("errorCampo");
    }

    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);
    
    fetch("http://tpacdcs.orgfree.com/ingreso.php", {
        method: 'POST',
        body: datosI
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        if (data.fallo == "contrasena") {
            alert("debe esribir la contraseña correcta");
        }
        if (data.fallo == "usuario") {
            alert("El correo no esta registrado");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1);
            localStorage.setItem("nombe", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err) {
        alert("Ocurrio un error inesperado");
        console.log(err);
    }); 
}); //boton Ingresar

function abrirBarra() {
    document.getElementById("barraMenu").style.width = "250";
}

function cerrarBarra() {
    document.getElementById("barraMenu").style.width = "0";
}

function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tpacdcs.orgfree.com/leerMensajes.php", {
        method: 'POST',
        body: datosLM
})
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        for (let x = 0; x < data.length; x++){
            document.getElementById("mensajes").innerHTML = 
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
            data[x].fechahora + "<br>";
        }
    });
} //leerM

function tomarFoto(){
    document.getElementById("redactar").style.display = "none"
    document.getElementById("mensajes").style.display = "none"
    document.getElementById("camara").style.display = "block"
    cerrarBarra();
} //tomarFoto

function mensajes() {
    document.getElementById("redactar").style.display = "block"
    document.getElementById("mensajes").style.display = "block"
    document.getElementById("camara").style.display = "none"
    cerrarBarra();
} //mensajes

btnOpen.addEventListener("click", function(){
    camera.click();
});

camera.addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta();
//     photo.srcObject = URL.createObjectURL(e.target.files[0]);
    if(obtenerSO() == "iOS"){
    let link = document.createElement('a');
    link.download = "test.png";
    // link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.href = ruta();
    link.click();
    alert("Foto Capturada");
    }
}); 

function obtenerSO() {
    let so = null;
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    if(iosPlatforms.includes(platform)){
        so = 'iOS';
    }
    return so;
} //obtenerSO

mapa.addEventListener('click', function(){
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});

function obtenerLugar(){
    coordenadas = {lat: 0, lon:0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error => {
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        });
    });
} //ObtenerLugar


function cerrarSesion() {
    cerrarBarra();
    localStorage.removeItem("nombreP");
    localStorage.removeItem("correo");
    localStorage.removeItem("login", 0);
    //localStorage.clear();
    redactar.style = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
}
