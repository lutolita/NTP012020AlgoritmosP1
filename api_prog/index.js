/*
requires
*/

const express = require('express')
const mongoose = require('mongoose')

//product import schema

const Product = require('./models/Product')

//server

const app = express()
const port = process.env.PORT || 3000

//middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//API rest
//routes endpoints

app.get('/api/product', (req, res) =>{
    Product.find({}, (err, products) => {
        if (err) res.status(500).send({ message: 'Request failed', err })
        if (!products) res.status(404).send({ message: `There are not products` })
        res.status(200).send({products})
    })
})

app.get('/api/product/:productId', (req, res) =>{
    const { productId } = req.params

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message: 'Request failed', err })
        if (!product) res.status(404).send({ message: 'Product does not exist' })
        res.status(200).send({product})
    })
})

app.post('/api/product', (req, res) =>{
    const { name, price, category, image } = req.body
    const product = new Product({ name, price, category, image })

    product.save((err, product) => {
        if (err) res.status(500).send({ message: 'Request failed', err })
        res.status(200).send({ product })
    })
})

app.put('/api/product/:productId', (req, res) =>{
    const { productId } = req.params
    let updateData = req.body

    Product.findByIdAndUpdate(productId, updateData, (err, product) => {
        if (err) res.status(500).send({ message: 'Request failed', err })
        res.status(200).send({ product })
    })
})

app.delete('/api/product/:productId', (req, res) =>{
    const { productId } = req.params

    Product.findByIdAndDelete(productId, (err, product) =>{
        if (err) res.status(500).send({ message: 'Request failed', err })
        if (!product) res.status(404).send({ message: 'Product does not exist' })

        product.remove ( err => {
            if (err) res.status(500).send({ message: 'Request failed', err })
            res.status(200).send({ message: 'Product removed' })
        })
   })
})

//server connect

mongoose.connect('mongodb://localhost:27017/products', { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if(err) throw err
    console.log('Database connection ok')

    const server = app.listen(port, () => {
        console.log(`Listening http://localhost:${ server.address().port }`)
    })
})