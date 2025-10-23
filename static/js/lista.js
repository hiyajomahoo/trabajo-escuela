const formularioBusqueda = document.forms["formularioBusqueda"]
const listaResultados = document.querySelector("#listaResultados")

async function verAlumno(id) {
    let contenedor = document.createElement('div')
    contenedor.id = "studentModal"

    const respuesta = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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

formularioBusqueda.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!formularioBusqueda.nombre.value) {
        console.log("Faltan argumentos")
        return
    }

    const nombre = formularioBusqueda.nombre.value
    const apellido = formularioBusqueda.apellido.value

    let alumno = {nombre: nombre}

    if (apellido && apellido.length > 0) {
        alumno.apellido = apellido
    }

    const respuesta = await fetch('http://localhost:3000/alumnos/buscarNombre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumno)
    }) 

    const resultado = await respuesta.json()

    listaResultados.innerHTML = ""

    resultado?.forEach(alumno => {
        let contenedor = document.createElement("div")
        contenedor.className = "student-card"
        contenedor.setAttribute("onclick", `verAlumno(${alumno.id_alum})`)
        contenedor.innerHTML = `
            <div class="student-name">${alumno.nombre_alum + ' ' + alumno.apellido_alum}</div>
            <div class="student-info">
                <span>${alumno.dni}</span>
                <span>${alumno.anio + " " + alumno.division + " " + alumno.nombre_especialidad}</span>
            </div>
        `

        listaResultados.append(contenedor)
    })

})