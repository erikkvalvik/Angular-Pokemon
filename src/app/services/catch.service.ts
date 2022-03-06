import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { api_key, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  public addToTrainer(pokemonId: string): Observable<Trainer> {
    if(!this.trainerService.trainer){
      throw new Error("addToTrainer: There is no trainer");
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonById(pokemonId);

    if(!pokemon){
      throw new Error("addToTrainer: No pokemon with id: " + pokemonId);
    }
    //Does this pokemon exist in trainer?
    if(this.trainerService.inTrainer(pokemonId)){
      this.trainerService.removeFromTrainer(pokemonId);
    } else {
      this.trainerService.addToTrainer(pokemon);
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': api_key
    })

    this._loading = true;

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      }),
      finalize(() => {
        this._loading = false;
      })
    )
  }

}
