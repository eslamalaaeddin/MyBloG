const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
const app = express()
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')

const middlewareValidation = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(flash())
app.use(fileUpload({
    createParentPath: true,
}))

app.use('/posts/store', middlewareValidation)
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true
})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log("Listening on Port 4000")
})




const newPostController = require('./controllers/newPostController')
const aboutController = require('./controllers/aboutController')
const contactController = require('./controllers/contactController')
const homeController = require('./controllers/homeController')
const specificPostController = require('./controllers/specificPostController')
const storePostController = require('./controllers/storePostController')

//Register Controllers
const renderRegisterController = require('./controllers/renderRegisterController')
const storeUserController = require('./controllers/storeUserController')
//Login Controllers
const renderLoginController = require('./controllers/renderLoginController')
const loginController = require('./controllers/loginController')

//Logout Controller
const logoutController = require('./controllers/logoutController')


app.get('/about', aboutController)

app.get('/contact', contactController)

app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware ,storePostController)

app.get('/', homeController)

app.get('/post/:id', specificPostController)

//Register
app.get('/auth/register', redirectIfAuthenticatedMiddleware,renderRegisterController)
app.post('/users/register',redirectIfAuthenticatedMiddleware,  storeUserController)

//Login
app.get('/auth/login',redirectIfAuthenticatedMiddleware, renderLoginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginController)

//Logout
app.get('/auth/logout', logoutController)

//Not found
app.use((req, res) => res.render('notfound'));