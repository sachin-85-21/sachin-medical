import Medicine from '../models/Medicine.js';
import Category from '../models/Category.js';
import { asyncHandler } from '../middleware/error.js';
import { ErrorHandler } from '../middleware/error.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const getMedicines = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  let query = { isActive: true };

  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { composition: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { tags: { $in: [new RegExp(req.query.search, 'i')] } },
      { manufacturer: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.prescriptionRequired !== undefined) {
    query.prescriptionRequired = req.query.prescriptionRequired === 'true';
  }

  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
  }

  if (req.query.inStock === 'true') {
    query.stock = { $gt: 0 };
  }

  let sortBy = {};
  if (req.query.sort) {
    sortBy[req.query.sort] = req.query.order === 'desc' ? -1 : 1;
  } else {
    sortBy.createdAt = -1;
  }

  const total = await Medicine.countDocuments(query);
  const medicines = await Medicine.find(query)
    .populate('category', 'name slug')
    .skip(skip)
    .limit(limit)
    .sort(sortBy);

  res.status(200).json({
    success: true,
    count: medicines.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    medicines
  });
});

export const getMedicineById = asyncHandler(async (req, res, next) => {
  const medicine = await Medicine.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('reviews.user', 'name avatar');

  if (!medicine) {
    return next(new ErrorHandler('Medicine not found', 404));
  }

  res.status(200).json({
    success: true,
    medicine
  });
});

export const createMedicine = asyncHandler(async (req, res, next) => {
  const {
    name, description, composition, uses, sideEffects, dosage,
    category, price, discountPrice, stock, lowStockThreshold,
    manufacturer, packSize, prescriptionRequired, expiryDate,
    batchNumber, gstPercentage, tags
  } = req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return next(new ErrorHandler('Category not found', 404));
  }

  // Handle image uploads using buffer
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, 'medicines');
      images.push(result);
    }
  }

  const medicine = await Medicine.create({
    name, description, composition, uses, sideEffects, dosage,
    category, price, discountPrice, stock, lowStockThreshold,
    manufacturer, packSize, prescriptionRequired, expiryDate,
    batchNumber, gstPercentage, tags, images
  });

  res.status(201).json({
    success: true,
    message: 'Medicine created successfully',
    medicine
  });
});

export const updateMedicine = asyncHandler(async (req, res, next) => {
  let medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return next(new ErrorHandler('Medicine not found', 404));
  }

  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      return next(new ErrorHandler('Category not found', 404));
    }
  }

  // Handle new image uploads using buffer
  if (req.files && req.files.length > 0) {
    for (const image of medicine.images) {
      if (image.publicId) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    const images = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, 'medicines');
      images.push(result);
    }
    req.body.images = images;
  }

  medicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Medicine updated successfully',
    medicine
  });
});

export const deleteMedicine = asyncHandler(async (req, res, next) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return next(new ErrorHandler('Medicine not found', 404));
  }

  for (const image of medicine.images) {
    if (image.publicId) {
      await deleteFromCloudinary(image.publicId);
    }
  }

  await medicine.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Medicine deleted successfully'
  });
});

export const updateStock = asyncHandler(async (req, res, next) => {
  const { stock } = req.body;

  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return next(new ErrorHandler('Medicine not found', 404));
  }

  medicine.stock = stock;
  await medicine.save();

  res.status(200).json({
    success: true,
    message: 'Stock updated successfully',
    medicine
  });
});

export const getLowStockMedicines = asyncHandler(async (req, res, next) => {
  const medicines = await Medicine.find({
    $expr: { $lte: ['$stock', '$lowStockThreshold'] }
  })
    .populate('category', 'name')
    .sort({ stock: 1 });

  res.status(200).json({
    success: true,
    count: medicines.length,
    medicines
  });
});

export const getExpiredMedicines = asyncHandler(async (req, res, next) => {
  const medicines = await Medicine.find({
    expiryDate: { $lte: new Date() }
  })
    .populate('category', 'name')
    .sort({ expiryDate: 1 });

  res.status(200).json({
    success: true,
    count: medicines.length,
    medicines
  });
});

export const addReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return next(new ErrorHandler('Medicine not found', 404));
  }

  const existingReview = medicine.reviews.find(
    review => review.user.toString() === req.user.id.toString()
  );

  if (existingReview) {
    return next(new ErrorHandler('You have already reviewed this medicine', 400));
  }

  medicine.reviews.push({
    user: req.user.id,
    name: req.user.name,
    rating,
    comment
  });

  medicine.ratings.count = medicine.reviews.length;
  medicine.ratings.average = medicine.reviews.reduce((acc, item) => item.rating + acc, 0) / medicine.reviews.length;

  await medicine.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    medicine
  });
});