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

        if (isValid) {
            newGame.id = uniqid();
            //validacion que el id sea unica    
            let uniqueID: boolean = false;

            while (!uniqueID) {
                uniqueID = DaoGames.idExists(newGame.id);
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
    let params : any = req.params;

    if(params.id){
        if(DaoGames.idExists(params.id)){
            let resDelete : number = await DaoGames.deleteGame(params.id);

            if(resDelete>0){
                res.status(200).json({message:"Se borro el juego satisfactoriamente"});
            }
            else{
                res.status(200).json({message:"No se borro ningun registro"});
            }
        }
        else{
            res.status(200).json({message:"no se encontro el registro que se desea borrar"});
        }
        

    }
    else{
        res.status(400).json({error:"No se paso la id que se quiere borrar"});
    }
}

GameController.putGame = async (req:Request, res:Response)=>{
    let params : any = req.body;

    if(params.name && params.id && params.description && params.image){
        let UpdateGame = new Game();

        UpdateGame.name =  params.name;
        UpdateGame.description = params.description;
        UpdateGame.image = params.image;
        UpdateGame.id = params.id;

        let {errors, isValid} = GameValidator.CheckUpdateGame(UpdateGame);

        if(isValid){
            //si los datos fueron enviados correctamente

            //validar si el id existe
            if(DaoGames.idExists){

                //update
                let id : any = UpdateGame.id;
                UpdateGame.id = undefined;
                UpdateGame.created_at = undefined;

                let resUpdate = await DaoGames.UpdateGame(UpdateGame, id);

                if(resUpdate>0){
                    res.status(200).json({message:"Se actualizo el juego correctamente"});
                }
                else{
                    res.status(200).json({message:"No se actualizaron los datos"});
                }
            }
            else{
                res.status(200).json({message:"no se encontro el registro que se desea actualizar"});
            }
        }
        else{
            res.status(200).json(errors);
        }
    }
    else{
        res.status(400).json({error:"No se enviaron los datos necesarios para realizar la peticion"});
    }
}
export { GameController };