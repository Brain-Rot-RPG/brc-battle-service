import { Router } from 'express';
import {
  createBattle,
  getBattles,
  getBattleById,
  updateBattle,
  deleteBattle,
  getChoices,
  getWinner
} from '../controllers/battleController';

const router = Router();

router.get('/', getBattles);
router.get('/:id', getBattleById);
router.post('/', createBattle);
router.put('/:id', updateBattle);
router.delete('/:id', deleteBattle);
router.get('/:id/choice', getChoices);
router.get('/:id/winner', getWinner);

export default router;