var interfaceItems = [];

var dots = [];

var r = 0;
var g = 0;
var b = 0;

function setup() {
    createCanvas(400, 400);

    interfaceItems.push(new interface(50, 360, 40,255,0,0));
    interfaceItems.push(new interface(150, 360, 40,0,255,0));

    //    for (var i = 0; i <= 500; i++) {
    //        dots.push(new makeDots(random(width),random(height-50),10));
    //    }
}

function draw() {
    background(255);
    interfaceItems[0].display();
    interfaceItems[0].check();
    //console.log(interfaceItems[0].check());
    interfaceItems[1].display();
    interfaceItems[1].check();
    
    if(r == 0){
        r++;
    }else if(r == 255){
        r--;
    }
    
     if(g == 0){
        g++;
    }else if(g == 255){
        g--;
    }

     if(b == 0){
        b++;
    }else if(b == 255){
        b--;
    }
    
    for (var i = 0; i < dots.length; i++) {
        dots[i].display();
        dots[i].moveX();
        dots[i].moveY();
        
        
        if (dots[i].checkPosX() == 0) {
            
            dots[i].direction = 0;
        } else if(dots[i].checkPosX() == 1)
        {
            dots[i].direction = 1;
        }
 if (dots[i].checkPosY() == 0) {
            
            dots[i].direction = 0;
        } else if(dots[i].checkPosY() == 1)
        {
            dots[i].direction = 1;
        }
    }

    //    for(var = i){
    //       
    //    }

}

function interface(tempX, tempY, tempBoxSize,tempR,tempG,tempB) {

    this.x = tempX;
    this.y = tempY;
    this.boxSize = tempBoxSize;
    this.r = tempR;
    this.g = tempG;
    this.b = tempB;
    

    this.display = function () {
        fill(this.r,this.g,this.b)
        rect(this.x, this.y, this.boxSize, this.boxSize);
       
    }
    this.check = function () {
        if (mouseX > this.x && mouseX < (this.x + this.boxSize) && mouseY > this.y && mouseY < (this.y + this.boxSize)) {
            // this.overlay = true;
            return true;
        } else {
            //this.overlay = false;
            return false;
        }
    }
}

function mousePressed() {
    if (interfaceItems[0].check() == true) {
        dots.length --;
    }

    if (interfaceItems[1].check() == true) {
        dots.push(new makeDots(random(width), random(height - 50),random(5,40), floor(random(2)),random(256),random(256),random(256)));
        

    }
}

function makeDots(tempX, tempY, tempDiameter, tempDir,tempR,tempG,tempB) {

    this.x = tempX;
    this.y = tempY;
    this.diameter = tempDiameter;
    this.direction = tempDir;
    this.r = tempR;
    this.g = tempG;
    this.b = tempB;
    

    this.display = function () {
        fill(this.r,this.g,this.b);
        ellipse(this.x, this.y, this.diameter, this.diameter,this.r,this.g,this.b);
    }

    this.moveX = function () {
        if (this.direction == 1) {
            this.x = this.x + random(0,2);
        }
        if (this.direction == 0) {
            this.x = this.x - random(0,2);
        }
    }
    this.moveY = function () {
        if (this.direction == 1) {
            this.y = this.y + random(0,2);
        }
        if (this.direction == 0) {
            this.y = this.y - random(0,2);
        }
        this.checkPosX = function () {
            if (this.x > width) {
                return 0;
            } else if (this.x < 0) {
                return 1;
            } else {
                return -1;
            }
        }
        this.checkPosY = function () {
            if (this.y > height - 50) {
                return 0;
            } else if (this.y < 0) {
                return 1;
            } else {
                return -1;
            }
        }



    }
}
