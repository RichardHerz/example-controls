// THE IDEA IS TO PLACE DIFFERENT COMPONENT ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting (` and ending `); 
// document.write(` `); 

document.write(`

    <style>

        #div_child_01 {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 60px;
            height: 60px;
            visibility: visible;
            border-width: 2px;
            border-style: outset;
            background-color: red;
            opacity: 1;
        }

    </style>

    <script>

        function childClicked_01(event, arg1) {
            console.log('childClicked_01 function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
        }

        function moveChild_01(dx,dy) {
            let el = document.querySelector("#div_child_01");
            let x = el.offsetLeft;
            let y = el.offsetTop;
            console.log('in moveChild_01 orig x,y = ' + x +', '+ y);
            el.style.left = x + dx + 'px';
            el.style.top = y + dy + 'px';
            console.log('in moveChild_01 final x,y = ' + el.offsetLeft +', '+ el.offsetTop);
        }

    </script>

    <div id="div_child_01" onclick="childClicked_01(event, 'child_01')">

        <script src="js/group_01_baby.js"></script>

    </div>

`); 