import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public listaPokemon = [];
  public listaPokemonExibir = [];

  public pagina = 1;
  public totalPaginas = 0;

  public next: string;
  public previous: string;

  constructor(private userService: UserService) {
    this.buscarPokemon();
  }

  public async buscarPokemon() {
    await this.userService.buscarPokemon().subscribe(dados => {
      this.listaPokemon = [];
      this.totalPaginas = dados['count'] / 10;
      this.previous = dados['previous'];
      this.next = dados['next'];

      let listaApi = dados['results'];

      for (let pokemon of listaApi) {
        this.userService.buscarUmPokemon(pokemon.url).subscribe(dadosPokemon => {
          this.listaPokemon.push(dadosPokemon);

          this.ordenarLista();
        });
      }
    });
  }

  private ordenarLista() {
    this.listaPokemon.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
        return 0;
    });
    this.listaPokemonExibir = this.listaPokemon;
  }

  public paginacao(url, movimento) {
    this.pagina = this.pagina + movimento;

    this.userService.url = url;

    this.buscarPokemon();
  }
}