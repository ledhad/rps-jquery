import "../scss/app.scss";

import $ from "jquery";

console.log("Hello from Webpack");

$(".title").click(function() {
  alert($(this).text());
});
