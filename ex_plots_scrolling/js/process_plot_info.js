/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// WARNING: number plot points here should match number plot points in
//          unit that generates the plot data
// where number plot points + 1 for origin are plotted

var numStripVars = 2;
var numStripPoints = 80;
var stripData = initPlotData(numStripVars,numStripPoints); // holds data for scrolling plots

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
plotsObj[0]['type'] = 'strip';
plotsObj[0]['canvas'] = '#div_plotCanvas_1';
plotsObj[0]['numberPoints'] = numStripPoints; // to match number points in process unit
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
