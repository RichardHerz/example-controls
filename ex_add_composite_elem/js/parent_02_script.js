function parent02Clicked(zz) {
    console.log('enter function parent02Clicked, elemCounter = ' + zz);
  };

  function child_02_clicked(event,theParent) {
    console.log('enter function child_02_clicked');
    let modkey = event.getModifierState("Alt"); // Alt is Option on Mac
    if (modkey == false) {
      console.log('in child_02_clicked, modkey is false');
      let el = document.querySelector(theParent);
      console.log('in child_02_clicked, after querySelector, el = ' + el);
      let x = el.offsetLeft;
      let y = el.offsetTop;
      let dx = -5;
      let dy = -5;
      el.style.left = x + dx + 'px';
      el.style.top = y + dy + 'px';
    }
  }