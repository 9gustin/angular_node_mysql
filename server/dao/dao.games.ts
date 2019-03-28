import pool from '../database';
import { Game } from '../models/game';

let DaoGames: any = {};

DaoGames.getGames = async function (): Promise<JSON> {
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

    let res = await pool.query('UPDATE GAMES SET ? WHERE ID = ?', [game, id]);

    output = (res.affectedRows) ? res.affectedRows : 0;

    return output;
}
export default DaoGames;

