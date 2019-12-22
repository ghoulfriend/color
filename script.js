//variables
var numSquares = 6; //starting amount of squares
var colors = new Array();
var pickedColor;
//selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var messageDisplay = document.getElementById("messageDisplay");
colorDisplay.textContent = pickedColor;
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
    setModeListeners();
    setSquareListeners();
    setResetListener();
    initializeBoard(numSquares);
}

function setModeListeners(){
    for(var i=0; i<modeButtons.length;i++){
        modeButtons[i].addEventListener('click',function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "easy"){
                numSquares=3;
            }
            else{
                numSquares=6;
            }
            initializeBoard(numSquares);
        })
    }
}
function setSquareListeners(){
    for(i=0;i<squares.length;i++){
        squares[i].addEventListener('click',function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor===pickedColor){
                h1.style.backgroundColor=pickedColor;
                messageDisplay.textContent = "Correct";
                changeColors(clickedColor);
                resetBtn.textContent = "Play Again?";
            }
            else {
                this.style.backgroundColor = "#2f2f2f";
                messageDisplay.textContent = "Wrong";
            }
        })
    }
}
function setResetListener(){
    resetBtn.addEventListener('click',function(){
        initializeBoard(numSquares);
    });
}


function initializeBoard(num){
    document.querySelector("h1").style.backgroundColor = "steelblue";
    resetBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
    //generate new random colors
    colors = generateRandomColors(num);
    //pick a color from list
    pickedColor = pickColor();
    //update display with color
    colorDisplay.textContent = pickedColor;
    //change square colors
    for(var i=0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }else{
            squares[i].style.display = "none";
        }
    }
}

function generateRandomColors(num){
    var colors = new Array();
    for(var i=0;i<num;i++){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        colors.push("rgb(" + r + ", " + g + ", " + b + ")");
    }
    return colors;
}

function changeColors(color){
    for(var i=0;i<colors.length;i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    //return value should be format "rgb(x, x, x)"
    var rndIdx = Math.floor(Math.random()*colors.length);
    return colors[rndIdx];
}
