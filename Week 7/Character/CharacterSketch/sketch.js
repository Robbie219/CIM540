var fSize = 250;

var posX = 0;
var posY = 0;


function setup() {
    createCanvas(1000,500);
   
    
    posX = width/2;
    posY = 275;
    
}

function draw() {
    background("palegreen");
    strokeWeight(2);
    stroke(0);
    ellipseMode(CENTER);
    rotate(0);
  
    
    //arms
    noFill();
    strokeWeight(20);
    bezier(posX - 105,posY -60,posX-140,posY-60,posX-140,posY-60,posX-160,posY+25);
    bezier(posX + 105,posY -60, posX +140, posY -60, posX+140,posY-60,posX+160,posY+25);
    
    //legs
    bezier(posX-30,posY+80,posX-40,posY+100,posX-40,posY+100,posX-50,posY+170);
    bezier(posX+30,posY+80,posX+40,posY+100,posX+40,posY+100,posX+50,posY+170);
    
    //face
    strokeWeight(2);
    fill("forestgreen");
    ellipse(posX,posY-30,fSize - 15,fSize - 25);
    strokeWeight(0);
    triangle(posX + 95, posY - 175, posX + 117, posY - 45, posX - 35, posY - 137.5);
    strokeWeight(2);
    line(posX + 117, posY - 45, posX + 95, posY - 175);
    line(posX - 35, posY - 137.5, posX + 95, posY - 175);
    stroke("black");
    strokeWeight(1);
    line(posX - 64, posY +62.5,posX + 95,posY-175);
    line(posX+5, posY - 150,posX+28,posY-75);
    line(posX+108, posY - 95,posX+28,posY-75);
    line(posX -39,posY -137,posX -2,posY- 30);
    line(posX +120,posY -55,posX-2,posY-30);
    line(posX-78,posY-115,posX -26,posY +5);
    line(posX + 115, posY -15, posX -26,posY +5);
    line(posX-110,posY-70,posX-56,posY+50);
    line(posX+95,posY + 35,posX-56,posY+50.5);
    
   
    
    
    //eyes
    strokeWeight(2);
    stroke(0);
    fill(255);
    ellipse(posX - 36,posY - 50,50,70);
    ellipse(posX + 54, posY - 50,50,70);
    
    //pupils
    fill(0);
    ellipse(posX - 36,posY -50,15,30);
    ellipse(posX + 54, posY -50,15,30);
    fill(255);
    strokeWeight(0);
    triangle(posX - 49.5, posY - 45, posX -37, posY - 50, posX - 49.5, posY - 55);
    triangle(posX + 40.5, posY - 45, posX + 53, posY - 50, posX + 40.5, posY - 55);
    
    
    //mouth
    strokeWeight(1);
    fill(0);
    arc(posX+2,posY-15,75,125,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);
    fill("pink");
    strokeWeight(0);
    arc(posX+2,posY+15,50,60,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);
    
    
    //stem
    fill("brown");
    strokeWeight(0);
    quad(posX-110,posY+108,posX - 68,posY+60,posX - 60,posY+65,posX-94,posY+114);
    fill(0);
    strokeWeight(2)
    line(posX-110,posY+108,posX - 68,posY+60);
    line(posX-94,posY+114,posX-60,posY+65);
    line(posX-110,posY+108,posX-94,posY+114);
    
    //hands
    fill(255);
    ellipse(posX-160,posY+29,30,10);

    ellipse(posX-160,posY+50,45,40);
    
    line(posX - 160, posY + 47, posX - 160, posY +53);
    line(posX - 167, posY + 48, posX - 167, posY +52);
    line(posX - 153, posY + 48, posX - 153, posY +52);
    
    ellipse(posX+160,posY+29,30,10);

    ellipse(posX+160,posY+50,45,40);
    
    line(posX + 160, posY + 47, posX + 160, posY +53);
    line(posX + 167, posY + 48, posX + 167, posY +52);
    line(posX + 153, posY + 48, posX + 153, posY +52);
    
    //shoes
    fill("tan");
    ellipse(posX-51,posY+178,28,10);
    ellipse(posX-53,posY+195,50,30);
    
    ellipse(posX+51,posY+178,28,10);
    ellipse(posX+53,posY+195,50,30);
    
    
    
}