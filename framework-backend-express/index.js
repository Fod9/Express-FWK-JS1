const express = require('express');
//Application Express
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

//Import des definitions de routes
const routerQcm = require('./routers/qcmroute');

// app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = 3000;

//Association des routes a l'application

app.use(express.static(__dirname + '/dist/front-angular/browser'));
//Association avec definition d'un prefixe, c'est à dire que toutes les routes associées seront accessibles avec le préfixe /qcms
app.use('/qcms', routerQcm);
app.use('/*',(req,res)=>{
    res.sendFile(__dirname + '/dist/front-angular/browser/index.html');
})

app.listen(port, () => {
    console.log(`Ecoute uniquement sur http://localhost:${port}`);
});