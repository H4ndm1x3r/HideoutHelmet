//-------------HOW TO MAKE A SERVO GO UP AND DOWN-------------\\

// acquire ADXL335 accelerometer library
var foo = require("ADXL335").connect(C2,C3,A0); 
// acquire servo library
var s = require("servo").connect(C6);
// reserve axis variables
var xAxis;
var yAxis;
var zAxis;
// read data from accelerometer.
function readADXL335() {
  // get G-data for all axis'.
  var d = foo.readG();
  // log output data
  // round x-axis accl to 2 decimals.
  xAxis = Math.round(d[0]*100)/100;
  // round y-axis to 2 decimals.
  yAxis = Math.abs(Math.round(d[1]*100)/100);
  // round z-axis to 2 decimals.
  zAxis = Math.round(d[2]*100)/100;
}
//----------------------------------------------------------------\\
var xVariable; // make xVariable an open variable
function gestureMathDown() { // decide whether gesture is head-down based on x-axis
  var findMovementX = 1;
  var xMoved = true;
  // calculate total x-axis accel/position
  xVariable = 0;
  var xVariable2; //reserve second x-variable
  var xVariable1 = xAxis; //set first x-variable
  if (/* adjust these variables and the following higher for more agression*/ xVariable1 > 0.90 && xVariable1 < 1.2) { // if the first x-variable is within the set range, set the second.
    xVariable2 = xAxis;
  }
  if (xVariable1 > 0.90 && xVariable1 < 1.2 && xVariable2 > 0.95) { // if both first and second x-variables meet the requirements, set the third
    var xVariable3 = xAxis;
    xVariable = xVariable1+xVariable2+xVariable3;
  }
  //console.log(xVariable);                                     // log for troubleshooting down movement
  if (xVariable < 2.8 || xVariable > 3.2 && xMoved === true) { // initial test for downmovement
    findMovementX = !findMovementX;
    xMoved = !xMoved;
  }
  if (findMovementX == 1 && xVariable >= 2.8 && xVariable <= 3.20 && xMoved === false){ // allow the down movement
    xMoved = true;
  //console.log("Moved all they way down");                   // log for troubleshooting if-statements
    return xMoved;
  }
  if (findMovementX == 1 && xMoved === true) { // perform the down movement
    s.move(0,700);
  }
  
  //console.log("x-values: "+xVariable+" , "+xMoved);         // log for visual confirmation in the JS console
  return xMoved; // return xMoved for possible use in other functions
}

var yVariable; // make yVariable an open variable
function gestureMathSide() { // decide whether gesture is head-tilt based on y-axis
  var findMovementY = 1;
  var yMoved = true;
  //calculate total y-axis accel/position
  yVariable = 0;
  var yVariable1 = yAxis; //set first y-variable
  if (/* adjust these variables and the following higher for more aggression  */ yVariable1 > 0.40 && yVariable1 < 0.60) { // if the first y-variable is within the range, set the second
    var yVariable2 = yAxis;
    yVariable = yVariable1+yVariable2;
  }
  //console.log(yVariable);                //log for toubleshooting tilt movement
  
  if (yVariable < 0.82 || yVariable > 1.2 && yMoved === true) { //initial test for tilt movement
    findMovementY = !findMovementY;
    yMoved = !yMoved;
  }
  if (findMovementY == 1 && yVariable >= 0.82 && yVariable <= 1.2 && yMoved === false) { // allow the tilt motion
    yMoved = true; 
    return yMoved;
  }
  if (findMovementY == 1 && yMoved === true) { // perform the tilt motion
    s.move(0.5,700);
  }
  //console.log("y-values: "+yVariable+" , "+yMoved);            // log for visual confirmaton in the JS console
  return yMoved; // return yMoved for possible use in other functions
  
}

var zVariable; // make zVariable an open variable
function gestureMathUp() { // decide whether gesture is head-up based on z-axis
  var findMovementZ = 0;
  var zMoved = true;
  //calculate total z-axis accel/position
  zVariable = 0;
  var zVariable1 = zAxis; //set first z-variable
  if (/* adjust these variables and the following higher for more aggression */ zVariable1 > 0.60 && zVariable1 < 0.80) { //if first z-variable fits within the range, set the second
    var zVariable2 = zAxis;
    zVariable = zVariable1+zVariable2;
  }
 //console.log(zVariable);            // log for troubleshooting back movement
  
  if (zVariable === 0 || zVariable > 1.20 && zVariable < 1.6 && zMoved === true) { // initial check for back movement
    findMovementZ = !findMovementZ;
    zMoved = !zMoved;
  }
  if (findMovementZ == 1 && zVariable >= 1.26 && zVariable <= 1.60 && zMoved === false) { // allow back movement
    zMoved = !zMoved;
  }
  if (findMovementZ == 1 && zMoved === true) { // perform back movement
    s.move(1,700);
  }
  //console.log("z-values: "+zVariable+" , "+zMoved);      //log for visual confirmation in the JS console
  return zMoved; // returns zMoved for posible use in other functions
  
}
//----------------------------------------------------------------\\
function onInit() { //sets the following intervals on startup
  setInterval (readADXL335,100);
  setInterval(gestureMathDown,200);
  setInterval(gestureMathSide,200);
  setInterval(gestureMathUp,200);
}

onInit();

/*
Digital Material and Interactive Artefacts 2016
Anne-Sofie Belling, Peter Spedtsberg,
Malte Sönnichsen, Nicholas Krasuski
*/
