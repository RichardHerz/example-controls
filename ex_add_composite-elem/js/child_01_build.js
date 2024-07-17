function buildHTML(zz,x,y) {
  
    console.log('enter function buildHTML, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 
    
    <style>
    
        #div_child_${zz} {
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
    
        #div_baby_${zz} {
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
            <div id="div_child_${zz}" onclick="paletteObjectClicked(event)">
            <div id="div_baby_${zz}">
            </div>
        `; 
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
            <div id="div_child_${zz}" onclick="sceneObjectClicked(event)">
            <div id="div_baby_${zz}">
            </div>
            </div>
        `; 
    }
  
    console.log('at end function buildHTML');
    // alert('buildText in buildHTML = ' + buildText);
  
    return buildText;
}
