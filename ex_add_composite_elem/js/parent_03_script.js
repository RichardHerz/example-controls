// see process_main.js for handling clicks on general IN and OUT ports 
// this file will be used for handling actions specific to each type of parent element 
// such as in web labs process units 

// QUESTION: what should happen when an object is 
// deleted from the scene? 
// maybe just leave it in processUnits[] and just not
// call it during time stepping? 
// just iterate over elemList or parentList... 
// for large sims, would it be better to delete objects
// to save memory, although mine won't get that big... 

function makeParent03(parentID) { 
  // constructor function for process unit 

  this.parentID = parentID;

  this.initialize = function() {
    console.log('enter makeParent03 initialize function');
    console.log('  this.parentID = ' + this.parentID);
  }

} // END OF function makeParent03 
