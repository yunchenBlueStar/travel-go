var myLiffId = "1656403121-eQ0gQm1R";
$(document).ready(() => {
  initializeLiff(myLiffId);
  // console.log(checkPosition);
});
async function initializeLiff(myLiffId) {
  await liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      let userId;
      $(".roulette").click(() => {
        liff.openWindow({
          url: "https://liff.line.me/1656403121-083ndwkD",
          external: false,
        });
        liff.closeWindow();
      });
      $(".pointCard").click(() => {
        liff.openWindow({
          url: "https://liff.line.me/1656403121-7dQlVv8P",
          external: false,
        });
        liff.closeWindow();
      });
    });
}
