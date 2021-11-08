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

      console.log("connected");
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
      const config = {
        apiKey: "AIzaSyAnQics4mIzFLToKrCoYfpsKdIZRePTwYc",
        authDomain: "travel-rego.firebaseapp.com",
        databaseURL:
          "https://travel-rego-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "travel-rego",
        storageBucket: "travel-rego.appspot.com",
        messagingSenderId: "839348279102",
        appId: "1:839348279102:web:5617912d8faa8fac57fe6f",
        measurementId: "G-RLKYS49627",
      };
      firebase.initializeApp(config);
      const realtime = firebase.database();
      const firestore = firebase.firestore();
      realtime
        .ref("users")
        .child(`${userId}`)
        .on("value", (snap) => {
          for (let i = 0; i < snap.val().shop.length; i++) {
            if (snap.val().shop[i]) {
              switch (i) {
                case 1:
                  showDisplay(allImageId[1]);
                  break;
                case 2:
                  showDisplay(allImageId[2]);
                  break;
                case 4:
                  showDisplay(allImageId[3]);
                  break;
                case 6:
                  showDisplay(allImageId[0]);
                  break;
              }
            }
          }
          for (let i = 0; i < snap.val().site.length; i++) {
            if (snap.val().site[i]) {
              switch (i) {
                case 1:
                  showDisplay(allImageId[8]);
                  break;
                case 2:
                  showDisplay(allImageId[7]);
                  break;
                case 3:
                  showDisplay(allImageId[9]);
                  break;
                case 4:
                  showDisplay(allImageId[6]);
                  break;
                case 5:
                  showDisplay(allImageId[5]);
                  break;
              }
            }
          }
        });

      firestore.collection("Shop").onSnapshot((snap) => {
        snap.docs.map((x) => {
          console.log(x.data());
          for (let i = 0; i < x.data().userList.length; i++) {
            if (x.data().userList[i].userId == userId) {
              switch (x.data().beaconId) {
                case "31":
                  showDisplay(allImageId[10]);
                  break;
                case "38":
                  showDisplay(allImageId[11]);
                  break;
                case "41":
                  showDisplay(allImageId[12]);
                  break;
                case "47":
                  showDisplay(allImageId[13]);
                  break;
                case "50":
                  showDisplay(allImageId[14]);
                  break;
              }
            }
          }
        });
      });
    });
}
function showDisplay(Tag) {
  $(`#${Tag}`).css("display", "block");
}
