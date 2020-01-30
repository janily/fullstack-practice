const hero = document.querySelector(".hero")
const slider = document.querySelector(".slider");
const logo = document.querySelector(".logo");
const menu = document.querySelector(".menu");
const herotext = document.querySelector(".hero-text");

const tl = new TimelineMax();

tl.fromTo(hero, 1, {height:'0%'},{height:'90%', ease: Power2.easeInOut})
.fromTo(hero,1.2 , {width:'100%'}, {width:'80%', ease: Power2.easeInOut})
.fromTo(slider, 1.2, {xPercent:-100}, {x: '0%', ease: Power2.easeInOut}, "-=1.2")  // 最新版 tweenmax 才支持 transform 百分比为单位
.fromTo(logo, 0.5, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
.fromTo(menu, 0.5, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
.fromTo(herotext, 0.5, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.5");