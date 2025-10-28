import { Router } from 'express';
import { getRecord, getRecords, getRecordsByCategory } from '../controllers/productController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:category', getRecordsByCategory);
routes.get('/:category/:slug', getRecord);

export const productRoutes = routes;
