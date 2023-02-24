# JAM "SECTION"

## Description

Plataforma de promoción y búsqueda de artistas musicales. En la plataforma cada artista podrá exhibir su género musical, compartir lista de canciones y mostrar su galería de fotos. El perfil de cada artista contará con un apartado de comentarios donde otros usuarios podrán calificar a cada cantante

También en la plataforma podrán acceder usuarios que necesiten localizar algún artista según su género.

 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog
Aqui dejamos una lista de proximas mejoras a nuestra app
 - Visualizacion de videos
 - Reproduccion de canciones por artistas
 - Filtro de Localizacion de cada artista

## ROUTES:
**Comments.routes.js**
// GET "/comments/:id" => renderiza el formulario para añadir una reseña al grupo seleccionado según su id

// POST "/comments/:id" => guarda la información del formulario de comentarios y la sube a la DB

// POST "/comments/:id/delete" => Borra los comentarios de reviews

// GET "/comments/:id/edit" => renderiza el formulario de edición del comentario

// POST "/comments/:id/edit" => guarda la información del formulario y la guarda en la DB


**fav.routes.js**
//POST /:artistId=> agrega un comentario
/POST /:artistId/del=> Borra un comentario


**groups.routes.js**
// GET "/groups/list" => renderiza el listado de grupos que existen según el género musical escogido"

// GET "/groups/:id/details" => renderiza los detalles del grupo musical seleccionado


**index.routes.js**
//GET => Renderiza la pagina de inicio

**private-profile.routes.js**
//GET router.get('/uploadimg',=> Renderiza la ruta para las imagenes
//POST router.post '/uploadimg=>para cargar imagenes

//!DELETE router.post'/uploadimg/delete=> para borrar imagenes


**profile.routes.js**
//GET /profile/signup =>Para crear una cuenta
//POST /profile/signup => Enviar informacion de registro
// GET /profile/login=>Para el acceso
// POST /profile/login => Render pagina de login
// Cerrar sesiones activas router.get("/logout"


## Models

User.model

    username:  String
    email: String
    password:String
    role:String
    genre: [String enum: [] ],
    description: String
    songs: [String ],
    imageShow: [String ]
    videoShow: [String ],
    contact:  String 
    imageProfile: String 
    favourite: [ Schema.Types.ObjectId]

`````````````````````

 Comments.model
        creator: Schema.Types.ObjectId
        comment: String
        artistUser: Schema.Types.ObjectId


## Links

### Trello

[Link to your trello board](https://trello.com/invite/jam968/ATTIf38d196628f9642c999db80f18ba915aAAEDC4B8) 
### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/JuanJeLlamas/jam-app.git)

[Deploy Link](https://jam-app.cyclic.app/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

