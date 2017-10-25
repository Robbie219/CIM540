var posX = 250;
var posY = 0;

var fall = true;

var startButton;
var startBounce = false;

function setup(){
    createCanvas(500,500);
    
    startButton = createButton("start/stop");
    startButton.position(0,500);
    startButton.mousePressed(function(){
        posY = 0;
        if(startBounce == false){
            startBounce = true;
        }else{
            startBounce = false;
        }
        
        
        
    });
    
    
}

function draw(){
    background(255);
    ellipse(posX,posY,50,50);
    
    if(startBounce == true){
       if(fall == true){
        posY++;
    }
    
    if(fall == false){
        posY--;
    }
    
    //if(posY >= height){
       // posY = 0;
    
    if(posY <= 0){
        fall = true;
    }
    
    if(posY >= height){
        fall = false;
    } 
    }
    
    
}