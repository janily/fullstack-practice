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

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "邮箱地址不正确");
  }
}

function getFieleName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    console.log(input.value);
    if (input.value.trim() === "") {
      console.log(input.id);
      showError(input, `${getFieleName(input)} 不能为空`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieleName(input)} 至少 ${min} 个字符`);
  } else if (input.value.length > max) {
    showError(input, `${getFieleName(input)} 少于 ${max} 个字符`);
  } else {
    showSuccess(input);
  }
}

function checkPasswordMath(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "密码不匹配");
  }
}

//事件
form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(username.value);

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMath(password, password2);
});
