var bird,birdImage;
var bg,bgImage;
var obstacle,obstacleImage;
var coinGroup,onbstacleGroup;
var coin, coinImage;
var lives=3;
var score=0;
var PLAY=1 ;
var END=0
var gameState=PLAY;


function preload(){
  bgImage=loadImage("background.png");
  birdImage=loadImage("bird.png");
  coinImage = loadImage("coin.png");
  obstacleImage = loadImage("alien.png");
}

function setup() {
 createCanvas(400,400);
   //background
  bg = createSprite(canvas.x,canvas.y,canvas.width,canvas.height)
  bg.addImage(bgImage)
 bg.scale=1.4;
  bg.velocityX=-4;
      //bird
  bird=createSprite(50,350);
  bird.addImage(birdImage);
  bird.scale=0.2;
 //ground
  ground=createSprite(40,350,400,10);
  ground.velocityX=-4;
  
  coinGroup = createGroup();
 obstacleGroup = createGroup();
    
}

function draw() {
  background("black")
  
  
  
  if(gameState===PLAY){
 
            
    
  if(bg.x < 0){
    bg.x = bg.width/2;
  } 
    
   
  if(keyDown("space")){
  bird.velocityY = -12;
 }
  
  bird.velocityY= bird.velocityY+0.8;
  
  if(bird.isTouching(coinGroup)){
    coinGroup.destroyEach();
    score=score+1;
  }
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    bird.collide(ground);
    
    if(bird.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      lives=lives-1;
    }
    
   
    if(lives===0){
      gameState=END;
    }
    
   coin();
    obstacle();
    
  }else if(gameState===END){
   
    bg.destroy();
    bird.destroy();
    coinGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
        coinGroup.destroyEach(); 
obstacleGroup.destroyEach();
   bg.destroy();
    bird.destroy();
    
    textSize(20);
    fill("red")
    text("GAME OVER!!",150,200)
  }
  
  ground.visible=false;
 
  drawSprites();
 textSize(20)
  fill("black")
  text("Coins Collected:"+score,200,50);
   text("Lives:"+lives,50,50);
}

function coin(){
  if(frameCount % 60 ===0){
     var coin = createSprite(390,100,20,20);
    coin.y = Math.round(random(300,120));
    coin.addImage(coinImage);
    coin.scale=0.03;
    coin.velocityX=-3;
    
    coin.lifetime=300;
    
    coinGroup.add(coin)
     }
}

function obstacle(){
  if(frameCount % 100 ===0){
     var obstacle = createSprite(390,100,20,20);
    obstacle.y = Math.round(random(300,120));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.8;
    obstacle.velocityX=-3;
    
    obstacle.lifetime=300;
    
    obstacleGroup.add(obstacle)
     }

}

