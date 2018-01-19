/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// WARNING: number plot points here should match number plot points in
//          unit that generates the plot data
// where number plot points + 1 for origin are plotted

// these vars used several places below in this file
var numColorCanvasVars = 1;
var numColorCanvasPts = 80;

// DECLARE PARENT OBJECT TO HOLD PLOT INFO
// more than one plot can be put one one web page by
// defining multiple object children, where the first index
// plotsObj[0] is the plot number index (starting at 0)
//
var plotsObj = new Object();
//
// USE THIS TO GET NUMBER OF plots, i.e., top-level children of plotsObj
//    Object.keys(plotsObj).length;
// except this will include any additional top level children

// ADD A CHILD TO plotsObj FOR EACH PLOT TO APPEAR ON WEB PAGE
//
// WARNING: some of these object properties may be changed during
//          operation of the program, e.g., show, scale
//

// plot 0 info
plotsObj[0] = new Object();
plotsObj[0]['name'] = 'space-time';
plotsObj[0]['type'] = 'colormap';
plotsObj[0]['canvas'] = '#canvas_CANVAS_rate';
plotsObj[0]['numberPoints'] = numColorCanvasPts;
// plot has numberPoints + 1 pts!
plotsObj[0]['xAxisLabel'] = 'x';
plotsObj[0]['xAxisMin'] = 0;
plotsObj[0]['xAxisMax'] = 1;
plotsObj[0]['xAxisReversed'] = 0; // 0 false, 1 true, when true, xmax on left
plotsObj[0]['yLeftAxisLabel'] = 'y';
plotsObj[0]['yLeftAxisMin'] = 0;
plotsObj[0]['yLeftAxisMax'] = 1;
plotsObj[0]['yRightAxisLabel'] = '';
plotsObj[0]['yRightAxisMin'] = 0;
plotsObj[0]['yRightAxisMax'] = 1;
plotsObj[0]['plotLegendPosition'] = 'ne';
plotsObj[0]['var'] = new Array();
  plotsObj[0]['var'][0] = 0; // 1st var in profile data array
plotsObj[0]['varLabel'] = new Array();
  plotsObj[0]['varLabel'][0] = 'sine';
plotsObj[0]['varShow'] = new Array();
  plotsObj[0]['varShow'][0] = 'show'; // 1st var, 'show' or 'hide'
plotsObj[0]['varYaxis'] = new Array();
  plotsObj[0]['varYaxis'][0] = 'left'; // 1st var
plotsObj[0]['varYscaleFactor'] = new Array();
  plotsObj[0]['varYscaleFactor'][0] = 1; // 1st var

// DEFINE plotFlag ARRAY so don't have to generate
// entire x-y plot everytime want to just change data (and not axes, etc.)
// for example, for 4 plots on page, this ran in 60% of time for full refresh
// plotFlag array used in function plotPlotData
//
// WARNING: plotFlag ARRAY MUST BE DEFINED AFTER ALL plotsObj CHILDREN
//
var npl = Object.keys(plotsObj).length; // number of plots
var p; // used as index
var plotFlag = [0];
for (p = 1; p < npl; p += 1) {
  plotFlag.push(0);
}

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

// initialize data arrays - must follow function initPlotData in this file
var numIndex3 = 3 // 2 for x-y plots, 3 for color canvas plots
var colorCanvasData = initDataArray(numColorCanvasVars,numColorCanvasPts,numIndex3);
