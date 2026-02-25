import multer from 'multer';
import path from 'path';
import { ErrorHandler } from './error.js';

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new ErrorHandler('Only .jpg, .jpeg, .png, and .pdf files are allowed!', 400));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
});

export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5);
export const uploadPrescription = upload.single('prescription');

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File size cannot exceed 5MB' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, message: 'Maximum 5 files allowed' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
};

export default upload;