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
let portOUT = null;
let portIN = null;
let portOUTid = null;
let portOUTparentID = null;
let portINparentID = null;
let portINid = null;
let pipeObjectList = [];
let pipeIDlist = []; // svg pipe ID set to portOUTid
let outPortList = [];
let inPortList = [];
let outParentPortList = [];
let inParentPortList = [];
let svg = null;
let svgNS = "http://www.w3.org/2000/svg";
let pipe = null;
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
    // want to delete the pipe before connection
    svg.removeChild(pipe); 
    // Reset variables for next pipe
    isPiping = false;
    portOUTid = null;
    portINid = null;
    portOUTparentID = null;
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
          processUnits[elemCounter] = new Parent03(elemCounter, 'parent_03_'+ elemCounter); 
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
  // remove any and all pipes connected to this element

  if (!addingUnit) { 
    console.log('  addingUnit is false');
    // delete parent element from display 
    // addingUnit might be true if click on existing object to add new overlapping one
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('  modkey = ' + modkey);
    if (modkey) {

      reportStatus('sceneObjectClicked, search for pipes to remove then remove object');

      console.log('  sceneObjectClicked, top pipe search *IN*');
      let tIndex = 0;
      while(tIndex != -1) {
        // get index of objectParent in inParentPortList
        tIndex = inParentPortList.findIndex(finderFunc);
          function finderFunc(thisOne) {
          return thisOne == objectParent;
        }
        // if found, remove the pipe
        if (tIndex != -1) {
          console.log('  remove pipe inPortList[tIndex] = ' + inPortList[tIndex]);
          removePipe(inPortList[tIndex]);
        }
      }
      console.log('  sceneObjectClicked, bottom pipe search *IN*');

      // search index of object to be deleted in list of pipe OUT parents
      // if there, remove the pipe
      // since two outputs, parent may be listed for pipe to each output
      // repeat until tIndex = -1
      console.log('  sceneObjectClicked, top pipe search *OUT*');
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
          reportStatus('sceneObjectClicked before removePipe(inPortList[tIndex])');
          removePipe(inPortList[tIndex]);
        }
      }
      console.log('  sceneObjectClicked, bottom pipe search *OUT*');

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

function removePipe(pPortINid) {
  console.log('enter removePipe');
  console.log('  pPortINid = ' + pPortINid);
  reportStatus('removePipe on enter removePipe(pPortINid');

  // Check if SVG container exists, if not exit
  if (!svg) {
    console.log('   svg does not exist, so RETURN');
    return;
  }

  // get index of pPortINid in inPortList
  const tIndex = inPortList.findIndex(finderFunc);
  function finderFunc(thisOne) {
    return thisOne == pPortINid;
  } 
  console.log('  index of pPortINid in inPortList, tIndex = ' + tIndex);

  const temp = outPortList[tIndex];
  console.log('  portOUTid in outPortList at this index = ' + temp);

  // now use index to get corresponding elements
  const pipeID = pipeIDlist[tIndex];
  console.log('  pipeID in pipeIDList at tIndex = ' + pipeID);
 
  reportStatus('>>>>> removePipe() just before remove pipe <<<<<');

  // remove pipe

  // this seems more reliable than svg.removeChild(pipeChild), 
  document.getElementById(pipeID).remove();
 
  // svg.removeChild() failed when add two parent03, add pipe between, 
  // add 3rd parent03, then try to delete pipe or delete first parent03
  // either pipeObject or pipeChild had same problem 
  // const pipeObject = pipeObjectList[tIndex];
  // const pipeChild = document.getElementById(pipeID);
  // svg.removeChild(pipeChild); 

  // remove deleted elements from lists
  outPortList.splice(tIndex, 1);
  inPortList.splice(tIndex, 1);
  inParentPortList.splice(tIndex, 1);
  outParentPortList.splice(tIndex, 1);
  pipeObjectList.splice(tIndex, 1);
  pipeIDlist.splice(tIndex,1);

  // Reset variables for next pipe
  isPiping = false;
  portOUTid = null;
  portINid = null;
  portOUTparentID = null;

  reportStatus('end of removePipe()');
  console.log('just before end removePipe');

} // END OF FUNCTION removePipe

function drawPipe(event) {

  console.log('enter drawPipe');
  console.log('  portOUTid = ' + portOUTid);

  const divScene = document.getElementById('div_scene');
  const divOUT = document.getElementById(portOUTid);
  
  const divSceneRect = divScene.getBoundingClientRect();
  const divOUTRect = divOUT.getBoundingClientRect();
  
  // Calculate centers relative to divScene's top-left corner
  const nudge = -4; // nudge to center pipe on div
  const x1 = Math.round(nudge + divOUTRect.left - divSceneRect.left + divOUTRect.width/2);
  const y1 = Math.round(nudge + divOUTRect.top - divSceneRect.top + divOUTRect.height/2);

  svg = document.getElementById("svg_pipes");

  // setting z-index in CSS file didn't work
  // next pipe works to put pipes on top of scene objects
  svg.style.zIndex = '1000'; // Add z-index to ensure SVG is on top
  // but also need to disable pointer events for svg
  // so clicks go to objects in scene and not stop on svg
  svg.style.pointerEvents = 'none'; 
  
  console.log('  just before create pipe element');

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

  // Create pipe element, as svg line, with arrowhead
  pipe = document.createElementNS(svgNS, "line");
  pipe.setAttribute('x1', x1);
  pipe.setAttribute('y1', y1);

  pipe.setAttribute('id',portOUTid);
  // add ID to pipeIDlist when pipe fixed to an input 

  const thisID = document.getElementById(portOUTid);
  console.log('  >>>> svg thisID = ' + thisID.id);

  // Calculate pipe end position relative to scene div, accounting for scroll
  const x2 = Math.round(nudge + event.clientX - divSceneRect.left);
  const y2 = Math.round(nudge + event.clientY - divSceneRect.top);
  pipe.setAttribute('x2', x2);
  pipe.setAttribute('y2', y2);

  console.log('  pipe start x1, y1 = ' + x1 +', '+ y1);
  console.log('  pipe start x2, y2 = ' + x2 +', '+ y2);

  pipe.setAttribute('stroke', 'black');
  pipe.setAttribute('stroke-width', '3');
  pipe.setAttribute('marker-end', 'url(#arrowhead)');  // Add arrowhead

  svg.appendChild(pipe);

  document.addEventListener('mousemove', updatePipe);

  reportStatus('end drawpipe()');
  console.log('just before end drawPipe()');
  
} // END OF FUNCTION drawPipe

function output_clicked(event, theParent) {  
  
  console.log('enter output_clicked');
  console.log('  theParent.id = ' + theParent.id); // theParent is an html ref, not var
  portOUTparentID = theParent.id;

  // if not already piping and mod key down, set isPiping to true

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac // NEW PIPE
  if (modkey && !isPiping) { 
    portOUT = event.target;
    portOUTid = portOUT.id;
    isPiping = true;
    console.log('  set isPiping = true');
    console.log('  event.target = portOUT = ' + portOUT); // [an html ref, not var]
    console.log('  portOUTid = ' + portOUTid)

    drawPipe(event);
    reportStatus('output_clicked just after drawPipe(event)');
  }

  console.log('just before end output_clicked, stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION output_clicked

function input_clicked(event,theParent) { 

  // if piping, set isPiping to false and draw pipe
  // if not piping and mod key down, remove pipe
  // if not piping and no mod key, do nothing

  console.log('enter input_clicked');
 
  portIN = event.target;
  portINid = portIN.id;
  portINparentID = theParent.id;

  console.log('  portINid = ' + portINid)
  console.log('  portINparentID = ' + portINparentID);
  console.log('  portOUTparentID = ' + portOUTparentID); 

  if (portINparentID == portOUTparentID) {
    // don't allow pipe to same parent
    // want to delete the pipe before connection
    svg.removeChild(pipe); 
    // Reset variables for next pipe
    isPiping = false;
    portOUTid = null;
    portINid = null;
    portOUTparentID = null;
    portINparentID = null;
    event.stopPropagation(); // stops event bubbling up to parent
    console.log('  RETURN clicked same parent');
    return;
  }

  if (isPiping) {
    isPiping = false;
    // drawPipe at end sets portIN and portOUT to null
    // add output and input ports to lists
    console.log('  just before drawPipe');
    console.log('  portOUTid = ' + portOUTid);
    console.log('  portINid = ' + portINid);
    outPortList.push(portOUTid);
    inPortList.push(portINid);
    inParentPortList.push(portINparentID);
    outParentPortList.push(portOUTparentID);
    pipeIDlist.push(portOUTid); // svg pipe id set in input_clicked()

    document.removeEventListener('mousemove', updatePipe);

    // add pipe description to pipeObjectList
    // at same index as outPortList and inPortList
    pipeObjectList.push(pipe);

    // Reset variables for next pipe
    portOUT = null;
    portIN = null;
    portOUTid = null;
    portINid = null;

    reportStatus('input_clicked after pipe added');

  } else {
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    if (modkey) {
      reportStatus('input_clicked just before removePipe');
      removePipe(portINid);
      reportStatus('input_clicked just after removePipe');
    }
  }

  reportStatus('end of input_clicked');
  console.log('just before end input_clicked, stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION input_clicked 

function updatePipe(event) {
  const divScene = document.getElementById('div_scene');
  const divSceneRect = divScene.getBoundingClientRect();
  const nudge = -4; // match nudge used in drawPipe

  // Calculate position relative to scene div, accounting for scroll
  const x2 = Math.round(nudge + event.clientX - divSceneRect.left);
  const y2 = Math.round(nudge + event.clientY - divSceneRect.top);

  pipe.setAttribute('x2', x2);
  pipe.setAttribute('y2', y2);
}// END OF FUNCTION updatePipe 

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