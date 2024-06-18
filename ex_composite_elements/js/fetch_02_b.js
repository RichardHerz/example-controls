xx += 1;
var yy = xx.toString();

let buildText = `<style>

#div_child_` + yy + ` {
    position: absolute;
    top: 60px;
    left: 90px;
    width: 60px;
    height: 60px;
    visibility: visible;
    border-width: 2px;
    border-style: outset;
    background-color: yellow;
    opacity: 1;
}

#div_baby_` + yy + ` {
    position: relative;
    top: 20px;
    left: 30px;
    width: 20px;
    height: 20px;
    visibility: visible;
    border-width: 2px;
    border-style: outset;
    background-color: blue;
    opacity: 1;
}

</style>

<script>

function childClicked_` + yy + `(event, arg1) {
    console.log('childClicked_` + yy + ` function argument = ' + arg1);
    let clickedClass = event.target.className;
    let clickedID = event.target.id;
    let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
}

function moveChild_` + yy + `(dx,dy) {
    let el = document.querySelector("#div_child_` + yy + `");
    let x = el.offsetLeft;
    let y = el.offsetTop;
    console.log('in moveChild_` + yy + ` orig x,y = ' + x +', '+ y);
    el.style.left = x + dx + 'px';
    el.style.top = y + dy + 'px';
    console.log('in moveChild_` + yy + ` final x,y = ' + el.offsetLeft +', '+ el.offsetTop);
}

function babyClicked_` + yy + `(event, arg1) {
    console.log('babyClicked_` + yy + `, function argument = ' + arg1);
    let clickedClass = event.target.className;
    let clickedID = event.target.id;
    let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
    console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)

    moveChild_` + yy + `(30,40);
}

</script>

<div id="div_child_` + yy + `" onclick="childClicked_` + yy + `(event, 'child_` + yy + `')">

    <div id="div_baby_` + yy + `" onclick="babyClicked_` + yy + `(event,'baby_` + yy + `')">
    </div>

</div>

` // END OF BUILDTEXT

// alert(buildText);

document.write(buildText); 

// buildText = `moveChild_` + yy + `(100,100);`

// alert(buildText);

// document.write(buildText); 