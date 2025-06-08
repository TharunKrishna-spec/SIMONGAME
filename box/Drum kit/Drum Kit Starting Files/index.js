//button press
var drums = document.querySelectorAll(".drum");
for (var i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", function () {
    var buton=this.innerHTML;
    makesound(buton);
    bigger(buton);
  });
}


//key press
document.addEventListener("keydown",function(event){
    makesound(event.key);
    bigger(event.key);
});


//switch cases
function makesound(event){
    switch (event) {
        case "w":
            var audios=new Audio('sounds/crash.mp3');
            audios.play()
            break;
        case "a":
            var audios=new Audio('sounds/kick-bass.mp3');
            audios.play()
            break;
        case "s":
            var audios=new Audio('sounds/snare.mp3');
            audios.play()
            break;
        case "d":
            var audios=new Audio('sounds/tom-1.mp3');
            audios.play()
            break;
        case "j":
            var audios=new Audio('sounds/tom-2.mp3');
            audios.play()
            break;
        case "k":
            var audios=new Audio('sounds/tom-3.mp3');
            audios.play()
            break;
        case "l":
            var audios=new Audio('sounds/tom-4.mp3');
            audios.play()
            break;
            
    
        default:

            break;
    }

}

//emoji sound
document.querySelector("span").addEventListener("click",runner);
function runner(){
    var audios=new Audio('sounds/tom-4.mp3');
    audios.play()
}

//opacity increser and animator
function bigger(pressed){
    var active= document.querySelector("."+pressed);
    active.classList.add("pressed");


//remove timer and it flows like animation
setTimeout(function(){
    active.classList.remove("pressed");
},100);

}


//completed da!!
