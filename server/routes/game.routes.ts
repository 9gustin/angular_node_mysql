import {Router} from 'express';
import  {GameController}  from '../controllers/game.controller';

let router : Router = Router();

router.get('/', GameController.getGames);
router.post('/',GameController.postGame);

export {router};