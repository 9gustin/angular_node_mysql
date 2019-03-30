import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css',
    '../game-form/game-form.component.css'
  ]
})
export class GameComponent implements OnInit {
  gameList: any = [];
  status: string = '';

  constructor(private gameService: GameService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getGames();
  }
  addGame(){
    this.router.navigate(['add']);
  }
  getGames() {
    this.gameService.getGames().subscribe(
      (response: any) => {
        if (response.source) {
          this.gameList = response.source;
        }
        else {
          this.status = response.error;
          console.log(response);
        }
      }
      , error => {
        console.log(error);
      }
    );
  }
  editGame(id:string){
    this.router.navigate(['edit/'+id]);
  }

}
