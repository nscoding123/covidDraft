//COVID19 Game
//Created by: Neeti Suggula on 1/1/2021
/*Objective of the game:
People all over the world are getting infected with covid-19.
In this game you will protect the people and keep them from getting infected.
Steps:
- use your mouse to move the bottle up and down
- Press the space bar to inject the shot from the bottle
- Don’t loose all the people or the game is over
*/
//Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, backgroundImage;
var vbottle, vbottleImage;
var greyVirus, greyImageVirus;
var pinkVirus, pinkImageVirus;
var blueVirus, blueImageVirus;
var yellowVirus, yellowImageVirus;
var redB, blueB, greenB, pinkB;
var shot, arrowImage, arrowGroup;
var score = 0, deaths = 0;
var dieSound, sirenSound;
var person1, Person1Img, person2, Person2Img, person3, Person3Img, person4, Person4Img, person5, Person5Img, 
person6, Person6Img, person7, Person7Img, person8, Person8Img;
var man1, man1Img;
var ambulance, ambulanceImg;
var  awareness, awarenessImg;
var destruction = 0;
var restartImg;

//This function is used to load images
function preload() {
  //Loads games images
  vbottleImage = loadImage("vaccinebottle.png");
  greyImageVirus = loadImage("coronavirus.png");
  pinkImageVirus = loadImage("coronavirus2.png");
  blueImageVirus = loadImage("coronavirus3.png");
  yellowImageVirus = loadImage("coronavirus4.png");

  //Loads my sound
  arrowImage = loadImage("vaccine.png");
  dieSound = loadSound("die.mp3");
  sirenSound = loadSound("siren3s.mp3");
  
  //Loads peoples image
  Person1Img = loadImage("Person1.png");
  Person2Img = loadImage("Person2.png");
  Person3Img = loadImage("Person3.png");
  Person4Img = loadImage("Person4.png");
  Person5Img = loadImage("Person5.png");
  Person6Img = loadImage("Person6.png");
  Person7Img = loadImage("Person7.png");
  Person8Img = loadImage("Person8.png");
  
  //Loads exrtas
  backgroundImage = loadImage("WorldMap.jpg");
  ambulanceImg = loadImage("Ambulance.png");
  awarenessImg = loadImage("Gameover.png");
  arrowImage = loadImage("vaccine.png");
  restartImg = loadImage("ResetIcon.png");

}
//This function creates all the sprites
function setup() {
  
  //Creates the canvas
   createCanvas(windowWidth, windowHeight);

  //Creates the ground sprite
  ground = createSprite(0, 0, width, height+350);
  ground.addImage("ground", backgroundImage);
  ground.x = ground.width / 2;
  ground.scale = 1.7;

  //Creates people sprite
  person1 = createSprite(width-30, 30, 50, 50);
  person1.addImage("person1", Person1Img);

  person2 = createSprite(width-30, 130, 50, 50);
  person2.addImage(Person2Img);

  person3 = createSprite(width-30, 260, 50, 50);
  person3.addImage(Person3Img);

  person4 = createSprite(width-30, 370, 50, 50);
  person4.addImage(Person4Img);

  person5 = createSprite(width-30, 480, 50, 50);
  person5.addImage(Person5Img);

  person6 = createSprite(width-30, 590, 50, 50);
  person6.addImage(Person6Img);

  person7 = createSprite(width-30, 700, 50, 50);
  person7.addImage(Person7Img);

  person8 = createSprite(width-30, 790, 50, 50);
  person8.addImage(Person8Img);
  
  //Creates the bottle sprite
  vbottle = createSprite(width-90, 200, 50, 50);
  vbottle.addImage("vbottle", vbottleImage);
  vbottle.scale = 0.13;
  //score = 0;

  //Creates restart button
  restart = createSprite(width/2, height/8);
  restart.addImage("restart", restartImg);
  restart.scale = 0.05;

  //Creates awareness images
  awareness = createSprite(width/2, height/2);
  awareness.addImage("awareness", awarenessImg);
  awareness.scale = 0.7;
  

  //Creates group
  virusGroup = new Group();
  greyV = new Group();
  pinkV = new Group();
  blueV = new Group();
  yellowV = new Group();
  shotGroup = new Group();
}
//holds Gamestate END and GameState PLAY
function draw() {
  //Game state play
  if(gameState===PLAY){
  
  //Background in motion
  ground.velocityX = -4;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  //Druring the game the images should not be seen
  awareness.visible = false;
  restart.visible = false;
  
  //Moves the bottle with the mouse
  vbottle.y = mouseY;
  //vbottle.y = touchesY;

  //Shot generation
  //if (keyDown("space")) {
    if ((touches.length > 0 ) || keyDown("space")) {
    createshot();
    shot.y = vbottle.y;
    touches=[];
  }

  //generates virus at random
  var select_virus = Math.round(random(1, 4));

  //Insterts virus every 30 pixels
  if (World.frameCount % 30 == 0) {
    if (select_virus == 1){
      greyVirusFn();
    } else if (select_virus == 2) {
      pinkVirusFn();
    } else if (select_virus == 3) {
      blueVirusFn();
    } else if (select_virus == 4) {
      yellowVirusFn();
    }
  }

  //This is what happens when the virus touches the person
  /*If the virus group touces the person the life time will be come zero causeing it to disapear.
  An ambulance is also generated and the deaths score increaces.*/
  if (virusGroup.isTouching(person1)) {
   person1.lifetime = 0;
   ambulance = createSprite(width-30, person1.y, 50, 50);
   ambulance.addImage(ambulanceImg);
   ambulance.velocityX = -10;
   ambulance.scale = 0.04;
  // sirenSound.play();
   destruction = destruction+1;
   deaths = deaths+1;
  }
  if (virusGroup.isTouching(person2)) {
    person2.lifetime = 0;
    ambulance = createSprite(width-30, person2.y, 50, 50);
   ambulance.addImage(ambulanceImg);
   ambulance.velocityX = -10;
   ambulance.scale = 0.04;
  // sirenSound.play();
   destruction = destruction+1;
   deaths = deaths+1;
   }
  if (virusGroup.isTouching(person3)) {
    person3.lifetime = 0;
    ambulance = createSprite(width-30, person3.y, 50, 50);
   ambulance.addImage(ambulanceImg);
   ambulance.velocityX = -10;
   ambulance.scale = 0.04;
   //sirenSound.play();
   destruction = destruction+1;
   deaths = deaths+1;
   }
   if (virusGroup.isTouching(person4)) {
    person4.lifetime = 0;
    ambulance = createSprite(width-30, person4.y, 50, 50);
    ambulance.addImage(ambulanceImg);
    ambulance.velocityX = -10;
    ambulance.scale = 0.04;
    //sirenSound.play();
    destruction = destruction+1;
    deaths = deaths+1;
   }
   if (virusGroup.isTouching(person5)) {
    person5.lifetime = 0;
    ambulance = createSprite(width-30, person5.y, 50, 50);
    ambulance.addImage(ambulanceImg);
    ambulance.velocityX = -10;
    ambulance.scale = 0.04;
   // sirenSound.play();
    destruction = destruction+1;
    deaths = deaths+1;
   }
   if (virusGroup.isTouching(person6)) {
    person6.lifetime = 0;
    ambulance = createSprite(width-30, person6.y, 50, 50);
    ambulance.addImage(ambulanceImg);
    ambulance.velocityX = -10;
    ambulance.scale = 0.04;
   // sirenSound.play();
    destruction = destruction+1;
    deaths = deaths+1;
   }
   if (virusGroup.isTouching(person7)) {
    person7.lifetime = 0;
    ambulance = createSprite(width-30, person7.y, 50, 50);
    ambulance.addImage(ambulanceImg);
    ambulance.velocityX = -10;
    ambulance.scale = 0.04;
   // sirenSound.play();
    destruction = destruction+1;
    deaths = deaths+1;
   }
   if (virusGroup.isTouching(person8)) {
    person8.lifetime = 0;
    ambulance = createSprite(width-30, person8.y, 50, 50);
    ambulance.addImage(ambulanceImg);
    ambulance.velocityX = -10;
    ambulance.scale = 0.04;
    //sirenSound.play();
    destruction = destruction+1;
    deaths = deaths+1;
   }
   if(destruction===9){
     console.log(destruction);
     gameState = END;
   }
   //if(person1.lifetime==0 && person2.lifetime==0 && person3.lifetime==0 && person4.lifetime==0 && person5.lifetime==0 && person6.lifetime==0 && person7.lifetime==0 && person8.lifetime==0){
   //gameState = END;
   //}
    //if(person1.lifetime==0 || person2.lifetime==0 || person3.lifetime==0 || person4.lifetime==0 || person5.lifetime==0 || person6.lifetime==0 || person7.lifetime==0 || person8.lifetime==0){
     // gameState = END;
      //}
    
  //If the Shot is touching the virus then both shot and virus gets destroyed
  if (shotGroup.isTouching(greyV)) {
    greyV.destroyEach();
    shotGroup.destroyEach();
    score = score + 1;
    dieSound.play();
  }
  if (shotGroup.isTouching(pinkV)) {
    pinkV.destroyEach();
    shotGroup.destroyEach();
    score = score + 1;
    dieSound.play();
  }

  if (shotGroup.isTouching(blueV)) {
    blueV.destroyEach();
    shotGroup.destroyEach();
    score = score + 1;
    dieSound.play();
  }

  if (shotGroup.isTouching(yellowV)) {
    yellowV.destroyEach();
    shotGroup.destroyEach();
    score = score + 1;
    dieSound.play();
  }
}
//Gamestate end; what happens when the game ends
if(gameState===END){
  background(0);
  //awareness = createSprite(width/2, height/2);
  //awareness.addImage("awareness", awarenessImg);
  //awareness.scale = 0.7;
  //restart = createSprite(width/2, height/8);
  //restart.addImage("restart", restartImg);
 //restart.scale = 0.05;
 
  restart.visible = true;
  awareness.visible = true;
  vbottle.lifetime = 0;
  shotGroup.destroyEach();
  virusGroup.destroyEach();
  ambulance.lifetime = 0;
  ground.lifetime = 0;
  person1.lifetime = 0;
  person2.lifetime = 0;
  person3.lifetime = 0;
  person4.lifetime = 0;
  person5.lifetime = 0;
  person6.lifetime = 0;
  person7.lifetime = 0;
  person8.lifetime = 0;
  
  
 }
 //what happens when restart image is pressed
if (mousePressedOver(restart)) {
reset();
}

  //Draws the sprites
  drawSprites();
  //Score design 
  text("Vaccines Given : " + score, 230, 30);
  text("Number of Infected : " + deaths, 600, 30);
  //text("NeeTi", 600, 30);
}
//what happens when restart image is pressed
//if (mousePressedOver(restart)) {
//  reset();
//  }
// Reset function to restart the game
function reset(){
  gameState = PLAY;
  restart.visible =false;
  awareness.visible=false;
  score = 0;
  deaths = 0;
  location.reload();
}

//Creates shot when space is pressed
function createshot() {
  shot = createSprite(width-130, 200, 10, 20);
  shot.lifetime = 150;
  shot.scale = 0.1;
  shot.velocityX = -6;
  shot.addImage("shot", arrowImage);
  shotGroup.add(shot);
}

//These functions Print at random, generates speed, and size
function greyVirusFn() {
  //var greyVirus = createSprite(0, Math.round(random(20, height-40)), 10, 10);
  var greyVirus = createSprite(0, Math.round(random(20, 800)), 10, 10);
  greyVirus.addImage(greyImageVirus);
  greyVirus.velocityX = 10;
  greyVirus.lifetime = width;
  greyVirus.scale = 0.06;
  greyV.add(greyVirus);
  virusGroup.add(greyVirus);
}

function pinkVirusFn() {
  //var pinkVirus = createSprite(0, Math.round(random(20, height-40)), 10, 10);
  var pinkVirus = createSprite(0, Math.round(random(20, 800)), 10, 10);
  pinkVirus.addImage(pinkImageVirus);
  pinkVirus.velocityX = 10;
  pinkVirus.lifetime = width;
  pinkVirus.scale = 0.06;
  pinkV.add(pinkVirus);
  virusGroup.add(pinkVirus);
}

function blueVirusFn() {
  //var blueVirus = createSprite(0, Math.round(random(20, height-40)), 10, 10);
  var blueVirus = createSprite(0, Math.round(random(20, 800)), 10, 10);
  blueVirus.addImage(blueImageVirus);
  blueVirus.velocityX = 10;
  blueVirus.lifetime = width;
  blueVirus.scale = 0.12;
  blueV.add(blueVirus);
  virusGroup.add(blueVirus);
}

function yellowVirusFn() {
  //var yellowVirus = createSprite(0, Math.round(random(20, height-40)), 10, 10);
  var yellowVirus = createSprite(0, Math.round(random(20, 800)), 10, 10);
  yellowVirus.addImage( yellowImageVirus);
  yellowVirus.velocityX = 10;
  yellowVirus.lifetime = width;
  yellowVirus.scale = 0.05;
  yellowV.add(yellowVirus);
  virusGroup.add(yellowVirus);
}