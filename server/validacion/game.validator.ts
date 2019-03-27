import validator from 'validator';
import {Game} from '../models/game';

let GameValidator : any = {};

GameValidator.checkNewGame = function(game:Game):JSON{
    game.name = (game.name=="undefined" || game.name==undefined || game.name == null)? '' : game.name;
    game.description = (game.description=="undefined" || game.description==undefined || game.description == null)? '' : game.description;
    game.image = (game.image=="undefined" || game.image==undefined || game.image == null)? '' : game.image;
    
    let errors:any = {};
    if(validator.isEmpty(game.name)){
        errors.name = 'El nombre no puede estar incompleto';    
    }
    if(validator.isEmpty(game.description)){
        errors.description = 'Introduzca una descripcion para el juego';
    }

    if(validator.isEmpty(game.image)){
        errors.image = 'Introduzca una imagen al juego';
    }

    let isValid : boolean = (errors.name ||  errors.descripcion || errors.image)? false:  true ;

    let output : any = {
        errors : errors,
        isValid : isValid
    };

    return output;
}

export default GameValidator;
