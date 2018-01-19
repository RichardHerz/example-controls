/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function initDataArray(numVars,numDataPts,numIndex3) {
  // returns 3D array with all elements for plot filled with zero
  //    index 1 specifies the variable
  //    index 2 specifies the data point number
  //    index 3
  //      for x-y plots, [0] holds x-value, [1] holds y-value
  //          and numIndex3 = 2
  //      for color canvases, [0] & [1] same as x-y, [2] holds z- (color) value
  //          and numIndex3 = 3
  //    x-min/max & y-min/max should be specified for each var in plot_info.js
  var f; // first index
  var s; // second index
  var t; // third index
  var plotDataStub = new Array();
  for (f = 0; f < numVars; f += 1) { // NOTE < AT f <
    plotDataStub[f] = new Array();
      for (s = 0; s <= numDataPts; s += 1) { // NOTE = AT s <=
      plotDataStub[f][s] = new Array();
      for (t = 0; t < numIndex3; t += 1) { // NOTE < AT t <
        plotDataStub[f][s][t] = 0;
      }
    }
  }
  return plotDataStub;
} // end function initDataArray

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
var numDataPts = 128;
// var numSpacePts = 40;
var numIndex3 = 3 // 2 for x-y plots, 3 for canvas colormaps
// if want square canvas 'pixels' set time/space pt ratio = canvas width/height ratio
var spaceTimeData = initDataArray(numSpaceTimeVars,numDataPts,numIndex3);

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

function plotSpaceTimePlot(varNum) {
  // varNum the index number of the variable to plot
  var canvas = document.getElementById('canvas_CANVAS_rate');
  var context = canvas.getContext('2d');
  // // test with example from
  // //   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
  // context.fillStyle = 'rgb(200,0,0)';
  // context.fillRect(10,10,50,50);
  // context.fillStyle = 'rgba(0,0,200,0.5)';
  // context.fillRect(30,30,50,50);
  // get data from array spaceTimeData and plot
  var s; // second index
  var t; // third index
  var z; // z-value to be color encoded
  var zMax = 1;
  var r; // RGB red value
  var g; // RGB green value
  var b; // RGB blue value
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

  // numDataPts is a global defined above in this file

  // compute the plotted pixel height and width
  var cw = canvas.width;
  var ch = canvas.height;
  var ppMinSize = 1; // 1 or larger
  // for square plotted 'pixels' set plotted width/height = canvas width/height
  if (cw >= ch) {
    pph = ppMinSize;
    ppw = pph * cw/ch;
  } else {
    ppw = ppMinSize;
    pph = ppw * ch/cw
  }

  var xPix; // canvas pixel location of top-left corner of plotted pixel
  var yPix;
  var xMin = xxx; // get min and max from plot_info.js
  var xMax = xxx;
  var yMin = xxx;
  var yMax = xxx;

  for (s = 0; s <= numDataPts; s += 1) { // NOTE = at s <=

    // third index is 0, 1, or 2 for canvas element graphics
    x = spaceTimeData[varNum][s][0]; // horizontal axis value
    y = spaceTimeData[varNum][s][1]; // vertical axis value
    z = spaceTimeData[varNum][s][2]; // value to color code

    // canvas pixel locations of top-left corner of plotted pixel
    xPix = cw * (x - xMin)/(xMax - xMin);
    yPix = ch * (y - yMin)/(yMax - yMin);

    // scale z to 0 to 1
    z = z / zMax;
    // get RGB colors for scaled z value
    jet = jetColorMap(z); // z must be scaled 0 to 1
    // extract red, green, blue values from jet array
    r = jet[0];
    g = jet[1];
    b = jet[2];
    // convert computed color values to string for context.fillStyle
    tColor2 = r.toString();
    tColor3 = g.toString();
    tColor4 = b.toString();
    tColor = tColor1.concat(tColor2,',',tColor3,',',tColor4,tColor5);
    context.fillStyle = tColor;

      // // swap directions in plot from that in spaceTimeData array
      // x = tPixelsPerPoint * (numTimePts - t);
      // y = sPixelsPerPoint * (numSpacePts - s);

      context.fillRect(xPix,yPix,ppw,pph);

    } // end of for (s = 0; s <= numDataPts; s += 1)
} // end of function plotSpaceTimePlot
