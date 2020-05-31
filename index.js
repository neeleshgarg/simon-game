let gamePattern=[];
let userClickedPattern=[];
let buttonArray=["red", "blue", "green", "yellow"];
let started=false;
let level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    userClickedPattern = [];
    level+=1;
    $("#level-title").text("Level " + level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonArray[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function  playSound(name){
  let audio = new Audio('sounds/'+name+'.mp3');
  audio.play(); 
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");  

    }, 100)
}

function checkAnswer(level){
    if(gamePattern[level]===userClickedPattern[level]){
        console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else{
      console.log("failure");
      let audio = new Audio('sounds/wrong.mp3');
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");  
      }, 200);
      $("#level-title").html("Game Over, Press Any Key to Restart");
      startOver();
  }
}


function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}
