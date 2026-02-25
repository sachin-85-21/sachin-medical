import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  composition: {
    type: String,
    required: [true, 'Composition is required'],
    maxlength: [500, 'Composition cannot exceed 500 characters']
  },
  uses: {
    type: String,
    required: [true, 'Uses are required'],
    maxlength: [1000, 'Uses cannot exceed 1000 characters']
  },
  sideEffects: {
    type: String,
    maxlength: [1000, 'Side effects cannot exceed 1000 characters']
  },
  dosage: {
    type: String,
    maxlength: [500, 'Dosage cannot exceed 500 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative'],
    validate: {
      validator: function(value) {
        if (value === null || value === undefined || value === '') return true;
        return value < this.price;
      },
      message: 'Discount price must be less than original price'
    }
  
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: [0, 'Threshold cannot be negative']
  },
  manufacturer: {
    type: String,
    required: [true, 'Manufacturer is required'],
    trim: true
  },
  packSize: {
    type: String,
    required: [true, 'Pack size is required']
  },
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String
  }],
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  batchNumber: {
    type: String,
    trim: true
  },
  gstPercentage: {
    type: Number,
    default: 12,
    min: [0, 'GST cannot be negative'],
    max: [100, 'GST cannot exceed 100%']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for search and filtering
medicineSchema.index({ name: 'text', description: 'text', composition: 'text' });
medicineSchema.index({ category: 1 });
medicineSchema.index({ price: 1 });
medicineSchema.index({ stock: 1 });
medicineSchema.index({ expiryDate: 1 });

// Virtual for effective price (considering discount)
medicineSchema.virtual('effectivePrice').get(function() {
  return this.discountPrice || this.price;
});

// Check if stock is low
medicineSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.lowStockThreshold;
});

// Check if medicine is expired
medicineSchema.virtual('isExpired').get(function() {
  return new Date(this.expiryDate) < new Date();
});

// Include virtuals in JSON
medicineSchema.set('toJSON', { virtuals: true });
medicineSchema.set('toObject', { virtuals: true });

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
