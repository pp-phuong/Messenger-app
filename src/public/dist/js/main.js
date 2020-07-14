$(document).ready(() => {
  $("#emailLogin").submit( async(event) => {
    event.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (!user.emailVerified) {
        throw new Error(" verify email to login ");
      }
      $.ajax({
        url :"/auth/login-email",
        type : "POST",
        data: {
          email,
          password
        },
        success : function(data){
          console.log(data);
          alert(" login success");
          window.location.href = "/";
        }
      })
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });

  $("#emailRegister").submit(async (e) => {
    e.preventDefault();
    const email = $("#email").val();
    const pwd = $("#pwd").val();
    try {
        await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd);
        const user = firebase.auth().currentUser;
        user.sendEmailVerification();
        $.ajax({
        url: "/auth/register-email",
        type: "POST",
        data: {
          email,
          pwd,
        },
        success: function (data) {
          alert(' register success ')
          window.location.href = "/verify-email"
        },
        error: function (xhr, status, err) {
          alert(error);
          window.location.href = "/register";
        }
        });
        } catch (error) {
          console.log(error);
          alert(error);
        }
    
  })

  $("#getcode").click(async (e) => {
    event.preventDefault();

    firebase.auth().languageCode = "it";
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    const phoneNumber = $("#phoneNumber").val();
    const password = $("#password").val();

    $("#recaptcha-container").css("display", "block");

    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      $("#login_step_2").css("display", "block");
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      window.location.href = "/login";
    })
    alert("yes");
    })

  $("#verifycode").submit(async function (event) {
      event.preventDefault();
      const code = $("#code").val();
      try {
            await window.confirmationResult.confirm(code)
        } catch (e) {
            alert("Login failed!,Please check info again");
        }
      $.ajax({
        url: "/register-phone-number",
        type: "POST",
        data: {
          phoneNumber,
          password,
        },
        success: function (result) {
           window.location.href = "/";
        },
        error: function (xhr, status, err) {
           window.location.href = "/login";
        },
        });
    });

});

