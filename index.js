const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function testantoMiddleware(request, response, next) {
    console.log('Entrei na middleware');

    next();
}

function podeEntrarNaRota(request, response, next) {
    console.log('Entrei na middleware 2');
    console.log(request.query.nome);
    next();
    // if (request.query.nome === 'yuki') {
    //     return next();
    // }

    // return response.status(401).send('Você não tem permissão');
}

function imprimindoParametro(request, response, next) {
    console.log(request.params.idFoto);

    next();
}

const validarLogin = [
    body('login').notEmpty().withMessage('Deve preencher o login')
]

// Definindo ejs como template e pastatas da views
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares Globais sempre acima das rotas
app.use(testantoMiddleware);
app.use(podeEntrarNaRota);

// [GET]/ animais

app.get('/login', (request, response) => {
    response.render('index');
});

app.post('/login', validarLogin, (request, response) => {
    const erros = validationResult(request);

    console.log(erros);

    response.render('index');
});

app.get('/fotos/:idFoto', imprimindoParametro, (request, response) => {
    response.render('index');
});

app.use((request, response, next) => {
    response.status(404).send('Página não encontrada')
})

app.listen(3333);

