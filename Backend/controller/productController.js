const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("../middleware/catchAsyncError");
const createApiFeatures = require("../utils/apifeatures");

const resultPerPage = 5;

exports.createProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return next(new ErrorHandler("Product not created", 400));
    }
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Creating Product",
      error: error.message,
    });
  }
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const { query } = createApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await query;
    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found", 404));
    }
    res.status(200).json({
      success: true,
      message: "All Products Fetched Successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Fetching Products",
      error: error.message,
    });
  }
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Fetching Product",
      error: error.message,
    });
  }
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Updating Product",
      error: error.message,
    });
  }
    });

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Deleting Product",
      error: error.message,
    });
  }
});