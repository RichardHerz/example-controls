function buildParent01(zz,x,y) {
  
    console.log('enter function buildParent01, zz,x,y = ' + zz +', '+ x +', '+ y);

    // NOTE the back-ticks ` required at start and end of template string buildText
  
    buildText = ` 

    <style>
        #parent_01_${zz} {
            // position: absolute;
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        }
    </style>
    
    `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON 

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz = ' + zz); 
        buildText += ` 
            <div id="parent_01_${zz}" class="parent_01" 
                onclick="paletteObjectClicked(event, 01)">
            <div id="child_01_${zz}" class="child_01">
            </div>
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON  
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="parent_01_${zz}" class="parent_01" 
                onclick="sceneObjectClicked(event, ${zz}, 'parent_01_${zz}')">
            <div id="child_01_${zz}" class="child_01" onclick="child_01_clicked(event, 'parent_01_${zz}')">
            </div>
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON  
    }
    
    console.log('at end function buildParent01');
    
    return buildText;
    } // END OF FUNCTION buildParent01

