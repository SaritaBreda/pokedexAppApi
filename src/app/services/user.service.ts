import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
  
  constructor(private http: HttpClient) { }

  /* Projeto realizado com auxílio da aluna Fernanda Pintucci */

  public buscarTodos(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }

    return this.http.get(`${this.url}?page=${pagina}`);
  }

  public buscarPokemon(url: string) {
    return this.http.get(this.url);
  }

  public buscarUmPokemon(url: string) {
    return this.http.get(`${url}`);
  }


  public buscarId(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

}