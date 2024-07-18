function buildChild01HTML(zz,x,y) {
  
    console.log('enter function buildChild01HTML, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 
    
    <style>
    
        #div_child_01_${zz} {
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 60px;
            height: 60px;
            visibility: visible;
            border-width: 2px;
            border-style: outset;
            background-color: yellow;
            opacity: 1;
        }
    
        #div_baby_01_${zz} {
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
    
    `; // END buildText

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="div_child_01_${zz}" onclick="paletteObjectClicked(event, 01)">
            <div id="div_baby_01_${zz}">
            </div>
        `; 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_child_01_${zz}" onclick="sceneObjectClicked(event)">
            <div id="div_baby_01_${zz}">
            </div>
            </div>
        `; 
    }
  
    console.log('at end function buildChild01HTML');
    // alert('buildText in buildChild01HTML = ' + buildText);
  
    return buildText;
}
