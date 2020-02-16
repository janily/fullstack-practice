//  获取用户输入的名字
let filterInput = document.getElementById('filterInput');
// 监听用户键盘事件
filterInput.addEventListener('keyup', filterNames);

function filterNames () {
    // 获取输入文本
    let filterValue = document.getElementById('filterInput').value.toUpperCase();
    console.log(filterValue);
    //获取联系人列表开始字母
    let ul = document.getElementById('names');
    // 获取联系人列表
    let li = ul.querySelectorAll('li.collection-item');

    //循环列表

    for(let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        //如果匹配到开始字母
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }


}