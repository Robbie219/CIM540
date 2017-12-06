var noteName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

var source, fft, lowPass, currentNote, cents, volume;

// center clip nullifies samples below a clip amount
var doCenterClip = false;
var centerClipThreshold = 0.0;

// normalize pre / post autocorrelation
var preNormalize = true;
var postNormalize = true;

var ship;
var obstacles;
var gameOver;
var MIN_OPENING = 200;
var GROUND_Y = 450;

var shipInTuneImg,ShipOutImg, obstacleImg;

function preload(){
    shipInTuneImg = loadImage("assets/Triangle_Green.png");
    shipOutImg = loadImage("assets/Triangle_Red.png");
    obstacleImg = loadImage("assets/Obstacle.png");
    
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

//pitch detection
  source = new p5.AudioIn();
  source.start();
  


  lowPass = new p5.LowPass();
  lowPass.disconnect();
  source.connect(lowPass);

  fft = new p5.FFT();
  fft.setInput(lowPass);
    
  //tuning game
   //shipOutImg.resize((400,400));
    
    
    ship = createSprite(100, 150, 50, 100);
    ship.rotateToDirection = true;
    ship.velocity.x = 4;
    ship.setCollider("circle",0,0,20);
    //ship.addImage(shipOutImg);
    
    
    obstacles = new Group();
    gameOver = false;
    updateSprites(false);
    
    camera.position.y = height/2;
}

function draw() {
    background(0);
    
  // array of values from -1 to 1
  var timeDomain = fft.waveform(1024, 'float32');
  var corrBuff = autoCorrelate(timeDomain);
   
  //display fundamental freq in hz
 fill(255);
  volume = source.getLevel();

  if(volume > 0.00){
  var freq = findFrequency(corrBuff);
  var note =  noteFromPitch( freq );
  var cents = centsOffFromPitch( freq, note );
  
  currentNote = noteName[note % 12];
  text("Frequency: " + freq.toFixed(2) + " Note: " + currentNote + " Cents: " + cents, 20, 50);
  }
      
      
  //tuning game
  var y1 =  map(volume,0.00,1,height,0);  
  
 if(gameOver && volume >= 0.00)
    newGame();
    
 if(!gameOver){
     
     ship.position.y = y1;
     
     if(ship.position.y < 0)
         ship.position.y = 0;
     
     
     if (ship.position.y > height)
         ship.position.y = height;
     
     
     if (ship.overlap(obstacles))
         die();
     
     
     //spawn obstacles
     if(frameCount%60 === 0) {
      var obstacleH = random(50, 300);
      var obstacle = createSprite(ship.position.x + width, GROUND_Y-obstacleH/2+1+100, 80, obstacleH);
      //obstacle.addImage(obstacleImg);
      obstacles.add(obstacle);

      //top obstacle
      if(obstacleH<200) {
        obstacleH = height - (height-GROUND_Y)-(obstacleH+MIN_OPENING);
        obstacle = createSprite(ship.position.x + width, obstacleH/2-100, 80, obstacleH);
        obstacle.mirrorY(-1);
        //obstacle.addImage(obstacleImg);
        obstacles.add(obstacle);
      }
 }
     //get rid of passed obstacles
    for(var i = 0; i<obstacles.length; i++)
      if(obstacles[i].position.x < ship.position.x-width/2)
        obstacles[i].remove();
}

    camera.position.x = ship.position.x + width/4;
    
//  background(247, 134, 131); 
//  camera.off();
//  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(obstacles);

  drawSprite(ship);


 

    
  

  
//if(volume > 0.05){
//    runDetect = true;
//} else{
//    runDetect = false;
//} 
//  //console.log(cents);
//console.log(runDetect);

  
}

//game functions

function die() {
  updateSprites(false);
  gameOver = true;   
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  ship.position.x = width/2;
  ship.position.y = height/2;
  ship.velocity.x = 4;
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






// var buf = new Float32Array( 1024 );
//  var MIN_SAMPLES = 0;
// //var MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));
//  var GOOD_ENOUGH_CORRELATION = 0.9;
//  var mic;
//  var note;
//var cents;
//var freq;
//var freqNote;
//var currentNote;
//var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//
//
//
//function setup(){
// createCanvas(windowWidth,windowHeight);
// mic = new p5.AudioIn()
// mic.start();
// fft = new p5.FFT();
// fft.setInput(mic);
//    
//}
//
//function draw(){
//    background(0);
//    fill(255);
//    
//  buf= fft.waveform();
//  freq = autoCorrelate(buf, sampleRate() );
//  note = noteFromPitch(freq);
//  cents = centsOffFromPitch(freq,note);
//  freqNote = frequencyFromNoteNumber(note);
//  console.log("note: " + note + " cents: " + cents);
//  currentNote = noteStrings[note % 12];
//  text("Note: " + currentNote + " Freq: " + freqNote + " cents: " + cents,10,10);
// 
//     
//    
//}
//
//function autoCorrelate( buf, sampleRate ) {
//          var SIZE = buf.length;
//    //var SIZE = 1000;
//      var MAX_SAMPLES = Math.floor(SIZE/2);
//    //var MAX_SAMPLES = 1000;
//          var best_offset = -1;
//      var best_correlation = 0;
//      var rms = 0;
//      var foundGoodCorrelation = false;
//      var correlations = new Array(MAX_SAMPLES);
//
//for (var i=0;i<SIZE;i++) {
//	var val = buf[i];
//	rms += val*val;
//}
//rms = Math.sqrt(rms/SIZE);
//if (rms<0.01) // not enough signal
//	return -1;
//
//var lastCorrelation=1;
//for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
//	var correlation = 0;
//
//	for (var i=0; i<MAX_SAMPLES; i++) {
//		correlation += Math.abs((buf[i])-(buf[i+offset]));
//	}
//	correlation = 1 - (correlation/MAX_SAMPLES);
//	correlations[offset] = correlation; // store it, for the tweaking we need to do below.
//	if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
//		foundGoodCorrelation = true;
//		if (correlation > best_correlation) {
//			best_correlation = correlation;
//			best_offset = offset;
//		}
//	} else if (foundGoodCorrelation) {
//		// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
//		// Now we need to tweak the offset - by interpolating between the values to the left and right of the
//		// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
//		// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
//		// (anti-aliased) offset.
//
//		// we know best_offset >=1,
//		// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
//		// we can't drop into this clause until the following pass (else if).
//		var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
//		return sampleRate/(best_offset+(8*shift));
//	}
//	lastCorrelation = correlation;
//}
//if (best_correlation > 0.01) {
//	 //console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
//	return sampleRate/best_offset;
//}
//return -1;
//   //	var best_frequency = sampleRate/best_offset;
//      }
 
//
//function frequencyFromNoteNumber( note ) {
//	return 440 * Math.pow(2,(note-69)/12);
//}
//
//function centsOffFromPitch( freq, note ) {
//	return Math.floor( 1200 * Math.log( freq / frequencyFromNoteNumber( note ))/Math.log(2) );
//}

