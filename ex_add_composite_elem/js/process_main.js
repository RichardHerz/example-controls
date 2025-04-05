/*
  Design, text, images and code by Richard K. Herz, 2024-2025
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
let addingUnit = false; // toggles for option key down (true) or not (false) on click
let elemCounter = 0; // number of elements placed on scene including those removed 
let elemList = []; // elemCounter values of elements currently on display
let parentList = []; // ID's of parent objects currently on display
let clickedID; // used to identify object clicked
let paletteObject; // assigned in paletteObjectClicked, used in sceneDivClicked
let isPiping = false;
let boxOUT = null;
let boxIN = null;
let boxOUTid = null;
let boxOUTparentID = null;
let boxINparentID = null;
let boxINid = null;
let pipeObjectList = [];
let pipeIDlist = []; // svg line ID set to boxOUTid
let outPortList = [];
let inPortList = [];
let outParentPortList = [];
let inParentPortList = [];
let svg = null;
let svgNS = "http://www.w3.org/2000/svg";
let line = null;
let processUnits = new Object(); // holds an object for each parent added to scene

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
    addingUnit = true; // toggles to false in sceneDivClicked()
    let el = document.getElementById(clickedID);
    el.style.cursor = "copy";
    el = document.getElementById("div_scene");
    el.style.cursor = "copy";
  }
  console.log('exit paletteObjectClicked');
} // END OF FUNCTION paletteObjectClicked

function sceneDivClicked(event) { 
  console.log('enter sceneDivClicked');

  if (isPiping) {
    // user drawing pipe but clicked off an object 
    // want to delete the line before connection
    svg.removeChild(line); 
    // Reset variables for next line
    isPiping = false;
    boxOUTid = null;
    boxINid = null;
    boxOUTparentID = null;
    event.stopPropagation(); // stops event bubbling up to parent
  }

  if (addingUnit) { 

    console.log('  addingUnit true, toggle to false, add element to scene');

    addingUnit = false; // toggles to true in paletteDivClicked() 

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
          // add an object to processUnits[] for this new parent
          processUnits[elemCounter] = new makeParent03('parent_03_'+ elemCounter); 
          // let's make sure it's alive - check the console log 
          processUnits[elemCounter].initialize();
          console.log('  sceneDivClicked, processUnits[elemCounter].parentID = ' + processUnits[elemCounter].parentID);
          break;
      default:
    }

    el.style.cursor = "default";

    el = document.getElementById(clickedID); 
    el.style.cursor = "default";

    reportStatus('at end sceneDivClicked');

  }
} // END OF FUNCTION sceneDivClicked

function checkCursor(event) {
  console.log('enter checkCursor, event = ' + event);
  let el = document.getElementById(event.target.id); 
  if (addingUnit) {
    el.style.cursor = "copy";
  } else {
    el.style.cursor = "default";
  }
} // END OF FUNCTION checkCursor

function sceneObjectClicked(event, thisElem, objectParent) {

  // when removing this element, also 
  // remove any and all lines/pipes connected to this element

  if (!addingUnit) { 
    console.log('  addingUnit is false');
    // delete parent element from display 
    // addingUnit might be true if click on existing object to add new overlapping one
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('  modkey = ' + modkey);
    if (modkey) {

      reportStatus('sceneObjectClicked, search for lines to remove then remove object');

      console.log('  sceneObjectClicked, top line search *IN*');
      let tIndex = 0;
      while(tIndex != -1) {
        // get index of objectParent in inParentPortList
        tIndex = inParentPortList.findIndex(finderFunc);
          function finderFunc(thisOne) {
          return thisOne == objectParent;
        }
        // if found, remove the pipe
        if (tIndex != -1) {
          console.log('  remove line inPortList[tIndex] = ' + inPortList[tIndex]);
          removeLine(inPortList[tIndex]);
        }
      }
      console.log('  sceneObjectClicked, bottom line search *IN*');

      // search index of object to be deleted in list of pipe OUT parents
      // if there, remove the pipe
      // since two outputs, parent may be listed for pipe to each output
      // repeat until tIndex = -1
      console.log('  sceneObjectClicked, top line search *OUT*');
      tIndex = 0;
      while(tIndex != -1) {
        // get index of objectParent in outParentPortList
        tIndex = outParentPortList.findIndex(finderFunc);
          function finderFunc(thisOne) {
          return thisOne == objectParent;
        }
        // if found, remove the pipe
        if (tIndex != -1) {
          console.log('    remove inPortList[tIndex] = ' + inPortList[tIndex]);
          reportStatus('sceneObjectClicked before removeLine(inPortList[tIndex])');
          removeLine(inPortList[tIndex]);
        }
      }
      console.log('  sceneObjectClicked, bottom line search *OUT*');

      reportStatus('sceneObjectClicked before el.remove() removing an object');
      const el = document.getElementById(objectParent);
      el.remove();
      
      console.log('  thisElem before removing from list = ' + thisElem);
      
      // delete the element from the lists 
      // need array index to delete parent ID from parentList array 
      tIndex = parentList.findIndex(finderFunc);
      function finderFunc(thisOne) {
        return thisOne == objectParent;
      }
      console.log('  remove object from lists, tIndex = ' + tIndex);
      elemList.splice(tIndex, 1);
      parentList.splice(tIndex, 1);

      reportStatus('sceneObjectClicked after removing an object');
  
    }
  }

} // END OF FUNCTION sceneObjectClicked

function removeLine(pBoxINid) {
  console.log('enter removeLine');
  console.log('  pBoxINid = ' + pBoxINid);
  reportStatus('removeLine on enter removeLine(pBoxINid');

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

  const temp = outPortList[tIndex];
  console.log('  boxOUTid in outPortList at this index = ' + temp);

  // now use index to get corresponding elements
  const pipeID = pipeIDlist[tIndex];
  console.log('  pipeID in pipeIDList at tIndex = ' + pipeID);
 
  reportStatus('>>>>> removeLine() just before remove pipe <<<<<');

  // remove line

  // this seems more reliable than svg.removeChild(lineChild), 
  document.getElementById(pipeID).remove();
 
  // svg.removeChild() failed when add two parent03, add line between, 
  // add 3rd parent03, then try to delete line or delete first parent03
  // either lineObject or lineChild had same problem 
  // const lineObject = pipeObjectList[tIndex];
  // const lineChild = document.getElementById(pipeID);
  // svg.removeChild(lineChild); 

  // remove deleted elements from lists
  outPortList.splice(tIndex, 1);
  inPortList.splice(tIndex, 1);
  inParentPortList.splice(tIndex, 1);
  outParentPortList.splice(tIndex, 1);
  pipeObjectList.splice(tIndex, 1);
  pipeIDlist.splice(tIndex,1);

  // Reset variables for next line
  isPiping = false;
  boxOUTid = null;
  boxINid = null;
  boxOUTparentID = null;

  reportStatus('end of removeLine()');
  console.log('just before end removeLine');

} // END OF FUNCTION removeLine

function drawLine(event) {

  console.log('enter drawLine');
  console.log('  boxOUTid = ' + boxOUTid);

  const divScene = document.getElementById('div_scene');
  const divOUT = document.getElementById(boxOUTid);
  
  const divSceneRect = divScene.getBoundingClientRect();
  const divOUTRect = divOUT.getBoundingClientRect();
  
  // Calculate centers relative to divScene's top-left corner
  const nudge = -4; // nudge to center line on div
  const x1 = Math.round(nudge + divOUTRect.left - divSceneRect.left + divOUTRect.width/2);
  const y1 = Math.round(nudge + divOUTRect.top - divSceneRect.top + divOUTRect.height/2);

  svg = document.getElementById("svg_pipes");

  // setting z-index in CSS file didn't work
  // next line works to put lines on top of scene objects
  svg.style.zIndex = '1000'; // Add z-index to ensure SVG is on top
  // but also need to disable pointer events for svg
  // so clicks go to objects in scene and not stop on svg
  svg.style.pointerEvents = 'none'; 
  
  console.log('  just before create line element');

  // Create marker definition if it doesn't exist
  if (!document.getElementById("arrowhead")) {
    const defs = document.createElementNS(svgNS, "defs");
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "5");    // changed from 10 to 5
    marker.setAttribute("markerHeight", "3.5"); // changed from 7 to 3.5
    marker.setAttribute("refX", "4.5");         // changed from 9 to 4.5
    marker.setAttribute("refY", "1.75");        // changed from 3.5 to 1.75
    marker.setAttribute("orient", "auto");
    
    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", "0 0, 5 1.75, 0 3.5"); // changed from "0 0, 10 3.5, 0 7"
    polygon.setAttribute("fill", "black");
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);
  }

  // Create line element with arrowhead
  line = document.createElementNS(svgNS, "line");
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);

  line.setAttribute('id',boxOUTid);
  // add ID to pipeIDlist when line fixed to an input 

  const thisID = document.getElementById(boxOUTid);
  console.log('  >>>> svg thisID = ' + thisID.id);

  // Calculate line end position relative to scene div, accounting for scroll
  const x2 = Math.round(nudge + event.clientX - divSceneRect.left);
  const y2 = Math.round(nudge + event.clientY - divSceneRect.top);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);

  console.log('  line start x1, y1 = ' + x1 +', '+ y1);
  console.log('  line start x2, y2 = ' + x2 +', '+ y2);

  line.setAttribute('stroke', 'black');
  line.setAttribute('stroke-width', '3');
  line.setAttribute('marker-end', 'url(#arrowhead)');  // Add arrowhead

  svg.appendChild(line);

  document.addEventListener('mousemove', updateLine);

  reportStatus('end drawline()');
  console.log('just before end drawLine()');
  
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

    drawLine(event);
    reportStatus('output_clicked just after drawLine(event)');
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
  boxINparentID = theParent.id;

  console.log('  boxINid = ' + boxINid)
  console.log('  boxINparentID = ' + boxINparentID);
  console.log('  boxOUTparentID = ' + boxOUTparentID); 

  if (boxINparentID == boxOUTparentID) {
    // don't allow pipe to same parent
    // want to delete the line before connection
    svg.removeChild(line); 
    // Reset variables for next line
    isPiping = false;
    boxOUTid = null;
    boxINid = null;
    boxOUTparentID = null;
    boxINparentID = null;
    event.stopPropagation(); // stops event bubbling up to parent
    console.log('  RETURN clicked same parent');
    return;
  }

  if (isPiping) {
    isPiping = false;
    // drawLine at end sets boxIN and boxOUT to null
    // add output and input ports to lists
    console.log('  just before drawLine');
    console.log('  boxOUTid = ' + boxOUTid);
    console.log('  boxINid = ' + boxINid);
    outPortList.push(boxOUTid);
    inPortList.push(boxINid);
    inParentPortList.push(boxINparentID);
    outParentPortList.push(boxOUTparentID);
    pipeIDlist.push(boxOUTid); // svg line id set in input_clicked()

    document.removeEventListener('mousemove', updateLine);

    // add line description to pipeObjectList
    // at same index as outPortList and inPortList
    pipeObjectList.push(line);

    // Reset variables for next line
    boxOUT = null;
    boxIN = null;
    boxOUTid = null;
    boxINid = null;

    reportStatus('input_clicked after line added');

  } else {
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    if (modkey) {
      reportStatus('input_clicked just before removeLine');
      removeLine(boxINid);
      reportStatus('input_clicked just after removeLine');
    }
  }

  reportStatus('end of input_clicked');
  console.log('just before end input_clicked, stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION input_clicked 

function updateLine(event) {
  const divScene = document.getElementById('div_scene');
  const divSceneRect = divScene.getBoundingClientRect();
  const nudge = -4; // match nudge used in drawLine

  // Calculate position relative to scene div, accounting for scroll
  const x2 = Math.round(nudge + event.clientX - divSceneRect.left);
  const y2 = Math.round(nudge + event.clientY - divSceneRect.top);

  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
}// END OF FUNCTION updateLine 

function reportStatus(caller) {
  console.log('--- reportStatus in ' + caller + ' ---------');

  console.log('  elemList = ' + elemList);
  console.log('  parentList = ' + parentList);
  console.log('  pipeIDlist = ' + pipeIDlist);
  console.log('  pipeObjectList length = ' + pipeObjectList.length);
  console.log('  outPortList = ' + outPortList);
  console.log('  outParentPortList = ' + outParentPortList);
  console.log('  inPortList = ' + inPortList);
  console.log('  inParentPortList = ' + inParentPortList);
 
  console.log('---- end reportStatus ---------');
} // END OF FUNCTION reportStatus 