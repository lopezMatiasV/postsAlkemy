const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
/*routes*/
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);

app.listen(port, () =>{
    console.log(`servidor levantado en el puerto ${port}`);
})