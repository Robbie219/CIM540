var interfaceItems = [];

var dots = [];

function setup() {
    createCanvas(400, 400);

    interfaceItems.push(new interface(50, 360, 40));
    interfaceItems.push(new interface(150, 360, 40));

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

function interface(tempX, tempY, tempBoxSize) {

    this.x = tempX;
    this.y = tempY;
    this.boxSize = tempBoxSize;
    

    this.display = function () {
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
        dots.push(new makeDots(random(width), random(height - 50), 10, floor(random(2))));
    }

    if (interfaceItems[1].check() == true) {
        dots.length --;

    }
}

function makeDots(tempX, tempY, tempDiameter, tempDir) {

    this.x = tempX;
    this.y = tempY;
    this.diameter = tempDiameter;
    this.direction = tempDir;

    this.display = function () {
        ellipse(this.x, this.y, this.diameter, this.diameter);
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
