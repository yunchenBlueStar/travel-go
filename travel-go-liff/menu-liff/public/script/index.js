var myLiffId = "1656403121-eQ0gQm1R";
$(document).ready(() => {
  initializeLiff(myLiffId);
  console.log(checkPosition);
});
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      let userId;
    });
}
