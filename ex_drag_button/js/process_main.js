/*
  Design, text, images and code by Richard K. Herz, 2020
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html 
*/

/* MORE INFO ON HANDLING TOUCH ON PHONES/PADS 
    https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events 
*/

// DECLARE GLOBAL VARIABLES
var lastX
var lastY

// DISPLAY INITIAL STATE ON OPEN WINDOW
window.onload = fOpenThisLab; // can NOT use () after fOpenThisLab

function fOpenThisLab() {
  // for unknown reason, style values set here are not set
  // automatically by css file when opening window
  // so do it here
  let elDrag = document.querySelector("#button_dragBtn");
  let elFixedOne = document.querySelector("#button_fixedOne");
  let elFixedTwo = document.querySelector("#button_fixedTwo");
  elDrag.style.left = 251 + 'px';
  elDrag.style.top = 263 + 'px';
  elFixedOne.style.left = 179 + 'px';
  elFixedOne.style.top = 121 + 'px';
  elFixedTwo.style.left = 354 + 'px';
  elFixedTwo.style.top = 457 + 'px';
  fUpdateDisplay(); // call to update display
} // END OF function fOpenThisLab

function dragStartHandler(e) {
    // FROM https://docs.w3cub.com/dom/datatransfer/setdragimage.html 
    //
    // const img = new Image();
    // img.src = "1x1-ffffff7f.png"; // 1x1 image 
    // img.src = "screenshot_1374.jpg" // a big image
    // e.dataTransfer.setDragImage(img,0,0); // digits are offset pixels
    //
    // NOTE: same result with either img above or el below in setDragImage()
    // NOTE: with both approaches get occasional flickering in upper-left of 
    //       page of the html object image itself (not dragImage) being dragged  
    //
    // here use img set in html
    let el = document.querySelector("#dragImage");
    e.dataTransfer.setDragImage(el,0,0); // digits are offset ghost to element
}

function fDragging(e) {
  // set loc to last loc because clientx = clienty = 0 at end drag on mouseUp
  let el = document.querySelector("#button_dragBtn");
  el.style.left = lastX + "px";
  el.style.top = lastY + "px";
  fUpdateDisplay(); // call to update display
  // save current mouse pointer x,y position for next function call
  let x = e.clientX;
  let y = e.clientY;
  lastX = x - 20; // x - 20;
  lastY = y - 20; // y - 20;
} // END OF function fDragging

function fTouchMove(e) {
  // SEE CSS FOR button_dragBtn for touch-action & user-select settings
  //    to none which prevent touch screen from scrolling when dragging button 
  // set loc to last loc because clientx = clienty = 0 at end drag on mouseUp
  let el = document.querySelector("#button_dragBtn");
  el.style.left = lastX + "px";
  el.style.top = lastY + "px";
  fUpdateDisplay(); // call to update display
  // save current mouse pointer x,y position for next function call
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  lastX = x - 20; // x - 20;
  lastY = y - 20; // y - 20;
} // END OF function fTouchMove

function fUpdateDisplay() {

  // SEE http://tutorials.jenkov.com/svg/

  let elDrag = document.querySelector("#button_dragBtn");
  let elFixedOne = document.querySelector("#button_fixedOne");
  let elFixedTwo = document.querySelector("#button_fixedTwo");

  let tt = elDrag.style.left;
  let xe = parseInt(tt);
  tt = elDrag.style.top;
  let ye = parseInt(tt);

  tt = elFixedOne.style.left;
  let x1 = parseInt(tt);
  tt = elFixedOne.style.top;
  let y1 = parseInt(tt);

  tt = elFixedTwo.style.left;
  let x2 = parseInt(tt);
  tt = elFixedTwo.style.top;
  let y2 = parseInt(tt);

  let svgOne = document.getElementById("lineOne");
  let svgTwo = document.getElementById("lineTwo");

  // set lines to run from x#,y# to xe,ye
  // mouseup at end drag sets x=y=0 so don't want lines to flash there...
  if (xe > 20 && ye > 20) {
    svgOne.setAttribute("d", "M" + x1 + "," + y1 + " L" + xe + "," + ye );
    svgTwo.setAttribute("d", "M" + x2 + "," + y2 + " L" + xe + "," + ye );
  }

} // END OF function fUpdateDisplay

function fMouseDown(e) {
  // let x = e.clientX;
  // let y = e.clientY;
  // let coords = "X coords: " + x + ", Y coords: " + y;
  // document.getElementById("demo").innerHTML = coords;
}

function fMouseUp(e) {
  // let x = e.clientX;
  // let y = e.clientY;
  // let el = document.querySelector("#button_dragBtn");
  // el.style.left = lastX + "px";
  // el.style.top = lastY + "px";
  //
  // let coords = "mouseUp X coords: " + x + ", mouseUp Y coords: " + y;
  // document.getElementById("demo").innerHTML = coords;
}

function fMouseMove(e) {
  // let x = e.clientX;
  // let y = e.clientY;
  // let coords = "X coords: " + x + ", Y coords: " + y;
  // document.getElementById("demo").innerHTML = coords;
}

function showCoords(e) {
  // let x = e.clientX;
  // let y = e.clientY;
  // let coords = "X coords: " + x + ", Y coords: " + y;
  // document.getElementById("demo").innerHTML = coords;
}
