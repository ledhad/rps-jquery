//Those functions only implement the animations. no logic
export function handleButtons() {
  initResumeBtn();
  handleButtonHelp();
  handleButtonStart();
  handleButtonResume();
  handleButtonAuto();
}

// => welcome-rules-screen <= is just a selector in the DOM (no styles)

function handleButtonHelp() {
  //at init not active
  $(".rules-btn").css("pointer-events", "none");
  //simple toggle of the rules screen
  $(".rules-btn").click(function() {
    toggle(".welcome-rules-screen");
    $(".start-screen").css("height", "510px");
  });
}

function handleButtonStart() {
  $(".start-btn").click(function() {
    //allow clicks on the rules btn
    $(".rules-btn").css("pointer-events", "auto");
    //make the rules screen off
    toggle(".welcome-rules-screen");
    //at init it says "Start Game", changing it to ""Restart Game !" atfer first click
    $(".start-btn").text("Restart Game !");
    //allowing user to resume the game once in a game
    $(".resume-btn").css({
      display: "inline-block",
      visibility: "visible"
    });
    //toggling  the red active state of the auto btn when restarting a game
    $(".auto-btn").removeClass("auto-btn--active");
  });
}

function handleButtonResume() {
  $(".resume-btn").click(function() {
    //simple toggle of the rules screen
    toggle(".welcome-rules-screen ");
  });
}

//opens the rules screen OR the input form screen
export function toggle(screen) {
  if ($(screen).hasClass("screen-container")) {
    $(screen).addClass("screen-container--active");
    $(screen).removeClass("screen-container");
  } else {
    $(screen).addClass("screen-container");
    $(screen).removeClass("screen-container--active");
  }
}

//resume btn invisible if not in a current matchup
export function initResumeBtn() {
  $(".resume-btn").css({
    display: "none",
    visibility: "hidden"
  });
}

function handleButtonAuto() {
  $(".auto-btn").click(function() {
    $(this).toggleClass("auto-btn--active");
    //no need for the resume btn in auto mode
    initResumeBtn();
    $(".welcome-rules-screen").addClass("screen-container");
    $(".welcome-rules-screen").removeClass("screen-container--active");
  });
}

//style for the user's choice
$(".rps-block").hover(function() {
  $(this).toggleClass("rps-jquery");
});
