# MiDivino 🐈‍⬛

## Soporte de tipos para importaciones `.vue` en TypeScript

TypeScript no puede manejar la información de tipos para archivos `.vue` por defecto, por lo que reemplazamos el comando `tsc` por `vue-tsc` para la verificación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje de TypeScript reconozca los tipos `.vue`.

## 🚀 Cómo levantar la app localmente

Primero es necesario crear un archivo .env con los datos del archivo .env.template, sin esto, el login no va a funcionar.

### Instalar dependencias

```sh
npm install
```

### Ejecutar código

```sh
npm run dev
```
### Ejecutar Lint con [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 🫡 Distribución del trabajo 

| Integrante                         | Tareas | 
|------------------------------|---------------|
| **Joaquín Peralta** |Setup inicial, Manejo de sesión con Auth0, Reactividad: Manejo de datos de forma global en la Petstore con Pinia, Deploy            |.
| **Ignacia González**     | Funcionalidad 3: postear animal en adopción (POST), Responsividad, Diseño e Integración Tailwind + DaisyUI             |
| **Alexandra San Martín**             | Funcionalidad 1: Obtener (GET) mascotas disponibles desde la API, Funcionalidad 2: Crear (POST) solicitud de adopción desde cliente y README.             |

## ✨ Funcionalidades implementadas

- **Inicio de sesión**: El usuario deberá iniciar sesión (se usó Auth0 para este registro) para poder acceder a las mascotas que se encuentran disponibles en adopción, solicitar una adopción y poder publicar alguna mascota nueva.
- **Acceder a todas las mascotas disponibles**: Se realiza solicitud de tipo GET a la [API](https://petstore.swagger.io/) para poder mostrar en la página main todas las mascotas disponibles para poder adoptar.
- **Solicitar adopción**: Se realiza solicitud de tipo POST a la [API](https://petstore.swagger.io/) para poder realizar solicitud de adopción. En la página main, al seleccionar el botón "Adoptar" se redirigirá a un formulario donde será necesario llenar todos los campos, una vez completado, se selecciona "Enviar formulario" y se envía la solicitud, recibiendo un mensaje de "Solicitud enviada" y redirigiendo a la pagína home.
- **Publicar una nueva mascota**: Se realiza una solicitud de tipo POST a la [API](https://petstore.swagger.io/) para poder publicar una nueva mascota. Al apretar "Publicar" ubicado en el navbar, se redirige a un formulario que debe ser llenado para poder realizar la publicación de la nueva mascota.

## 🤖 Uso de Inteligencia Artificial (IA)

Durante el desarrollo de este proyecto se utilizó **inteligencia artificial generativa** como herramienta de apoyo técnico y creativo. El modelo empleado fue **ChatGPT 4o** de OpenAI.

### 📌 Finalidades del uso de IA

La IA fue utilizada para:

- ✅ **Asistir en la estructura y redacción de componentes Vue 3**, incluyendo fragmentos con TailwindCSS y DaisyUI.
- ✅ **Transformar vistas simples en experiencias más completas y visuales**, como formularios, carruseles, menús responsivos y secciones educativas.
- ✅ **Depurar y mejorar la presentación** del código (estructura de carpetas, estilos, uso responsivo).
- ✅ **Sugerir mejoras de usabilidad y accesibilidad**.
- ✅ **Generar textos y contenidos explicativos**, como la guía para adoptadores.

### 📚 Consideraciones

- Todas las decisiones implementadas fueron **validadas manualmente**.
- El modelo no accedió directamente a archivos ni bases de datos; el uso fue **asistido por el desarrollador**.
- El resultado final mantiene un enfoque ético y humano, siendo la IA una herramienta complementaria, **no sustituta del criterio técnico**.


