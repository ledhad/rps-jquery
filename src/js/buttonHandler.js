import { game } from "./gameHandler";

export function handleButtons() {
  initResumeBtn();
  handleButtonHelp();
  handleButtonStart();
  handleButtonResume();
  handleButtonAuto();
}

function handleButtonHelp() {
  //at init not active
  $(".rules-btn").css("pointer-events", "none");
  $(".rules-btn").click(function() {
    toggle();
  });
}

function handleButtonStart() {
  $(".start-btn").click(function() {
    $(".rules-btn").css("pointer-events", "all");
    toggle();
    $(".start-btn").text("Restart Game !");
    $(".resume-btn").css({
      display: "inline-block",
      visibility: "visible"
    });

    //start a new Game
    destroyResultMsgs();
    if ($(".auto-btn").hasClass("auto-btn--active")) {
    } else {
      $(".auto-btn").removeClass("auto-btn--active");
    }
  });
}

function handleButtonResume() {
  $(".resume-btn").click(function() {
    toggle();
  });
}

export function toggle() {
  if ($(".welcome-rules-screen").hasClass("screen-container")) {
    $(".welcome-rules-screen").addClass("screen-container--active");
    $(".welcome-rules-screen").removeClass("screen-container");
  } else {
    $(".welcome-rules-screen").addClass("screen-container");
    $(".welcome-rules-screen").removeClass("screen-container--active");
  }
}

export function initResumeBtn() {
  $(".resume-btn").css({
    display: "none",
    visibility: "hidden"
  });
}

export function destroyResultMsgs() {
  $(".resultMsgs").remove();
}

function handleButtonAuto() {
  $(".auto-btn").click(function() {
    $(this).toggleClass("auto-btn--active");
    initResumeBtn();
    $(".welcome-rules-screen").addClass("screen-container");
    $(".welcome-rules-screen").removeClass("screen-container--active");
  });
}
