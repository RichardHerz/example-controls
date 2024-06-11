/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

var optClicked = 0; // toggles 0-1
var elemCounter = 0; // number of elements placed on canvas including those removed 
var clickedClass = '';
var clickedID = '';

function fixedClicked(event) {
  console.log('fixedClicked(), event = ' + event);
  console.log('target id = ' + event.target.id)
  console.log('target className = ' + event.target.className)
  clickedClass = event.target.className;
  clickedID = event.target.id;
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('fixedClicked, mod key = ' + modkey);
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
  console.log('canvasDiv was clicked, optClicked = ' + optClicked);
  if (optClicked == 1) {
    console.log('optClicked is 1? = ' + optClicked);
    optClicked = 0; // toggles to 1 in fixedClicked() 
  
    elemCounter += 1; 
    console.log('elemCounter ON ADD = ' + elemCounter);
    let el = document.getElementById("div_canvasDiv");

    let newID = clickedID + elemCounter;
    console.log('newID = ' + newID);

    let newClass = clickedClass;
    console.log('newClass = ' + newClass);

    let x = event.clientX + 'px';
    let y = event.clientY + 'px';
    console.log('x,y = ' + x + ', ' + y);

    el.innerHTML += '<button type="button" class=" '+clickedClass+' " id=" '+newID
      +' " style="top: '+y+'; left: '+x+';" onclick="canvasClicked(event)">'
      +clickedClass+'</button>';

    el.style.cursor = "default";

    el = document.getElementById(clickedID); 
    el.style.cursor = "default";
  }
}

function canvasClicked(event) {
  console.log('canvasClicked(), event = ' + event);
  let clickedID = event.target.id;
  console.log('event.target.id = ' + event.target.id);
  console.log('event.target.className = ' + event.target.className);
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('mod key = ' + modkey);
  if (modkey) {
    let el = document.getElementById(clickedID);
    el.remove();
  }
}
