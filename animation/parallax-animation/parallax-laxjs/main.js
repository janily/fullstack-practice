window.onload = function() {
    lax.setup()

    document.addEventListener('scroll', function(e){
        lax.update(window.scrollY)
    },false)
}