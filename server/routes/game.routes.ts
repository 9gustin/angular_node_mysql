import {Router} from 'express';
import  {GameController}  from '../controllers/game.controller';

let router : Router = Router();

router.get('/', GameController.getGames);
router.post('/',GameController.postGame);
router.delete('/:id', GameController.deleteGame);

export {router};