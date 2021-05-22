class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(200,500);
    car1.addImage(car1Img);

    car2 = createSprite(400,500);
    car2.addImage(car2Img);

    car3 = createSprite(600,500);
    car3.addImage(car3Img);

    car4 = createSprite(800,500);
    car4.addImage(car4Img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundImg);
      image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
      //var display_position = 130;
      var index = 0;
      var x = 175;
      var y;
      for(var plr in allPlayers){
        index = index + 1;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;
        //console.log(index);
        
        if(index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 3750) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }
    
    drawSprites();
  }

  end() {
    console.log("the game ended");
    console.log(player.rank);
    //game.update(2);
  }
}
