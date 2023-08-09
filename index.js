
import express from 'express';
import bodyParser from 'body-parser';
import router from './src/application/routes.js';
const app = express();

// Cấu hình body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get('/', (request, response)=>{
    response.render('index',{})
})
app.use('/', router);

app.listen(8000, () => {
    console.log('Server started');
});