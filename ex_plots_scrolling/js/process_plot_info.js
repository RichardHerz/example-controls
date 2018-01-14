/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// data for profile plots - data static in plot window
// number plot points + 1 for origin
// WARNING: where numberPoints here should match numberPoints in
//          unit that generates the profile data

// INPUTS ARE: initPlotData(numberVariables,numberPoints);
var numStripVars = 2;
var numStripPoints = 80;
var stripData = initPlotData(numStripVars,numStripPoints);

// set up flag and plot array so don't have to generate
// entire plot everytime want to just change data (and not axes, etc.)
// Speed change in desktop Chrome is 3 sec vs. 5 sec.
// Speed change in iPhone Chrome is 11 sec vs. 16 sec
plotFlag = [0,0];
var plot = [];

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
  //
  // WARNING: some of these object properties may be changed during
  //          operation of the program, e.g., show, scale
  //
  // plot 0 info
  plotsObj[0] = new Object();
  plotsObj[0]['name'] = 'waves';
  plotsObj[0]['type'] = 'strip';
  plotsObj[0]['canvas'] = '#div_plotCanvas_1';
  plotsObj[0]['numberPoints'] = numStripPoints; // should match numberPoints in process unit
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
    plotsObj[0]['var'][1] = 1; // 2nd var
  plotsObj[0]['varLabel'] = new Array();
    plotsObj[0]['varLabel'][0] = 'sine';
    plotsObj[0]['varLabel'][1] = 'sawtooth';
  plotsObj[0]['varShow'] = new Array();
    plotsObj[0]['varShow'][0] = 'show'; // 1st var, 'show' to show, '' to not
    plotsObj[0]['varShow'][1] = 'show';
  plotsObj[0]['varYaxis'] = new Array();
    plotsObj[0]['varYaxis'][0] = 'left'; // 1st var
    plotsObj[0]['varYaxis'][1] = 'left';
  plotsObj[0]['varYscaleFactor'] = new Array();
    plotsObj[0]['varYscaleFactor'][0] = 1; // 1st var
    plotsObj[0]['varYscaleFactor'][1] = 1;
  // ALTERNATIVE to separate arrays for variable number, show, axis
  //    might be to have one array per variable equal to an array of info...?
