import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.getPokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
    setTimeout(() => {
      console.log("this.pokemons: ",this.pokemons.length)
      if(this.pokemons.length !== 0){
        this.pokemonCatalogueService.setPokemons = this.pokemons;
      }
      console.log("after", this.pokemonCatalogueService.getPokemons)
      
    }, 100);
    // this.pokemonCatalogueService.getAllPokemon();
    
  }

}
