/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = 0; // toggles 0-1
var elemCounter = 0; // number of elements placed on canvas including those removed 
var clickedClass = '';
var clickedID = '';

function fixedButtonClicked(event) {
  clickedClass = event.target.className;
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    optClicked = 1; // toggles to 0 in canvasDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_canvasDiv");
    el.style.cursor = "copy";
  }
}

// NOTE: "canvas" is used here for convenience and does NOT mean an HTML canvas element

function canvasDivClicked(event) { 
  if (optClicked == 1) {
    optClicked = 0; // toggles to 1 in fixedButtonClicked() 
  
    elemCounter += 1; 
    let el = document.getElementById("div_canvasDiv");

    let newID = clickedID + elemCounter;

    let x = event.clientX + 'px';
    let y = event.clientY + 'px';

    el.innerHTML += '<button type="button" class=" '+clickedClass+' " id=" '+newID
      +' " style="top: '+y+'; left: '+x+';" onclick="canvasButtonClicked(event)">'
      +clickedClass+'</button>';

    el.style.cursor = "default";

    el = document.getElementById(clickedID); 
    el.style.cursor = "default";
  }
}

function canvasButtonClicked(event) {
  let clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    let el = document.getElementById(clickedID);
    el.remove();
  }
}
