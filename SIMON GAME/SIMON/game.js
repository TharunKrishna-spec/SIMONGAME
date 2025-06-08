var buttoncolors=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamepattern=[]  ;
var level=0;
var started=false;
var highScore = localStorage.getItem("highScore") || 0;
var isMuted = false;

updateScoreDisplay(0); // Initialize score at 0

$("#restart-btn").click(function () {
  console.log("🔁 Game forcefully restarted");
  StartOver();
  updateScoreDisplay(0);

  $("#level-title").text("Restarting...");
  setTimeout(() => {
    nextSequence();
    started = true;
  }, 500);
});


function StartOver() {
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
  started = false;
  $("#level-title").text("Game Restarted");
}



$("#mute-btn").click(function () {
  isMuted = !isMuted;

  // Change button icon
  $("#mute-btn").text(isMuted ? "🔇" : "🔊");

  // Optional: Play toggle sound only when unmuting
  if (!isMuted) {
    var toggleSound = new Audio("sounds/toggle.mp3");
    toggleSound.play();
  }

  // Pause or play background music accordingly
  if (isMuted) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
});


$(".btn").click(handeler);
function handeler(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatepress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel) {
    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();         
        }, 1000);
      }
    } else {
      console.log("wrong");
      if (!isMuted) {
      var audioa = new Audio('sounds/wrong.mp3');
       audioa.play();
      }

       updateScoreDisplay(0);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
         $("body").removeClass("game-over");
        }, 200);
         StartOver()
        $("#restart-btn").show();
       
      
    }

}

function nextSequence(){
    userClickedPattern = [];
    ++level;
    $("h1").text("Level "+level);
    updateScoreDisplay(level - 1);

    var randno = Math.floor(Math.random() * 4);
    var randomChosenColour=buttoncolors[randno];
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playsound(randomChosenColour);
}    

function playsound(name){
    if (!isMuted) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function StartOver() {
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
  started = false;
}



function updateScoreDisplay(currentScore) {
  $("#score-display").text("Score: " + currentScore + " | High Score: " + highScore);
}


$(document).ready(function () {
  $("#restart-btn").show(); // Show the Start/Restart button when page loads
});

var bgMusic = new Audio('sounds/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.1;
bgMusic.play();



function updateScoreDisplay(currentScore) {
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore", highScore);
    $("#score-display").addClass("glow");
    setTimeout(() => $("#score-display").removeClass("glow"), 1000);
  }
  $("#score-display").text("Score: " + currentScore + " | High Score: " + highScore);
}
$("#theme-btn").click(() => {
  $("body").toggleClass("light-theme");
});

function startCountdown() {
  let count = 3;
  $("#level-title").text("Get Ready: " + count);
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      $("#level-title").text("Get Ready: " + count);
    } else {
      clearInterval(interval);
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }, 1000);
}
function startCountdown() {
  let count = 3;
  $("#level-title").text("Get Ready: " + count);
  
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      $("#level-title").text("Get Ready: " + count);
    } else {
      clearInterval(interval);
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }, 1000); // runs every 1 second
}
$("body").addClass("level-up");
setTimeout(() => $("body").removeClass("level-up"), 500);

$(document).on("click", function (e) {
  const particle = $("<div class='particle'></div>");
  $("body").append(particle);
  particle.css({
    left: e.pageX + "px",
    top: e.pageY + "px"
  });
  setTimeout(() => particle.remove(), 1000);
});
tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#000000"
    }
  },
  fpsLimit: 60,
  fullScreen: {
    enable: false
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "trail"
      },
      resize: true
    },
    modes: {
      trail: {
        delay: 0.1,
        quantity: 5,
        particles: {
          color: {
            value: "#ffffff"
          },
          collisions: {
            enable: false
          },
          links: {
            enable: false
          },
          move: {
            speed: 2,
            outModes: {
              default: "destroy"
            }
          },
          size: {
            value: 2,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.2,
              sync: false
            }
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          }
        }
      }
    }
  },
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: ["#ffffff", "#00f9ff", "#aaffff"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: { min: 0.5, max: 2 },
      random: true
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "bounce"
      },
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  detectRetina: true
});


//new
$(document).ready(() => {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  $("#level-title").text(isTouch ? "Tap Anywhere to Start" : "Press Any Key to Start");
});

function enterFullScreen() {
  const docEl = document.documentElement;
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  }
}
// Call this on game start if on mobile
