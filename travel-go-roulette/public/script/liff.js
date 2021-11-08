var myLiffId = "1656403121-083ndwkD";
$(document).ready(function () {
  initializeLiff(myLiffId);
});
async function initializeLiff(myLiffId) {
  await liff
    .init({
      liffId: myLiffId,
    })
    .then(async () => {
      let userId;
      let myModal = new bootstrap.Modal(document.getElementById("myModal"));
      let stopAt = 0;
      let isTrigger = false;
      let lotCount;
      // if (!liff.isLoggedIn()) {
      //   liff.login();
      // }
      await liff
        .getProfile()
        .then((profile) => {
          console.log(profile);
          userId = profile.userId;
        })
        .catch((err) => {
          console.log("error", err);
        });
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
      const db = firebase.database();
      db.ref("users")
        .child(`U7617848f47286749eec2d3faa45f9a8e`)
        .on("value", (snap) => {
          lotCount = snap.val().lot;
          document.getElementById("message").innerHTML =
            "剩餘次數 : " + snap.val().lot + " 次";
        });

      const FinalPrice = async () => {
        const data = {
          userId: userId, //liff.getProfile
        };
        await fetch(
          "https://travel-go-line-bot-2.herokuapp.com/roulette/getResult",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((val) => {
            console.log("val.data", val.data);
            stopAt = val.data;
          });
        return stopAt;
      };

      let firstWheel = new Winwheel({
        canvasId: "canvas",
        drawMode: "image", // drawMode must be set to image.
        numSegments: 9, // The number of segments must be specified.
        lineWidth: 1,
        strokeStyle: "red",
        segments: [
          { text: "100經驗值", size: 45 },
          { text: "再接再厲", size: 45 }, // 30 degrees size.
          { text: "15經驗值", size: 45 },
          { text: "精美小禮物", size: 22 }, // 15 degrees.
          { text: "15點經驗值", size: 45 },
          { text: "10點LinePoint", size: 45 }, // 30 degrees size.
          { text: "5點經驗值", size: 46 },
          { text: "10點LinePoint", size: 22 },
          { text: "再接再厲", size: 45 },
        ],
        animation: {
          type: "spinToStop",
          duration: 5, // Duration in seconds.
          spins: 16, // Default number of complete spins.
          callbackFinished: alertPrize,
          callbackSound: playSound, // Function to call when the tick sound is to be triggered.
          soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
        },
      });

      let firstImg = new Image();
      firstImg.onload = function () {
        firstWheel.wheelImage = firstImg; // Make wheelImage equal the loaded image object.
        firstWheel.draw(); // Also call draw function to render the wheel.
      };

      firstImg.src = "./asset/picture.png";
      let audio = new Audio("./asset/tick.mp3");

      function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
      let wheelSpinning = false;

      async function startSpin(priceNumber) {
        if (wheelSpinning == false) {
          firstWheel.animation.type = "spinToStop";
          let priceAngle = 0;
          firstWheel.animation.spins = 15;
          priceAngle = firstWheel.getRandomForSegment(priceNumber);
          firstWheel.animation.stopAngle = priceAngle;
          firstWheel.startAnimation();
          wheelSpinning = true;
        }
      }
      function resetWheel() {
        firstWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
        firstWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
        firstWheel.draw(); // Call draw to render changes to the wheel.

        wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
      }
      async function alertPrize(indicatedSegment) {
        let content = (document
          .getElementById("myModal")
          .getElementsByClassName("modal-title")[0].innerHTML =
          indicatedSegment.text);

        if (indicatedSegment.text != "再接再厲") {
          const data = {
            userId: userId,
            message: [
              {
                type: "text",
                text: `恭喜您獲得 ${indicatedSegment.text}`,
              },
            ],
            price: indicatedSegment.text,
          };
          await fetch(
            "https://travel-go-line-bot-2.herokuapp.com/roulette/sendMessage",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            }
          );
          // liff
          //   .sendMessages([
          //     {
          //       type: "text",
          //       text: `恭喜您獲得 ${indicatedSegment.text}`,
          //     },
          //   ])
          //   .then(function () {
          //     console.log(indicatedSegment.text);
          //   })
          //   .catch(function (error) {
          //     window.alert("Error sending message: " + error);
          //   });
        }
        if (indicatedSegment.text == "再轉一次") {
          isTrigger = false;
          resetWheel();
        } else {
          $("#myModal").on("hidden.bs.modal", function () {
            liff.closeWindow();
          });
        }
        myModal.show();
      }

      function handleEvent() {
        // firstWheel.animation.type = "spinOngoing";
        firstWheel.startAnimation();
        Promise.resolve(FinalPrice()).then(() => {
          startSpin(stopAt);
        });
      }
      $("#starRouletteBox").click(function () {
        if (lotCount) {
          if (!isTrigger) {
            isTrigger = true;
            handleEvent();
          }
        }
      });
    })
    .catch((err) => {});
}
