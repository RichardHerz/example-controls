/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

var optClicked = 0; // toggles 0-1

function fixedOneClicked(event) {
  console.log('button_fixedOne clicked, event = ' + event);
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('fixedOneClicked, mod key = ' + modkey);
  if (modkey) {
    optClicked = 1;
    console.log('optClicked = ' + optClicked);
    let el = document.getElementById("div_innerdiv");
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
    let el = document.getElementById("div_innerdiv");
    el.innerHTML += '<button type="button" id="button_newOne" onclick="newOneClicked(event)">newOne</button>';
    el.style.cursor = "default";
    el = document.getElementById("button_newOne");
    el.style.top = y;
    el.style.left = x;
  }
}

function newOneClicked(event) {
  console.log('button newOne clicked, event = ' + event);
}
