/*
  Design, text, images and code by Richard K. Herz, 2018
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

//  >>>>>>>     UNDER DEVELOPMENT         <<<<<<<<<<<<<<
//  >>>>>>> NOT CURRENTLY USED IN PROJECT <<<<<<<<<<<<<<

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

//  >>>>>>>     UNDER DEVELOPMENT         <<<<<<<<<<<<<<
//  >>>>>>> NOT CURRENTLY USED IN PROJECT <<<<<<<<<<<<<<

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
//
// x and y are the horizontal and vertical axes of the canvas
//
plotsObj[0]['xAxisLabel'] = 'x';
plotsObj[0]['xAxisMin'] = 0;
plotsObj[0]['xAxisMax'] = 1;
plotsObj[0]['xAxisReversed'] = 0; // 0 false, 1 true, when true
//
plotsObj[0]['yAxisLabel'] = 'y';
plotsObj[0]['yAxisMin'] = 0;
plotsObj[0]['yAxisMax'] = 1;
plotsObj[0]['yAxisReversed'] = 0; // 0 false, 1 true, when true
//
// z is the value to be color encdoded
//
plotsObj[0]['zAxisLabel'] = 'sine';
plotsObj[0]['zAxisMin'] = 0;
plotsObj[0]['zAxisMax'] = 1;
plotsObj[0]['zAxisReversed'] = 0; // 0 false, 1 true, when true
//
plotsObj[0]['plotLegendPosition'] = 'ne';
plotsObj[0]['var'] = new Array();
  plotsObj[0]['var'][0] = 0; // 1st var in data array
plotsObj[0]['varLabel'] = new Array();
  plotsObj[0]['varLabel'][0] = 'sine';
plotsObj[0]['varShow'] = new Array();
  plotsObj[0]['varShow'][0] = 'show'; // 1st var, 'show' or 'hide'
plotsObj[0]['varYaxis'] = new Array();
  plotsObj[0]['varYaxis'][0] = 'left'; // 1st var
plotsObj[0]['varYscaleFactor'] = new Array();
  plotsObj[0]['varYscaleFactor'][0] = 1; // 1st var
