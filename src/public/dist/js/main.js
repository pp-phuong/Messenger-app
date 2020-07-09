$(document).ready(() => {
  $("#emailLogin").click(async (e) => {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    alert('yes');
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
         window.location.href("/login");
    }
    window.location.href("/");
  });

  $("#emailRegister").click(async (e) => {
    e.preventDefault();
    const emai = $("#email").val();
    const password = $("#password").val();
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
      window.location.href("/login");
    });
    alert("yes");
    })

    $("#verifycode").submit(function (event) {
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
          window.location.href("/");
        },
        error: function (xhr, status, err) {
          window.location.href("/login");
        },
        });
    });
});

