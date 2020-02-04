const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function() {

    let offset = window.pageYOffset;
    console.log('offset * 0.7:' + offset);

    parallax.style.backgroundPositionY = offset * 0.7 + 'px';


})