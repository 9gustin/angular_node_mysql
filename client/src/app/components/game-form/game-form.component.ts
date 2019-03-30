import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Game } from 'src/app/models/game';
@Component({
  selector: 'game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
  providers: [GameService]
})
export class GameFormComponent implements OnInit {
  game : Game = {};

  errors :any= {}; 
  respuesta : string = 'skere';

  constructor(private gameService : GameService,private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    let id : string ='';
    this.activatedRoute.params.subscribe(
      (params:any)=>{
        id = params.id;
      }
    );
      this.getGame(id);
  }
  getGame(id:string){
    console.log('id:',id);
    this.gameService.getGameById(id).subscribe(
      (response:any)=>{
        this.game = response.source[0];
        console.log('res:',response);
      },error=>{
        console.log(error);
      }
    );
    console.log(this.game);
  }
  GameList(){
    this.router.navigate(['/']);
  }

  saveGame(form:NgForm){
    if(form.value.id != '' && form.value.id != undefined && form.value.id!=null){
      console.log(form.value);
      this.gameService.putGame(form.value).subscribe(
        (response:any)=>{
          if(response.errors){
            this.errors = response.errors;
          }
          else if(response.message){
            form.reset();
            this.respuesta = response.message;
            this.errors = {};
          }
          else if(response.error){
            this.respuesta = response.error;
          }
        },
        error=>{
          console.log(error);
        }
      );
    }
    else{
      this.gameService.postGame(form.value).subscribe(
        (response:any)=>{
          if(response.errors){
            this.errors = response.errors;
          }
          else if(response.message){
            form.reset();
            this.respuesta = response.message;
            this.errors = {};
          }
          else if(response.error){
            this.respuesta = response.error;
          }
        },
        error=>{
          console.log(error);
        }
      );;
    }
  }

}
