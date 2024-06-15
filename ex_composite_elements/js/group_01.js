// THE IDEA IS TO PLACE DIFFERENT COMPONENT ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting (` and ending `); 
// document.write(` `); 

document.write(`

    <style>

        #div_child_01 {
            position: absolute;
            top: 60px;
            left: 90px;
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

        function childClicked(event, arg1) {
            console.log('click function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
        }

    </script>

    <div id="div_child_01" onclick="childClicked(event, 'child_01')">

        <script src="js/group_01_baby.js"></script>

    </div>

`); 