const flyPath = {
    corviness: 1.25,
    autoRotate: true,
    values : [
        {x: 100, y: -20}, {x: 300, y: 10}, {x: 500, y: 100},
        {x: 750, y: -100}, {x: 350, y: -50}, {x: 600, y: 100}, 
        {x: 800, y: 0}, {x: window.innerWidth, y: -150}, 
    ]
}

const tl = new TimelineMax();

const airplane = document.querySelector(".plane");
const animation = document.querySelector(".animation");

tl.add(
    TweenMax.to(airplane,1,{
        bezier: flyPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene  = new ScrollMagic.Scene({
    triggerElement: animation,
    duration: 5000,
    triggerHook: 0
})
  .setTween(tl)
  .addIndicators()
  .setPin(animation)
  .addTo(controller);