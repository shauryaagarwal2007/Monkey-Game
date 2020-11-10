var monkey; 
var monkey_running;

var banana;
var bananaImage;

var obstacle;
var obstacleImage;

var FoodGroup;
var obstacleGroup;

var score=0;

var Play=0;
var End=1;
var gamestate=Play;

var ground;

var survivalTime = 0;

function preload(){
  
  monkeyrunning=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(1000, 800);
  
  monkey=createSprite(90,700);
  monkey.addAnimation("MONKEY",monkeyrunning);
  monkey.scale=0.30
  
  ground=createSprite(50,770,2500,20)
  ground.velocityX=-40;
  ground.x=ground.width/2;
  
  banana2=createGroup();
  
  stone2=createGroup();

  
  //monkey.debug = true;
  
  console.log(monkey.y);
}

function draw() {

    background("skyblue");
  
    if(gamestate === Play){
      
        stone();

        banana();

        monkey.vesible=true;          
      
        if(banana2.isTouching(monkey)){
        banana2.destroyEach();
        score=score+1;
        }
      
        if(keyDown("space")&&monkey.y>600){
        monkey.velocityY = -23;
        } 

        stroke("black");
        textSize(20);
        fill("black");
        survivalTime=Math.ceil(frameCount/frameRate());
        text("survival Time : "+survivalTime,800,50);
          
        text("Score : " + score ,800, 100);

      
        if(stone2.isTouching(monkey)){
           gamestate=End;
           }

    }

    else if(gamestate === End){
       
            stroke("black");
            textSize(90);
            fill("black");
            text(" GAME OVER ",200, 400);
      
            //monkey.vesible=false;          

            monkey.destroy();            
      
            ground.destroy();            

            stone2.destroyEach();
            
            banana2.destroyEach();
      
       }
  
    monkey.velocityY = monkey.velocityY + 0.5;
  
    monkey.collide(ground);
  
    if(ground.x<0){
       ground.x=ground.width/2;
     }

    drawSprites();
  
}

function banana(){
  if(frameCount % 180 === 0){
    banana1=createSprite(1000,200);
    banana1.addImage(bananaImage);
    banana1.scale=0.20;
    banana1.velocityX=-6;
    banana1.y=random(110,550);
    banana1.lifetime=175;
    banana2.add(banana1);
}
}

function stone(){
  if(frameCount % 300 === 0){
    stone1=createSprite(1000,685);
    stone1.addImage(obstaceImage);
    stone1.scale=0.40;
    stone1.velocityX=-13;
    stone1.lifetime=90;
    stone2.add(stone1);
}
}