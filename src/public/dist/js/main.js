// window.addEventListener("DOMContentLoaded", (event) => {
//   const btnRegisterEmail = document.getElementById("btnRegisterEmail");
//   if (btnRegisterEmail) {
//     btnRegisterEmail.addEventListener("click", (e) => {
//       console.log("click man");
//       e.preventDefault();
//       const firstNameRegisterEmail = document.getElementById(
//         "firstNameRegisterEmail"
//       ).value;
//       console.log(firstNameRegisterEmail);
//       $.ajax({
//         url: "/register-email",
//         type: "POST",
//         data: {
//           firstNameRegisterEmail,
//         },
//         success: function (result) {
//           alert(result);
//         },
//       });
//     });
//   }
// });
