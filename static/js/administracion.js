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

async function editarAlumno(id) {
    const contenedor = document.createElement('div')
    contenedor.id = "studentModal"

    let respuesta = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    let alumno = await respuesta.json()

    respuesta = await fetch(`http://localhost:3000/cursos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const cursos = await respuesta.json()

    const formularioEdicion = document.createElement('form')
    formularioEdicion.id = "formularioEdicion"
    formularioEdicion.className = "modal-content"

    const dataGrid = document.createElement('div')
    dataGrid.className = "data-grid"

    const campos = {
        inputNombre_alum: 'text',
        inputApellido_alum: 'text',
        inputDNI: 'text',
        inputId_curso: 'select',
        inputGrupo: 'text',
        inputTelefono: 'text',
        inputDireccion: 'text',
        inputContactos_emergencia: 'text',
        inputObservaciones: 'text',
    }

    const inputs = {}
    for (const [nombre, tipo] of Object.entries(campos)) {
        const input = document.createElement(tipo == 'text' ? 'input' : 'select')
        // Sacamos el input y queda el mismo nombre que los campos recibidos de la API
        const campo = nombre.replace(/^input/, '').toLowerCase()
        if (campo != 'id_curso') {
            input.value = alumno[campo]
            input.type = tipo
        }
        input.className = 'data-value editable'
        inputs[nombre] = input
    }

    cursos.forEach(curso => {
        const option = document.createElement('option')
        option.value = curso.id_curso
        option.textContent = `${curso.anio} ${curso.division} ${curso.nombre_especialidad} ${curso.descripcion_turno}`
        if (option.value == alumno.id_curso) option.selected = 'selected'
        inputs.inputId_curso.appendChild(option)
    }) 
    
    let botonCerrar = document.createElement("button")
    botonCerrar.innerHTML = "Cerrar"
    botonCerrar.addEventListener("click", (e) => {
        e.preventDefault()
        botonCerrar.parentElement.remove()
    })

    let botonEditar = document.createElement("button")
    botonEditar.innerHTML = "Guardar cambios"
    botonEditar.addEventListener("click", async (e) => {
        e.preventDefault()
        for (const [nombre, tipo] of Object.entries(campos)) {
            const campo = nombre.replace(/^input/, '').toLowerCase()
            alumno[campo] = inputs[nombre].value
        }

        delete alumno.anio
        delete alumno.division
        delete alumno.nombre_especialidad

        try {
            const respuestaEdit = await fetch(`http://localhost:3000/alumnos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(alumno)
            })
        } catch (error) {
            console.log(error)
            return
        }
        botonEditar.parentElement.remove()
        renderizarLista()
    })

    Object.values(inputs).forEach(input => dataGrid.append(input))
    formularioEdicion.append(dataGrid)
    formularioEdicion.append(botonEditar)
    formularioEdicion.append(botonCerrar)
    document.body.append(formularioEdicion)
}

async function eliminarAlumno(id) {
    console.log(id)
    const respuesta = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }) 

    renderizarLista()
}

async function crearAlumno() {
    const respuesta = await fetch(`http://localhost:3000/cursos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })        
    const cursos = await respuesta.json()

    const formularioEdicion = document.createElement('form')
    formularioEdicion.id = "formularioEdicion"
    formularioEdicion.className = "modal-content"

    const dataGrid = document.createElement('div')
    dataGrid.className = "data-grid"

    const campos = {
        inputNombre_alum: 'text',
        inputApellido_alum: 'text',
        inputDNI: 'text',
        inputId_curso: 'select',
        inputGrupo: 'text',
        inputTelefono: 'text',
        inputDireccion: 'text',
        inputContactos_emergencia: 'text',
        inputObservaciones: 'text',
    }

    const inputs = {}
    for (const [nombre, tipo] of Object.entries(campos)) {
        const input = document.createElement(tipo == 'text' ? 'input' : 'select')
        // Sacamos el input y queda el mismo nombre que los campos recibidos de la API
        const campo = nombre.replace(/^input/, '').toLowerCase()
        if (campo != 'id_curso') {
            input.placeholder = campo
            input.type = tipo
        }
        input.className = 'data-value editable'
        inputs[nombre] = input
    }

    cursos.forEach(curso => {
        const option = document.createElement('option')
        option.value = curso.id_curso
        option.textContent = `${curso.anio} ${curso.division} ${curso.nombre_especialidad} ${curso.descripcion_turno}`
        inputs.inputId_curso.appendChild(option)
    }) 
    
    let botonCerrar = document.createElement("button")
    botonCerrar.innerHTML = "Cerrar"
    botonCerrar.addEventListener("click", (e) => {
        e.preventDefault()
        botonCerrar.parentElement.remove()
    })

    let botonEditar = document.createElement("button")
    botonEditar.innerHTML = "Guardar cambios"
    botonEditar.addEventListener("click", async (e) => {
        e.preventDefault()
        let alumno = {}
        for (const [nombre, tipo] of Object.entries(campos)) {
            const campo = nombre.replace(/^input/, '').toLowerCase()
            alumno[campo] = inputs[nombre].value
        }
        console.log(alumno)
        try {
            const respuestaEdit = await fetch(`http://localhost:3000/alumnos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(alumno)
            })
        } catch (error) {
            console.log(error)
            return
        }
        botonEditar.parentElement.remove()
        renderizarLista()
    }) 
    Object.values(inputs).forEach(input => dataGrid.append(input))
    formularioEdicion.append(dataGrid)
    formularioEdicion.append(botonEditar)
    formularioEdicion.append(botonCerrar)
    document.body.append(formularioEdicion)
}

async function renderizarLista(nombre, apellido) {
    let listaResultados = document.querySelector("#listaResultados")
    listaResultados.innerHTML = ""

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
                <button class="btn-editar" onclick="editarAlumno(${alumno.id_alum})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarAlumno(${alumno.id_alum})">Eliminar</button> 
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

    renderizarLista()
});