import "../scss/app.scss";

import "../assets/favicon-16x16.png";
import { handleButtons } from "./buttonHandler";
import { game } from "./gameHandler";

//animations for the rps choices
$(".rps-block").hover(function() {
  $(this).toggleClass("rps-jquery");
});

//handling of button in top right corner

handleButtons();

game();
