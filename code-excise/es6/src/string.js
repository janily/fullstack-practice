//字符串模板
// let janily = 'janilychen';
// let blog = `<b>keep moving</b>${janily},fighting!!!`
// console.log(blog);
// document.write(blog);

// 字符串查找
let janily = 'janilychen';
let blog = `<b>keep moving</b>${janily},fighting!!!`
console.log(blog.indexOf(janily));  //es5

console.log(blog.includes(janily));  //es6

console.log(blog.startsWith(janily));  //判断开头

console.log(blog.endsWith(janily));  //判断结尾

console.log('janily|'.repeat(3));
// document.write('janily'.repeat(3));   //网页文本处理