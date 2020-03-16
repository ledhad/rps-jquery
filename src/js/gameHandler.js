import { Player } from "./user";

function update(player1, player2, rounds) {
  $(".points-p1").text("Opponent has " + player1.points + " points");

  $(".points-p2").text("You have " + player2.points + " points");
  $(".number-round").text("Round " + rounds);

  $(".choice-p1").removeClass("paper");
  $(".choice-p1").removeClass("rock");
  $(".choice-p1").removeClass("scissors");
}

export function game() {
  let player1 = new Player();
  let player2 = new Player();

  let rounds = 1;
  let numberMatchUps = 5;

  update(player1, player2, rounds);

  // for (let i = 0; i < numberMatchUps; i++) { }
  // $(".rps-block").addClass("rps-block--active");

  // $(".rps-block").click(function() {
  //   let rpsChoice = $(this)
  //     .attr("class")
  //     .split(" ")[1];
  //   player2.setChoice(rpsChoice);

  //   $(".choice-p1").addClass(rpsChoice);
  // });
  // $(".rps-block").removeClass("rps-block--active");

  // calculate(player1, player2);

  // console.log(player1, player2);
  // rounds > 5 ? rounds++ : (rounds = 1);
  // update(player1, player2, rounds);
}

function calculate(player1, player2) {
  let p1Choice = player1.rpsChoice;
  let p2Choice = player2.rpsChoice;

  switch (p2Choice) {
    case "paper":
      if (p1Choice === "scissors") {
        player1.incPoints();
      }
      if (p1Choice === "rock") {
        player2.incPoints();
      }
      break;
    case "rock":
      if (p1Choice === "paper") {
        player1.incPoints();
      }
      if (p1Choice === "scissors") {
        player2.incPoints();
      }
      break;
    case "scissors":
      if (p1Choice === "rock") {
        player1.incPoints();
      }
      if (p1Choice === "paper") {
        player2.incPoints();
      }
      break;
  }

  player1.incMatchUps();
  player2.incMatchUps();
  player2.setChoice("");
}
