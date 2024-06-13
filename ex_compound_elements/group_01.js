// THE IDEA IS TO PLACE DIFFERENT COMPOUND ELEMENTS IN THEIR OWN FILES 
// MAY WANT TO WRITE EACH SECTION IN DEDICATED FILE SO GET TEXT HIGHLIGHTING ON ENTRY 

// NOTE the back-ticks ` required at starting (` and ending `); 
document.write(`

<style>
    #div_child_01 {
    position: relative;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    visibility: visible;
    border-width: 2px;
    border-style: outset;
    background-color: red;
    opacity: 1;
    }

    #div_baby_01 {
    position: relative;
    top: 20px;
    left: 30px;
    width: 20px;
    height: 20px;
    visibility: visible;
    border-width: 2px;
    border-style: outset;
    background-color: yellow;
    opacity: 1;
</style>

<script>
    function childClicked(event, arg1) {
        console.log('click function argument = ' + arg1);
        let clickedClass = event.target.className;
        let clickedID = event.target.id;
        let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
        console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
    }

    function babyClicked(event, arg1) {
        console.log('click function argument = ' + arg1);
        let clickedClass = event.target.className;
        let clickedID = event.target.id;
        let modKey = event.getModifierState("Alt"); // Alt is Option on Mac
        console.log('class, ID, modKey = ' + clickedClass +', '+  clickedID +', '+  modKey)
    }

</script>

<div id="div_child_01" onclick="childClicked(event, 'child')">

        <div id="div_baby_01" onclick="babyClicked(event,'baby')">
        </div>

</div>

`); 