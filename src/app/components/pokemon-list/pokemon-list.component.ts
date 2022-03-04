import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[] = [];


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log("pokemon url: ", this.pokemons[1].url)
      console.log(this.pokemons.length)
      for(let i = 0; i < this.pokemons.length; i++){
        const url = this.pokemons[i].url;
        const pokeId = url.split('/')[6];
        this.pokemons[i].id = pokeId;
        this.pokemons[i].sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeId +".png";
      }
    }, 100);
    console.log("waiting")
  }
  

}
