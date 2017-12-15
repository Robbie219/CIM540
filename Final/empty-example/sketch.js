var noteName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

var source, fft, lowPass, currentNote, cents, volume;
var volumeTot = 0;
var resetScore = 0;
var score = 0;

var hiScore = 0;
var volumeArray = [];

// center clip nullifies samples below a clip amount
var doCenterClip = false;
var centerClipThreshold = 0.0;

// normalize pre / post autocorrelation
var preNormalize = true;
var postNormalize = true;

//game variables

var GROUND_Y = 450;
var MAX_OPENING;
var bird, ground;
var pipes;
var gameOver;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

//pitch detection
  source = new p5.AudioIn();
  source.start();
  source.getLevel();
  smooth(1);


  lowPass = new p5.LowPass();
  lowPass.disconnect();
  source.connect(lowPass);

  fft = new p5.FFT();
  fft.setInput(lowPass);
   fft.smooth(); 
  //tuning game
    
  bird = createSprite(width, height/2, 40,40);
  bird.rotateToDirection = true;
  //bird.velocity.x = 4;
  bird.setCollider("circle", 0,0,20);
 
  pipes = new Group();
  gameOver = true;
  updateSprites(false);
  
 
}

function draw() {
    background(0);
    
  // array of values from -1 to 1
  var timeDomain = fft.waveform(1024, 'float32');
  var corrBuff = autoCorrelate(timeDomain);
   
  //display fundamental freq in hz
 fill(255);
//  var volumeNow = source.getLevel();  
//  
//  for(var i = 0; i <=100; i ++){
//      volumeArray[i] = volumeNow;
//      volumeTot += volumeArray[i];
//      if(i = 100){
//          i = 0;
//      }
//      
//  }
//    
//    volume = volumeTot/volumeArray.length;
 volume = source.getLevel();
  //smooth(volume,1);  
 // console.log(volumeTot);

  
 
    

      
      
  //tuning game
    
    var y1 = map(volume.toFixed(1),0.06,0.5,height,0);

  if(gameOver && volume > 0.05)
    newGame();

  if(!gameOver) {

   
    
      bird.position.y = y1;
          
    if(bird.position.y<0)
      bird.position.y = 0;
    
  

    if(bird.overlap(pipes))
      die();

    //spawn pipes
    if(frameCount%180 == 0) {
      var pipeH = random(50, 1000);
      var pipe = createSprite(bird.position.x + width , height, 80, pipeH);
      pipe.velocity.x =-4;
      pipes.add(pipe);

      //top pipe
      if(pipeH > 0) {
        MAX_OPENING = height - pipeH - 50;
       
        var pipe2 = createSprite(bird.position.x + width ,0, 80, height-pipeH);
         pipe2.velocity.x = -4;
        pipes.add(pipe2);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < bird.position.x-width/2)
        pipes[i].remove();
      
      // scoring
    for(var i = 0; i<pipes.length; i ++){
        if(pipes[i].position.x < bird.position.x && cents <= 5 && cents >= -5){
            
             score++;
        }
        if(score > hiScore){
            hiScore = score;
        }
    }
     
  } 
   
    console.log(score);
   
  camera.position.x = bird.position.x + width/4;



  background(0,0,0); 
  
  drawSprites(pipes);
  
  drawSprite(bird);

 if(volume > 0.00){
  var freq = findFrequency(corrBuff);
  var note =  noteFromPitch( freq );
  var cents = centsOffFromPitch( freq, note );
  
  currentNote = noteName[note % 12];
  text (" Note: " + currentNote + " Cents: " + cents + " Score: " + score + " HiScore: " + hiScore, width/3, 50);
 // textAlign(LEFT,TOP);
    // console.log("Frequency: " + freq.toFixed(2) + " Note: " + currentNote + " Cents: " + cents);
  }
  
}


function die() {
  updateSprites(false);
  gameOver = true;   
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width/2;
  bird.position.y = height/2;
  bird.velocity.y = 0;
  score = resetScore;

}

function mousePressed() {
  if(gameOver)
    newGame();
  
}






// accepts a timeDomainBuffer and multiplies every value
function autoCorrelate(timeDomainBuffer) {
  
  var nSamples = timeDomainBuffer.length;

  // pre-normalize the input buffer
  if (preNormalize == true){
    timeDomainBuffer = normalize(timeDomainBuffer);
  }

  // zero out any values below the centerClipThreshold
  if (doCenterClip == true) {
    timeDomainBuffer = centerClip(timeDomainBuffer);
  }

  var autoCorrBuffer = [];
  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      if (indexLagged < nSamples){
        var sound1 = timeDomainBuffer[index];
        var sound2 = timeDomainBuffer[indexLagged];
        var product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    autoCorrBuffer[lag] = sum/nSamples;
  }

  // normalize the output buffer
  if (postNormalize){
    autoCorrBuffer = normalize(autoCorrBuffer);
  }

  return autoCorrBuffer;
}


// Find the biggest value in a buffer, set that value to 1.0,
// and scale every other value by the same amount.
function normalize(buffer) {
  var biggestVal = 0;
  var nSamples = buffer.length;
  for (var index = 0; index < nSamples; index++){
    if (abs(buffer[index]) > biggestVal){
      biggestVal = abs(buffer[index]);
    }
  }
  for (var index = 0; index < nSamples; index++){

    // divide each sample of the buffer by the biggest val
    buffer[index] /= biggestVal;
  }
  return buffer;
}

// Accepts a buffer of samples, and sets any samples whose
// amplitude is below the centerClipThreshold to zero.
// This factors them out of the autocorrelation.
function centerClip(buffer) {
  var nSamples = buffer.length;

  // center clip removes any samples whose abs is less than centerClipThreshold
  centerClipThreshold = map(mouseY, 0, height, 0,1); 

  if (centerClipThreshold > 0.0) {
    for (var i = 0; i < nSamples; i++) {
      var val = buffer[i];
      buffer[i] = (Math.abs(val) > centerClipThreshold) ? val : 0;
    }
  }
  return buffer;
}

// Calculate the fundamental frequency of a buffer
// by finding the peaks, and counting the distance
// between peaks in samples, and converting that
// number of samples to a frequency value.
function findFrequency(autocorr) {

  var nSamples = autocorr.length;
  var valOfLargestPeakSoFar = 0;
  var indexOfLargestPeakSoFar = -1;

  for (var index = 1; index < nSamples; index++){
    var valL = autocorr[index-1];
    var valC = autocorr[index];
    var valR = autocorr[index+1];

    var bIsPeak = ((valL < valC) && (valR < valC));
    if (bIsPeak){
      if (valC > valOfLargestPeakSoFar){
        valOfLargestPeakSoFar = valC;
        indexOfLargestPeakSoFar = index;
      }
    }
  }
  
  var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0;

  // convert sample count to frequency
  var fundamentalFrequency = sampleRate() / distanceToNextLargestPeak;
  return fundamentalFrequency;
}
   
   //get a note from the fund. freq.
   function noteFromPitch( freq ) {
	var noteNum = 12 * (Math.log( freq / 440 )/Math.log(2) ) ;
	return Math.round( noteNum ) + 69 ;
}

//How many cents off from in tune
function centsOffFromPitch( freq, note ) {
return Math.floor( 1200 * Math.log( freq / frequencyFromNoteNumber( note ))/Math.log(2) );
}

//Needed to simplify the math for finding cents
function frequencyFromNoteNumber( note ) {
    return 440 * Math.pow(2,(note-69)/12);
}




