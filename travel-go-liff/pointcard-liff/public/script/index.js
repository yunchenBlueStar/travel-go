// liff id 1656403121-7dQlVv8P
var myLiffId = "1656403121-7dQlVv8P";
$(document).ready(() => {
  initializeLiff(myLiffId);
});
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      let userId;
      liff
        .getProfile()
        .then(() => {
          userId = profile.userId;
        })
        .catch((err) => {
          console.log(err);
        });
    });
}
function myFunction() {
  alert("click");
}
