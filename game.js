var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var blue = new Audio('sounds/blue.mp3');
var green = new Audio('sounds/green.mp3');
var red = new Audio('sounds/red.mp3');
var yellow = new Audio('sounds/yellow.mp3');
var wrong = new Audio('sounds/wrong.mp3');
var level = 0;
var highscore = 0;


function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

function playSound(colour) {
  switch (colour) {
    case "red":
      red.play();
      break;
    case "blue":
      blue.play();
      break;
    case "green":
      green.play();
      break;
    case "yellow":
      yellow.play();
      break;
    default:
      break;
  }
}

$(document).keypress(function(event) {
  // console.log(event.key);
  if (level === 0) {
      $("#level-title").text("Starting new game");
    setTimeout(function() {
      nextSequence();
    }, 1500);
  }
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
})

$(".btn-new-game").click(function() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  if (level === 0) {
      $("#level-title").text("Starting new game");
    setTimeout(function() {
      nextSequence();
    }, 1500);
  }
})

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over. Press any key to play again.");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 1000);
  if ( level > highscore){
    highscore = level;
    $("#highscore-title").text("Highscore = "+ highscore);
  }
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
