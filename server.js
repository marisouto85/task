
import express from 'express';
import {products} from './data.js'

const app = express();

app.use(express.json())

app.get('/products', (req, res) => {
    res.send(products)
});

// read operation
app.get('/product/:pid/:uid?', (req, res) => {
    console.log(req.params);

    const result = products.find(elem=>elem.id == req.params.pid)
    
    res.send(result)
});


// create operation - payload in the req.body
app.post('/product', (req, res) => {
    console.log('payload', req.body)
    products.push(req.body)
    res.send(products)
});


// delete operation
app.delete('/product/:pid', (req, res) => {
    console.log(req.params)

    const result = products.filter(elem=> elem.id != req.params.pid)

    // define how this resource should be deleted from DB
    res.send(result)
})


// update operation - payload in req.body
app.put('/product/:pid', (req, res) => {
    console.log('params', req.params)
    console.log('payload', req.body)


    res.send('put request handled')
})


// partial update operation - payload in req.body
app.patch('/product/:pid', (req, res)=>{
    console.log("params", req.params);
    console.log("payload", req.body);

    const searchProduct = products.find((elem)=> elem.id == req.params.pid);
    searchProduct.price = req.body.price;
    res.send(products)
})


app.listen(5001, ()=>console.log('🚀 Server is running on port: 5001'));
