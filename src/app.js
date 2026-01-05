import express from 'express'

const app = express();

const products = [
  {id: 1, name: 'product 1', price: 1000},
  {id: 2, name: 'product 2', price: 2000},
  {id: 3, name: 'product 3', price: 3000},
]

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.get('/products', (request, response)=>{
  response.json(products)
})

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});