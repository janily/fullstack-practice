/* Animation */
function myMove() {
    var elem = document.getElementById("myAnimation");   
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px'; 
        elem.style.left = pos + 'px'; 
      }
    }
  }


var item = document.getElementById('item');
item.animate([
    { transform: 'scale(1)', background: 'red', opacity: 1, offset: 0 },
    { transform: 'scale(.5) rotate(270deg)', background: 'blue', opacity: .5, offset: .2 },
    { transform: 'scale(1) rotate(0deg)', background: 'red', opacity: 1, offset: 1 },
  ], {
    duration: 2000, // 动画时间
    easing: 'ease-in-out', // 运动曲线
    delay: 10, //延迟时间
    iterations: Infinity, //是否循环
    direction: 'alternate', // 运动方式
    fill: 'forwards' //  运动结束状态
  });
