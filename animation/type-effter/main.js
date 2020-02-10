// const TypeWriter = function (txtEle, words, wait = 3000) {
//     this.txtEle = txtEle;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     isDeleting = false;
// }

// // 具体效果方法
// TypeWriter.prototype.type = function() {

//     const current = this.wordIndex % this.words.length;

//     // 获取文本
//     const fullTxt = this.words[current];

//     if(this.isDeleting) {
//         // 删除字符
//         this.txt = fullTxt.substring(0, this.txt.length - 1)
//     } else {
//         this.txt = fullTxt.substring(0, this.txt.length + 1)
//     }

//     //添加字符
//     this.txtEle.innerHTML = `<span class="txt">${this.txt}</span>`;

//     // type 速度
//     let typeSpeed = 300;

//     if(this.isDeleting) {
//         typeSpeed /= 2;
//     }

//     if(!this.isDeleting && this.txt === fullTxt) {
//         typeSpeed = this.wait;
//         this.isDeleting = true;
//     } else if(this.isDeleting && this.txt === '') {
//         this.isDeleting = false;
//         this.wordIndex++;
//         //动画开始之前先暂停
//         typeSpeed = 500;
//     }

//     console.log(current);

//     setTimeout(() => this.type(), 500)
// }

// // 初始化
// document.addEventListener('DOMContentLoaded', init);

// function init() {
//     const txtEle = document.querySelector('.txt-type');
//     const words = JSON.parse(txtEle.getAttribute('data-words'));
//     const wait = txtEle.getAttribute('data-wait');

//     new TypeWriter(txtEle, words, wait);
// }


// Es6 方法

class TypeWriter {
    constructor(txtEle, words, wait = 3000) {
        this.txtEle = txtEle;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        isDeleting = false;
    }

    type () {
        const current = this.wordIndex % this.words.length;

        // 获取文本
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            // 删除字符
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        //添加字符
        this.txtEle.innerHTML = `<span class="txt">${this.txt}</span>`;

        // type 速度
        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            //动画开始之前先暂停
            typeSpeed = 500;
        }

        console.log(current);

        setTimeout(() => this.type(), 500)
        }
}

// 初始化
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtEle = document.querySelector('.txt-type');
    const words = JSON.parse(txtEle.getAttribute('data-words'));
    const wait = txtEle.getAttribute('data-wait');

    new TypeWriter(txtEle, words, wait);
}

