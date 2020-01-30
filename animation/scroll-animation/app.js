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
    triggerElement: animation,   // 动画元素
    duration: 5000, //动画时间
    triggerHook: 0  //页面触发位置,默认为onCenter,即triggerElement滚到页面中间的时候触发, 可选值为"onEnter","onCenter","onLeave"
})
  .setTween(tl)  //执行绑定的动画
  .addIndicators()  // 用来显示动画开始到结束的位置
  .setPin(animation) //绑定的元素(即动画生效的元素)
  .addTo(controller); // 添加到控制器