import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {router} from './routes/game.routes';

class App{
    app : Application = express();

    constructor(){
        this.config();
        this.middlewares();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.port || 3000);
    }
    middlewares():void{
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors({origin:'http://localhost:4200'}));
    }
    routes():void{
        this.app.use('/api/games', router);
    }
    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server running on port', this.app.get('port'));
        })
    }
}

let app = new App();
app.start();