const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//验证信息提示方法
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//事件
form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(username.value);

  if (username.value === " ") {
    // alert("");
    showError(username, "请填写用户名");
  } else {
    showSuccess(username);
  }

  if (email.value === " ") {
    // alert("");
    showError(email, "请填写邮箱地址");
  } else if (!checkEmail(email.value)) {
    showError(email, "请填写正确的邮箱地址");
  } else {
    showSuccess(email);
  }

  if (password.value === " ") {
    // alert("");
    showError(password, "请填写密码");
  } else {
    showSuccess(password);
  }
  if (password2.value === " ") {
    // alert("");
    showError(password2, "请确认密码");
  } else {
    showSuccess(password2);
  }
});
