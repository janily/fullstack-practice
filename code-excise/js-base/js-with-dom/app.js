// dom with js

var div1 = document.getElementById('div1');

var uniycle = document.getElementsByClassName('someclass');

var p = document.getElementsByTagName('p');

var queryWays = document.querySelector('#div2');

var queryAll = document.querySelectorAll('.someclass, .someclass2')

var text = "<h1>hello World</h1>";

for( i = 0; i < queryAll.length; ++i) {
    queryAll[i].innerHTML = text;
}

div1.innerHTML = text;

//  css style with js

var line = document.querySelector('.line');
var attr = document.querySelector('.attr');

// line.style.background = "red";
// attr.style.boxShadow = "2px 2px 5px 1px blue";

line.style.cssText = "color:green;border:1px solid #000";

attr.setAttribute("style", "color:pink;border:1px solid red;");

// console.log(line.style);
// console.log(window.getComputedStyle(line));

// dom event with js

function changeColor(obj) {
    obj.style.color = "pink";
}

document.querySelector('#btn').onclick = changeBodyColor;

function changeBodyColor() {
    document.querySelector('body').style.background = "pink";
}

function removerLetterFromH1() {
    var h1  = document.querySelector('h1');
    h1.textContent = h1.textContent.slice(0,-1);
}

function mOver(obj) {
    obj.innerHTML = "GET OFF ME!";
}

function mOut(obj) {
    obj.innerHTML = "Thank you!";
}

const box = document.querySelector('.box');

function changeText() {
    box.textContent = "AWESOME!!!"
}

box.addEventListener('click',function(){
    box.style.backgroundColor = "lightblue";
    changeText();
})

//  dom nodes

var para = document.createElement("p");
var node = document.createTextNode("Up above the world so high");
para.appendChild(node);

var parent = document.getElementById("div3");
parent.appendChild(para);

var para2 = document.createElement("p");
para2.innerHTML = "Like a diamond in the sky"

var child = document.getElementById("p1");
parent.insertBefore(para2, child);

var para3 = document.createElement("p");
para3.innerHTML = "When the blazing sun is gone";
parent.replaceChild(para3, child);

parent.removeChild(para3);