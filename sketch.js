
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
 var survivalTime=0  
  
 monkey = createSprite(50,340,20,50);
 monkey.addAnimation("running", monkey_running);  
 monkey.scale = 0.1;
 ground = createSprite(0,380,600,20);
 FoodGroup = new Group();
 obstaclesGroup = new Group();
}


function draw() {
background("lightblue");
ground.velocityX = -3;
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
    //spawn the clouds
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();

  drawSprites();
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time: "+survivalTime, 100, 50);
    
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(800,340,10,40);
   obstacle.velocityX = -6;
   
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add image for the bananas
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}






