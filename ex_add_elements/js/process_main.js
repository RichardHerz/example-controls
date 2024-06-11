/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

var optClicked = 0; // toggles 0-1
var elemCounter = 0; // number of elements on palette 

function fixedOneClicked(event) {
  console.log('button_fixedOne clicked, event = ' + event);
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('fixedOneClicked, mod key = ' + modkey);
  if (modkey) {
    optClicked = 1;
    console.log('optClicked = ' + optClicked);
    let el = document.getElementById("button_fixedOne");
    el.style.cursor = "copy";
    el = document.getElementById("div_innerdiv");
    el.style.cursor = "copy";
  }
}

function innerDivClicked(event) { 
  console.log('inner div was clicked, optClicked = ' + optClicked);
  if (optClicked == 1) {
    console.log('optClicked is 1? = ' + optClicked);
    optClicked = 0;
    let x = event.clientX + 'px';
    let y = event.clientY + 'px';
    console.log('x,y = ' + x + ', ' + y);
    elemCounter += 1; 
    console.log('elemCounter ON ADD = ' + elemCounter);
    let el = document.getElementById("div_innerdiv");

    let newIDstring = "button_new_" + elemCounter;
    console.log('newIDstring = ' + newIDstring);

    el.innerHTML += '<button type="button" class="newButton" id="' + newIDstring + '" onclick="newOneClicked(event)">newOne</button>';

    el.style.cursor = "default";
    el = document.getElementById(newIDstring); 
    el.style.top = y;
    el.style.left = x;
    el = document.getElementById("button_fixedOne");
    el.style.cursor = "default";
  }
}

function newOneClicked(event) {
  console.log('button newOne clicked, event = ' + event);
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('newOneClicked, mod key = ' + modkey);
  if (modkey) {
  let newID = "button_new_" + elemCounter;
  let newIDstring = String(newID);
  let el = document.getElementById(newIDstring);
    el.remove(); // remove() allows placing another one with same ID
    elemCounter -= 1; 
    console.log('elemCounter ON REMOVE = ' + elemCounter);
  }
}
