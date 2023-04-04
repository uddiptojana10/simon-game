var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};


function nextSequence() {

    userClickedPattern=[];

    level++;
    
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

};

function startOver(){
    level=0;
    start=false;
    gamePattern=[]
};

function wrong(){
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        wrong();
        startOver();
    }
    
};

$(".btn").click(function () {
    var userChosenColour = (this.id);

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


$(document).keydown(function () {
    if (!start) {
        $("h1").text("Level " + level);
        start=true;
        nextSequence();

    }

});
