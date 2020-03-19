import { toggle, initResumeBtn } from "./buttonHandler";

//Game logic and logic of buttons triggered

//DOM updater with the values of the scors of each player and the current round
export function update(player1, player2, rounds) {
  $(".points-p2")
    .find("h3")
    .text("Opponent has " + player2.points + " points");

  $(".points-p1")
    .find("h3")
    .text("You have " + player1.points + " points");
  let currentRound = rounds + 1;
  $(".number-round")
    .find("span.currentRound")
    .text("Round " + currentRound + " of ");
}

//calculate the scores of the two players based on their choice during current match up
function calculate(player1, player2) {
  let p1Choice = player1.rpsChoice;
  let p2Choice = player2.rpsChoice;
  let winner = "";

  switch (p2Choice) {
    case "paper":
      if (p1Choice === "scissors") {
        player1.incPoints();
        winner = "p1";
      }
      if (p1Choice === "rock") {
        player2.incPoints();
        winner = "p2";
      }
      break;
    case "rock":
      if (p1Choice === "paper") {
        player1.incPoints();
        winner = "p1";
      }
      if (p1Choice === "scissors") {
        player2.incPoints();
        winner = "p2";
      }
      break;
    case "scissors":
      if (p1Choice === "rock") {
        player1.incPoints();
        winner = "p1";
      }
      if (p1Choice === "paper") {
        player2.incPoints();
        winner = "p2";
      }
      break;
    default:
      winner = "draw";
  }

  player1.incMatchUps();
  player2.incMatchUps();
  player1.setChoice("");
  //this is added for the specific case of a draw. added for some animations best on the result of the match up. see handleRound()
  return winner;
}

//checking for valid input: a positive integer
function inputCheckValidity(input) {
  let number = parseFloat(input);
  //number input cannot be negative, a float, or too high (note : a high number could compute with time)
  if (number > 0 && Number.isInteger(number) && number < 100001) {
    $(".enter-btn").removeClass("btn-blur");
    $(".input").removeClass("input-blur");
    return true;
  }
  //Some visual aid to indicate that the number is not good
  $(".enter-btn").toggleClass("btn-blur");
  $(".input").toggleClass("input-blur");
  return false;
}

//Checking the user input to resolve the request in handleRound()
function requestResolver(player1, player2, rounds, numberMatchUps) {
  //get the value in the input, if any
  let input = $(".input")
    .find("input")
    .val();
  //set validity to false
  let inputValid = false;
  //check fo validity. returns true if valid
  inputValid = inputCheckValidity(input);

  if (inputValid) {
    numberMatchUps = parseInt(input);
    update(player1, player2, rounds);

    //return the updated number of match ups
    return numberMatchUps;
  }
  //otherwise return false
  return false;
}

export function handleRound({
  player1,
  player2,
  rounds,
  numberMatchUps
} = state) {
  //block at the start to ask the user for the number of games to play
  $(".rules-btn").css("pointer-events", "none");
  $(".auto-btn").css("pointer-events", "none");
  $(".rps-block").css("pointer-events", "none");
  let autoReMatch = false;
  let reqResolver = false;
  update(player1, player2, rounds);

  $(".set-rematch-btn").on("click", () => {
    autoReMatch = false;
    $(".start-screen").css({ height: "450px" });
    $(".rules-btn").css("pointer-events", "none");
    $(".auto-btn").css("pointer-events", "none");

    //update DOM
    initResumeBtn();
    //resets before starting the game
    rounds = 0;
    resetter(player1, player2, rounds);

    //updating DOM
    update(player1, player2, rounds);
    $(".number-round span:nth-child(2)").remove();
  });

  $(".start-btn").click(function() {
    //Ask the user (only once) for a specific amount of rounds to play
    if (!autoReMatch) {
      //I know this is not well coded at all. We call requestResolver() as many times as we click or enter and create many. I did not have time to change this. But I will.
      let promise = new Promise(res => {
        toggle(".popup-screen");
        $(".start-screen").css({ height: "200px" });
        //checking for the enter key
        $(document).on("keypress", function(e) {
          if (e.which == 13) {
            reqResolver = requestResolver(
              player1,
              player2,
              rounds,
              numberMatchUps
            );
            if (reqResolver) {
              numberMatchUps = reqResolver;
              res();
            }
          }
        });
        //checking for click on the button
        $(".enter-btn").on("click", function() {
          reqResolver = requestResolver(
            player1,
            player2,
            rounds,
            numberMatchUps
          );
          if (reqResolver) {
            //if resolved then we update the number of match ups
            numberMatchUps = reqResolver;
            res();
          }
        });
      });
      promise.then(() => {
        $(".number-round").append("<span>" + numberMatchUps + "</span>");
        $(".rules-btn").css("pointer-events", "auto");
        $(".auto-btn").css("pointer-events", "auto");
        toggle(".popup-screen");
        //The user won't have to choose that again. if disable then a score has to be set everytime.
        autoReMatch = true;

        //by default the icons for the choices have opacity set on 0.3
        $(".rps-block").addClass("rps-block--active");
        //rps choice clickable only after the steps above
        $(".rps-block").css("pointer-events", "auto");
      });
    }
    //resets before starting the game
    rounds = 0;
    resetter(player1, player2, rounds);
    //destroy messages for a new game
    destroyResultMsgs();
  });
  //waiting for a click by the user.
  $(".rps-block").click(function() {
    //get user's choice
    let rpsChoice = $(this)
      .attr("class")
      .split(" ")[1];
    //prevent user for clicking again and removing style
    $(".rps-block").css("pointer-events", "none");
    $(".rps-block").removeClass("rps-block--active");

    //some animations
    player1.setChoice(rpsChoice);

    animationChoicePlayer1(rpsChoice);
    //no arguments here because the bot always chooses paper
    animationChoicePlayer2(); //note : i did not refactor this time

    //match-up
    let winner = calculate(player1, player2);
    //style to animate the versus logo
    $(".vs-logo").addClass("vs-logo--active");

    //promise
    let promise = new Promise(resolve => {
      //we had some delay for better user experience
      setTimeout(() => {
        //removing classes and resetting to a state where user can play
        $(".rps-block").toggleClass("rps-block--active");
        $(".rps-block").css("pointer-events", "auto");
        $(".choice-p2").toggleClass("choice-p2--active");
        $(".choice-p1").toggleClass("choice-p1--active");

        rounds++;
        //updating DOM
        update(player1, player2, rounds);
        $(".vs-logo").removeClass("vs-logo--active");
        resolve();
      }, 1500);
      //more delay for some animations experience
      setTimeout(() => {
        if (winner === "p1") {
          $(".choice-p1").toggleClass("choice-p1--win");
        } else if (winner === "p2") {
          $(".choice-p1").toggleClass("choice-p1--loose");
        } else {
          $(".vs-logo").toggleClass("vs-logo--draw");
        }
      }, 800);
    });

    promise.then(() => {
      setTimeout(() => {
        //removeing the animation styles
        $(".choice-p1").removeClass("choice-p1--win");
        $(".choice-p1").removeClass("choice-p1--loose");
        $(".vs-logo").removeClass("vs-logo--draw");
        //clearing some animations
        $(".choice-p2").css({ "background-image": "", opacity: "1" });
        $(".choice-p1")
          .find("span")
          .css({ "background-image": "", opacity: "0" });
      }, 0);

      //if all rounds are played we enter this condition
      if (rounds === numberMatchUps) {
        $(".rules-btn").css("pointer-events", "none");
        let resultsP1 = player1.points; //PB
        let resultsP2 = player2.points; // PA

        //display scores
        let { winnerMsg, tieMsg } = messages(
          resultsP1,
          resultsP2,
          numberMatchUps
        );
        //display results
        showResults(winnerMsg, tieMsg);

        //database (opt) - not done yet, and probably won't for lack of time

        //resets
        rounds = 0;
        resetter(player1, player2, rounds);
      }
    });
  });

  //handle click mode auto
  $(".auto-btn").click(function() {
    destroyResultMsgs();
    $(".auto-btn").addClass("auto-btn--active");
    //launch mode auto
    autoMode(player1, player2, rounds, numberMatchUps);
  });

  //reset if restart
  $(".start-btn").click(function() {
    $(".rules-btn").css("pointer-events", "auto");
    //resets
    // $(".start-screen").css("height", "510px");
    rounds = 0;
    resetter(player1, player2, rounds);
    update(player1, player2, rounds);
  });
}

//creating path to get appropriate pictures based on the names : "paper", "rock", "scissors"
function urlAssetCreator(baseName) {
  let urlPath = "img/" + baseName + "-active.png";
  return urlPath;
}
//setting some animation for the opponent's choice
function animationChoicePlayer2() {
  let path = urlAssetCreator("paper");

  $(".choice-p2")
    .toggleClass("choice-p2--active")
    .delay(400);

  $(".choice-p2--active")
    .css({ "background-image": "url(" + path + ")", opacity: "0" })
    .animate({ opacity: "1" }, 700);
}
//setting some animation for the user's choice
function animationChoicePlayer1(asset) {
  let path = urlAssetCreator(asset);
  $(".choice-p1").toggleClass("choice-p1--active");
  $(".choice-p1--active")
    .find("span")
    .css({ "background-image": "url(" + path + ")", opacity: "0" })
    .animate({ opacity: "1" }, 400);
}

//creating the right message according to the player's scores
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
      "<br> (points: " +
      score[0] +
      " against " +
      score[1] +
      " )";
  }
  let msg = { winnerMsg, tieMsg };

  return msg;
}

// formatting a message and showing it in the DOM
function showResults(winnerMsg, tieMsg) {
  let $divMsg = $("<div class='resultMsgs'></div>");
  $(".start-screen")
    .append($divMsg)
    .css("height", "550px");
  $(".resultMsgs").append(
    "<h3>" + winnerMsg + "</h3>",
    "<h3>" + tieMsg + "</h3>"
  );
  //opening a popup in the app to display the results
  toggle(".welcome-rules-screen");
  initResumeBtn();
}

//resetting the score of the players
function resetter(player1, player2, rounds, numberMatchUps) {
  player1.reset();
  player2.reset();
  //updating the DOM
  update(player1, player2, rounds);
}

//mode where an entier game is played with random choices from the user
function autoMode(player1, player2, rounds, numberMatchUps) {
  //blocking everything
  $(".rps-block").removeClass("rps-block--active");
  $(".rps-block").css("pointer-events", "none");
  $(".rules-btn").css("pointer-events", "none");
  //resetting
  rounds = 0;
  resetter(player1, player2, rounds);
  //array of possible choices
  let choices = ["paper", "scissors", "rock"];
  // promise that ends when all the rounds have been played
  let promise = new Promise(res => {
    setTimeout(() => {
      for (let i = 0; i < numberMatchUps; i++) {
        let ranInt = Math.floor(Math.random() * 3);
        let playerChoice = choices[ranInt];
        player1.setChoice(playerChoice);

        calculate(player1, player2);
        update(player1, player2, rounds);
        rounds++;
      }
      let resultsP1 = player1.points; // PB
      let resultsP2 = player2.points; // PA
      //display scores
      let { winnerMsg, tieMsg } = messages(
        resultsP1,
        resultsP2,
        numberMatchUps
      );
      showResults(winnerMsg, tieMsg);
      res();
    }, 1000); //timing is optional. here set for the animations
  });

  promise.then(() => {
    //force the user to click on the restart btm for a new game
    $(".start-btn").click(function() {
      //Unblock everything AND
      $(".rps-block").addClass("rps-block--active");
      $(".rps-block").css("pointer-events", "auto");
      $(".rules-btn").css("pointer-events", "auto");
      //Remove active state on the auto btn
      $(".auto-btn").removeClass("auto-btn--active");
    });
  });
}

//updating DOM by removing the messages of the result of the previous the game
function destroyResultMsgs() {
  $(".resultMsgs").remove();
}
