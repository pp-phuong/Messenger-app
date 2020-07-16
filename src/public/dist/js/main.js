$(document).ready(() => {
  $("#emailLogin").submit(async (event) => {
    event.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      console.log(user.emailVerified);
      if (!user.emailVerified) {
        swal("Login failed!", "verify email to login ", "error");
        return;
      }
      $.ajax({
        url: "/auth/login-email",
        type: "POST",
        data: {
          email,
          password,
        },
        success: function (data) {
          console.log(data);
          swal("Login success !", " Wait a minute ...", "success");
          window.location.href = "/";
        },
        error: function (xhr, status, err) {
          swal("Login failed!", err.message, "error");
          return;
        },
      });
    } catch (error) {
      swal("Something wrong !", error.message, "error");
      return;
    }
  });

  $("#emailRegister").submit(async (e) => {
    e.preventDefault();
    const email = $("#email").val();
    const pwd = $("#pwd").val();
    console.log(email + pwd);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pwd);
      const user = firebase.auth().currentUser;
      user.sendEmailVerification();
      $.ajax({
        url: "/auth/register-email",
        type: "POST",
        data: {
          email,
          pwd,
        },
        success: function () {
          swal("OK!", "Register success - Please wait a minutes", "success");
          window.location.href = "/verify-email";
        },
        error: function (xhr, status, err) {
          swal("Register failed!", err.message, "error");
          return;
        },
      });
    } catch (error) {
      swal("Register failed!", error.message, "error");
      return;
    }
  });
});

$(document).ready(function () {
  $("#login_step_1").submit(function (event) {
    event.preventDefault();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const phoneNumber = $("#phoneNumber").val();
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        $("#login_step_2").css("display", "block");
        $("#login_step_2").submit(function (event) {
          event.preventDefault();
          $.ajax({
            url: "/auth/register-phone-number",
            type: "POST",
            data: {
              phoneNumber,
            },
            success: function (result) {
              swal("Success !", "Wait a minute ...", "success");
            },
            error: function (error) {
              swal("Something wrong !", error.message, "error");
            },
          });
          const code = $("#code").val();
          confirmationResult
            .confirm(code)
            .then(function (result) {
              var user = result.user;
              console.log(user);
            })
            .catch(function (error) {
              swal("Something wrong !", error.message, "error");
            });
        });
      })
      .catch(function (error) {
        swal("Something wrong !", error.message, "error");
      });
  });
});
