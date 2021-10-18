var myLiffId = "1656403121-083ndwkD";
initializeLiff(myLiffId);
function initializeLiff(myLiffId) {
  let userId;
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      let myModal = new bootstrap.Modal(document.getElementById("myModal"));
      liff
        .getProfile()
        .then((profile) => {
          userId = profile.userId;
        })
        .catch((err) => {
          console.log("error", err);
        });
      let firstWheel = new Winwheel({
        drawMode: "image", // drawMode must be set to image.
        numSegments: 9, // The number of segments must be specified.
        // Pass in segment parameters (text is optional, not displayed).
        segments: [
          { text: "15經驗值", size: 45 },
          { text: "15經驗值", size: 45 }, // 30 degrees size.
          { text: "再接再厲", size: 45 },
          { text: "精美小禮物", size: 22 }, // 15 degrees.
          { text: "10點經驗值", size: 45 },
          { text: "再轉一次", size: 45 }, // 30 degrees size.
          { text: "5點經驗值", size: 46 },
          { text: "100經驗值", size: 22 },
          { text: "再轉一次", size: 45 },
        ],
        animation: {
          type: "spinToStop",
          duration: 5, // Duration in seconds.
          spins: 3, // Default number of complete spins.
          callbackFinished: alertPrize,
          callbackSound: playSound, // Function to call when the tick sound is to be triggered.
          soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
        },
      });

      let firstImg = new Image();

      // Create callback to execute once the image has finished loading.
      firstImg.onload = function () {
        firstWheel.wheelImage = firstImg; // Make wheelImage equal the loaded image object.
        firstWheel.draw(); // Also call draw function to render the wheel.
      };

      firstImg.src = "./asset/board3.png";
      let audio = new Audio("./asset/tick.mp3");

      function playSound() {
        // Stop and rewind the sound if it already happens to be playing.
        audio.pause();
        audio.currentTime = 0;

        // Play the sound.
        audio.play();
      }

      // Vars used by the code in this page to do power controls.
      let wheelPower = 0;
      let wheelSpinning = false;

      async function startSpin() {
        if (wheelSpinning == false) {
          let stopAt;
          firstWheel.animation.spins = 5;
          /* let stopAt = 1 + Math.floor(Math.random() * 43); */ //決定獎勵位置
          const data = {
            userId: userId, //liff.getProfile
          };
          await fetch("https://line-liff-roulette.herokuapp.com/getResult", {
            //Url
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log(res);
              return res.json();
            })
            .then((val) => {
              console.log(val.data);
              stopAt = firstWheel.getRandomForSegment(val.data);
            });

          firstWheel.animation.stopAngle = stopAt;
          firstWheel.startAnimation();

          wheelSpinning = true;
        }
      }

      // -------------------------------------------------------
      // Function for reset button.
      // -------------------------------------------------------
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

        if (indicatedSegment.text != "再轉一次") {
          liff
            .sendMessages([
              {
                type: "text",
                text: `恭喜您獲得 ${indicatedSegment.text}`,
              },
            ])
            .then(function () {
              console.log(indicatedSegment.text);
            })
            .catch(function (error) {
              window.alert("Error sending message: " + error);
            });
        }
        if (indicatedSegment.text == "再轉一次") {
          resetWheel();
        } else {
          $("#myModal").on("hidden.bs.modal", function () {
            liff.closeWindow();
          });
        }
        myModal.show();

        //resetWheel();
        /* liff.closeWindow(); */
      }

      /*       $("#starRouletteBox").on("click", handleEvent()); */
      function handleEvent() {
        startSpin();
      }
      $("#starRouletteBox").click(function () {
        handleEvent();
      });
      // start to use LIFF's api
    })
    .catch((err) => {});
}
