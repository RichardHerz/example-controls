/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DECLARE GLOBAL VARIABLES
var optClicked = 0; // toggles 0-1

function motherClicked(event) {
  let clickedClass = event.target.className;
  let clickedID = event.target.id;
  let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)

}

function childClicked(event) {
  let clickedClass = event.target.className;
  let clickedID = event.target.id;
  let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
}

function babyClicked(event,baby) {
  console.log('babyClicked baby argument = ' + baby);
  let clickedClass = event.target.className;
  let clickedID = event.target.id;
  let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
}