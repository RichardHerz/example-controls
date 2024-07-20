function buildChild01(zz,x,y) {
  
    console.log('enter function buildChild01, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 

    <style>
        #div_child_01_${zz} {
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        }
    </style>
    
    `; // END buildText

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="div_child_01_${zz}" class="c_child_01" 
                onclick="paletteObjectClicked(event, 01)">
            <div id="div_baby_01_${zz}" class="c_baby_01">
            </div>
        `; 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_child_01_${zz}" class="c_child_01" 
                onclick="sceneObjectClicked(event, 'div_child_01_${zz}')">
            <div id="div_baby_01_${zz}" class="c_baby_01">
            </div>
            </div>
        `; 
    }
  
    console.log('at end function buildChild01');
    // alert('buildText in buildChild01 = ' + buildText);
  
    return buildText;
}
