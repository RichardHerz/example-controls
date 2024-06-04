/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function innerDivClicked(event) {
  console.log('inner div was clicked, event = ' + event);
}

function outerDivClicked(event) {
  console.log('outer div was clicked, event = ' + event);
}

function newOneClicked(event) {
  console.log('button newOne clicked, event = ' + event);
}

function newerOneClicked(event) {
  console.log('button newerOne clicked, event = ' + event);
}

function fixedOneClicked(event) {

  console.log('button_fixedOne clicked, event = ' + event);

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('mod key = ' + modkey);

  // A COUPLE WAYS TO ADD NEW ELEMENT

  if (modkey) {
    document.getElementById("div_outerdiv").
      innerHTML += '<button type="button" id="button_newOne" onclick="newOneClicked(event)"</button>';
  }

  if (modkey) {
    const newD = document.createElement("div");
            newD.innerText = "Hello World";
            document.body.appendChild(newD);
  }

  if (modkey) {
    const newD = document.createElement("div");
            newD.innerHTML = '<button type="button" id="button_newerOne" onclick="newerOneClicked(event)">newerOne</button>';
            document.body.appendChild(newD);
  }

}
