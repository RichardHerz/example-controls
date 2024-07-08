// EXPERIMENT TO COMMENT OUT TEMPLATE STRING DURING JS DEVELOPMENT 
// IN ORDER TO GET VISUAL CODE EDITOR HIGHLIGHTING 

let buildText 

buildText = ` 

<script>
    console.log('hello from script tag');
</script> 

<style> 
p {
    color: red;
}
</style>


<p>
    this is some experimental text
</p>


` // END buildText

document.write(buildText)