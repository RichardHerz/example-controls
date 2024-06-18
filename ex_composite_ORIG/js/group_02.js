// THE IDEA IS TO PLACE DIFFERENT COMPONENT ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting (` and ending `); 
// document.write(` `); 

document.write(`

    <style>

        #div_child_02 {
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

        #div_baby_02 {
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
    
        function childClicked_02(event, arg1) {
            console.log('childClicked function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
        }

        function moveChild_02(dx,dy) {
            let el = document.querySelector("#div_child_02");
            let x = el.offsetLeft;
            let y = el.offsetTop;
            console.log('in moveChild_02 orig x,y = ' + x +', '+ y);
            el.style.left = x + dx + 'px';
            el.style.top = y + dy + 'px';
            console.log('in moveChild_02 final x,y = ' + el.offsetLeft +', '+ el.offsetTop);
        }

        function babyClicked_02(event, arg1) {
            console.log('babyClicked_02 function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)

            moveChild_02(30,40);
        }

    </script>

    <div id="div_child_02" onclick="childClicked_02(event, 'child_02')">

            <div id="div_baby_02" onclick="babyClicked_02(event,'baby_02')">
            </div>

    </div>

`); 