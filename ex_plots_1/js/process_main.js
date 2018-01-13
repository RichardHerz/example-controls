/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

  // DISPLAY INITIAL STATE ON OPEN WINDOW
  window.onload = openThisLab;

  function openThisLab() {
    var resetFlag = 1; // 0 for no reset, 1 for reset lab
    updateProcessUnits(resetFlag);
    updateDisplay(resetFlag);
  } // END OF function openThisLab

  function updateProcessUnits(resetFlag) {
    // DO COMPUTATIONS TO UPDATE STATE OF PROCESS
    // update all units but do not display

    // THESE GLOBAL VARS ARE DEFINED IN process_plot_info.js
    // var numberVariables = 2;
    // var numberPoints = 80;

    var t = 0;
    for (k=0; k<=numberPoints; k+=1) {

      // x-axis values
      t = k/numberPoints;
      profileData[0][k][0] = t;
      profileData[1][k][0] = t;

      // y-axis values
      //   sine wave
      profileData[0][k][1] = 0.5 + 0.5*Math.sin(2*Math.PI*2*t);
      //   sawtooth wave
      profileData[1][k][1] = 0.5 - 1/Math.PI * Math.atan(1/Math.tan(Math.PI*t/0.25));
    }

  } // END OF updateProcessUnits

  function updateDisplay(resetFlag) {

    // GET AND PLOT ALL PLOTS defined in plotsObj in process_plot_info
    // plots are specified in object plotsObj in file process_plot_info.js
    var npl = Object.keys(plotsObj).length; // number of plots
    var p; // used as index
    var data;
    for (p = 0; p < npl; p += 1) {
      data = getPlotData(p);
      plotPlotData(data,p);
    }

  }  // END OF function updateDisplay
