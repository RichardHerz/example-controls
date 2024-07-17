/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = 0; // toggles 0-1
var elemCounter = 0; // number of elements placed on scene including those removed 
var clickedClass = '';
var clickedID = '';


function fixedButtonClicked(event) {
  console.log('enter fixedButtonClicked, event = ' + event);
  clickedClass = event.target.className;
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    optClicked = 1; // toggles to 0 in sceneDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_sceneDiv");
    el.style.cursor = "copy";
  }
}

function paletteDivClicked(event) {
  console.log('enter fixedButtonClicked, event = ' + event);
  clickedClass = event.target.className;
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    optClicked = 1; // toggles to 0 in sceneDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_sceneDiv");
    el.style.cursor = "copy";
  }
}

function sceneDivClicked(event) { 
  console.log('enter sceneDivClicked, event = ' + event);
  if (optClicked == 1) {
    optClicked = 0; // toggles to 1 in fixedButtonClicked() 
  
    elemCounter += 1; 
    let el = document.getElementById("div_sceneDiv");

    let newID = clickedID + elemCounter;

    const styles = window.getComputedStyle(el);
    console.log('styles.left = ' + styles.left);
    console.log('event.clientX = ' + event.clientX);

    // styles.left includes px, e.g., "160px" so use parseInt for math 
    let x = event.clientX - parseInt(styles.left) + 'px';
    let y = event.clientY - parseInt(styles.top) + 'px';

    console.log('before call of function buildHTML, elemCounter = ' + elemCounter);
    el.innerHTML += buildHTML(elemCounter,x,y);
    console.log('after call of function buildHTML');

    el.style.cursor = "default";

    el = document.getElementById(clickedID); 
    el.style.cursor = "default";

  }
}

function checkCursor(event) {
  console.log('enter checkCursor, event = ' + event);
  let el = document.getElementById(event.target.id); 
  if (optClicked==1) {
      el.style.cursor = "copy";
  } else {
    el.style.cursor = "default";
  }
}

function sceneObjectClicked(event) {
  console.log('enter function sceneObjectClicked');
  // check optClicked because don't want to remove button if adding one on top of it
  // apparently existing button gets click before the div gets it and toggles optClicked
  let clickedID = event.target.id;
  console.log('   clickedID = ' + clickedID);
  if (optClicked == 0) {
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('   modkey = ' + modkey);
  if (modkey) {
    let el = document.getElementById(clickedID);
    el.remove();
  }
  }
}

function buildPaletteChild01(elemCounter,x,y) {
  console.log('buildPaletteChild01 before call of function buildHTML, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_paletteDiv");
  el.innerHTML += buildHTML(elemCounter,x,y);
  console.log('buildPaletteChild01, after call of function buildHTML');
} 