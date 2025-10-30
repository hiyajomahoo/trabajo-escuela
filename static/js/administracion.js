var alumnos

async function verAlumno(id) {
    let contenedor = document.createElement('div')
    contenedor.id = "studentModal"

    const respuesta = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const alumno = await respuesta.json()

    contenedor.innerHTML = `
        <div class="modal-content">
                <div class="data-grid">
                    <div class="data-label">Nombre</div>
                    <div id="modal-nombre" class="data-value">${alumno.nombre_alum}</div>

                    <div class="data-label">Apellido</div>
                    <div id="modal-apellido" class="data-value">${alumno.apellido_alum}</div>
                    
                    <div class="data-label">DNI</div>
                    <div id="modal-dni" class="data-value">${alumno.dni}</div>
                    
                    <div class="data-label">Curso</div>
                    <div id="modal-curso" class="data-value">${alumno.anio + " " + alumno.division + " " + alumno.nombre_especialidad}</div>
                    
                    <div class="data-label">Grupo</div>
                    <div id="modal-grupo" class="data-value">${alumno.grupo}</div>
                    
                    <div class="data-label">Teléfono</div>
                    <div id="modal-telefono" class="data-value">${alumno.telefono}</div>
                    
                    <div class="data-label">Dirección</div>
                    <div id="modal-direccion" class="data-value">${alumno.direccion}</div>
                    
                    <div class="data-label">Contacto de emergencia</div>
                    <div id="modal-contacto" class="data-value">${alumno.contactos_emergencia}</div>
                </div>
                
                <div class="observations-section">
                    <p class="data-label">Observaciones (alergias, enfermedades, otros)</p>
                    <p id="modal-obs" class="data-value-obs">${alumno.observaciones}</p>
                </div>
            </div>
    `
    let botonCerrar = document.createElement("button")
    botonCerrar.innerHTML = "Cerrar"
    botonCerrar.addEventListener("click", (e) => {
        e.preventDefault
        // Al estar ubicado dentro de la clase modal-content, hay que ir al padre del padre del boton, que seria el contenedor #studentModal
        botonCerrar.parentElement.parentElement.remove()
    })

    contenedor.querySelector(".modal-content").append(botonCerrar)
    document.body.append(contenedor)
}

function renderizarLista(nombre, apellido) {
    let listaResultados = document.querySelector("#listaResultados")
    listaResultados.innerHTML = ""

    alumnos?.forEach(alumno => {
        let contenedor = document.createElement("div")
        contenedor.className = "student-card"
        contenedor.innerHTML = `
            <div class="resultado-item">
                <span class="nombre-alumno">${alumno.nombre_alum + ' ' + alumno.apellido_alum}</span>
                <div class="student-info">
                    <span>${alumno.dni}</span>
                    <span>${alumno.anio + " " + alumno.division + " " + alumno.nombre_especialidad}</span>
                </div>
                <button class="btn-ver" onclick="verAlumno(${alumno.id_alum})">Ver</button>
                <button class="btn-editar">Editar</button>
            </div>
        `
        listaResultados.append(contenedor)    
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetch("http://localhost:3000/usuarios/autenticar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        if (data.status !== 200) {
            console.log(data.status)
            window.location.href = "./index.html"
        }
    } catch (error) {
        console.log(error)
    }

    try {
        const respuesta = await fetch('http://localhost:3000/alumnos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }) 

        const resultado = await respuesta.json()
        alumnos = resultado

    } catch (error) {
        console.log(error)        
    }
});