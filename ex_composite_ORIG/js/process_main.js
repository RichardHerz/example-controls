/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

function motherClicked(event, arg1) {
  console.log('motherClicked function argument = ' + arg1);
  let clickedClass = event.target.className;
  let clickedID = event.target.id;
  let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey);
}
