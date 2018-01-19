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
var spaceData = [];

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
  // CALLED BY UI RESET BUTTON DEFINED IN HTML
  runningFlag = false;
  resetFlag = 1; // 0 for no reset, 1 for reset lab
  resetSimTime();
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

  // THIS EXAMPLE PROCESS simply updates simulation time
  // and updates the spacetime plot

  var t; // index
  var s; // index

  // THIS GLOBAL VAR IS DEFINED ELSEWHERE IN THIS file
  // var simTime

  // INCREMENT SIMULATION TIME
  if (resetFlag) {
    resetSimTime();
  } else {
    simTime += dt; // increment simTime by time step value dt
  } // END OF if (resetFlag) {} else {}

  // GLOBAL VARS DEFINED IN process_spacetime.js
  // var numSpacePts = 40;
  // var numTimePts = 80;
  // var spaceTimeData

  if (resetFlag) {

    spaceTimeData = initSpaceTimeArray(numSpaceTimeVars,numTimePts,numSpacePts);
    for (s = 0; s <= numSpacePts; s += 1) { // NOTE = at s <= numSpacePts
      spaceData[s] = 0;
    }

  } else {
    // UPDATE SPACE TIME DATA ARRAY - THE PROCESS HERE

    // update an array which holds sine wave in space array
    // then add that to spaceTimeData array...

    var x = simTime/numSpacePts;
    var newSpacePt = 0.5 + 0.5*Math.sin(2*Math.PI*0.67* x );
    
    // add randomness so this doesn't look like
    // an animated GIF!
    var randomNum = Math.random();
    if (randomNum > 0.98) {
      if (newSpacePt > 0.5) {
        newSpacePt = 0;
      } else {
        newSpacePt = 1;
      }
    }
    // delete first and oldest element
    spaceData.shift();
    // add the new element at end
    spaceData.push(newSpacePt);

    // use repeats to update the spaceTimeData array
    // spaceTimeData[v][t][s] - variable, time, space (profile in layer)
    var tempArray = spaceTimeData[0];
    for (t = 0; t < numTimePts; t += 1) { // NOTE < numTimePoints, don't do last one here
      for (s = 0; s <= numSpacePts; s +=1) { // NOTE = in s <= numSpacePts
        tempArray[t][s] = tempArray[t+1][s];
      }
    }
    // now update the last time
    for (s = 0; s <= numSpacePts; s +=1) { // NOTE = in s <= numSpacePts
      tempArray[numTimePts][s] = spaceData[s];
    }
    // update the variable being processed
    spaceTimeData[0] = tempArray;

  } // END OF if (resetFlag) {} else {}

} // END OF function updateProcessUnits

function updateDisplay(resetFlag) {

  if (resetFlag) {
    // do any actions needed to reset update display
  }

  // plot space-time plots
  plotSpaceTimePlot();

  // RETURN REAL TIME OF THIS DISPLAY UPDATE (milliseconds)
  var thisDate = new Date();
  var thisMs = thisDate.getTime();
  return thisMs;

}  // END OF function updateDisplay
