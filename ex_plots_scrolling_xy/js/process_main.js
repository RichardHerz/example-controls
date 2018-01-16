/*
  Design, text, images and code by Richard K. Herz, 2018
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
// in web labs, some may be declared as local variables in objects
var runningFlag = false;
var runButtonID = "button_Run";
var resetFlag = 0; // 0 for no reset, 1 for reset lab
var simTime = 0;
var dt = 1;

// DISPLAY INITIAL STATE ON OPEN WINDOW
window.onload = openThisLab;

function openThisLab() {
  resetFlag = 1; // 0 for no reset, 1 for reset lab
  updateProcessUnits(resetFlag);
  updateDisplay(resetFlag);
} // END OF function openThisLab

// ----------------- HANDLE UI CONTROLS ----------------------

// HANDLE RUN-PAUSE BUTTON CLICK
function runThisLab() {
  // CALLED BY UI RUN-PAUSE BUTTON DEFINED IN HTML
  // TOGGLE runningFlag FIRST before doing stuff below
  if (runningFlag) {
    runningFlag = false;
  } else {
    runningFlag = true;
  }
  if (runningFlag) {
    eval(runButtonID + '.value = "Pause"');
    runSimulation();
  } else {
    eval(runButtonID + '.value = "Run"');
  }
} // END OF function runThisLab

// HANDLE RESET BUTTON CLICK
function resetThisLab() {
  // uses object simParams from file process_units.js
  // input argument is the RUN button ID, not the reset button ID
  runningFlag = false;
  resetSimTime();
  resetFlag = 1; // 0 for no reset, 1 for reset lab
  check_checkboxes(resetFlag);
  updateProcessUnits(resetFlag);
  updateDisplay(resetFlag);
  eval(runButtonID + '.value = "Run"');
  // do NOT update process nor display again here (will take one step)
} // END OF function resetThisLab

// HANDLE CHECKBOXES WHICH SELECT DATA SHOWN
function check_checkboxes(resetFlag) {
  // check checkboxes and update display
  if (resetFlag == 1) {
    document.getElementById('checkbox_sine_wave').checked = true;
    document.getElementById('checkbox_sawtooth_wave').checked = true;
  }
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
  resetFlag = 0; // 0 for no reset, 1 for reset lab
  updateDisplay(resetFlag);
} // END OF function check_checkboxes

// ----------------- RUN SIMULATION ----------------------

function resetSimTime() {
  simTime = 0;
}

function runSimulation() {

  // CALLED BY function runThisLab ON CLICK OF RUN-PAUSE BUTTON

  // HERE, THE TIME STEP SIZE MUST BE CONSTANT WITHIN ONE DISPLAY
  // INTERVAL TO MAINTAIN CORRESPONDENCE BETWEEN SIM TIME AND REAL TIME
  // FOR A DIFFERENT CASE WHERE THE INTEGRATION TIME STEP SIZE CAN VARY
  // BETWEEN updateProcessUnits YOU NEED
  // THE MORE COMPLEX TIMING METHOD USED IN dynamic-process-v2.livecode

  resetFlag = 0; // 0 for no reset, 1 for reset lab

  // updateDisplayTimingMs is real time milliseconds between display updates
  var updateDisplayTimingMs = 100;
  var startDate = new Date(); // need this here
  var startMs;
  var currentMs;
  var elapsedMs;
  // updateMs is computed below in function updateProcess to be real time
  // between finish last display update and start next update process
  var updateMs = 0; // initialize as zero for first call immediately below

  // first call to updateProcess, which then calls itself
  // use setTimeout, since updateProcess by itself does not work
  setTimeout(updateProcess, updateMs);

  function updateProcess() {

    if (!runningFlag) {
      // exit if runningFlag is not true
      // runningFlag can become not true by click of RUN-PAUSE or RESET buttons
      return;
    }

    // get time at start of repeating updateProcessUnits
    startDate = new Date(); // need this here
    startMs = startDate.getTime();

    updateProcessUnits(resetFlag);

    // repeating updateProcessUnits must finish before
    // latest real time at which updateDisplay must occur in order
    // to maintain correspondence between sim time and real time

    // get time at end of repeating updateProcessUnits and call
    // to updateDisplay from updateDisplay function return value
    currentMs = updateDisplay(resetFlag);

    // Adjust wait until next updateProcess to allow for time taken
    // to do updateProcessUnits and updateDisplay.
    // In order to respond to user input, do not need updateMs > 0.
    // BUT DO NEED updateMs > 0 to keep sync between sim time and real time.
    elapsedMs = currentMs - startMs;
    updateMs = updateDisplayTimingMs - elapsedMs;

    var tIdleTime = 100*(1-elapsedMs/updateMs);
    tIdleTime = Number(tIdleTime).toPrecision(2);

    // END updateProcess WITH CALL TO ITSELF AFTER updateMs WAIT
    setTimeout(updateProcess, updateMs);  // updateMs

  } // END OF function updateProcess (inside function runSimulation)

} // END OF function runSimulation

function updateProcessUnits(resetFlag) {
  // DO COMPUTATIONS TO UPDATE STATE OF PROCESS
  // update all units but do not display

  // INCREMENT SIMULATION TIME
  if (resetFlag) {
    resetSimTime();
  } else {
    simTime += dt; // increment simTime by time step value dt
  }

  // UPDATE PLOT y-axis VALUES - THE PROCESS HERE
  if (resetFlag) {
    stripData = initPlotData(numStripVars,numStripPts);
  } else {

    var x = simTime/numStripPts;
    newSine = 0.5 + 0.5*Math.sin(2*Math.PI*2* x );
    newSawtooth = 0.5 - 1/Math.PI * Math.atan(1/Math.tan(Math.PI* x /0.25));

    // update stripData for first var
    var v = 0;
    var d = newSine;
    tempArray = stripData[v]; // work on one plot variable at a time
    // delete first and oldest element which is an [x,y] pair array
    tempArray.shift();
    // add the new [x,y] pair array at end
    tempArray.push( [ 0, d ] );
    // update the variable being processed
    stripData[v] = tempArray;

    // update stripData for second var
    v = 1;
    d = newSawtooth;
    tempArray = stripData[v]; // work on one plot variable at a time
    // delete first and oldest element which is an [x,y] pair array
    tempArray.shift();
    // add the new [x,y] pair array at end
    tempArray.push( [ 0, d ] );
    // update the variable being processed
    stripData[v] = tempArray;

    // re-number x-axis values
    var k = 0;
    for (k=0; k<=numStripPts; k+=1) {
      x = k/numStripPts;
      stripData[0][k][0] = x;
      stripData[1][k][0] = x;
    }

  } // END OF if (resetFlag) {} else {}
} // END OF function updateProcessUnits

function updateDisplay(resetFlag) {
  // GET AND PLOT ALL PLOTS defined in plotsObj in process_plot_info
  // plots are specified in object plotsObj in file process_plot_info.js
  //
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

  if (resetFlag) {
    // do any actions needed to reset update display
  }

  return thisMs;

}  // END OF function updateDisplay
