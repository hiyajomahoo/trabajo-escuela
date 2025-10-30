const formLogin = document.forms["login"]

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault()

    const nombre = formLogin.usuario.value
    const password = formLogin.contrasena.value

    const datosLogin = {
        nombre: nombre,
        password: password
    }

    try {
        const data = await fetch("http://localhost:3000/usuarios/iniciarSesion", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosLogin),
            credentials: "include"
        })
        const respuesta = await data.json()
        document.querySelector("#mensajeLogin").innerHTML = respuesta.message
        if (data.status !== 200) {
            return
        }

        setTimeout(() => {
            window.location.href = "./buscar.html"
        }, 2000);
        
    } catch (error) {
        console.log(error)
    }
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetch("http://localhost:3000/usuarios/autenticar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        if (data.status === 200) {
            window.location.href = "./buscar.html"
        }
    } catch (error) {
        console.log(error)
    }
});