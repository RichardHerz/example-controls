/*
  Design, text, images and code by Richard K. Herz, 2017
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// DISPLAY INITIAL STATE ON OPEN WINDOW
window.onload = updateDisplay;

function updateDisplay() {

  var canvas = document.getElementById('canvas_CANVAS_rate');
  var context = canvas.getContext('2d');
  // // test with example from
  // //   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
  // context.fillStyle = 'rgb(200,0,0)';
  // context.fillRect(10,10,50,50);
  // context.fillStyle = 'rgba(0,0,200,0.5)';
  // context.fillRect(30,30,50,50);

  var x = 5;
  var y = 5;
  var tSize = 390;
  var sSize = 390;

  context.fillStyle = 'rgb(200,0,0)';
  context.fillRect(x,y,tSize,sSize);

}  // END OF function updateDisplay
