//imports

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//model shema

const ProductSchema = Schema({
    name: String,
    price: { type: Number, default: 0},
    category: { type: String, enum: ['food', 'technology', 'home']},
    image: String
})
//export model

module.exports = mongoose.model('Product', ProductSchema)