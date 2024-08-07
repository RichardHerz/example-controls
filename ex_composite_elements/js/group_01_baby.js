// THE IDEA IS TO PLACE DIFFERENT COMPONENT ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting and ending of template string

buildText = `

    <style>

        #div_baby_01 {
            position: relative;
            top: 20px;
            left: 30px;
            width: 20px;
            height: 20px;
            visibility: visible;
            border-width: 2px;
            border-style: outset;
            background-color: yellow;
            opacity: 1;
        }
            
    </style>

    <script>

        function babyClicked_01(event, arg1) {
            console.log('babyClicked_01 function argument = ' + arg1);
            let clickedClass = event.target.className;
            let clickedID = event.target.id;
            let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
            console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey);

            moveChild_01(10,20);
        }

    </script>

    <div id="div_baby_01" onclick="babyClicked_01(event,'baby_01')">
    </div>

`; // END buildText 

document.write(buildText); 