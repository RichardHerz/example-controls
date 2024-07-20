/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = 0; // toggles 0-1 for option key down (1) or not (0) on click
var elemCounter = 0; // number of elements placed on scene including those removed 
var clickedID; // used to identify object clicked
var paletteObject; // assigned in paletteObjectClicked, used in sceneDivClicked

function buildPalette() {
  buildPaletteChild01(0,30,20);
  buildPaletteChild02(0,30,120);
}

function buildPaletteChild01(elemCounter,x,y) {
  console.log('buildPaletteChild01 before call of function buildChild01, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_paletteDiv");
  el.innerHTML += buildChild01(elemCounter,x,y);
  console.log('buildPaletteChild01, after call of function buildChild01');
} 

function buildPaletteChild02(elemCounter,x,y) {
  console.log('buildPaletteChild02 before call of function buildChild02, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_paletteDiv");
  el.innerHTML += buildChild02(elemCounter,x,y);
  console.log('buildPaletteChild02, after call of function buildChild02');
} 

function paletteObjectClicked(event, theObject) {
  console.log('enter paletteObjectClicked, theObject = ' + theObject);
  paletteObject = theObject; // used in sceneDivClicked
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    optClicked = 1; // toggles to 0 in sceneDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_sceneDiv");
    el.style.cursor = "copy";
  }
  console.log('exit paletteObjectClicked');
}

function sceneDivClicked(event) { 
  console.log('enter sceneDivClicked');
  if (optClicked == 1) {

    optClicked = 0; // toggles to 1 in paletteDivClicked() 
    elemCounter += 1;
    let el = document.getElementById("div_sceneDiv");
    const styles = window.getComputedStyle(el);

    // styles.left includes px, e.g., "160px" so use parseInt for math 
    let x = event.clientX - parseInt(styles.left);
    let y = event.clientY - parseInt(styles.top);

    // NEED SWITCH BLOCK USING global var paletteObject 
    switch(paletteObject) {
      case 1:
        console.log('sceneDivClicked before call buildChild01, elemCounter = ' + elemCounter);
        el.innerHTML += buildChild01(elemCounter,x,y);
        break;
      case 2:
        console.log('sceneDivClicked before call buildChild02, elemCounter = ' + elemCounter);
        el.innerHTML += buildChild02(elemCounter,x,y);
        break;
      default:
    }

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

function sceneObjectClicked(event, objectParent) {
  console.log('enter function sceneObjectClicked');
  console.log('  objectParent = ' + objectParent);
  if (optClicked == 0) {
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('  modkey = ' + modkey);
    if (modkey) {
      const el = document.getElementById(objectParent);
      el.remove();
    }
  }
}
