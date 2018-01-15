/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

  // DISPLAY INITIAL STATE ON OPEN WINDOW
  window.onload = openThisLab;

  function openThisLab(resetFlag) {
    var resetFlag = 1; // 0 for no reset, 1 for reset lab
    updateProcessUnits(resetFlag);
    updateDisplay(resetFlag);
  } // END OF function openThisLab

  function check_checkboxes() {
    // check checkboxes and update display
    var el1 = document.querySelector('#checkbox_sine_wave');
    var el2 = document.querySelector('#checkbox_sawtooth_wave');
    // global object plotsObj defined in process_plot_info.js
    // and used in updateDisplay in this file
    if (el1.checked) {
      plotsObj[0]['varShow'][0] = 'show';
    } else {
      plotsObj[0]['varShow'][0] = 'hide';
    }
    if (el2.checked) {
      plotsObj[0]['varShow'][1] = 'show';
    } else {
      plotsObj[0]['varShow'][1] = 'hide';
    }
    var resetFlag = 0; // 0 for no reset, 1 for reset lab
    updateDisplay(resetFlag);
  } // END OF function check_checkboxes

  function updateProcessUnits(resetFlag) {

    if (resetFlag) {
      // do any actions needed to reset update process units
    }

    // DO COMPUTATIONS TO UPDATE STATE OF PROCESS
    // update all units but do not display

    // THESE GLOBAL VARS ARE DEFINED IN process_plot_info.js
    // var numberVariables = 2;
    // var numberPoints = 80;
    // var profileData

    var x = 0;
    var k = 0;
    for (k=0; k<=numberPoints; k+=1) {

      // x-axis values
      x = k/numberPoints;
      profileData[0][k][0] = x;
      profileData[1][k][0] = x;

      // y-axis values
      //   sine wave
      profileData[0][k][1] = 0.5 + 0.5*Math.sin(2*Math.PI*2* x );
      //   sawtooth wave
      profileData[1][k][1] = 0.5 - 1/Math.PI * Math.atan(1/Math.tan(Math.PI* x /0.25));
    }

  } // END OF updateProcessUnits

  function updateDisplay(resetFlag) {

    if (resetFlag) {
      // do any actions needed to reset update display
    }

    // GET AND PLOT ALL PLOTS defined in plotsObj in process_plot_info
    // plots are specified in object plotsObj in file process_plot_info.js
    var npl = Object.keys(plotsObj).length; // number of plots
    var p; // used as index
    var data;
    for (p = 0; p < npl; p += 1) {
      data = getPlotData(p);
      plotPlotData(data,p);
    }

    // RETURN REAL TIME OF THIS DISPLAY UPDATE (milliseconds)
    var thisDate = new Date();
    var thisMs = thisDate.getTime();
    return thisMs;

  }  // END OF function updateDisplay
