var myLiffId = "1656403121-7dQlVv8P";
$(document).ready(() => {
  initializeLiff(myLiffId);
});
async function initializeLiff(myLiffId) {
  await liff
    .init({
      liffId: myLiffId,
    })
    .then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
      let userId;
      await liff
        .getProfile()
        .then((profile) => {
          userId = profile.userId;
          console.log(profile);
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
      // showDisplay(allImageId[0]);
      await fetch(
        `https://travel-go-line-bot-2.herokuapp.com/pointcard/getResult?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => {
          console.log(err);
        });
    });
}
function showDisplay(Tag) {
  $(`#${Tag}`).css("display", "block");
}
function hideDisplay(Tag) {
  $(`#${Tag}`).css("display", "none");
}
