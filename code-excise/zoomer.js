const image = document.querySelector('.img');

image.addEventListener('mousemove', function(e){
    let width = image.offsetWidth;
    let height = image.offsetHeight;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    console.log(mouseY + " : " + mouseX);

    // number / total * 100%

    let bgPosX = (mouseX / width * 100);
    let bgPosY = (mouseY / height * 100);

    console.log(bgPosX + '%');

    image.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;

});

image.addEventListener('mouseleave', function(e){
    image.style.backgroundPosition = 'center';
})