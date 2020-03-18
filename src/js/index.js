//index.js is just the entry point for the codeimport "../scss/app.scss";

import "../scss/app.scss"; //our styles imported in index.js then bundled with webpack
import "../assets/favicon-16x16.png"; //favicon, I did not manage to export it directly with webpack
import { handleButtons } from "./buttonHandler";
import { handleRound } from "./gameHandler";
import { Player } from "./user";

//Creating the state for the game and lauching the game
function game() {
  //create a state
  let initState = {
    player1: new Player(),
    player2: new Player(),
    rounds: 0,
    numberMatchUps: 2
  };
  //pass state to the game handler
  handleRound(initState);
}

//Animation for the buttons
handleButtons();

//launch game
game();
