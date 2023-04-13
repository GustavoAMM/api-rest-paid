# Paid [api-rest]

Proyecto api-rest para Tecnologías y Aplicaciones en Internet

## Estructura del proyecto
Este proyecto está dividido en tres carpetas principales: "logica", "presentacion" y "servicios".

La estructura de carpetas debe ser la siguiente:


    /paid
    |

    ├── /logica


    │   ├── alembic.ini


    │   └── /alembic


    │       ├── (alembic files)


    │       └── ...


    │   └── /modelos


    │       └── usuarios.py


    │   ├── db.py


    │   ├── users.py
    

    ├── /presentacion


    │       ├── (angular files)


    │       └── ...


    └── /servicios


            ├── (django files)


            └── ...


La carpeta "logica" contiene los archivos de migración de la base de datos utilizando Alembic. También incluye el archivo "alembic.ini" para la configuración de Alembic.

La carpeta "presentacion" contiene los archivos de Angular para la interfaz de usuario. Esta carpeta se encarga de la presentación de los datos a los usuarios finales.

La carpeta "servicios" contiene los archivos de Django para la lógica del negocio. Esta carpeta se encarga de la comunicación con la base de datos y provee la funcionalidad para la API.

## Docker

Además, el proyecto utiliza un archivo docker-compose.yml para orquestar los contenedores de Docker necesarios. Se utiliza un contenedor de MySQL para la base de datos, un contenedor para la presentación y otro contenedor para los servicios.

El archivo docker-compose.yml está configurado para exponer el puerto 3306 de MySQL para la comunicación con la base de datos, el puerto 80 para la presentación y el puerto 8000 para los servicios. También se han establecido volúmenes para persistir los datos de la base de datos.

