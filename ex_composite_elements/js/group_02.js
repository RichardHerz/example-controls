// THE IDEA IS TO PLACE DIFFERENT COMPONENT ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting (` and ending `); 
// document.write(` `); 

document.write(`

    <style>

        #div_child_02 {
            position: absolute;
            top: 10px;
            left: 20px;
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
    
        function childClicked(event, arg1) {
            console.log('click function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
        }

        function babyClicked(event, arg1) {
            console.log('click function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
        }

    </script>

    <div id="div_child_02" onclick="childClicked(event, 'child_02')">

            <div id="div_baby_02" onclick="babyClicked(event,'baby_02')">
            </div>

    </div>

`); 