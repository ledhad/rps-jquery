import "../scss/app.scss";

import $ from "jquery";

console.log("Hello index.js jquery handler used with webpack");

// Init

$(".rps-block").hover(function() {
  $(this).toggleClass("rps-jquery");
});

let $myVar = 23;
$(".points-p1").text("Opponent has " + $myVar + " points");
