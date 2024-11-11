import { Router } from 'express';
import { getBalanceSheet } from './../controllers/balanceSheetController';

const router = Router();

router.get('/', getBalanceSheet);

export default router;
