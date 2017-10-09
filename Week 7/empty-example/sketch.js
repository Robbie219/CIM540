var bgColor = "green";
var fSize = 200;

//var posX = width/2;
//var posY = height/2; This won't work because p5 hasn't loaded at this point

var posX = 0;
var posY = 0;

function setup(){
    createCanvas(1000,500);   
    background(125);
    background(103,23,150);
    background("#333333");
    background("cyan");
    
    background(bgColor);
    
    posX = width/2;
    posY = 100;
       
}

function draw(){
    strokeWeight(2);
    //face
    fill("yellowgreen");
    ellipse(posX,posY,fSize,fSize);//x,y,width,height
    
    
    //mouth
    fill(255);
    rect(posX - 50,posY + 50, 100, 20);
    
    //eyes
    fill(255);
    ellipse(posX - 50,posY - 20,30,40);
    ellipse(posX + 50, posY - 20,30,40);
    
    //pupils
    fill(0);
    ellipse(posX - 50,posY -20,15,20);
   
    ellipse(posX + 50, posY -20,15,20);
    fill(255);
    strokeWeight(0);
    triangle(posX - 58.5, posY - 15, posX -49, posY - 20, posX - 58.5, posY - 25);
    
    //mouthline
    strokeWeight(2);
    line(posX - 50, posY + 60, posX + 50, posY + 60);
    
    
    //teeth
    line(posX - 40, posY + 50, posX - 40, posY + 70);
    line(posX - 30, posY + 50, posX - 30, posY + 70);
    line(posX - 20, posY + 50, posX - 20, posY + 70);
    line(posX - 10, posY + 50, posX - 10, posY + 70);
    line(posX, posY + 50, posX, posY + 70);
    line(posX + 10, posY + 50, posX + 10, posY + 70);
    line(posX + 20, posY + 50, posX + 20, posY + 70);
    line(posX + 30, posY + 50, posX + 30, posY + 70);
    line(posX + 40, posY + 50, posX + 40, posY + 70);
    
    
    //mole
    strokeWeight(5);
    point(posX + 20,posY + 10);
    
    arc(50,55,50,50,0,TWO_PI);
    
}

