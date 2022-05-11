import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-generator';
  newPlayerName = '';
  errorMessage = '';
  numberOfTeams: string | number = '';
  players: string[] = [];
  teams: string[][] = [];

  onInput(value: string) {
    this.newPlayerName = value;
  }
  onTeamInput(value: string | number) {
    this.numberOfTeams = value;
  }

  onAddPlayer() {
    if (!this.newPlayerName) {
      this.errorMessage = 'Name can\'t be empty';
      return;
    }

    this.players.push(this.newPlayerName);
    this.newPlayerName = '';
    this.errorMessage = '';
  }

  generateTeams() {
    this.teams = [];
    const allPlayers = [...this.players];

    if (!this.players.length) {
      this.errorMessage = 'Theres no players yet';
      return;
    }
    if (!this.numberOfTeams) {
      this.errorMessage = 'Should be at least 1 team';
      return;
    }

    if (this.players.length < +this.numberOfTeams) {
      this.errorMessage = 'Not enough players!';
      return;
    }
    this.errorMessage = '';

    while (allPlayers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndx = Math.floor(Math.random() * allPlayers.length);
        const selectedPlayer = allPlayers.splice(randomIndx, 1)[0];

        if (this.teams[i]) {
          this.teams[i].push(selectedPlayer);
        } else {
          this.teams[i] = [selectedPlayer];
        }
      }
    }
    this.players = [];
    this.numberOfTeams = '';
  }
  refresh() {
    this.teams = [];
  }
}
