/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function innerDivClicked(event) {
  console.log('inner div was clicked, event = ' + event);
}

function buttonClicked(event) {

  console.log('button_fixedOne clicked, event = ' + event);

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('mod key = ' + modkey);

  // A COUPLE WAYS TO ADD NEW ELEMENT

  if (modkey) {
    document.getElementById("div_outerdiv").
      innerHTML += '<button type="button" id="button_newOne">newOne</button>';
  }

  if (modkey) {
    const para = document.createElement("div");
             para.innerText = "Hello World";
             document.body.appendChild(para);
  }

  if (modkey) {
    const para = document.createElement("div");
             para.innerHTML = '<button type="button" id="button_newerOne">newerOne</button>';
             document.body.appendChild(para);
  }

}
