export class Player {
  constructor() {
    this.points = 0;
    this.matchUps = 0;
    this.rpsChoice = "paper"; //default
  }
  setChoice(choice) {
    this.rpsChoice = choice;
  }
  incPoints() {
    this.points += 1;
  }
  incMatchUps() {
    this.matchUps += 1;
  }
  getPoints() {
    return this.points;
  }
  getMatchUps() {
    return this.matchUps;
  }
}
