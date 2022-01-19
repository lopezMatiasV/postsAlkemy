const express = require('express');
const app = express();
const port = 3000;
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');

/*routes*/
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);

app.listen(port, () =>{
    console.log(`servidor levantado en el puerto ${port}`);
})