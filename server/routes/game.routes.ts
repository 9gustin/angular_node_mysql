import {Router} from 'express';
import  {GameController}  from '../controllers/game.controller';

let router : Router = Router();

router.get('/', GameController.getGames);
router.post('/',GameController.postGame);
router.delete('/:id', GameController.deleteGame);
router.put('/', GameController.putGame);
router.get('/getGameById/:id', GameController.getGameById);
router.get('/getGamesByParameters/', GameController.getGamesByParameters);


export {router};