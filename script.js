
$(document).ready(initializeApp)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var match1 = null;
var match2 = null;
var cardback1 = null;
var cardback2 = null;
var max_matches=9;
var attempts = 0;
var games_played = null;
var accuracy = 0;
var dontflip1 = null;
var dontflip2 = null;
function initializeApp (){
  $(".card").on("click",handleCardClick);
}
function handleCardClick(event){
  var eventThing = $(event.currentTarget.firstElementChild);
  eventThing.addClass("hidden");

  if (firstCardClicked === null) {
    dontflip1 = $(event.currentTarget);
    firstCardClicked = $(event.currentTarget.lastElementChild);
    match1 = firstCardClicked.css("background-image");
    cardback1 = $(event.currentTarget.firstElementChild);
    dontflip1.css("pointer-events","none");
    console.log("css thing dontflip")
  }else{
    dontflip2 = $(event.currentTarget);
    dontflip2.css("pointer-events", "none");
    console.log("css dont flip2")
    secondCardClicked = $(event.currentTarget.lastElementChild);
    match2 = secondCardClicked.css("background-image");
    cardback2 = $(event.currentTarget.firstElementChild);
    attempts++;
    calculateAccuracy();
    displayStats();
    if (match1 === match2) {
      dontflip1 = null;
      dontflip2 = null;
      matches++;
      calculateAccuracy();
      displayStats();
      firstCardClicked = null;
      secondCardClicked = null;
      match1 = null;
      match2 = null;
      if (matches === max_matches){

        $(".modal").removeClass("hidden");
        console.log("you win")
        games_played++;
        resetStats();
        console.log("does it display?")
      }

    } else if(match2 === null || match1 === null) {
      return;
    } else if(match1 !== match2){
      $(".card").addClass("disabled");
      console.log("cant click")
      dontflip1.css("pointer-events", "");
      dontflip2.css("pointer-events", "");
      setTimeout(function () {
        cardback1.removeClass("hidden");
        cardback2.removeClass("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        match1 = null;
        match2 = null;
        cardback1 = null;
        cardback2 = null;
        dontflip1 = null;
        dontflip2 = null;
        $(".card").removeClass("disabled");
        console.log("can click")
      }, 1000);
    }
  }
}
function calculateAccuracy(){
  accuracy = Math.floor((matches/attempts)*100);
  return accuracy;
}
function displayStats(){
  var updatedAccuracy = calculateAccuracy();
  if (isNaN(updatedAccuracy)) {
    updatedAccuracy = 0;
  }
  $(".displayboxGamesPlayed").text(games_played);
  $(".displayboxAttempts").text(attempts);
  $(".displayboxAccuracy").text((updatedAccuracy) + '%');
}
function resetStats(){
matches = 0;
attempts = 0;
accuracy = 0;
dontflip1 = null;
dontflip2 = null;
displayStats();
}
function flipback(){
  $(".card").css("pointer-events", "auto");
  $(".modal").addClass("hidden");
  $(".background").removeClass("hidden");
}
