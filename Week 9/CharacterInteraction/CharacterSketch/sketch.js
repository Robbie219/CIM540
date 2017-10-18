var fSize = 250;

var posX = 0;
var posY = 0;

var fRedColor, fGreenColor, fBlueColor;

var bgImage,bgImage2, bgImage3, bgImage4, bgImage5, loc, currentBgImage;

var oFace = false;

var counter = 0;

var woahButton;
var woah = false;

var hitZoneX = 100;
var hitZoneY = 100;

var leaves;

function preload(){
    bgImage = loadImage("assets/Forest.jpeg")
    bgImage2 = loadImage("assets/mountain-1.jpg");
    bgImage3 = loadImage("assets/Rub_al_Khali_002.jpg");
    bgImage4 = loadImage("assets/volcano.jpg");
    bgImage5 = loadImage("assets/ws_Empty_Beach_1920x1200.jpg");
    leaves = loadImage("assets/fall-leaves.png");
    
}

function setup() {
   createCanvas(1000,500);
   
    posX = width/2;
    posY = 275;
    
    var redText = createP("red");
    redText.position(0,560);
    fRedColor = createSlider(0,255,34);
    fRedColor.position(0,600)
    var greenText = createP("green");
    greenText.position(0,610)
    fGreenColor = createSlider(0,255,139);
    fGreenColor.position(0,650);
    var blueText = createP("blue");
    blueText.position(0,660);
    fBlueColor = createSlider(0,255,34);
    fBlueColor.position(0,700);
    
    woahButton = createButton("Woah.");
    woahButton.position(400,600);
    woahButton.mousePressed(woahFunction);
    
    loc = createButton("New Location");
    loc.position(0,510);
    loc.mousePressed(locChange);
    
   
    currentBgImage = bgImage;      
}

 
    
    




function draw(){
normal();
  

}

function normal(){
    
    background("palegreen");
    image(currentBgImage,0,0,1000,500);
    strokeWeight(2);
    stroke(0);
    ellipseMode(CENTER);
    rotate(0);
    
    
    
    
  
  
   
    
    //arms
   
    if(woah == false){
    noFill();
    strokeWeight(20);
   if(oFace == false){ 
    bezier(posX - 105,posY -60,posX-140,posY-60,posX-140,posY-60,posX-160,posY+25);
    bezier(posX + 105,posY -60, posX +140, posY -60, posX+140,posY-60,posX+160,posY+25);
   } else if(oFace == true){
    bezier(posX - 105,posY -60,posX-140,posY-60,posX-140,posY-60,posX-160,posY-145);
    bezier(posX + 105,posY -60, posX +140, posY -60, posX+140,posY-60,posX+160,posY-145);
   }
    
    //legs
    bezier(posX-30,posY+80,posX-40,posY+100,posX-40,posY+100,posX-50,posY+170);
    bezier(posX+30,posY+80,posX+40,posY+100,posX+40,posY+100,posX+50,posY+170);
    
    //face
    strokeWeight(2);
    fill(fRedColor.value(),fGreenColor.value(),fBlueColor.value());
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
    var lookAroundX = map(mouseX,0,width,-8,8);
    var lookAroundY = map(mouseY,0,height,-8,4);
    fill(0);
    ellipse(posX - 36 + lookAroundX,posY - 50 + lookAroundY,15,30);
    ellipse(posX + 54 + lookAroundX, posY - 50 + lookAroundY,15,30);
    fill(255);
    strokeWeight(0);
    triangle(posX - 45.5 + lookAroundX, posY - 45 + lookAroundY, posX -37 + lookAroundX, posY - 50 + lookAroundY, posX - 45.5 + lookAroundX, posY - 55 + lookAroundY);
    triangle(posX + 44.5 + lookAroundX, posY - 45 + lookAroundY, posX + 53 + lookAroundX, posY - 50 + lookAroundY, posX + 44.5 + lookAroundX, posY - 55 + lookAroundY);
    
    
    //mouth
    
    if(oFace == true){
    fill(0);
    ellipse(posX+2,posY+30,55,60);
    
    } else if(oFace == false) {
        strokeWeight(1);
    fill(0);
    arc(posX+2,posY-15,75,125,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);   
    fill("pink");
    strokeWeight(0);
    arc(posX+2,posY+15,50,60,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);
        
    }   
    
    
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
    if(oFace == false){
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
    } else if(oFace == true){
    ellipse(posX-160,posY-149,30,10);

    ellipse(posX-160,posY-170,45,40);
    
    
    ellipse(posX+160,posY-149,30,10);

    ellipse(posX+160,posY-170,45,40);
    
    }
    
    //shoes
    fill("tan");
    ellipse(posX-51,posY+178,28,10);
    ellipse(posX-53,posY+195,50,30);
    
    ellipse(posX+51,posY+178,28,10);
    ellipse(posX+53,posY+195,50,30);
    }else if(woah == true){
        frameRate(15);
     push();
       translate(posX,posY);
        rotate(counter++)
    //arms
    noFill();
    strokeWeight(20);
   if(oFace == false){ 
    bezier(-105,-60,-140,-60,-140,-60,-160,25);
    bezier(105,-60,140,-60, 140,-60,160,25);
   } else if(oFace == true){
    bezier(-105,-60,-140,-60,-140,-60,-160,-145);
    bezier(105, -60, 140, -60,140,-60,160,-145);
   }
    
    //legs
    bezier(-30,80,-40,100,-40,100,-50,170);
    bezier(30,80,40,100,40,100,50,170);
    
    //face
    strokeWeight(2);
    fill(random(255),random(255),random(255));
    ellipse(0,-30,fSize - 15,fSize - 25);
    strokeWeight(0);
    triangle(95,-175,117,-45,-35,-137.5);
    strokeWeight(2);
    line(117,-45,95,-175);
    line(-35,-137.5,95,-175);
    stroke("black");
    strokeWeight(1);
    line(-64,62.5,95,-175);
    line(5,-150,28,-75);
    line(108,-95,28,-75);
    line(-39,-137,-2,-30);
    line(120,-55,-2,-30);
    line(-78,-115,-26,5);
    line(115,-15,-26,5);
    line(-110,-70,-56,50);
    line(95,35,-56,50.5);
    
   
    
    
    //eyes
    strokeWeight(2);
    stroke(0);
    fill(255);
    ellipse(-36,-50,50,70);
    ellipse(54,-50,50,70);
    
    //pupils
    var lookAroundX = map(mouseX,0,width,-8,8);
    var lookAroundY = map(mouseY,0,height,-8,4);
    fill(0);
    ellipse(-36 + lookAroundX,-50 + lookAroundY,15,30);
    ellipse(54 + lookAroundX,-50 + lookAroundY,15,30);
    fill(255);
    strokeWeight(0);
    triangle(-45.5 + lookAroundX,-45 + lookAroundY,-37 + lookAroundX,-50 + lookAroundY,-45.5 + lookAroundX,-55 + lookAroundY);
    triangle(44.5 + lookAroundX, -45 + lookAroundY,53 + lookAroundX,-50 + lookAroundY,44.5 + lookAroundX,-55 + lookAroundY);
    
    
    //mouth
    
    if(oFace == true){
    fill(0);
    ellipse(2,30,55,60);
    
    } else if(oFace == false) {
        strokeWeight(1);
    fill(0);
    arc(2,-15,75,125,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);   
    fill("pink");
    strokeWeight(0);
    arc(2,15,50,60,TWO_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);
        
    }   
    
    
    //stem
    fill("brown");
    strokeWeight(0);
    quad(-110,108,-68,60,-60,65,-94,114);
    fill(0);
    strokeWeight(2)
    line(-110,108,-68,60);
    line(-94,114,-60,65);
    line(-110,108,-94,114);
    
    //hands
    fill(random(255),random(255),random(255));
    if(oFace == false){
    ellipse(-160,29,30,10);

    ellipse(-160,50,45,40);
    
    line(-160,47,-160,53);
    line(-167,48,-167,52);
    line(-153,48,-153,52);
    
    ellipse(160,29,30,10);

    ellipse(160,50,45,40);
    
    line(160,47,160,53);
    line(167,48,167,52);
    line(153,48,153,52);
    } else if(oFace == true){
    ellipse(-160,-149,30,10);

    ellipse(-160,-170,45,40);
    
    
    ellipse(160,-149,30,10);

    ellipse(160,-170,45,40);
    
    }
    
    //shoes
    fill(random(255),random(255),random(255));
    ellipse(-51,178,28,10);
    ellipse(-53,195,50,30);
    
    ellipse(51,178,28,10);
    ellipse(53,195,50,30); 
        pop();
    }
    

var hitZoneDist = dist(mouseX, mouseY, hitZoneX, hitZoneY);

    if(hitZoneDist < 20){
    image(leaves,0,0,1000,500);
    }
    noFill();
    stroke(255);
    ellipse(100,100,20,20);
    
}

  function mousePressed(){
      if(oFace == false){
          oFace = true;
    }   else{oFace = false}
  }

 function woahFunction(){
     if(woah == false)
     {woah = true;
    } else{woah = false;
    }
 }


   function locChange(){ 
        var chooseLocation = Math.floor(Math.random() * locOptions.length);
        if (locOptions[chooseLocation] == "Forest" && locOptions[chooseLocation] != currentLocation) {
                currentBgImage = bgImage;
                currentLocation = "Forest";
            } else if (locOptions[chooseLocation] == "Mountain" && locOptions[chooseLocation] != currentLocation) {
                currentBgImage = bgImage2;
                currentLocation = "Mountain";
            } else if (locOptions[chooseLocation] == "Desert" && locOptions[chooseLocation] != currentLocation) {
                currentBgImage = bgImage3;
                currentLocation = "Desert";
            } else if (locOptions[chooseLocation] == "Volcano" && locOptions[chooseLocation] != currentLocation) {
                currentBgImage = bgImage4;
                currentLocation = "Volcano";
            } else if (locOptions[chooseLocation] == "Beach" && locOptions[chooseLocation] != currentLocation) {
                currentBgImage = bgImage5;
                currentLocation = "Beach";
            } else locChange();
   }
   var currentLocation = "Forest"   
   var locOptions = ["Forest", "Mountain", "Desert", "Volcano", "Beach"];        
       
