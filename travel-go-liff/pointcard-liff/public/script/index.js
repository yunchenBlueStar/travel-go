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
      const checkPosition = [
        [92, 100],
        [92, 220],
        [163, 50],
        [163, 161],
        [163, 271],
        [323, 116],
        [323, 208],
        [391, 70],
        [391, 163],
        [391, 252],
        [567, 108],
        [567, 204],
        [643, 67],
        [643, 158],
        [643, 250],
      ];
      addConfirm(checkPosition[1][0], checkPosition[1][1]);
      // fetch("https://travel-go-line-bot-2.herokuapp.com/pointcard/", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((result) => {
      //     console.log(result);
      //   });
    });
}
function addConfirm(top, left) {
  $("#main").append(
    `<div class="confirm" style="top: ${top}px; left: ${left}px"></div>`
  );
}
