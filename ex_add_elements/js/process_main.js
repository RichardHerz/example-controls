/*
  Design, text, images and code by Richard K. Herz, 2024
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

var optClicked = 0;

function fixedOneClicked(event) {
  console.log('button_fixedOne clicked, event = ' + event);
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  console.log('fixedOneClicked, mod key = ' + modkey);
  if (modkey) {
    optClicked = 1;
    console.log('optClicked = ' + optClicked);
  }
}

function innerDivClicked(event) {
  // innerDiv got click when button fixedOne clicked, so wait for next click on innerDiv to add button 
  console.log('inner div was clicked, optClicked = ' + optClicked);
  if (optClicked == 1) {
    console.log('optClicked is 1? = ' + optClicked);
    optClicked = 2;
    console.log('optClicked set to 2');
  } else if (optClicked == 2) {
    console.log('optClicked is 2? = ' + optClicked);
    optClicked = 0;
    console.log('optClicked set to 0 & add button');
    document.getElementById("div_outerdiv").
    innerHTML += '<button type="button" id="button_newOne" onclick="newOneClicked(event)">newOne</button>';
  }
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

  // // A COUPLE WAYS TO ADD NEW ELEMENT

  // if (modkey) {
  //   document.getElementById("div_outerdiv").
  //     innerHTML += '<button type="button" id="button_newOne" onclick="newOneClicked(event)">newOne</button>';
  // }

  // if (modkey) {
  //   const newD = document.createElement("div");
  //           newD.innerText = "Hello World";
  //           document.body.appendChild(newD);
  // }

  // if (modkey) {
  //   const newD = document.createElement("div");
  //           newD.innerHTML = '<button type="button" id="button_newerOne" onclick="newerOneClicked(event)">newerOne</button>';
  //           document.body.appendChild(newD);
  // }


