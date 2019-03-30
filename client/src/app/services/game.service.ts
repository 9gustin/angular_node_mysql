import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Game} from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly url_api='http://localhost:3000/api/games/';

  constructor(private http : HttpClient) { 
  }

  postGame(form:NgForm){
    let headers:HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url_api, form, {headers:headers});
  }

  putGame(form:NgForm){
    let headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'aplication/json');
    console.log(form);
    return this.http.put(this.url_api, form,{headers:headers});
  }
  getGames(){
    let headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this.http.get(this.url_api, {headers:headers} );
  }
  getGameById(id:string){
    let headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.http.get(this.url_api+'getGameById/'+id, {headers:headers} );
  }
}
