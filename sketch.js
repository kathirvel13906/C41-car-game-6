var canvas, backgroundImage;
var car1, car2, car3, car4, cars;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1Img, car2Img, car3Img, car4Img, groundImg, trackImg;

var form, player, game;

function preload() {
  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");
  groundImg = loadImage("images/ground.png");
  trackImg = loadImage("images/track.jpg");
}


function setup(){
  canvas = createCanvas(displayWidth-20 , displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //background(128,128,128);

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2) {
    game.end();
  }
}
