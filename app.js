const API_URL = 'http://localhost:3000/api';

const formulario = document.getElementById('formulario-calculo');
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const notificacion = document.getElementById('notificacion');

document.addEventListener('DOMContentLoaded', obtenerHistorial);
formulario.addEventListener('submit', crearCalculo);


function mostrarMensaje(mensaje, esError = false) {
    notificacion.textContent = mensaje;
    notificacion.className = esError ? 'alerta-error' : 'alerta-exito';
    notificacion.style.display = 'block';
    
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}


async function obtenerHistorial() {
    try {
        const respuesta = await fetch(`${API_URL}/historial`);
        
        if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor');
        
        const data = await respuesta.json();
        renderizarTabla(data.historial);
    } catch (error) {
        mostrarMensaje(error.message, true);
    }
}


function renderizarTabla(historial) {
    cuerpoTabla.innerHTML = ''; 
    
    if (historial.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="6" style="text-align: center;">El historial está vacío</td></tr>';
        return;
    }

    historial.forEach(registro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${registro.id}</td>
            <td style="text-transform: capitalize;">${registro.operacion}</td>
            <td>[${registro.numeros.join(', ')}]</td>
            <td><strong>${registro.resultado}</strong></td>
            <td>${registro.etiqueta}</td>
            <td>
                <button class="btn-editar" onclick="editarEtiqueta(${registro.id}, '${registro.etiqueta}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarRegistro(${registro.id})">Borrar</button>
            </td>
        `;
        cuerpoTabla.appendChild(tr);
    });
}


async function crearCalculo(evento) {
    evento.preventDefault();

    const operacion = document.getElementById('operacion').value;
    const numerosTexto = document.getElementById('numeros').value;

    const numerosArreglo = numerosTexto.split(',').map(num => Number(num.trim()));

    if (numerosArreglo.some(isNaN)) {
        mostrarMensaje('Por favor, ingresa solo números separados por comas.', true);
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/calcular-lotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                operacion: operacion, 
                numeros: numerosArreglo 
            })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.error || 'Error al procesar el cálculo');
        }

        mostrarMensaje('Cálculo realizado y guardado con éxito');
        formulario.reset(); 
        obtenerHistorial(); 
    } catch (error) {
        mostrarMensaje(error.message, true);
    }
}


async function editarEtiqueta(id, etiquetaActual) {
    const nuevaEtiqueta = prompt(`Modificar etiqueta para el ID ${id}:`, etiquetaActual);
    
    if (nuevaEtiqueta === null || nuevaEtiqueta.trim() === '') return;

    try {
        const respuesta = await fetch(`${API_URL}/historial/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ etiqueta: nuevaEtiqueta.trim() })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.error || 'Error al actualizar la etiqueta');
        }

        mostrarMensaje('Etiqueta actualizada correctamente');
        obtenerHistorial(); 
    } catch (error) {
        mostrarMensaje(error.message, true);
    }
}


async function eliminarRegistro(id) {
    if (!confirm(`¿Estás completamente seguro de eliminar el registro ${id}?`)) return;

    try {
        const respuesta = await fetch(`${API_URL}/historial/${id}`, {
            method: 'DELETE'
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.error || 'Error al intentar eliminar');
        }

        mostrarMensaje('Registro eliminado de la base de datos');
        obtenerHistorial(); 
    } catch (error) {
        mostrarMensaje(error.message, true);
    }
}