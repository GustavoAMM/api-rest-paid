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

# Instalación

Descargar el proyecto desde el repositorio de GitHub:

```
git clone https://github.com/GustavoAMM/api-rest-paid
```

> Cambia el nombre de la carpeta a paid

## Contenedor de MySQL

Vamos a usar un volumen para persistir los datos de la base de datos. Para ello, creamos una carpeta llamada "vol" en el directorio Documentos de nuestro usuario


Para iniciar el contenedor de MySQL, ejecutar el siguiente comando:

```
docker run --name mysql-contenedor -v /home/angel/Documentos/vol:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=test -d -p 3306:3306 mysql:latest
```

> Si es windows cambia la ruta /home/usuario/Documentos/vol a C:\Users\usuario\Documents\vol
> y asegurate de no tener un contenedor con el mismo nombre

## Migraciones - Alembic

Dentro de la carpeta "logica" vamos a modificar TEMPORALMENTE los archivos:

- alembic.ini
- bd.py

En alembic.ini, cambiamos la linea:

```
sqlalchemy.url = mysql+mysqldb://root:root@db:3306/test
```
por

```
sqlalchemy.url = mysql+mysqldb://root:root@127.0.0.1:3306/test
```
> si es windows o tienes errores futuros cambia la ip por localhost:3306


En bd.py, cambiamos la linea:

```
string_db = f"{plugin_db}://{user}:{pass_}@db:3306/{db}"
```
por
```
string_db = f"{plugin_db}://{user}:{pass_}@127.0.0.1:3306/{db}"
```
> si es windows o tienes errores futuros cambia la ip por localhost:3306
    

Ahora, dentro de la carpeta "logica", ejecutamos el siguiente comando para crear las migraciones:

```
alembic upgrade head
```

Listo ya tenemos la base de datos creada y migrada.

> Sí por error llegaras a tener error en la migración, a mi me paso que se soluciono con:
> ```
> alembic revision -m "alembic"
> alembic history
> alembic upgrade head
> ```

**!!! Volvemos a cambiar los archivos alembic.ini y bd.py a su estado original. !!!**

```
sqlalchemy.url = mysql+mysqldb://root:root@db:3306/test
string_db = f"{plugin_db}://{user}:{pass_}@db:3306/{db}"
```

## Presentacion - Angular

Dentro de la carpeta "presentacion", ejecutamos el siguiente comando para instalar las dependencias:

```
npm install
```

Ahora, ejecutamos el siguiente comando para iniciar el servidor de Angular:

```
ng serve
```
Ingresar a http://localhost:4200/ para ver la aplicación. Si todo salió bien, debería verse la página de inicio de la aplicación.

Ahora que sabemos que funciona el proyecto y despues de terminar el proceso con ctrl+c , vamos a crear la imagen de Docker para la presentación.

Hacmos un build del proyecto con el siguiente comando:

```
npm run build
```

Ahora creamos la imagen de Docker con el siguiente comando:

```
docker build -t presentacion:1.0.0 .
```
Comprobamos que la imagen se haya creado correctamente puedes ver las imagenes de docker con el siguiente comando:

```
docker images
```
Si quieres correr el proyecto individual de angular, puedes hacerlo con el siguiente comando:

```
docker run -p 80:80 presentacion:1.0.0
```
Ingresa a http://localhost:80 para ver la aplicación. Si todo salió bien, debería verse la página de inicio de la aplicación.


