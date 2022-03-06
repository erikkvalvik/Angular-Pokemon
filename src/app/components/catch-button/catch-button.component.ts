import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  pokeBallUrl: string;

  @Input() pokemonId: string = "";

  public isCaught: boolean = false;

  get loading(): boolean {
    return this.catchService.loading;
  }
  

  constructor(
    private trainerService: TrainerService,
    private readonly catchService: CatchService
  ) {
    this.pokeBallUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
   }

  ngOnInit(): void {
    this.isCaught = this.trainerService.inTrainer(this.pokemonId);
  }

  onCatchClick(): void {
    this.catchService.addToTrainer(this.pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          this.isCaught = this.trainerService.inTrainer(this.pokemonId);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);
        }
      })
    
  }

}
