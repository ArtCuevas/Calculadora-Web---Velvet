# Calculadora Web 

Aplicación web frontend desarrollada para consumir una API REST de operaciones matemáticas, para mostrar la implementación de un CRUD completo usando exclusivamente HTML5, CSS3 y JavaScript, sin usar frameworks o librerías.

## Tecnologías Usadas
* **HTML5:** Para toda la estructura semántica.
* **CSS3:** Para un diseño responsivo, las variables de color y las alertas.
* **JavaScript (Vanilla JS):** Para toda la lógica de negocio, peticiones asíncronas y manipulación del DOM.

## Endpoints Consumidos:
* **Listar (GET):** Para recuperar y visualizar el historial de operaciones matemáticas en una tabla dinámica.
* **Crear (POST):** Para envíar lotes de números al servidor para hacer los distintos cálculos, manejando respuestas exitosas y errores de validación.
* **Actualizar (PATCH):** Para renombrar la etiqueta descriptiva de un cálculo específico mediante prompts nativos.
* **Eliminar (DELETE):** Borra un registro del historial previa confirmación del usuario.
* **Manejo de UI:** Sistema de notificaciones en pantalla para retroalimentación visual (éxito/error) según los Status Codes HTTP.

## ⚙️ Instrucciones de Instalación y Uso

Para correr este proyecto localmente, es **estrictamente necesario** tener el backend (API) corriendo en paralelo, ya que este cliente depende de sus endpoints.

1. Asegúrate de tener el servidor backend clonado y corriendo en el puerto `3000` (`http://localhost:3000`).
2. Clona este repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/TuUsuario/calculadora-web-cliente.git](https://github.com/TuUsuario/calculadora-web-cliente.git)