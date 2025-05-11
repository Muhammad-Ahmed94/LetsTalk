import express from 'express';
import { protectRoute } from '../middleware/message.middleware.js';
import { getSidebarUsers } from '../controllers/users.controller.js';

const router = express.Router();

router.get("/", protectRoute, getSidebarUsers)

export default router;