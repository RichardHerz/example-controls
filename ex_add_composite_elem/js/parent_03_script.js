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

class parent03 {

    constructor(parentID) { 
        this.parentID = parentID;
    } // END OF constructor function of class parent03

    initialize() {
        console.log('enter parent03 initialize function');
        console.log('  this.parentID = ' + this.parentID);
        console.log('end parent03 initialize function');
    }

} // END OF class parent03
