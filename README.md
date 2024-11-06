# Sistema de Evaluación 360 Grados

Este proyecto es una API RESTful para gestionar un sistema de evaluación 360 grados en una empresa de desarrollo de aplicaciones. La API permite manejar usuarios, empleados, evaluaciones, preguntas, respuestas y reportes.

## Tecnologías Utilizadas

- **Node.js** con **Express.js**: Framework para la creación de APIs.
- **MongoDB** (usando Mongoose como ODM): Base de datos NoSQL para almacenar la información de usuarios, evaluaciones, etc.
- **Swagger**: Herramienta para documentar la API.
- **JWT**: Para autenticación y autorización basada en tokens.

---

## Configuración y Ejecución del Proyecto

### 1. Clonar el Repositorio

Clona el repositorio y navega a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Instalar Dependencias

Asegúrate de tener Node.js instalado. Luego, ejecuta el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

### 3. Configurar las Variables de Entorno

Crea un archivo .env en la raíz del proyecto y define las siguientes variables de entorno:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nolatech_test
JWT_SECRET=tuClaveSecretaParaJWT
```

### 4. Ejecutar el Proyecto

Para iniciar el servidor, utiliza uno de los siguientes comandos:

```bash
npm run dev  # Ejecuta el servidor en modo de desarrollo (con nodemon)
npm start    # Ejecuta el servidor en modo de producción
```

El servidor se iniciará en http://localhost:5000. La documentación de la API estará disponible en http://localhost:5000/api-docs.

## Estructura del Proyecto

La estructura del proyecto sigue un enfoque modular para facilitar la escalabilidad y el mantenimiento.

```
├── src
│ ├── config # Configuración de Swagger y variables de entorno
│ ├── controllers # Lógica de cada entidad (Employees, Evaluations, etc.)
│ ├── middlewares # Middlewares de autenticación y autorización
│ ├── models # Modelos de datos definidos con Mongoose
│ ├── routes # Rutas de cada módulo
│ ├── tests # Pruebas de unidad e integración
│ └── utils # Funciones auxiliares (ej. cálculo de puntajes)
└── README.md # Documentación del proyecto
```
