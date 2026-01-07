import express from 'express'
import productRouter from './routers/product.route'

const app = express();

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.use('/api', productRouter)


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});