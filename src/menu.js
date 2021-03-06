import "./styles.css";

var canvas = document.getElementById("gameScreen");
var context = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

var backgroundImage = new Image();
var titleImage = new Image();
var playImage = new Image();
// var singleplayerImage = new Image();
// var multiplayerImage = new Image();
var instructionsImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();
var shipImage = new Image();

var speed = 1;
var backgroundY = 0;
var frames = 30;
var timerId = 0;
var mouseX;
var mouseY;

var shipX = [0, 0];
var shipY = [0, 0];
var shipWidth = 35;
var shipHeight = 40;
var shipVisible = false;
var shipSize = shipWidth;
var shipRotate = 0;
var fadeId = 0;
var time = 0.0;

shipImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/0xoq-ship.png";
backgroundImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/EBNN-BackgroundChange.png";
titleImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/FqZj-logo.png";
playImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/I8jN-play.png";
// singleplayerImage.src = "Images/Singleplayer.png";
// multiplayerImage.src = "Images/Multiplayer.png";
instructionsImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/Uyau-instructions.png";
settingsImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/qrXl-settings.png";
creditsImage.src =
  "https://uploads.codesandbox.io/uploads/user/8c15a0b4-85ee-4b26-809a-df9cf9fad315/wbPn-credits.png";

var buttonX = [240, 240, 240, 240];
var buttonY = [120, 160, 200, 240];
var buttonWidth = [96, 260, 182, 160];
var buttonHeight = [80, 80, 80, 80];

// vykresli vsechny obrazky
function draw() {
  context.drawImage(backgroundImage, 0, backgroundY);
  context.drawImage(titleImage, 160, 0);
  context.drawImage(playImage, buttonX[0], buttonY[0]);
  context.drawImage(instructionsImage, buttonX[1], buttonY[1]);
  context.drawImage(settingsImage, buttonX[2], buttonY[2]);
  context.drawImage(creditsImage, buttonX[3], buttonY[3]);
  if (shipVisible === true) {
    context.drawImage(
      shipImage,
      shipX[0] - shipSize / 2,
      shipY[0],
      shipSize,
      shipHeight
    );
    context.drawImage(
      shipImage,
      shipX[1] - shipSize / 2,
      shipY[1],
      shipSize,
      shipHeight
    );
  }
}
// smaze cely canvas
function clear() {
  context.clearRect(0, 0, width, height);
}
// pozadi se bude posunovat - efekt pohybu
function move() {
  backgroundY -= speed;
  if (backgroundY === -1 * height) {
    backgroundY = 0;
  }
  if (shipSize === shipWidth) {
    shipRotate = -1;
  }
  if (shipSize === 0) {
    shipRotate = 1;
  }
  shipSize += shipRotate;
}
// aktualizuje menu
function update() {
  clear();
  move();
  draw();
}
function checkPos(mouseEvent) {
  mouseX = mouseEvent.pageX - this.offsetLeft;
  mouseY = mouseEvent.pageY - this.offsetTop;
  if (mouseEvent.pageX || mouseEvent.pageY === 0) {
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
  } else if (mouseEvent.offsetX || mouseEvent.offsetY === 0) {
    mouseX = mouseEvent.offsetX;
    mouseY = mouseEvent.offsetY;
  }
  for (var i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
        shipVisible = true;
        shipX[0] = buttonX[i] - shipWidth / 2 - 2;
        shipY[0] = buttonY[i] + 2;
        shipX[1] = buttonX[i] + buttonWidth[i] + shipWidth / 2;
        shipY[1] = buttonY[i] + 2;
      }
    } else {
      shipVisible = false;
    }
  }
}
// problikne a mělo by to zobrazit jine menu
function fadeOut() {
  context.fillStyle = "rgba(000,5,0)";
  context.fillRect(0, 0, width, height);
  time += 0.1;
  if (time >= 2) {
    clearInterval(fadeId);
    time = 0;
    timerId = setInterval(update(), 1000 / frames);
    canvas.addEventListener("mousemove", checkPos);
    canvas.addEventListener("mouseup", checkClick);
  }
}
function checkClick(mouseEvent) {
  for (var i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
        // kliknuti na jedno tlacitek, melo by poznat na ktere, zastavit aktualni vykreslovani a vykreslit dalsi akci (propojit s dalsím .js souborem)
        context.fillRect(150, 150, 150, 150);
      }
    }
  }
}
timerId = setInterval(function() {
  update();
}, 1000 / frames);
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);
