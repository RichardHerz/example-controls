// see process_main.js for handling clicks on general 
// IN and OUT ports this file will be used for handling 
// actions specific to each type of parent element 
// such as in web labs process units 

// QUESTION: what should happen when an object is 
// deleted from the scene? 
// maybe just leave it in processUnits[] and just not
// call it during time stepping? 
// just iterate over elemList or parentList... 
// for large sims, would it be better to delete objects
// to save memory, although mine won't get that big... 

// SEE Claude 3.5 Sonnet answer about placing functions 
// in zotero: 
//   where to place function definitions in javascript classes
// SEE // https://www.w3schools.com/Js/js_classes.asp

class Parent03 {

    constructor(elemCounter, parentID) {
        console.log('enter class Parent03 constructor');
        this.elemCounter = elemCounter;
        this.parentID = parentID;
        console.log('  this class parentID = ' + this.parentID);
        const fieldID= "num_03_" + this.elemCounter;
        console.log('  fieldID = ' + fieldID);
        const el = document.getElementById(fieldID);
        if (el) {
            el.innerHTML = this.elemCounter;
        } else {
            console.error(`Element with ID ${this.fieldID} not found.`);
        }
    } // END OF FUNCTION constructor()

    initialize() {
        console.log('enter parent03 initialize function');
        console.log('  this.parentID = ' + this.parentID);
        console.log('end parent03 initialize function');
    }

} // END OF class parent03
