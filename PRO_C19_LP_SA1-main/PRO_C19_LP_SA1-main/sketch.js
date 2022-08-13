var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,200,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4
  spookySound.play();
}

function draw() {
  background(200);
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x-5
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x+5
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY+0.5
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      gameState = "end"
    }
    spawndoor();
    drawSprites();
    
  }
  if(gameState=="end"){
    background("black")
    textSize(22)
    fill("red")
    text("GAME OVER!",200,300)
  }
}

function spawndoor(){
if (frameCount%240===0){
  door = createSprite(200,-50,10,10)
  door.addImage(doorImg)
  door.velocityY= 1
  door.x= Math.round(random(120,400))
  climber=createSprite(200,10,10,10)
  climber.addImage(climberImg)
  climber.velocityY= 1
  climber.x = door.x
  invisibleblock = createSprite(200,15)
  invisibleblock.width = climber.width
  invisibleblock.height = 2
  invisibleblock.velocityY = 1
  invisibleblock.x = door.x
  invisibleBlockGroup.add(invisibleblock)
  doorsGroup.add(door) 
  climbersGroup.add(climber)
  ghost.depth = door.depth +1
} 
}

