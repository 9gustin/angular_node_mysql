import pool from '../database';
import { Game } from '../models/game';

let DaoGames: any = {};

DaoGames.SelectGames = async function (): Promise<JSON> {
    let lst = await pool.query('SELECT * FROM GAMES ORDER BY CREATED_AT DESC');

    return lst;
}
DaoGames.idExists = async function (id: string): Promise<boolean> {
    let GamesWithSameId: any = await pool.query('SELECT * FROM GAMES WHERE ID = ?', [id]);

    let output: boolean = false;

    if (GamesWithSameId.length == 0) {
        output = false;
    }
    else {
        output = true;
    }

    return output;
}

DaoGames.InsertGame = async function (game: Game): Promise<number> {
    let res = await pool.query('INSERT INTO GAMES SET ?', [game]);

    let output: number = (res.affectedRows) ? res.affectedRows : 0;

    return output;
}
DaoGames.deleteGame = async function (id: string): Promise<number> {
    let output: number = 0;

    let res = await pool.query('DELETE FROM GAMES WHERE ID=?', [id]);

    output = (res.affectedRows) ? res.affectedRows : 0;

    return output;
}

DaoGames.UpdateGame = async function (game: Game, id:string): Promise<number> {
    let output: number = 0;
    
    let gameJson = {
        name : game.name,
        description:game.description,
        image : game.image
    };

    let res = await pool.query('UPDATE GAMES SET ? WHERE ID = ?', [gameJson, id]);

    output = (res.affectedRows) ? res.affectedRows : 0;

    return output;
}
DaoGames.SelectGameById = async function(id:string) : Promise<Game>{
    let game : Game = await pool.query('SELECT * FROM GAMES WHERE ID = ? LIMIT 1', [id]);

    return game;
}

DaoGames.SelectGamesByParameters = async function(params:any):Promise<JSON>{

    params.name = '%'+params.name+'%';
    params.description = '%'+params.description+'%';

    let output : any = await pool.query("SELECT * FROM GAMES WHERE name like ? and description like ?;", [params.name, params.description]);

    return output;
}
export default DaoGames;


