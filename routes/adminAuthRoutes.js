// authRoutes.js
import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminAuthController.js';
import { requireSignIn } from '../middlewares/adminAuthMiddleware.js';
import formidable from 'express-formidable'
import { forgotPasswordController } from '../controllers/forgotPasswordController.js';

const router = express.Router();
// Register Admin
router.post('/register',formidable(), registerAdmin);

// Login Admin
router.post('/login', loginAdmin);

router.get('/protected', requireSignIn, (req, res) => {
    res.status(200).json({ message: 'This is a protected route',  user:req.user });
 
  });

router.post('/forgot-password',forgotPasswordController)


export default router;

