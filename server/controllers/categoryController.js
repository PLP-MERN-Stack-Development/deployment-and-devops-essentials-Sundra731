// categoryController.js - Controller for category-related operations

const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        
        res.json({
        success: true,
        count: categories.length,
        data: categories,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found',
        });
        }
        
        res.json({
        success: true,
        data: category,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        
        res.status(201).json({
        success: true,
        data: category,
        });
    } catch (error) {
        // Handle duplicate category name
        if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'Category name already exists',
        });
        }
        next(error);
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
        );
        
        if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found',
        });
        }
        
        res.json({
        success: true,
        data: category,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        
        if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found',
        });
        }
        
        res.json({
        success: true,
        data: {},
        message: 'Category deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};