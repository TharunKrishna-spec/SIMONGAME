var random1=Math.floor(Math.random()*6+1);
var randomimage1="images/dice"+random1+".png";
document.querySelector(".img1").setAttribute("src",randomimage1);
var random2=Math.floor(Math.random()*6+1);
var randomimage2="images/dice"+random2+".png";
document.querySelector(".img2").setAttribute("src",randomimage2);
if(random1>random2){
    document.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent="Player1 Wins!🚩";
}
else if(random1<random2){
    document.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent="Player2 Wins!🚩";
}
else{
    document.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent="Its a DRAW!🏳️";
}
