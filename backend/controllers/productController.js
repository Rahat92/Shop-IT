const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const { countDocuments } = require('../models/product');
// Create new product => api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        status: true,
        product
    })
} )

// Get all products => api/v1/products 
exports.getProducts = catchAsyncErrors(async(req,res,next) => {
    const resPerPage = 4;
    const productCount = await Product.countDocuments

    apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resPerPage);
    const products = await apiFeatures.query
    res.status(200).json({
        success: true,
        count: products.length,   
        productCount,   // count the all documents       
        products
    })
})

// Get single product details => api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Update product   =>   api/v1/admin/product/:id
exports.updateProduct = async(req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })

}

// Delete product    =>     /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404)) 
    }
    await product.remove();
    res.status(201).json({
        success: true,
        message:'Product is deleted!'
    })
    
})