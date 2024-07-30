function buildParent02(zz,x,y) {
  
    console.log('enter function buildParent02, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 
    
    <style>
    
        #div_parent_02_${zz} {
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        }
    
    </style>
    
    `; // END buildText

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="div_parent_02_${zz}" class="c_parent_02" 
                onclick="paletteObjectClicked(event, 02)">
            <div id="div_child_02_${zz}" class="c_child_02">
            </div>
        `; 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_parent_02_${zz}" class="c_parent_02" 
                onclick="sceneObjectClicked(event, 'div_parent_02_${zz}')">
            <div id="div_child_02_${zz}" class="c_child_02" onclick="child_02_clicked(event,'#div_parent_02_${zz}')">
            </div>
            </div>
        `; 
    }
  
    console.log('at end function buildParent02');
    // alert('buildText in buildParent02 = ' + buildText);
  
    return buildText;
}
