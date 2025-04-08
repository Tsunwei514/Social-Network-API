import { Router } from 'express';
const router = Router();
import { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought,
    addReaction,
    removeReaction,
} from '../../controllers/thoughtController.js';

router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

export { router as thoughtRoutes };