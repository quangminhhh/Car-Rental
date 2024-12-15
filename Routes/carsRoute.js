import express from 'express';
import { getLuxuryCars, addLuxuryCar, deleteLuxuryCar } from '../Controllers/carController.js';

const router = express.Router();

router.get('/luxury-cars', getLuxuryCars);

router.post('/luxury-cars', addLuxuryCar);

router.delete('/luxury-cars/:id', deleteLuxuryCar);

export default router;
