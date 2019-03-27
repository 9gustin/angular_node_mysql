import { Request, Response } from 'express';
import uniqid from 'uniqid';
import { Game } from '../models/game';
import GameValidator from '../validacion/game.validator';
import DaoGames from '../dao/dao.games';

let GameController: any = {};

GameController.getGames = async (req: Request, res: Response) => {
    let GameList: any = await DaoGames.getGames();
    if (GameList) res.status(200).json({ GameList });
    else res.status(200).json({ message: "ni ahi perro" });
}
GameController.postGame = async (req: Request, res: Response) => {
    let params: any = req.body;
    //VALIDA QUE LLEGUEN TODOS LOS PARAMETROS   
    if (params.name && params.description && params.image) {
        let newGame = new Game();

        newGame.name = params.name;
        newGame.description = params.description;
        newGame.image = params.image;

        //Validacion que los datos cargados no esten vacios. Con validator
        let { errors, isValid } = GameValidator.checkNewGame(newGame);
        console.log(isValid);
        console.log(errors);
        if (isValid) {
            newGame.id = uniqid();


            //validacion que el id sea unica    
            let uniqueID: boolean = false;

            while (!uniqueID) {
                uniqueID = DaoGames.IdValid(newGame.id);
            }

            //ID VALIDADADA

            let resInsert = await DaoGames.InsertGame(newGame);

            if (resInsert > 0) {
                res.status(200).json({ message: "Se inserto correctamente el juego" });
            }
            else {
                res.status(200).json({ message: "No se pudo insertar el juego" });
            }
        }
        else {
            res.status(200).json({ errors });
        }

    }
    else {
        res.status(400).json({ error: "No se enviaron los datos necesarios para registrar un juego" })
    }
}

GameController.deleteGame = async (req:Request, res:Response)=>{
    let params = req.params;

    if(params.id){
        let resDelete : number = await DaoGames.deleteGame(params.id);

        if(resDelete == -1){
            res.status(200).json({message:"No se encontro el registro que se desea borrar"});
        }
        if(resDelete>0){
            res.status(200).json({message:"Se borro el juego satisfactoriamente"});
        }
        else{
            res.status(200).json({message:"No se borro ningun registro"});
        }

    }
    else{
        res.status(400).json({error:"No se paso la id que se quiere borrar"});
    }
}

export { GameController };