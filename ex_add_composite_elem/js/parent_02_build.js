function buildParent02(zz,x,y) {
  
    console.log('enter function buildParent02, zz,x,y = ' + zz +', '+ x +', '+ y);

    // NOTE the back-ticks ` required at start and end of template string buildText
  
    buildText = `
    
    <style>
    
        #div_parent_02_${zz} {
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        }
    
    </style>
    
    `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON 

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="div_parent_02_${zz}" class="c_parent_02" 
                onclick="paletteObjectClicked(event, 02)">
            <div id="div_child_02_${zz}" class="c_child_02">
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_parent_02_${zz}" class="c_parent_02" 
                onclick="sceneObjectClicked(event, ${zz}, 'div_parent_02_${zz}')">
            <div id="div_child_02_${zz}" class="c_child_02" onclick="child_02_clicked(event, '#div_parent_02_${zz}')">
            </div>
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON 
    }
  
    console.log('at end function buildParent02');
    // alert('buildText in buildParent02 = ' + buildText);
  
    return buildText;
}
