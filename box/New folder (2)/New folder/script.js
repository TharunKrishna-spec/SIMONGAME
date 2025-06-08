var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var isMuted = false;
var highScore = localStorage.getItem("highScore") || 0;

updateScoreDisplay(0);

// Sound setup
var bgMusic = new Audio('sounds/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.1;
bgMusic.play();

// Handle mute button
$("#mute-btn").click(function () {
  isMuted = !isMuted;
  if (!isMuted) new Audio("sounds/toggle.mp3").play();
  $("#mute-btn").text(isMuted ? "🔇" : "🔊");
  bgMusic.muted = isMuted;
});

// Handle theme toggle
$("#theme-btn").click(() => {
  $("body").toggleClass("light-theme theme-transition");
  setTimeout(() => $("body").removeClass("theme-transition"), 500);
});

// Handle restart button
$("#restart-btn").click(function () {
  console.log("🔁 Game forcefully restarted");
  StartOver(false);
  updateScoreDisplay(0);
  $("#level-title").text("Restarting...");
  setTimeout(() => {
    nextSequence();
    started = true;
  }, 500);
});

// Handle keyboard start + R to restart
$(document).keydown(function (e) {
  if (!started) {
    startCountdown();
  } else if (e.key.toLowerCase() === 'r') {
    $("#restart-btn").click();
  }
});

// Game logic
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  updateScoreDisplay(level - 1);

  var randNo = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randNo];
  gamePattern.push(chosenColor);

  $("#" + chosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(chosenColor);
}

function playsound(name){
  if (!isMuted) {
    console.log("Playing:", name);
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Sound error:", err));
    
    $(".blackhole").addClass("glow-pulse");
    setTimeout(() => $(".blackhole").removeClass("glow-pulse"), 500);
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    if (!isMuted) new Audio('sounds/wrong.mp3').play();

    updateScoreDisplay(0);
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => $("body").removeClass("game-over"), 200);
    StartOver(true);
  }
}

function StartOver(fromGameOver = true) {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  if (fromGameOver) {
    $("#level-title").text("Press A Key to Start");
  }
}

function updateScoreDisplay(currentScore) {
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore", highScore);
    $("#score-display").addClass("glow");
    setTimeout(() => $("#score-display").removeClass("glow"), 1000);
  }
  $("#score-display").text("Score: " + currentScore + " | High Score: " + highScore);
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
  }, 1000);
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
/*
// Fast particle bubble click animation
$(document).on("click", function (e) {
  const particle = $("<div class='particle'></div>");
  $("body").append(particle);
  particle.css({
    left: e.pageX + "px",
    top: e.pageY + "px"
  });
  setTimeout(() => particle.remove(), 300); // faster pop
});*/
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
$(document).one("keydown", function () {
  if (!isMuted) {
    let silentStart = new Audio("sounds/red.mp3"); // or any short audio
    silentStart.play().catch(e => console.log("Autoplay blocked:", e));
  }
});
