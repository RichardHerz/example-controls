/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// WARNING: number plot points here should match number plot points in
//          unit that generates the plot data
// where number plot points + 1 for origin are plotted

// these vars used several places below in this file for static profile plot
var numProfileVars = 2;
var numProfilePts = 80;

// these vars used several places below this file for scrolling strip chart plot
var numStripVars = 0;
var numStripPts = 0;

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
plotsObj[0]['name'] = 'waves';
plotsObj[0]['type'] = 'profile';
plotsObj[0]['canvas'] = '#div_plotCanvas_1';
plotsObj[0]['numberPoints'] = numProfilePts;
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

// DEFINE plotFlag ARRAY so don't have to generate
// entire plot everytime want to just change data (and not axes, etc.)
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

function initPlotData(numVar,numPlotPoints) {
  // returns 3D array to hold x,y scatter plot data for multiple variables
  // inputs are list of variables and # of x,y point pairs per variable
  // returns array with all elements for plot filled with zero
  //    index 1 specifies the variable,
  //    index 2 specifies the data point pair
  //    index 3 specifies x or y in x,y data point pair
  var v;
  var p;
  var plotDataStub = new Array();
  for (v = 0; v < numVar; v += 1) {
    plotDataStub[v] = new Array();
    for (p = 0; p <= numPlotPoints; p += 1) { // NOTE = AT p <=
      plotDataStub[v][p] = new Array();
      plotDataStub[v][p][0] = 0;
      plotDataStub[v][p][1] = 0;
    }
  }
  return plotDataStub;
  // Note above initialize values for
  //    plotDataStub [0 to numVar-1] [0 to numPlotPoints] [0 & 1]
  // If want later outside this constructor to add new elements,
  // then you can do easily for 3rd index, e.g.,
  //    plotDataStub [v] [p] [2] = 0;
  // But can NOT do assignment for [v] [p+1] [0] since p+1 element does not yet
  // exist, where here p = numPlotPoints+1.
  // Would have to first create new p+1 array
  //    plotDataStub [v] [p+1] = new Array();
  // Then can do
  //    plotDataStub [v] [p+1] [0] = 0;
  //    plotDataStub [v] [p+1] [1] = 0; // etc.
} // end function initPlotData

// initialize data arrays - must follow function initPlotData in this file
var profileData = initPlotData(numProfileVars,numProfilePts); // holds data for static profile plots
var stripData = initPlotData(numStripVars,numStripPts); // holds data for scrolling strip chart plots
