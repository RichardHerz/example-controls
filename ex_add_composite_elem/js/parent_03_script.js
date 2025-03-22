function output_03_clicked(event,theParent) {  
  
  console.log('enter output_03_clicked');

  // if not already piping and mod key down, set isPiping to true

  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac // NEW LINE
  if (modkey && !isPiping) { 
      boxOUT = event.target;
      boxOUTid = boxOUT.id;
      isPiping = true;
      console.log('  set isPiping = true');
      console.log('  event.target = boxOUT = ' + boxOUT); // [an html ref, not var]
      console.log('  boxOUTid = ' + boxOUTid)
  }

  console.log('   stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION input_03_clicked

function input_03_clicked(event,theParent) { 

  // if piping, set isPiping to false and draw line
  // if not piping and mod key down, remove line
  // if not piping and no mod key, do nothing

  console.log('enter input_03_clicked');

  boxIN = event.target;
  boxINid = boxIN.id;
  console.log('  event.target = boxIN = ' + boxIN); // [an html ref, not var]
  console.log('  boxINid = ' + boxINid);

  if (isPiping) {
    isPiping = false;
    // drawLine at end sets boxIN and boxOUT to null
    // add output and input ports to lists
    console.log('  just before drawLine');
    console.log('  boxOUTid = ' + boxOUTid);
    console.log('  boxINid = ' + boxINid);
    outPortList.push(boxOUTid);
    inPortList.push(boxINid);
    drawLine();
  } else {
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    if (modkey) {
        console.log('  modkey is true');
        console.log('  just before removeLine');
        removeLine(boxINid);
    }
  }

  console.log('   stopPropagation');
  event.stopPropagation(); // stops event bubbling up to parent

} // END OF FUNCTION input_03_clicked
