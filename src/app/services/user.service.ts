import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
  
  constructor(private http: HttpClient) { }

  public buscarPokemon() {
    return this.http.get(this.url);
  }

  public buscarUmPokemon(url: string) {
    return this.http.get(url);
  }

}