import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

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

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<Pokemon[]>(apiPokemon + `?limit=100&offset=0`)
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
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
  // public getAllPokemon(): Observable<Pokemon[]>{
  //   return this.http.get<PokemonResponse>(apiPokemon + `?limit=100&offset=0`)
  //   .pipe(map(response => [response.results]));
  // }


}
