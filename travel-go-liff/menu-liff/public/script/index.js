var myLiffId = "1656403121-eQ0gQm1R";
$(document).ready(() => {
  initializeLiff(myLiffId);
  // console.log(checkPosition);
});
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      let userId;
      $(".roulette").click(() => {
        liff.openWindow({
          url: "https://liff.line.me/1656403121-083ndwkD",
          external: true,
        });
        liff.closeWindow();
      });
      $(".pointCard").click(() => {
        liff.openWindow({
          url: "https://liff.line.me/1656403121-7dQlVv8P",
          external: true,
        });
        liff.closeWindow();
      });
    });
}
