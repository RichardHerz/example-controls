/*
  Design, text, images and code by Richard K. Herz, 2018
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

var updateDisplayTimingMs = 100;
var fillFlag = 0;
var emptyFlag = 0;
var reactFlag = 0;
var reactConc0 = 1;
var reactConc = reactConc0;
var reactConcMIN = 0.1 * reactConc0;
var reactImgCounter = 0;

// DISPLAY INITIAL STATE ON OPEN WINDOW
window.onload = openThisLab; // can NOT use = openThisLab();

function openThisLab() {

  var el = document.querySelector("#div_PLOTDIV_reactor_contents");
  el.style.top = "129px";
  el.style.height = "70px";
  el.style.backgroundColor = "rgb(0,0,255)";

} // END OF function openThisLab

function fChangeImage(imgName) {
  // alert("imgName = "+ imgName);
    // first set all to hidden
    var tImage = document.querySelector("#image_reactor_fill");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_mix_00");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_mix_01");
    tImage.style.visibility = "hidden";
    tImage = document.querySelector("#image_reactor_empty");
    tImage.style.visibility = "hidden";
    // now set the chosen image to visible
    tImage = document.querySelector(imgName);
    tImage.style.visibility = "visible";
}

function fillReactor() {

  if (emptyFlag == 1 || reactFlag == 1) {
    fillFlag = 0;
    return;
  } else {
    fillFlag = 1;
  }

  // get time at start of repeating fillReactor
  startDate = new Date(); // need this here
  startMs = startDate.getTime();

  fChangeImage("#image_reactor_fill");

  // put this before change height & color or change each onclick
  // both two lines below work by themselves and don't require jquery
  var el = document.querySelector("#div_PLOTDIV_reactor_contents");
  // var el = document.getElementById("div_PLOTDIV_reactor_contents");
  // get current top and height
  var top = parseFloat(el.style.top); // convert, e.g., "100px" to 100
  var height = parseFloat(el.style.height); // convert, e.g., "100px" to 100
  // return if already full
  if (height >= 70) {
    fillFlag = 0;
    fChangeImage("#image_reactor_mix_00");
    return;
  }

  // reset reactConc
  reactConc = reactConc0;

    // fill with blue reactant
  el.style.backgroundColor = "rgb(0, 0, 255)"; // backgroundColor NOT background-color

  el.style.top = top - 2 + 'px';
  height = height + 2;
  el.style.height = height + 'px';

  // CONTINUE fillReactor WITH CALL TO ITSELF AFTER updateMs WAIT
  var thisDate = new Date();
  var currentMs = thisDate.getTime();
  var elapsedMs = currentMs - startMs;
  var updateMs = updateDisplayTimingMs - elapsedMs;
  setTimeout(fillReactor, updateMs);  // fillReactor, updateMs

} // END OF function fillReactor

function emptyReactor() {

  if (fillFlag == 1 || reactFlag == 1) {
    emptyFlag = 0;
    return;
  } else {
    emptyFlag = 1;
  }

  // get time at start of repeating emptyReactor
  startDate = new Date(); // need this here
  startMs = startDate.getTime();

  fChangeImage("#image_reactor_empty");

  // both two lines below work by themselves and don't require jquery
  var el = document.querySelector("#div_PLOTDIV_reactor_contents");
  // var el = document.getElementById("div_PLOTDIV_reactor_contents");
  var top = parseFloat(el.style.top); // convert, e.g., "100px" to 100
  var height = parseFloat(el.style.height); // convert, e.g., "100px" to 100

  // put this before change height or get height change each onclick
  if (height <= 2) {
    emptyFlag = 0;
    fChangeImage("#image_reactor_mix_00");
    return;
  }

  el.style.top = top + 2 + 'px';
  height = height - 2;
  el.style.height = height + 'px';

  // CONTINUE emptyReactor WITH CALL TO ITSELF AFTER updateMs WAIT
  var thisDate = new Date();
  var currentMs = thisDate.getTime();
  var elapsedMs = currentMs - startMs;
  var updateMs = updateDisplayTimingMs - elapsedMs;
  setTimeout(emptyReactor, updateMs);  // emptyReactor, updateMs

} // END OF function emptyReactor

function reactReactor() {
  if (fillFlag == 1 || emptyFlag == 1) {
    reactFlag = 0;
    return;
  }
  updateRunCount();
  reactReactorContinue();
}

function updateRunCount() {
  //
}

function reactReactorContinue() {

  if (fillFlag == 1 || emptyFlag == 1) {
    reactFlag = 0;
    return;
  } else {
    reactFlag = 1;
  }

  // get time at start of repeating
  startDate = new Date(); // need this here
  startMs = startDate.getTime();

 if (reactImgCounter < 2) {
    fChangeImage("#image_reactor_mix_00");
    reactImgCounter = reactImgCounter + 1;
  } else {
    fChangeImage("#image_reactor_mix_01");
    reactImgCounter = 0;
  }

  // >>> BREAK OUT WHEN REACTION DONE
  // put this before change reaction or get reaction change each onclick
  if (reactConc/reactConc0 <= reactConcMIN) {
    fChangeImage("#image_reactor_mix_00");
    reactFlag = 0;
    return;
  }

  // both two lines below work by themselves and don't require jquery
  var el = document.querySelector("#div_PLOTDIV_reactor_contents");
  // var el = document.getElementById("div_PLOTDIV_reactor_contents");

  // step reaction
  var k = 1;
  var dt = 0.075;
  reactConc = reactConc - k * reactConc * dt;

  // compute color for this reactConc
  var B = Math.round(255*reactConc/reactConc0); // Blue = reactant
  var R = 255 - B; // Red = product
  var colorString = "rgb(" + R + ", 0, " + B + ")";

  // set color for this reactConc
  el.style.backgroundColor = colorString; // backgroundColor NOT background-color

  // CONTINUE WITH CALL TO ITSELF AFTER updateMs WAIT
  var thisDate = new Date();
  var currentMs = thisDate.getTime();
  var elapsedMs = currentMs - startMs;
  var updateMs = updateDisplayTimingMs - elapsedMs;
  setTimeout(reactReactorContinue, updateMs);  // reactReactorContinue, updateMs

} // END OF function reactReactorContinue
