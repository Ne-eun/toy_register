function toggleSideNav() {
  const sideNav = document.getElementsByClassName("side_nav")[0];
  if (sideNav.style.left == "0px") {
    sideNav.style.left = "100%";
  } else if (sideNav.style.left == "100%") {
    sideNav.style.left = 0;
  }
}

const registerSubmitHandler = () => {
  const forms = document.getElementById("registerForm");
  registerValidation(forms) && matchingPassword() && isAgreeTerms(forms) && saveValue();
  
  function registerValidation(forms) {
    return [ ...forms.elements ].filter(element =>
      hasInputData(element) ? !isValid(element) : true
    ).length == 0
  }
  
  function matchingPassword() {
    const password = document.getElementById("userPassword");
    const passwordCheck = document.getElementById("checkPw");
    
    if (password.value !== passwordCheck.value) {
      passwordCheck.parentNode.classList.add("err");
      passwordCheck.nextElementSibling.innerHTML =
      "* 비밀번호가 일치하지 않습니다";
      return false;
    }
    passwordCheck.parentNode.classList.remove("err");
    return true
  }
  
  function saveValue() {
    const userData = {
      name: document.getElementById("userName").value,
      id: document.getElementById("userEmail").value,
      password: document.getElementById("userPassword").value,
    };
    console.log(userData);
  }
}

function isAgreeTerms(forms) {
  return [ ...forms.elements ].filter(element => {
    if (element.type === "checkbox" && element.required && !element.checked) {
      return true
    }
  }).length == 0 ? true : alert('필수약관에 동의해야 가입이 완료됩니다.') 
}

function hasInputData(element) {
  element.parentNode.classList.remove("err");
  if (
    element.value === "" &&
    element.nodeName === "INPUT" &&
    element.required
  ) {
    element.parentNode.classList.add("err");
    element.nextElementSibling.innerHTML = "* 필수 항목을 입력하세요";
    return false;
  }
  return true;
};

function isValid(element) {
  const reject = {
    userName: /^[가-힣]{2,4}$/,
    userEmail: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
    userPassword: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,24}$/,
  };
  const rejectText = {
    userName: "* 국문 2자이상 14자 이하로 입력하세요",
    userEmail: "* 이메일 양식을 확인하세요",
    userPassword:
      "* 영문 소/대문자,숫자,특수문자 중 2가지 이상 조합하여 8자 이상으로 입력하세요",
  };

  if (reject[element.id]) {
    if (reject[element.id].test(element.value)) {
      element.parentNode.classList.remove("err");
      return true;
    }
    element.parentNode.classList.add("err");
    element.nextElementSibling.innerHTML = rejectText[element.id];
    element.focus();
    return false;
  }
  return true;
}

const loginHandler = () => {
  const forms = document.getElementById("loginForm");
  const userData = {
    id: "123@qwer.q",
    name: "박내은",
    password: "1234qwer",
  };

  [...forms.elements].filter(element => {
    !hasInputData(forms)
  }).length == 0 && login(); 

  function login() {
    const userId = document.getElementById("userId").value;
    const userPassword = document.getElementById("userPassword").value;

    if (userId === userData.id && userPassword === userData.password) {
      alert(`환영합니다. ${userData.name}님`);
      window.location.replace("/");
    } else {
      console.log(userId);
      console.log(userPassword);
      alert("아이디 또는 비밀번호를 확인하세요");
    }
  }
}
