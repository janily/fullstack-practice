//模拟客户端头部
var $html = document.querySelector('html');
$html.style.setProperty('--density', window.devicePixelRatio); //设备像素比传给css
var userAgent = window.navigator.userAgent;
var barReg = /StatusBarHeight\/[0-9]*/;
var barProperty = userAgent.match(barReg);
var statusBarHeight = 24 * window.devicePixelRatio; //客户端某些版本取不到，默认24
if (barProperty && barProperty[0]) {
    var no = barProperty[0].indexOf('/');
    if (no != -1) {
        statusBarHeight = parseFloat(barProperty[0].substring(no + 1, barProperty[0].length).trim());
    }
}
$html.style.setProperty('--statusBarHeight', statusBarHeight + 'px'); //手Q状态栏高度


// 设备判断
(function (doc, win) {
    var $body = document.querySelector('body');
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    if (isiOS) {
        $body.classList.add('ios-device');
    }
    if (isAndroid) {
        $body.classList.add('android-device');
    }
})(document, window);