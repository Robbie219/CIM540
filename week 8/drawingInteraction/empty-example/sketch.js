var centerX = 0;
var centerY = 0;
var bgColor;

var hRedColor, hGreenColor, hBlueColor;

var bgImage, bgImage2, currentBgImage;

var bgChange, bgChange2;

var ballons;

var hitZoneX = 100;
var hitZoneY = 100;


function preload(){
    bgImage = loadImage("assets/carnival.jpg");
    bgImage2 = loadImage("assets/party.jpg");
    ballons = loadImage("assets/ballons.png");
}

function setup() {
  createCanvas(400, 400);
  centerX = width / 2;  
  centerY = height / 2;
  bgColor = color(255,0,0);
    
    var redText = createP("red");
    hRedColor = createSlider(0,255,0);
    var greenText = createP("green");
    hGreenColor = createSlider(0,255,0);
    var blueText = createP("blue");
    hBlueColor = createSlider(0,255,0);
    
    bgChange = createButton("party");
    bgChange.position(100,400);
    bgChange.mousePressed(changeBgFunction);
    
    bgChange2 = createButton("carnival");
    bgChange2.position(200,400);
    bgChange2.mousePressed(changeBgFunction2);
    
    currentBgImage = bgImage;
   
  
}

function draw() {
  background(bgColor);
    
    image(currentBgImage,0,0,400,400);
    
    //console.log("mouseX: " + mouseX + " mouseY: " + mouseY);
    
    centerX = mouseX;
    centerY = mouseY;

  fill(255);
   stroke(0); 
  strokeWeight(1);

  //face
  ellipse(centerX, centerY, 100, 100);
  //nose
    var noseWiggle = map(mouseX,0,width,-10,10);
    //console.log("noseWiggle: " + noseWiggle);
  ellipse(centerX + noseWiggle, centerY + 10, 20, 20);
  //eyes
  ellipse(centerX - 10 + noseWiggle, centerY - 10, 10, 20);
  ellipse(centerX + 10 + noseWiggle, centerY - 10, 10, 20);
  rectMode(CENTER);
  rect(centerX, centerY + 30, 50, 15, 5);
  rect(centerX, centerY + 30, 50, 1, 1);
  //hair
  noFill();
  stroke(hRedColor.value(),hGreenColor.value(),hBlueColor.value());
  strokeWeight(4);
  arc(centerX,centerY,100,100, 0,PI);
  strokeWeight(30);
  arc(centerX,centerY,100,100, PI,TWO_PI)
    
  ellipse(hitZoneX,hitZoneY,10,10);
    
// if(mouseX == hitZoneX && mouseY == hitZoneY){
//  console.log("show ballons"); 
//  image(ballons,100,100);
      
  

var hitZoneDist = dist(mouseX, mouseY, hitZoneX, hitZoneY);
//console.log(hitZoneDist);

    if(hitZoneDist < 20){
    image(ballons,100,100);
    
    }
    
    rectMode(CORNER);
    strokeWeight(1);
    rect(300,300,50,50);
    
    if(mouseX > 300 && mouseX < 350 && mouseY > 300 && mouseY < 350){
       console.log("hitZone2");
       }
  
}

function mousePressed(){
    console.log("mousePressed");
    bgColor = color(0,255,0);
       
}

function changeBgFunction(){
    currentBgImage = bgImage2;
}

function changeBgFunction2(){
    currentBgImage = bgImage;
}
