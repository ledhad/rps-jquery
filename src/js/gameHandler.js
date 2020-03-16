import { Player } from "./user";

export function game() {
  let player1 = new Player(); //Player B
  let player2 = new Player(); //Player A

  let rounds = 0;
  let numberMatchUps = 5;
  $(".rps-block").addClass("rps-block--active");
  update(player1, player2, rounds);

  let result = handleRound(player1, player2, rounds, numberMatchUps);
  if (result) {
    console.log("match up done");
  }
}

function update(player1, player2, rounds) {
  $(".points-p2").text("Opponent has " + player2.points + " points");

  $(".points-p1").text("You have " + player1.points + " points");
  let currentRound = rounds + 1;
  $(".number-round").text("Round " + currentRound);
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
  player1.setChoice("");
}

function handleRound(player1, player2, rounds, numberMatchUps) {
  $(".rps-block").click(function() {
    let rpsChoice = $(this)
      .attr("class")
      .split(" ")[1];

    $(".rps-block").removeClass("rps-block--active");
    $(".rps-block").css("pointer-events", "none");

    player1.setChoice(rpsChoice);
    animationChoicePlayer1(rpsChoice);
    animationChoicePlayer2();

    calculate(player1, player2);

    let promise = new Promise(resolve => {
      setTimeout(() => {
        $(".rps-block").toggleClass("rps-block--active");
        $(".rps-block").css("pointer-events", "auto");
        $(".choice-p2").toggleClass("choice-p2--active");
        $(".choice-p1").toggleClass("choice-p1--active");

        rounds++;
        console.log(rounds);
        update(player1, player2, rounds);
        resolve();
      }, 1500);
    });

    promise.then(() => {
      if (rounds === numberMatchUps) {
        let resultsP1 = player1.points; //PB
        let resultsP2 = player2.points; // PA

        //display scores
        let { winnerMsg, tieMsg } = messages(
          resultsP1,
          resultsP2,
          numberMatchUps
        );

        //database - opt

        //resets
        rounds = 0;
        player1.reset();
        player1.reset();
        update(player1, player2, rounds);
      }
    });
  });
}

function urlAssetCreator(baseName) {
  let urlPath = "img/" + baseName + "-active.png";
  return urlPath;
}

function animationChoicePlayer2() {
  let path = urlAssetCreator("paper");

  $(".choice-p2")
    .toggleClass("choice-p2--active")
    .delay(400);
  $(".choice-p2--active")
    .css({ "background-image": "url(" + path + ")", opacity: "0" })
    .animate({ opacity: "1" }, 700);
}

function animationChoicePlayer1(asset) {
  let path = urlAssetCreator(asset);
  $(".choice-p1").toggleClass("choice-p1--active");
  $(".choice-p1--active")
    .find("span")
    .css({ "background-image": "url(" + path + ")", opacity: "0" })
    .animate({ opacity: "1" }, 400);
}

function messages(resultsP1, resultsP2, numberMatchUps) {
  //get results
  let playerWinner;
  let winnerMsg;
  let score =
    resultsP1 >= resultsP2 ? [resultsP1, resultsP2] : [resultsP2, resultsP1];
  let ties = numberMatchUps - (resultsP1 + resultsP2);
  //messages

  let tieMsg = "Tie: " + ties + " of " + numberMatchUps + " games";

  if (resultsP1 === resultsP2) {
    let plural = "s";
    if (resultsP1 === 1) {
      plural = "";
    }
    winnerMsg = "Players tie with " + resultsP1 + " point" + plural + " each";
  } else {
    playerWinner = resultsP1 > resultsP2 ? "Player B" : "Player A";
    winnerMsg =
      "Winner is: " +
      playerWinner +
      " (" +
      score[0] +
      " to " +
      score[1] +
      " wins)";
  }
  let msg = { winnerMsg, tieMsg };

  return msg;
}
