# Paid [api-rest]

Proyecto api-rest para Tecnologías y Aplicaciones en Internet

> By: Gustavo A. M. M. - 2023
>
> Projecto Ejecutado en windows 11 y kali linux

## Tecnologias usadas:

- Angular: utilizado para la parte de presentación del proyecto.
- Django: utilizado para la creación de servicios web.
- SQLAlchemy: utilizado como una biblioteca de Python para el manejo de bases de datos relacionales.
- Alembic: utilizado como herramienta de migraciones de bases de datos que se integra con SQLAlchemy.
- Docker: utilizado para la gestión y contenerización de los diferentes servicios que componen el proyecto.

## Índice:

- [Estrucura del proyecto](#estructura-del-proyecto)
- [Uso de Docker](#uso-de-docker)
- [Instalación](#instalacion)
    - [Contenedor de MySQL](#contenedor-de-mysql)
    - [Migraciones - Alembic](#migraciones---alembic)
    - []



#  Estructura del proyecto

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

## Uso de docker

La tecnología de contenedores Docker se utiliza en este proyecto para orquestar los contenedores necesarios. Docker ofrece una solución eficiente y escalable para gestionar aplicaciones en diferentes entornos. Permite empaquetar una aplicación junto con sus dependencias en un contenedor, lo que facilita la portabilidad y la ejecución en diferentes plataformas.

En este caso, se utiliza un contenedor de MySQL para la base de datos, otro contenedor para la presentación y un tercer contenedor para los servicios. El archivo docker-compose.yml se encarga de orquestar estos contenedores, exponer los puertos necesarios para la comunicación y establecer volúmenes para persistir los datos de la base de datos.

El uso de Docker permite una gestión más eficiente de la infraestructura de la aplicación, ya que cada contenedor se ejecuta en un entorno aislado y se pueden configurar diferentes versiones y dependencias de la aplicación. Además, el uso de contenedores permite una mayor flexibilidad en la implementación y escala de la aplicación, ya que se pueden agregar o eliminar contenedores según sea necesario.

# Instalación

Descargar el proyecto desde el repositorio de GitHub:

```
git clone https://github.com/GustavoAMM/api-rest-paid
```

**Cambia el nombre de la carpeta a paid**

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
    
Instalamos alembic con el siguiente comando:

```
pip install alembic
```

> Si faltan dependencias, puedes verlas en el archivo requirements.txt o bien instalar todas ejecutando el siguiente comando:
> ```
> pip install -r requirements.txt
> ```
> Ten en cuenta que esas dependencias fueron instaladas en mi sistema por ende algunas son inecesarias, si tienes problemas con alguna, puedes instalarla individualmente.



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
Ingresa a `http://localhost:80` para ver la aplicación. Si todo salió bien, debería verse la página de inicio de la aplicación pero sin funcionalidad.

> En caso de correr el contenedor, detenlo con ctrl+c y para evitar errores en el futuro, elimina el contenedor.

## Servicios - Django

En nuestro sistema es necesario añadir una variable de entorno, `PYTHONPATH` apuntando a nuestra carpeta raiz `paid`. Para ello dentro de nuestro archivo .bashrc o .zshrc añadimos la siguiente linea:

```
export PYTHONPATH=$PYTHONPATH:/home/angel/Escritorio/paid
```
En mi caso mi usuario es angel y la ruta de mi proyecto es /home/angel/Escritorio/paid
Sí es windows cambia la ruta /home/usuario/Escritorio/paid a C:\Users\usuario\Escritorio\paid

**ES IMPORTANTE QUE LA RUTA SEA LA CORRECTA, DE LO CONTRARIO NO FUNCIONARÁ.**

> Tal vez tengas que reiniciar tu terminal o tu sistema para que se aplique el cambio

Algunas dependencias de Python para que el proyecto funcione correctamente:

```
pip install django
pip install django-cors-headers
pip install mysqlclient
pip install SQLAlchemy
pip install alembic
```
> Si faltan dependencias, puedes verlas en el archivo requirements.txt o bien instalar todas ejecutando el siguiente comando:
> ```
> pip install -r requirements.txt
> ```
> Ten en cuenta que esas dependencias fueron instaladas en mi sistema por ende algunas son inecesarias, si tienes problemas con alguna, puedes instalarla individualmente.


Ahora vamos a crear la imagen de Docker para los servicios.

Dentro de la carpeta principal de nuestro proyecto, es decir, `paid`, ejecutamos el siguiente comando para crear la imagen de Docker:

```
docker build -t api:1.0.0 .
```

Comprobamos que la imagen se haya creado correctamente puedes ver las imagenes de docker con el siguiente comando:

```
docker images
```

Listo ya tenemos la imagen de nuestra api creada.

>Sí llegaras a quere correr el proyecto individual de django, puedes hacerlo con el siguiente comando:
>
>```
>docker run -p 8000:8000 api:1.0.0
>```
>
>Pero tendrias que tener el contenedor anteriormente dado de mysql corriendo, y modificar los archivos bd.py y alembic.ini para que apunten a 127.0.0.1:3306 en lugar de localhost y volver a crear esta imagen, para guardar los cambios.
> Si es asi y despues de comprobar que funciona, elimina el contenedor de django y vuelve a crear la imagen con los archivos de bd.py y alembic.ini apuntando a bd en lugar de 127.0.0.1 o localhost (según sea el caso).


## Docker Compose

Dentro de el archivo docker-compose.yml, Hacemos las siguientes modificaciones si tienes una configuración diferente a la mía:

- db

    - Si tu contenedor de mysql es diferente a el mio, cambia el container_name, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE por los tuyos.
    - si no quieres usar un volumen para guardar los datos de la base de datos, elimina la linea `volumes: - ./mysql:/var/lib/mysql` y solo deja `image: mysql:5.7`

- presentacion

    - Si tu contenedor de angular es diferente a el mio, cambia el container_name, ports y image por los tuyos.

- api

    - Si tu contenedor de django es diferente a el mio, cambia el container_name, ports y image por los tuyos.  


Una vez que tenemos las imagenes de las aplicaciones, vamos a ejecute el archivo `docker-compose.yml` para poder corre las aplicaciones juntas.

Dentro de la carpeta principal de nuestro proyecto, es decir, `paid`, ejecutamos el siguiente comando de Docker:

```
docker-compose up
```

Muchas veces el procesos va a fallar por que la base de datos no esta lista, para solucionar esto, SIN CERRAR EL PROCESO, ejecutamos el siguiente comando en OTRA terminal:

```
docker restart api
```

Si todo salió bien, debería verse la página de inicio de la aplicación, en la dirección `http://localhost:80`.

SI quieres terminal el proceso solo tienes que presionar ctrl+c en la terminal donde ejecutaste el comando `docker-compose up` y luego ejecutar el siguiente comando:

```
docker-compose down
```


## Proyecto

> By: **Gustavo Montoya**
