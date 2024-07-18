function buildChild02HTML(zz,x,y) {
  
    console.log('enter function buildChild02HTML, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 
    
    <style>
    
        #div_child_02_${zz} {
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 60px;
            height: 60px;
            visibility: visible;
            border-width: 2px;
            border-style: outset;
            background-color: cyan;
            opacity: 1;
        }
    
        #div_baby_02_${zz} {
            position: relative;
            top: 10px;
            left: 10px;
            width: 20px;
            height: 20px;
            visibility: visible;
            border-width: 2px;
            border-style: outset;
            background-color: red;
            opacity: 1;
        }
    
    </style>
    
    `; // END buildText

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="div_child_02_${zz}" onclick="paletteObjectClicked(event, 02)">
            <div id="div_baby_02_${zz}">
            </div>
        `; 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_child_02_${zz}" onclick="sceneObjectClicked(event)">
            <div id="div_baby_02_${zz}">
            </div>
            </div>
        `; 
    }
  
    console.log('at end function buildChild02HTML');
    // alert('buildText in buildChild02HTML = ' + buildText);
  
    return buildText;
}
