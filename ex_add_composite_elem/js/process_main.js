/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = 0; // toggles 0-1 for option key down (1) or not (0) on click
var elemCounter = 0; // number of elements placed on scene including those removed 

var elemList = []; // elements on display = elemCounter value with added - values of those removed 
// NOTE: elemList for future connections and actions involving elements on display

var parentList = []; // names of parent objects on display
// NOTE: may be able to eliminate elemList by using parentList only...
//   but may have some use of elemList in future

var clickedID; // used to identify object clicked
var paletteObject; // assigned in paletteObjectClicked, used in sceneDivClicked

function buildPalette() {
  buildPaletteParent01(0,36,20);
  buildPaletteParent02(0,36,120);
}

function buildPaletteParent01(elemCounter,x,y) {
  console.log('buildPaletteParent01 before call of function buildParent01, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_paletteDiv");
  el.innerHTML += buildParent01(elemCounter,x,y);
  console.log('buildPaletteParent01, after call of function buildParent01');
} 

function buildPaletteParent02(elemCounter,x,y) {
  console.log('buildPaletteParent02 before call of function buildParent02, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_paletteDiv");
  el.innerHTML += buildParent02(elemCounter,x,y);
  console.log('buildPaletteParent02, after call of function buildParent02');
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

    // add elemCounter to list of elements on display
    elemList.push(elemCounter);

    // NEED SWITCH BLOCK USING global var paletteObject 
    switch(paletteObject) {
      case 1:
        console.log('sceneDivClicked before call buildParent01, elemCounter = ' + elemCounter);
        el.innerHTML += buildParent01(elemCounter,x,y);
        // add parent name to list of parents on display
        parentList.push('div_parent_01_'+ elemCounter); 
        break;
      case 2:
        console.log('sceneDivClicked before call buildParent02, elemCounter = ' + elemCounter);
        el.innerHTML += buildParent02(elemCounter,x,y);
        // add parent name to list of parents on display
        parentList.push('div_parent_02_'+ elemCounter); 
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

function sceneObjectClicked(event, thisElem, objectParent) {
  console.log('enter function sceneObjectClicked');
  console.log('  objectParent = ' + objectParent);
  if (optClicked == 0) {
    // optClicked might be non-zero if click on existing object to add new overlapping one
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('  in sceneObjectClicked, modkey = ' + modkey);
    if (modkey) {
      const el = document.getElementById(objectParent);
      el.remove();
      console.log('  in sceneObjectClicked, old array elemList = ' + elemList);
      console.log('  in sceneObjectClicked, thisElem = ' + thisElem);

      // need index to delete parent name from parentList array 
      const tIndex = parentList.findIndex(finderFunc);
      function finderFunc(thisOne) {
        return thisOne == objectParent;
      }

      elemList.splice(tIndex, 1);
      parentList.splice(tIndex, 1);
      console.log('  in sceneObjectClicked, new array elemList = ' + elemList);
      console.log('  in sceneObjectClicked, new array parentList = ' + parentList);
    }
  }
}