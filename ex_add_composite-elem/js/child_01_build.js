function buildHTML(zz,x,y) {
  
    console.log('enter function buildHTML, zz,x,y = ' + zz +', '+ x +', '+ y);
  
    buildText = ` 
    
    <style>
    
        #div_child_${zz} {
            position: absolute;
            top: ${y};
            left: ${x};
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
    
    <div id="div_child_${zz}" onclick="sceneObjectClicked(event)">
    
        <div id="div_baby_${zz}">
        </div>
    
    </div>
    
    `; // END buildText
  
    console.log('at end function buildHTML');
    // alert('buildText in buildHTML = ' + buildText);
  
    return buildText;
}
