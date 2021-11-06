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
        .then((profile) => {
          userId = profile.userId;
        })
        .catch((err) => {
          console.log(err);
        });
      document.getElementById("test").innerHTML = userId;
      const allImageId = [
        "Beipu_1",
        "Beipu_2",
        "Beipu_3",
        "Beipu_4",
        "Beipu_5",
        "Historic_1",
        "Historic_2",
        "Historic_3",
        "Historic_4",
        "Historic_5",
        "Mud_1",
        "Mud_2",
        "Mud_3",
        "Mud_4",
        "Mud_5",
      ];
      showDisplay(allImageId[0]);
      // fetch("https://travel-go-line-bot-2.herokuapp.com/pointcard/getResult", {
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
function showDisplay(Tag) {
  $(`#${Tag}`).css("display", "block");
}
