/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DISPLAY INITIAL STATE ON OPEN WINDOW
window.onload = check_input_field;

function check_input_field() {
  var thisValue = input_field_enter_value.value;
  document.getElementById("field_output_field").innerHTML = "input value = " + thisValue;
}
