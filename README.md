
# Reto técnico - Backend  NodeJS & AWS

El proyecto se realizo en base a una prueba tecnica, este tiene los siguientes requisitos 

# Funcionalidades

-Crear una API en Node.js con el framework Serverless para un despliegue en
AWS.

-Adaptar y transformar los modelos de la API SWAPI a español, es decir tienen
que mapear todos los nombres de los atributos del inglés al español. Ejemplo:
{ “
name
” : “Luke
”} cambiar a {“
nombre
” : ”Luke
”}.

-Integrar la API de prueba StarWars API (líneas abajo está el link) se deben
integrar uno o más endpoints.

-Crear un modelo de su elección mediante el uso de un endpoint POST, la data
se tendrá que almacenar dentro de una base de datos.

-Crear un endpoint GET que muestre la data almacenada.

# Como usarlo

Por ahora el proyecto cuenta con 2 endpoints, GET & POST

las apis tienen el siguiente url:
- /save/id (al usar esta api buscas en la tabla persona de SWAPI el id de un campo y la almacenas en DynamoDB)
- /obtain (lo que realiza este endpoint es un get a todos los campos almacenados en la DB)

# Notas 
Los archivos principales son getSwapi - saveSwapi - serverless, los otros son para mantener una organizacion del proyecto por capas

# Autores

Gera (YO) 8)

# Conclusion 
Proyecto que aun falta actualizar para poder dejarlo con buenas practicas para poder utilizarlo libremente de manera publica