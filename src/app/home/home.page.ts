import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public listaPokemonExibir: any = [];
  public totalPokemon: number;
  public pagina = 1;
  public totalPaginas = 105;

  private url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';

  constructor(private userService: UserService) { }

  ionViewWillEnter() {
    this.buscarPokemons(1);
  }


  public buscarPokemons(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }

    this.pagina = pagina;

    this.userService.buscarPokemon(this.url).subscribe(dados => {
      this.listaPokemonExibir = [];

      this.totalPokemon = dados['count'];

      let listaApi = dados['results'];

      for (let pokemon of listaApi) {
        this.userService.buscarUmPokemon(pokemon.url).subscribe(dadosPokemon => {
          this.listaPokemonExibir.push(dadosPokemon);
        });

      }

    });
  }
}
