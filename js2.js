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

  // inputNullCheck(forms) &&
  //   rejectValue(forms) &&
  //   matchingPassword() &&
  //   necessaryTerms(forms) &&
  //   saveValue();

  inputValidationCheck(forms)

  // function rejectValue(forms) {
  //   let pass = 0;
  //   const reject = {
  //     userName: /^[가-힣]{2,4}$/,
  //     userEmail: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  //     userPassword: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,24}$/,
  //   };
  //   const rejectText = {
  //     userName: "* 국문 2자이상 14자 이하로 입력하세요",
  //     userEmail: "* 이메일 양식을 확인하세요",
  //     userPassword:
  //       "* 영문 소/대문자,숫자,특수문자 중 2가지 이상 조합하여 8자 이상으로 입력하세요",
  //   };

  //   for (let i = 0; i < forms.length; i++) {
  //     let element = forms.elements[i];

  //     if (reject[element.id] !== undefined) {
  //       if (reject[element.id].test(element.value)) {
  //         element.parentNode.classList.remove("err");
  //       } else {
  //         element.parentNode.classList.add("err");
  //         element.nextElementSibling.innerHTML = rejectText[element.id];
  //         element.focus();
  //         ++pass;
  //       }
  //     } else {
  //       element.parentNode.classList.remove("err");
  //     }
  //   }
  //   return pass > 0 ? false : true;
  // }

  function matchingPassword() {
    const password = document.getElementById("userPassword");
    const passwordCheck = document.getElementById("checkPw");

    if (password.value === passwordCheck.value) {
      passwordCheck.parentNode.classList.remove("err");
      return true;
    } else {
      passwordCheck.parentNode.classList.add("err");
      passwordCheck.nextElementSibling.innerHTML =
        "* 비밀번호가 일치하지 않습니다";
      passwordCheck.focus();
      return false;
    }
  }

  function necessaryTerms(forms) {
    let pass = 0;

    for (let i = 0; i < forms.length; i++) {
      let element = forms.elements[i];

      if (element.type === "checkbox" && element.required) {
        if (!element.checked) {
          alert("약관에 동의 해주세요");
          ++pass;
          break;
        }
      }
    }
    return pass > 0 ? false : true;
  }

  function saveValue() {
    const userData = {
      name: document.getElementById("userName").value,
      id: document.getElementById("userEmail").value,
      password: document.getElementById("userPassword").value,
    };
    console.log(userData);
  }
};


function inputValidationCheck(forms) {
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

  return inputNullCheck(forms, () => {
    if (reject[element.id] && element.value !== "") {
      if (reject[element.id].test(element.value)) {
        element.parentNode.classList.remove("err");
        return false;
      }

      element.parentNode.classList.add("err");
      element.nextElementSibling.innerHTML = rejectText[element.id];
      element.focus();
      return true;
    }
  })
}

function inputNullCheck(forms, additionalReject) {
  return [ ...forms.elements ].filter((element) => {

    if (additionalReject){}
    console.log("123123")
      return additionalReject()

      if (
        element.value === "" &&
        element.nodeName === "INPUT" &&
        element.required
      ) {
        element.parentNode.classList.remove("err");
        element.parentNode.classList.add("err");
        element.nextElementSibling.innerHTML = "* 필수 항목을 입력하세요";
        return true;
      } else {
        element.parentNode.classList.remove("err");
      }

    return false;
  }).length == 0
}

function inputNullCheck(forms) {
  // let pass = true;

  // for (let i = 0; i < forms.length; i++) {
  //   let element = forms.elements[i];

  //   if (
  //     element.value === "" &&
  //     element.nodeName === "INPUT" &&
  //     element.required
  //   ) {
  //     element.parentNode.classList.add("err");
  //     element.nextElementSibling.innerHTML = "* 필수 항목을 입력하세요";
  //     pass = false;
  //   } else {
  //     element.parentNode.classList.remove("err");
  //   }
  // }

  // return pass > 0 ? false : true; 

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

  return [ ...forms.elements ].filter((element) => {
    if (reject[element.id] && element.value !== "") {
      if (reject[element.id].test(element.value)) {
        element.parentNode.classList.remove("err");
        return false;
      }

      element.parentNode.classList.add("err");
      element.nextElementSibling.innerHTML = rejectText[element.id];
      element.focus();
      return true;
    }

      if (
        element.value === "" &&
        element.nodeName === "INPUT" &&
        element.required
      ) {
        element.parentNode.classList.remove("err");
        element.parentNode.classList.add("err");
        element.nextElementSibling.innerHTML = "* 필수 항목을 입력하세요";
        return true;
      } else {
        element.parentNode.classList.remove("err");
      }

    return false;
  }).length == 0
}

const loginHandler = () => {
  const forms = document.getElementById("loginForm");
  const userData = {
    id: "123@qwer.q",
    name: "박내은",
    password: "1234qwer",
  };

  inputNullCheck(forms) && login();

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
};
