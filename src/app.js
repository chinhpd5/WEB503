import express from 'express'
import productRouter from './routers/product.route';
import postRouter from './routers/post.route'

const app = express();

app.use(express.json());

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.use('/api/products', productRouter);
app.use('/api/posts', postRouter)


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});