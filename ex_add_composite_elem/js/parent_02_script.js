function child_02_clicked(event,theParent) {
  console.log('enter function child_02_clicked');
  let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
  if (modkey == false) {
    console.log('  in child_02_clicked, modkey is false');
    flashAllObjects(); 
  }
  console.log('  leave function child_02_clicked');
}

function flashAllObjects() {
  console.log('enter function flashAllObjects');
  console.log('  elemList = ' + elemList);
  console.log('  parentist = ' + parentList);
  // for each element in parentList, change its color briefly
  parentList.forEach(flashOne); 
  console.log('  leave function flashAllObjects');
}

function flashOne(value, index, array) {
  console.log('enter function flashOne');
  console.log('  value, index = ' + value +', '+ index);
  const tParent = parentList[index]; 
  console.log('  in function flashOne, theParent = ' + tParent);
  const el = document.getElementById(tParent);

  // to get current style/color of tParent, see 
  // https://attacomsian.com/blog/javascript-get-css-styles 

  const styles = window.getComputedStyle(el);
  const backgroundColor = styles.backgroundColor; 

  // setTimeout doesn't suspend execution, it just executes
  // function specified in first argument after second argument milliseconds,
  // with optional additional arguments as third+ arguments of setTimeout 

  setTimeout(flash, index * 500, el, "black");
  setTimeout(flash, (1+index) * 500, el, backgroundColor);

  console.log('  leave function flashOne');
}

function flash(el, tColor) {
  el.style.backgroundColor = tColor;
}


