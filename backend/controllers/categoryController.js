import Category from '../models/Category.js';
import Medicine from '../models/Medicine.js';
import { asyncHandler } from '../middleware/error.js';
import { ErrorHandler } from '../middleware/error.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories
  });
});

/**
 * @desc    Get category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    category
  });
});

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return next(new ErrorHandler('Category already exists', 400));
  }

  // Handle image upload
  let image = {};
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path, 'categories');
    image = result;
  }

  const category = await Category.create({
    name,
    description,
    image
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category
  });
});

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
export const updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  // Handle image upload
  if (req.file) {
    // Delete old image
    if (category.image.publicId) {
      await deleteFromCloudinary(category.image.publicId);
    }

    const result = await uploadToCloudinary(req.file.path, 'categories');
    req.body.image = result;
  }

  category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    category
  });
});

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  // Check if any medicines use this category
  const medicinesCount = await Medicine.countDocuments({ category: req.params.id });
  if (medicinesCount > 0) {
    return next(new ErrorHandler(`Cannot delete category. ${medicinesCount} medicines are using this category.`, 400));
  }

  // Delete image from Cloudinary
  if (category.image.publicId) {
    await deleteFromCloudinary(category.image.publicId);
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
});

/**
 * @desc    Toggle category status
 * @route   PUT /api/categories/:id/toggle-status
 * @access  Private/Admin
 */
export const toggleCategoryStatus = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  category.isActive = !category.isActive;
  await category.save();

  res.status(200).json({
    success: true,
    message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
    category
  });
});
