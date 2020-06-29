const express = require('express');
const router = express.Router();
let productMocks = require('../../utils/mocks/products');
// console.log('before',productMocks)

router.get('/list', function(req, res) {
    const { query } = req.query;

    res.status(200).json({
        data: productMocks,
        message: 'products listed'
    });
});

router.get('/list/:productId', function(req, res) {
    const { params: { productId } } = req
    try {
        const productToList = productMocks.find(product => productId == product.id)
        if (productToList) {
            res.json({
                product: productToList
            });
        } else {
            res.json({
                message: 'error: Product does not exist'
            });
        }
    } catch (e) {
        res.json({
            message: `error: ${e}`
        });
    }
});

router.post('/post', function(req, res) {
    const { body } = req
    const newProduct = {...body}
    const productsLength = productMocks.length
    let idArray = []
    productMocks.forEach(product => {
        idArray.push(product.id)
    })
    try {
        newProduct.id && !idArray.includes(newProduct.id) && productMocks.push(newProduct)
        if (productsLength < productMocks.length) {
            res.status(201).json({
                message: 'product added'
            });
        } else {
            res.json({
                message: 'error: Product not added'
            });
        }
    } catch (e) {
        res.json({
            message: `error: ${e}`
        });
    }
});

router.put('/edit/:productId', function(req, res) {
    const { params: { productId }, body } = req
    const newProduct = {...body, id: productId}
    try {
        const productExists = productMocks.some(product => productId == product.id)
        if (productExists) {
            productMocks = productMocks.filter(product => product.id != productId)
            productMocks.push(newProduct)
            res.json({
                message: 'product edited'
            });
        } else {
            res.json({
                message: 'error: Product does not exist'
            });
        }
    } catch (e) {
        res.json({
            message: `error: ${e}`
        });
    }
});

router.delete('/delete/:productId', function(req, res) {
    const { params: { productId } } = req
    try {
        const productExists = productMocks.some(product => productId == product.id)
        if (productExists) {
            productMocks = productMocks.filter(product => product.id != productId)
            res.json({
                message: 'product deleted'
            });
        } else {
            res.json({
                message: 'error: Product does not exist'
            });
        }
    } catch (e) {
        res.json({
            message: `error: ${e}`
        });
    }
});


module.exports = router;
