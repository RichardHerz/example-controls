/*
  Design, text, images and code by Richard K. Herz, 2024-2025
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = false; // toggles for option key down (true) or not (false) on click
var elemCounter = 0; // number of elements placed on scene including those removed 
var elemList = []; // elemCounter values of elements currently on display
var parentList = []; // ID's of parent objects currently on display
var clickedID; // used to identify object clicked
var paletteObject; // assigned in paletteObjectClicked, used in sceneDivClicked
var isPiping = false;
var boxOUT = null;
var boxIN = null;
var boxOUTid = null;
var boxOUTparentID = null;
var boxINid = null;
var pipeNameList = [];
var svg = null;
var svgNS = "http://www.w3.org/2000/svg";
var outPortList = [];
var inPortList = [];
var inParentPortList = [];
var outParentPortList = [];

function buildPalette() {
  buildPaletteParent01(0,36,20);
  buildPaletteParent02(0,36,120);
  buildPaletteParent03(0,36,220);
} // END OF FUNCTION buildPalette

function buildPaletteParent01(elemCounter,x,y) {
  console.log('buildPaletteParent01 before call of function buildParent01, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_palette");
  el.innerHTML += buildParent01(elemCounter,x,y);
  console.log('buildPaletteParent01, after call of function buildParent01');
} // END OF FUNCTION buildPaletteParent01

function buildPaletteParent02(elemCounter,x,y) {
  console.log('buildPaletteParent02 before call of function buildParent02, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_palette");
  el.innerHTML += buildParent02(elemCounter,x,y);
  console.log('buildPaletteParent02, after call of function buildParent02');
} // END OF FUNCTION buildPaletteParent02

function buildPaletteParent03(elemCounter,x,y) {
  console.log('buildPaletteParent03 before call of function buildParent03, elemCounter = ' + elemCounter);
  let el = document.getElementById("div_palette");
  el.innerHTML += buildParent03(elemCounter,x,y);
  console.log('buildPaletteParent03, after call of function buildParent03');
} // END OF FUNCTION buildPaletteParent03

function paletteObjectClicked(event, theObject) {
  console.log('enter paletteObjectClicked, theObject = ' + theObject);
  paletteObject = theObject; // used in sceneDivClicked
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey) {
    optClicked = true; // toggles to false in sceneDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_scene");
    el.style.cursor = "copy";
  }
  console.log('exit paletteObjectClicked');
} // END OF FUNCTION paletteObjectClicked

function sceneDivClicked(event) { 
  console.log('enter sceneDivClicked');

  if (optClicked) { 

    console.log('  optClicked true, toggle to false, add element to scene');

    optClicked = false; // toggles to true in paletteDivClicked() 

    // increment elemCounter and add to elemList array
    elemCounter += 1;
    elemList.push(elemCounter);

    console.log('  elemCounter = ' + elemCounter);

    // get x,y coordinates of click in sceneDiv
    // note both rect and event.clientX & Y vary with page scroll
    // but their difference is independent of page scroll 
    // so x,y are relative to sceneDiv
    const rect = event.target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
   
    console.log('  x, y = ' + x +', '+ y);

    let el = document.getElementById("div_scene");

    // NEED SWITCH BLOCK USING global var paletteObject 
    switch(paletteObject) {
      case 1:
        console.log('sceneDivClicked before call buildParent01, elemCounter = ' + elemCounter);
        el.innerHTML += buildParent01(elemCounter,x,y);
        // add parent ID to list of parent elements on display
        parentList.push('parent_01_'+ elemCounter); 
        break;
      case 2:
        console.log('sceneDivClicked before call buildParent02, elemCounter = ' + elemCounter);
        el.innerHTML += buildParent02(elemCounter,x,y);
        // add parent ID to list of parent elements on display
        parentList.push('parent_02_'+ elemCounter); 
        break;
      case 3:
          console.log('sceneDivClicked before call buildParent03, elemCounter = ' + elemCounter);
          el.innerHTML += buildParent03(elemCounter,x,y);
          // add parent ID to list of parent elements on display
          parentList.push('parent_03_'+ elemCounter); 
          break;
      default:
    }

    el.style.cursor = "default";

    el = document.getElementById(clickedID); 
    el.style.cursor = "default";

  }
} // END OF FUNCTION sceneDivClicked

function checkCursor(event) {
  console.log('enter checkCursor, event = ' + event);
  let el = document.getElementById(event.target.id); 
  if (optClicked) {
    el.style.cursor = "copy";
  } else {
    el.style.cursor = "default";
  }
} // END OF FUNCTION checkCursor

function sceneObjectClicked(event, thisElem, objectParent) {

  // when removing this element, also 
  // remove any and all lines/pipes connected to this element

  console.log('enter function sceneObjectClicked');
  console.log('  objectParent = ' + objectParent);
  if (!optClicked) { 
    console.log('  optClicked is false');
    // delete parent element from display 
    // optClicked might be true if click on existing object to add new overlapping one
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('  modkey = ' + modkey);
    if (modkey) {
      const el = document.getElementById(objectParent);

      const elClassName = el.className;
      console.log('  elClassName = ' + elClassName);

      el.remove();
      console.log('  old array elemList = ' + elemList);
      console.log('  thisElem = ' + thisElem);

      // search index of object to be deleted in list of pipe IN parents
      // if there, remove the pipe
      // since two inputs, parent may be listed for pipe to each input
      // repeat until tIndex = -1
      let tIndex = 0;
      while(tIndex != -1) {
        console.log('  at top of *IN* while (tIndex != -1), tIndex = ' + tIndex);
        // get index of objectParent in inParentPortList
        tIndex = inParentPortList.findIndex(finderFunc);
          function finderFunc(thisOne) {
          return thisOne == objectParent;
        }
        console.log('    inPortList = ' + inPortList);
        console.log('    objectParent = ' + objectParent);
        console.log('    inParentPortList = ' + inParentPortList);
        console.log('    objectParent in inParentPortList index = ' + tIndex);
        // if found, remove the pipe
        if (tIndex != -1) {
          console.log('    remove inPortList[tIndex] = ' + inPortList[tIndex]);
          removeLine(inPortList[tIndex]);
        }
        console.log('  at bottom of *IN* while (tIndex != -1), tIndex = ' + tIndex);
      }

      // search index of object to be deleted in list of pipe OUT parents
      // if there, remove the pipe
      // since two outputs, parent may be listed for pipe to each output
      // repeat until tIndex = -1
      tIndex = 0;
      while(tIndex != -1) {
        console.log('  at top of *OUT* while (tIndex != -1), tIndex = ' + tIndex);
        // get index of objectParent in outParentPortList
        tIndex = outParentPortList.findIndex(finderFunc);
          function finderFunc(thisOne) {
          return thisOne == objectParent;
        }
        console.log('    inPortList = ' + inPortList);
        console.log('    objectParent = ' + objectParent);
        console.log('    outParentPortList = ' + outParentPortList);
        console.log('    objectParent in outParentPortList index = ' + tIndex);
        // if found, remove the pipe
        if (tIndex != -1) {
          console.log('    remove inPortList[tIndex] = ' + inPortList[tIndex]);
          removeLine(inPortList[tIndex]);
        }
        console.log('  at bottom of *OUT* while (tIndex != -1), tIndex = ' + tIndex);
      }

      // delete the element from the lists 
      // need array index to delete parent ID from parentList array 
      tIndex = parentList.findIndex(finderFunc);
      function finderFunc(thisOne) {
        return thisOne == objectParent;
      }
      console.log('  remove object from lists, tIndex = ' + tIndex);
      elemList.splice(tIndex, 1);
      parentList.splice(tIndex, 1);
      console.log('  new array elemList = ' + elemList);
      console.log('  new array parentList = ' + parentList);
  
    }
  }

} // END OF FUNCTION sceneObjectClicked

function removeLine(pBoxINid) {
  console.log('enter removeLine');
  console.log('  pBoxINid = ' + pBoxINid);

  // Check if SVG container exists, if not exit
  if (!svg) {
    console.log('   svg does not exist, so RETURN');
    return;
  }

  // get index of pBoxINid in inPortList
  const tIndex = inPortList.findIndex(finderFunc);
  function finderFunc(thisOne) {
    return thisOne == pBoxINid;
  } 
  console.log('  index of pBoxINid in inPortList, tIndex = ' + tIndex);

  // now use index to get corresponding elements
  const line = pipeNameList[tIndex];

  // remove line from svg
  svg.removeChild(line); 

  // for debugging, show what out port at this index
  const temp = outPortList[tIndex];
  console.log('  boxOUTid in outPortList at this index = ' + temp);

  // remove deleted elements from lists
  outPortList.splice(tIndex, 1);
  inPortList.splice(tIndex, 1);
  inParentPortList.splice(tIndex, 1);
  outParentPortList.splice(tIndex, 1);
  pipeNameList.splice(tIndex, 1);
 
  // Reset variables for next line
  isPiping = false;
  boxOUTid = null;
  boxINid = null;
  boxOUTparentID = null;

  console.log('just before end removeLine');
  
} // END OF FUNCTION removeLine

function drawLine() {

  console.log('enter drawLine');
  console.log('  boxOUTid = ' + boxOUTid);
  console.log('  boxINid = ' + boxINid);

  const divScene = document.getElementById('div_scene');
  const divOUT = document.getElementById(boxOUTid);
  const divIN = document.getElementById(boxINid);
  
  const divSceneRect = divScene.getBoundingClientRect();
  const divOUTRect = divOUT.getBoundingClientRect();
  const divINRect = divIN.getBoundingClientRect();
  
  // Calculate centers relative to divScene's top-left corner
  const nudge = -4; // nudge to center line on div
  const x1 = Math.round(nudge + divOUTRect.left - divSceneRect.left + divOUTRect.width/2);
  const y1 = Math.round(nudge + divOUTRect.top - divSceneRect.top + divOUTRect.height/2);
  const x2 = Math.round(nudge + divINRect.left - divSceneRect.left + divINRect.width/2);
  const y2 = Math.round(nudge + divINRect.top - divSceneRect.top + divINRect.height/2);

  console.log('  x1, y1 = ' + x1 +', '+ y1);
  console.log('  x2, y2 = ' + x2 +', '+ y2);

  svg = document.getElementById("svg_pipes");

  // setting z-index in CSS file didn't work
  // next line works to put lines on top of scene objects
  svg.style.zIndex = '1000'; // Add z-index to ensure SVG is on top
  // but also need to disable pointer events for svg
  // so clicks go to objects in scene and not stop on svg
  svg.style.pointerEvents = 'none'; 
  
  console.log('  just before create line element');

  // Create line element
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', 'black');
  line.setAttribute('stroke-width', '3');

  svg.appendChild(line);

  console.log('  just after create line & before push arrays');

  // add line description to pipeNameList
  // at same index as outPortList and inPortList
  pipeNameList.push(line);

  // Reset variables for next line
  boxOUT = null;
  boxIN = null;
  boxOUTid = null;
  boxINid = null;

  console.log('  outPortList = ' + outPortList);
  console.log('  outParentPortList = ' + inParentPortList);
  console.log('  inPortList = ' + inPortList);
  console.log('  inParentPortList = ' + inParentPortList);
  console.log('  pipeNameList = ' + pipeNameList);

  console.log('just before end drawLine');
  
} // END OF FUNCTION drawLine

function output_clicked(event, theParent) {  
  
  console.log('enter output_clicked');
  console.log('  theParent.id = ' + theParent.id); // theParent is an html ref, not var
  boxOUTparentID = theParent.id;

  // if not already piping and mod key down, set isPiping to true

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac // NEW LINE
  if (modkey && !isPiping) { 
      boxOUT = event.target;
      boxOUTid = boxOUT.id;
      isPiping = true;
      console.log('  set isPiping = true');
      console.log('  event.target = boxOUT = ' + boxOUT); // [an html ref, not var]
      console.log('  boxOUTid = ' + boxOUTid)
  }

  console.log('just before end output_clicked, stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION output_clicked

function input_clicked(event,theParent) { 

  // if piping, set isPiping to false and draw line
  // if not piping and mod key down, remove line
  // if not piping and no mod key, do nothing

  console.log('enter input_clicked');
 
  boxIN = event.target;
  boxINid = boxIN.id;
  const theParentID = theParent.id;

  console.log('  boxINid = ' + boxINid)
  console.log('  theParentID = ' + theParentID);

  if (isPiping) {
    isPiping = false;
    // drawLine at end sets boxIN and boxOUT to null
    // add output and input ports to lists
    console.log('  just before drawLine');
    console.log('  boxOUTid = ' + boxOUTid);
    console.log('  boxINid = ' + boxINid);
    outPortList.push(boxOUTid);
    inPortList.push(boxINid);
    inParentPortList.push(theParentID);
    outParentPortList.push(boxOUTparentID);

    drawLine();

  } else {
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    if (modkey) {
        console.log('  modkey is true');
        console.log('  just before removeLine');
        removeLine(boxINid);
    }
  }

  console.log('just before end input_clicked, stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION input_clicked
