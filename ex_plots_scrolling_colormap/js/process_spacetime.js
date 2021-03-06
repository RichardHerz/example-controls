/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function initSpaceTimeArray(numVars,numTimePts,numSpacePts) {
  // returns 3D array to hold data for multiple variables for SPACE-TIME plots
  // returns array with all elements for plot filled with zero
  //    index 1 specifies the variable,
  //    index 2 specifies the number of time points [0 to numTimePoints]
  //    index 3 specifies the number of space points [0 to numSpacePoints]
  //    the element value at plotDataStub[v][t][s] will be the conc or rate
  //      to be shown for that variable at that time at that space location
  var v;
  var s;
  var t;
  var plotDataStub = new Array();
  for (v = 0; v < numVars; v += 1) {
    plotDataStub[v] = new Array();
      for (t = 0; t <= numTimePts; t += 1) { // NOTE = AT t <=
      plotDataStub[v][t] = new Array();
      for (s = 0; s <= numSpacePts; s += 1) { // NOTE = AT s <=
        plotDataStub[v][t][s] = 0;
      }
    }
  }
  // document.getElementById("dev01").innerHTML = "hello";
  return plotDataStub;
} // end function initSpaceTimeArray

// create array to hold space-time plot data
// these become global vars used in other script files
var numSpaceTimeVars = 1;
var numTimePts = 128;
var numSpacePts = 40;
// if want square canvas 'pixels' set time/space pt ratio = canvas width/height ratio
var spaceTimeData = initSpaceTimeArray(numSpaceTimeVars,numTimePts,numSpacePts);

function jetColorMap(n) {
  // input n should be value between 0 and 1
  // rgb output array values will be 0-255 to match MATLAB's jet colormap
  //
  // ANOTHER WAY would be a look up table - would that be faster?
  //
  var r;
  var g;
  var b;
  if (n<0) {n = 0;}
  if (n>1) {n = 1;}
  // would not need to round input to integers with IF statements
  // EXCEPT if don't round then can get rgb values > 1.0 at end of IF
  // so would then need to add more IF statements to check - SO ROUND NOW
  var n64 = Math.round(1 + 63*n); // n64 = 1 when n = 0; n64 = 64 when n = 1
  if (n64 >= 1 && n64 < 9) {
    r = 0;
    g = 0;
    b = (n64-1)/7*0.4375 + 0.5625;
  } else if (n64 >= 9 && n64 < 25) {
    r = 0;
    g = (n64-9)/15*0.9375 + 0.0625;
    b = 1;
  } else if (n64 >= 25 && n64 < 41) {
    r = (n64-25)/15*0.9375 + 0.0625;
    g = 1;
    b = -(n64-25)/15*0.9375 + 0.9375;
  } else if (n64 >= 41 && n64 < 57) {
    r = 1;
    g = -(n64-41)/15*0.9375 + 0.9375;
    b = 0;
  } else if (n64 >= 57 && n64 <= 64) {
    r = -(n64-57)/7*0.4375 + 0.9375;
    g = 0;
    b = 0;
  } else {
    // out of bounds - give output for zero input
    r = 0;
    g = 0;
    b = 0.5625;
  } // end of IF structure
  // but we must round output to integers after converting to 0-255
  r = Math.round(r*255);
  g = Math.round(g*255);
  b = Math.round(b*255);
  return [r,g,b];
} // end of function jetColorMap

function plotSpaceTimePlot() {
  var canvas = document.getElementById('canvas_CANVAS_rate');
  var context = canvas.getContext('2d');
  // // test with example from
  // //   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
  // context.fillStyle = 'rgb(200,0,0)';
  // context.fillRect(10,10,50,50);
  // context.fillStyle = 'rgba(0,0,200,0.5)';
  // context.fillRect(30,30,50,50);
  // get data from array spaceTimeData and plot
  var v = 0; // v = 0 is the index number of the variable to plot
  var t;
  var s;
  var rate;
  var r;
  var g;
  var b;
  var jet;
  var x;
  var y;
  // below we have to convert computed color values
  // to text string for fillStyle below, so get pieces ready
  var tColor1 = 'rgb(';
  var tColor2;
  var tColor3;
  var tColor4;
  var tColor5 = ')';
  var tPixels = canvas.width;
  var sPixels = canvas.height;
  // numTimePts and numStripPts are globals defined above in this file
  var tPixelsPerPoint = tPixels/(numTimePts+1); // pixels per point
  var sPixelsPerPoint = sPixels/(numSpacePts+1); // pixels per point
  var maxRate = 1;
  for (t = 0; t <= numTimePts; t += 1) { // NOTE = at t <=
    for (s = 0; s <= numSpacePts; s += 1) { // NOTE = AT s <=
      rate = spaceTimeData[v][t][s] / maxRate;
      jet = jetColorMap(rate); // rate should be scaled 0 to 1
      r = jet[0];
      g = jet[1];
      b = jet[2];
      // we have to convert computed color values to string for fillStyle
      tColor2 = r.toString();
      tColor3 = g.toString();
      tColor4 = b.toString();
      tColor = tColor1.concat(tColor2,',',tColor3,',',tColor4,tColor5);
      // document.getElementById("dev01").innerHTML = jetColorMap(1);
      context.fillStyle = tColor;
      // swap directions in plot from that in spaceTimeData array
      x = tPixelsPerPoint * (numTimePts - t);
      y = sPixelsPerPoint * (numSpacePts - s);
      context.fillRect(x,y,tPixelsPerPoint,sPixelsPerPoint);
    } // end of inner FOR repeat
  } // end of outer FOR repeat
} // end of function plotSpaceTimePlot
