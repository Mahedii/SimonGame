var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$("h1").click(function () {
  $("#level-title").slideDown(100);
});
$(document).keypress(function (event) {
  if (event.key == "Enter" && !started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;

  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //console.log(randomNumber)
  //console.log(buttonColors[randomNumber]);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);

  var b = $("#" + randomChosenColor);
  //console.log(b);

  playSoundAnimation(randomChosenColor);
}

//Using click to select the red green blue yellow button
$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  userClick(userChosenColor);

  var currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
  //console.log(userClickedPattern);
  //console.log(event.target.id);
});

//Using Keyboard value r,g,b,y as red, green, blue, yellow
$(document).keypress(function (event) {
  var pressedKey = event.key;
  switch (pressedKey) {
    case "r":
      var color = "red";
      userClick(color);
      break;
    case "g":
      var color = "green";
      userClick(color);
      break;
    case "b":
      var color = "blue";
      userClick(color);
      break;
    case "y":
      var color = "yellow";
      userClick(color);
      break;
  }
  var currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
});

function userClick(clicks) {
  $("#" + clicks).addClass("pressed");
  setTimeout(function () {
    $("#" + clicks).removeClass("pressed");
  }, 100);

  playSoundAnimation(clicks);
  userClickedPattern.push(clicks);
}

//Displaying the animation & sound after clicking any button
function playSoundAnimation(colorName) {
  $("#" + colorName)
    .fadeToggle(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + colorName + ".mp3").play();
}

//Checking the game pattern & user inserted pattern
function checkAnswer(currentLevel) {
  //   console.log(gamePattern);
  //   console.log(userClickedPattern);
  if (
    JSON.stringify(gamePattern[currentLevel]) ===
    JSON.stringify(userClickedPattern[currentLevel])
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    $("#level-title").text("Game Over, Press Enter Key To Restart ");
    gameOverAnimation();
    startOver();
  }
}

//Displaying game over animation, sound
function gameOverAnimation() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  var audio = new Audio("sounds/wrong.mp3").play();
}

//Refreshing the all values for restarting the game
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
