import "../scss/app.scss";
import { game } from "./gameHandler";

//animations for the rps choices
$(".rps-block").hover(function() {
  $(this).toggleClass("rps-jquery");
});

//handling of button in top right corner

// console.log(player1);
//Game sequence
game();
