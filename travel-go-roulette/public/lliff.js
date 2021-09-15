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
          { text: "15經驗值", size: 44 },
          { text: "15經驗值", size: 45 }, // 30 degrees size.
          { text: "再接再厲", size: 45 },
          { text: "10點linePoint", size: 23 }, // 15 degrees.
          { text: "10點經驗值", size: 44 },
          { text: "再轉一次", size: 45 }, // 30 degrees size.
          { text: "1點linePoint", size: 46 },
          { text: "100經驗值", size: 23 },
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

      // Create new image object in memory.
      let firstImg = new Image();

      // Create callback to execute once the image has finished loading.
      firstImg.onload = function () {
        firstWheel.wheelImage = firstImg; // Make wheelImage equal the loaded image object.
        firstWheel.draw(); // Also call draw function to render the wheel.
      };

      // Set the image source, once complete this will trigger the onLoad callback (above).
      firstImg.src = "roulette.png";

      //----------------------------------------------------------------------------------------------------------
      /* let theWheel = new Winwheel({
        outerRadius: 212, // Set outer radius so wheel fits inside the background.
        innerRadius: 75, // Make wheel hollow so segments don't go all way to center.
        textFontSize: 24, // Set default font size for the segments.
        textOrientation: "vertical", // Make text vertial so goes down from the outside of wheel.
        textAlignment: "outer", // Align text to outside of wheel.
        numSegments: 9, // Specify number of segments.
        // Define segments including colour and text.
        segments: [
          // font size and test colour overridden on backrupt segments.
          { fillStyle: "#f6989d", text: "再來一次" },
          { fillStyle: "#f26522", text: "沒有中唷" },
          { fillStyle: "#3cb878", text: "LinePoint 100點", textFontSize: 9 },
          {
            fillStyle: "#000000",
            text: "BANKRUPT",
            textFontSize: 16,
            textFillStyle: "#ffffff",
          },
          { fillStyle: "#a186be", text: "獲得任務 X 1", textFontSize: 16 },
          { fillStyle: "#fff200", text: "700" },
          { fillStyle: "#00aef0", text: "800" },
          { fillStyle: "#ffffff", text: "LOOSE TURN", textFontSize: 12 },
        ],
        // Specify the animation to use.
        animation: {
          type: "spinToStop",
          duration: 10, // Duration in seconds.
          spins: 3, // Default number of complete spins.
          callbackFinished: alertPrize,
          callbackSound: playSound, // Function to call when the tick sound is to be triggered.
          soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
        },
        // Turn pins on.
        pins: {
          number: 8,
          fillStyle: "silver",
          outerRadius: 5,
        },
      }); */
      // Loads the tick audio sound in to an audio object.
      let audio = new Audio("./tick.mp3");

      // This function is called when the sound is to be played.
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
          await fetch("/getResult", {
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

      // -------------------------------------------------------
      // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
      // -------------------------------------------------------
      async function alertPrize(indicatedSegment) {
        let content = (document
          .getElementById("myModal")
          .getElementsByClassName("modal-title")[0].innerHTML =
          indicatedSegment.text);
        liff
          .sendMessages([
            {
              type: "text",
              text: `恭喜您獲得 ${indicatedSegment.text}`,
            },
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log("error", err);
          });
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

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var cx = firstWheel.centerX;
      var cy = firstWheel.centerY;
      var r = 150;
      ctx.fillStyle = "#3370d4";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
      function handleEvent(e) {
        var evt = e ? e : window.event;
        clickX = evt.layerX;
        clickY = evt.layerY;
        var dx = cx - clickX;
        var dy = cy - clickY;
        if (dx * dx + dy * dy <= r * r) {
          startSpin();
        }
        return false;
      }
      canvas.addEventListener("click", handleEvent);
      // start to use LIFF's api
    })
    .catch((err) => {});
}
