//var bubble1;
//var bubble2;
var multiBubble = [];

function setup() {
    createCanvas(400, 400);
    //    bubble1 = new bubble(random(width), random(height), random(100));
    //    bubble2 = new bubble(random(width), random(height), random(100));



    for (var i = 0; i <= 100; i++) {
        var r = random(256);
        var g = random(256);
        var b = random(256);
        multiBubble.push(new bubble(random(width), random(height), random(100), r, g, b, true));
    }
}

function draw() {
    background(255);
    //    bubble1.display();
    //    bubble2.display();

    for (var i = 0; i < multiBubble.length; i++) {
        multiBubble[i].display();
        multiBubble[i].moveX();
        multiBubble[i].moveY();

        if (multiBubble[i].checkPosX() == 0) {
            //multiBubble[i].x = 0;
            multiBubble[i].direction = false;
        } else if(multiBubble[i].checkPosX() == 1)
        {
            multiBubble[i].direction = true;
        }
 if (multiBubble[i].checkPosY() == 0) {
            //multiBubble[i].y = 0;
            multiBubble[i].direction = false;
        } else if(multiBubble[i].checkPosY() == 1)
        {
            multiBubble[i].direction = true;
        }
    }
}

function bubble(tempX, tempY, tempDiameter, tempR, tempG, tempB, tempDir) {
    this.x = tempX;
    this.y = tempY;
    this.diameter = tempDiameter;
    this.r = tempR;
    this.g = tempG;
    this.b = tempB;
    this.direction = tempDir;

    this.display = function () {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    this.moveX = function () {
        if(this.direction == true){
            this.x = this.x + random(0,2);
        }
        if(this.direction == false){
            this.x = this.x - random(0,2);
        }
    }
    this.moveY = function () {
        if(this.direction == true){
            this.y = this.y + random(0,2);
        }
        if(this.direction == false){
            this.y = this.y - random(0,2);
        }
    this.checkPosX = function () {
        if (this.x > width) {
            return 0;
        }else if(this.x < 0){
            return 1;
        }else{
            return -1;
        }
    }
  this.checkPosY = function () {
        if (this.y > width) {
            return 0;
        }else if(this.y < 0){
            return 1;
        }else{
            return -1;
        }
    }
}
}