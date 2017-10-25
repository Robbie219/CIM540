var lines = [0, 0, 400, 0];


function setup() {
    createCanvas(400, 400);
}

function draw() {
    frameRate(30);
    background(255);
    //  for(var i = 0; i<=10; i++){
    //    console.log(i);
    //  ellipse(random(width),random(height),10,10);
    //}

    for (var i = 0; i <= height * width; i++) {
        stroke(random(256), random(256), random(256));
        strokeWeight(random(10));
        lines[1] = i;
        lines[3] = i;
        line(random(width), random(height), random(width), random(height));
        // line(lines[1],height,lines[3],0);
        //fill(random(256),random(256),random(256));

        //ellipse(lines[1],random(height),10,10);

    }

}
