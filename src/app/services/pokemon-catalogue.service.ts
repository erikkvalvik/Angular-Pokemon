import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiPokemon } = environment;

export interface PokemonResponse{
  count: number;
  next: string;
  previous: string;
  results: Pokemon;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;


  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  // set pokemons(): Pokemon[] {
  //   StorageUtil.storageSave<Pokemon[]>("pokemon-list", this.pokemons!);
  //   this._pokemons = this.pokemons;
  // }

  public set setPokemons(pokemons: any | undefined) {
    StorageUtil.storageSave<Pokemon[]>("pokemon-list", pokemons!);
    this._pokemons = pokemons;
  }
  public get getPokemons(): any{
    return StorageUtil.storageRead<Pokemon[]>("pokemon-list")
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    // Checks if pokemon are loaded in session storage.
    if(StorageUtil.storageRead("pokemon-list") !== undefined){
      console.log("storageutil.storageread: ",StorageUtil.storageRead("pokemon-list"))
      console.log("Pokemon not in storage.")
      return;
    }else {

      const offset = Math.floor(Math.random()*(1106 +1))
      this._loading = true;
      this.http.get<Pokemon[]>(apiPokemon + `?limit=649&offset=0`)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe({
          next: (pokemons: any) =>{
            this._pokemons = pokemons.results;
            console.log("pokemons.results: ", pokemons.results);
            console.log("pokemons: ", pokemons);
            //Adds Id and sprite URL to pokemon object
            for(let i = 0; i < this.pokemons.length; i++){
              const url = this.pokemons[i].url;
              const pokeId = url.split('/')[6];
              this.pokemons[i].id = pokeId;
              this.pokemons[i].sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeId +".png";
            }
          },
          error: (error: HttpErrorResponse) => {
            this._error = error.message;
          }
        })
    }
  }
      public pokemonById(id: string): Pokemon | undefined {
        return this._pokemons.find((pokemon: Pokemon) => pokemon.id === id);
      }
  }
  // public getAllPokemon(): Observable<Pokemon[]>{
  //   return this.http.get<PokemonResponse>(apiPokemon + `?limit=100&offset=0`)
  //   .pipe(map(response => [response.results]));
  // }



