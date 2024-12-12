import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateAuth } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', validateAuth, authController.register);
router.post('/login', validateAuth, authController.login);

export default router;