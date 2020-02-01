const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1')

const section = document.querySelector('section');
const end = section.querySelector('h1');

// scroll scences
const controller = new ScrollMagic.Controller();

let scene = new ScrollMagic.Scene({
    duration: 9000,
    triggerElement: intro,
    triggerHook: 0
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

const textAnim = TweenMax.fromTo(text, 3, {opacity:0},{opacity:1});
let scene2 = new ScrollMagic.Scene({
    duration: 3000,
    triggerElement:intro,
    triggerHook:0
})
  .setTween(textAnim)
  .addTo(controller);


// animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos / 1000;
    // console.log(e);
});

setInterval(() => {
    delay += (scrollpos - delay) * accelamount;
    // console.log(scrollpos, delay);
    video.currentTime = delay;
},33.3);
