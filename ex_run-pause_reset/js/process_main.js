/*
  Design, text, images and code by Richard K. Herz, 2017
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
  updateProcessUnits(resetFlag);
  updateDisplay(resetFlag);
  eval(runButtonID + '.value = "Run"');
  // do NOT update process nor display again here (will take one step)
} // END OF function resetThisLab

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
  var updateDisplayTimingMs = 200;
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

    // NEW - MOVE THE REPEAT THAT STEPS THE CATALYST LAYER INTO
    // THE UPDATE STATE METHOD OF THE CATALYST

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
  // step all units but do not display
  // IN THIS EXAMPLE - SIMPLY INCREMENT SIMULATION TIME
  if (resetFlag) {
    resetSimTime();
  } else {
    simTime += dt; // increment simTime by time step value dt
  }
} // END OF updateProcessUnits

function updateDisplay(resetFlag) {
  // RETURN REAL TIME OF THIS DISPLAY UPDATE (milliseconds)
  var thisDate = new Date();
  var thisMs = thisDate.getTime();
  if (resetFlag) {
    // do any actions needed to reset display
  }
  document.getElementById("field_output_field").innerHTML = simTime;
  return thisMs;
}  // END OF function updateDisplay
