/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function buttonClicked(event) {


  let elFixedOne = document.querySelector("#button_fixedOne");
  console.log('elFixedOne = ' + elFixedOne);
  console.log('event = ' + event);

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('mod key = ' + modkey);

  // A FEW WAYS TO ADD NEW ELEMENT

  if (modkey) {
    document.getElementById("innerdiv").
      innerHTML += '<input type="button" id="button_newOne">';
  }

  if (modkey) {
    const para = document.createElement("div");
             para.innerText = "Hello World";
             document.body.appendChild(para);
  }

  if (modkey) {
    const para = document.createElement("div");
             para.innerHTML = '<input type="button" id="button_newerOne">';
             document.body.appendChild(para);
  }

}
