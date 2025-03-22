function buildParent03(zz,x,y) {
  
    console.log('enter function buildParent03, zz,x,y = ' + zz +', '+ x +', '+ y);

    // NOTE the back-ticks ` required at start and end of template string buildText
  
    buildText = ` 

    <style>
        #parent_03_${zz} {
            // position: absolute;
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        }
    </style>
    
    `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON 

    if (zz == 0) {
        console.log('buildText if (zz == 0), zz =' + zz); 
        buildText += ` 
            <div id="parent_03_${zz}" class="parent_03" 
                onclick="paletteObjectClicked(event, 03)">
                <div id="input_03_1_${zz}" class="input_03_1"></div>
                <div id="input_03_2_${zz}" class="input_03_2"></div>
                <div id="output_03_1_${zz}" class="output_03_1"></div>
                <div id="output_03_2_${zz}" class="output_03_2"></div>
                <div id="info_03_${zz}" class="info_03">info</div>
                <div id="type_03_${zz}" class="type_03">M</div>
                <div id="num_03_${zz}" class="num_03">1</div>
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON  
    } else {
        console.log('buildText ELSE, zz = ' + zz); 
        buildText += ` 
           <div id="parent_03_${zz}" class="parent_03" 
                onclick="sceneObjectClicked(event, ${zz}, 'parent_03_${zz}')">
                <div id="input_03_1_${zz}" class="boxIN input_03_1"
                    onclick="input_03_clicked(event, parent_03_${zz})">
                </div>
                <div id="input_03_2_${zz}" class="boxIN input_03_2" 
                    onclick="input_03_clicked(event, parent_03_${zz})">
                </div>
                <div id="output_03_1_${zz}" class="boxOUT output_03_1"
                    onclick="output_03_clicked(event, parent_03_${zz})">
                </div>
                <div id="output_03_2_${zz}" class="boxOUT output_03_2"
                   onclick="output_03_clicked(event, parent_03_${zz})">
                </div>
                <div id="info_03_${zz}" class="info_03">info</div>
                <div id="type_03_${zz}" class="type_03">M</div>
                <div id="num_03_${zz}" class="num_03">1</div>
            </div>
        `; // END buildText << NOTE BACK-TICK BEFORE SEMICOLON  
    }
    
    console.log('at end function buildParent01');
    // alert('buildText in buildParent03 = ' + buildText);
    
    return buildText;
    }
