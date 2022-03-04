import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const {apiTrainers, api_key} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

    public login(username: string): Observable<Trainer> {
      return this.checkUsername(username)
        .pipe(
          switchMap((trainer: Trainer | undefined) => {
            if(trainer === undefined){
              return this.createTrainer(username);
            }
            return of(trainer);

          })
        )
    }
    
    
    // Check if trainer exists
    private checkUsername(username: string): Observable<Trainer | undefined> {
      return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => {
          return response.pop();
        })
      )
    }
    
    // IF !trainer - create trainer
    private createTrainer(username: string): Observable<Trainer>{
      const trainer = {
        username,
        pokemon: []
      };

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-api-key": api_key
      });

      return this.http.post<Trainer>(apiTrainers, trainer, {
        headers
      });
    }

    // IF trainer || created trainer - store trainer
}
