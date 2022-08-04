const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please inter product name'],
        trim: true,
        maxLength: [100, 'Product name can not exceed 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5,'Product price can not exceel 5 characters'],
        default: 0.0
    },
    name : {
        type: String,
        required: [true, 'Please inter product description'],
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [{
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category:{
        type: String,
        required: [true, 'Please selsect category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoors',
                'Home',
            ],
            message: 'Please Select Category for product'
        }
    },
    seller:{
        type: String,
        required: [true,'Please enter product seller']
    },
    stock:{
        type: Number,
        required: [true,'Please enter stoke number'],
        maxLength: [5, 'Product name can not exceed 5 characters']
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type:String,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }

})