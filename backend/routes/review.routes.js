import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', verifyToken, createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
