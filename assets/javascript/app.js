// jQuery Tool button from Materialize.com

/*$('.fixed-action-btn').floatingActionButton({
    toolbarEnabled: true
});*/

/*document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});
$(".material-icons").css("color".black);

// Slides
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, options);
});*/

//Function  to re-start the app. The id has been named "str1"

$('#str1').on('click', function rStart() {
    window.location.reload(false);
});


//Function that takes to the Dentists's html page.

$('#btn1').on('click', function Dentist() {
    window.location.href = "/dentist.html";

});

//Function that takes to the Oculists's html page.

$('#btn2').on('click', function Oculist() {
    window.location.href = "/oculist.html";

});

//Function that takes to the Physicians's html page.

$('#btn3').on('click', function Physician() {
    window.location.href = "/phy.html";

});

//Function that takes to the Veterinarians's html page.

$('#btn4').on('click', function Veterinarian() {
    window.location.href = "/vet.html";

});