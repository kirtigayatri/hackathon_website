const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); 
const { submitProof } = require('../controllers/paymentController');

router.post(
  '/submit-proof',
  protect,
  upload.single('proof'), // 3. Use the middleware, 'proof' is the form field name
  submitProof
);

module.exports = router;