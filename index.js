const express = require('express');
const path = require('path');

const app = express();

function testantoMiddleware(request, response, next) {
    console.log('Entrei na middleware');

    next();
}

function podeEntrarNaRota(request, response, next) {
    console.log('Entrei na middleware 2');
    console.log(request.query.nome);

    if (request.query.nome === 'yuki') {
        return next();
    }

    return response.status(401).send('Você não tem permissão');
}

function imprimindoParametro(request, response, next) {
    console.log(request.params.idFoto);

    next();
}

// Definindo ejs como template e pastatas da views
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares Globais sempre acima das rotas
app.use(testantoMiddleware);
app.use(podeEntrarNaRota);

// [GET]/ animais

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/fotos/:idFoto', imprimindoParametro, (request, response) => {
    response.render('index');
});

app.use((request, response, next) => {
    response.status(404).send('Página não encontrada')
})

app.listen(3333);

