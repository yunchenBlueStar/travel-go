<template>
  <div class="home">
    <div class="theNav">
      <img
        style="width: 100%;"
        src="https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/banner%20test1.png?alt=media&token=d1d0d115-91c2-4658-90de-9add492c2d8c"
      />
    </div>
    <div class="page_padding imgMakerBody " style="margin-top: -2%;">
      <!-- <div class="bgDiv">
        <div class="bgDivInner"></div>
      </div> -->
      <img
        src="../assets/bg-plane-1.png"
        class="planeImg"
        style="width: 30%;position: absolute;right: 10%;"
      />
      <!-- 選擇風格路線 -->
      <div class="select " style="text-align: left;">
        <h2>1. 選擇風格路線</h2>
        <!-- {{ checkState.styleChecked }} -->
        <div class="streeStyleBox section_overflowScroll_box">
          <van-radio-group
            style="margin-top: 1.5rem; display: inline-flex"
            v-model="checkState.styleChecked"
            @change="styleCheckedChange"
            class="streeStyleRadioGroup"
          >
            <van-radio
              style="margin-right: 5%;"
              :name="index"
              v-for="(data, index) in imgStyle"
              :key="index"
              ><span
                :class="
                  checkState.styleChecked == index
                    ? 'border_color_lightGreen setion_display_box'
                    : 'border_color_lightgray setion_display_box'
                "
              >
                <div style="width: 10%; margin-right: 5%;">
                  <img
                    :src="data.src"
                    style="width: 100%; border-radius: 20px;"
                  />
                </div>
                <div style="width: 85%; margin: auto 0;">
                  {{ data.text }}
                </div></span
              ></van-radio
            >
          </van-radio-group>
        </div>
      </div>
      <!-- 選擇風格路線 -->
      <!-- 選擇路線樣板 -->
      <div class="select" style="text-align: left;">
        <h2>2. 選擇路線樣板</h2>
        <!-- {{ checkState.routeTemplateChecked }} -->
        <van-radio-group
          v-model="checkState.routeTemplateChecked"
          direction="horizontal"
        >
          <van-radio
            :name="index"
            v-for="(data, index) in routeTemplate[checkState.styleChecked]"
            :key="index"
            style="width: 45%"
          >
            <!-- {{ data.limit }} -->
            <img
              :src="data.src"
              :class="
                checkState.routeTemplateChecked == index
                  ? 'border_color_lightGreen'
                  : 'border_color_lightgray'
              "
          /></van-radio>
        </van-radio-group>
      </div>
      <!-- 選擇路線樣板 -->
      <!-- 上傳圖片 -->
      <div class="select" style="text-align: left;">
        <h2>3. 上傳圖片</h2>
        <div class="imgUploadListOuterBox  section_overflowScroll_box">
          <div class="section_display-InlineFlex_box">
            <div
              v-for="(limitData, index) in routeTemplate[
                checkState.styleChecked
              ][checkState.routeTemplateChecked].limit"
              :key="index"
              style="padding-right: 5%; width: 150px"
            >
              <p>{{ index + 1 }}.</p>
              <label :for="`imgUploadInput${index}`">
                <div>
                  <img
                    :id="`imgUpload${index}`"
                    src="../assets/add.png"
                    :class="
                      checkState.fileList[checkState.uploadImgIndex] != ''
                        ? 'templateImg'
                        : ''
                    "
                    style="width: 25%;"
                  />
                </div>
              </label>
              <input
                type="file"
                name="image"
                :id="`imgUploadInput${index}`"
                accept="image/*"
                style="display: none;"
                @change="setImage"
                @click="uploadImgIndex(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <van-dialog
          v-model:show="checkState.cropperShow"
          title="請裁切選擇的圖片"
          show-cancel-button
          width="80%"
          confirmButtonText="確認"
          @cancel="cancelCrop"
          @confirm="cropImage"
        >
          <div style="border: 1px solid gray; display: inline-block;">
            <vue-cropper
              ref="cropper"
              drag-mode="crop"
              :cropBoxResizable="false"
              :background="true"
              :rotatable="false"
              :zoomable="false"
              :scalable="false"
              :guides="true"
              :highlight="false"
              :viewMode="3"
              :autoCropArea="0.5"
              :src="checkState.imgSrc"
              :aspectRatio="
                routeTemplate[checkState.styleChecked][
                  checkState.routeTemplateChecked
                ].aspectRatio[checkState.uploadImgIndex].x /
                  routeTemplate[checkState.styleChecked][
                    checkState.routeTemplateChecked
                  ].aspectRatio[checkState.uploadImgIndex].y
              "
              alt="Source Image"
            ></vue-cropper>
          </div>
        </van-dialog>
      </div>
      <!-- 上傳圖片 -->
      <img
        :src="checkState.cropImg"
        style="border: 1px solid lightgray; width: 50%;"
      />
      <!-- 預覽圖片 -->
      <div class="select" style="text-align: left;">
        <h2>4. 預覽圖片</h2>
        <div style="text-align: center">
          <img
            id="previewImg"
            :src="
              routeTemplate[checkState.styleChecked][
                checkState.routeTemplateChecked
              ].src
            "
            style="width: 80%; border: 1px solid  #c8c8c8; border-radius: 10px"
            class="showImg"
          />
        </div>
      </div>
      <!-- 預覽圖片 -->
      <!-- footer -->
      <div class="setion_display_box marginTop_1rem">
        <div class="setion_display_box section_half_box">
          <div style="width: 20%; margin-right: 5%;">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E6%97%85GO.jpg?alt=media&token=c10e4914-637b-40d1-ab6a-8821fd425717"
              style="width: 95%;border-radius: 50%;border: 1px solid #c8c8c8;"
            />
          </div>
          <div style="width: 20%;">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/JDLogo.jpg?alt=media&token=4c27ff16-e8de-406f-a881-23d9e0d0e694"
              style="width: 95%;border-radius: 50%;border: 1px solid #c8c8c8;"
            />
          </div>
        </div>
        <div class="section_half_box" style="text-align: right;">
          <van-button
            plain
            type="primary"
            style="border-radius: 5px; background-color: rgb(21, 175, 149); color: white; border-color: rgb(21, 175, 149); font-weight: bold;"
            size="small"
            @click="uploadImg"
            >確定送出</van-button
          >
        </div>
      </div>
      <!-- footer -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import mergeImages from "merge-images";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as firebaseStorageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import liff from "@line/liff";
import { Toast } from "vant";
// import imageToBase64 from "image-to-base64/browser";
import { ref, watch, onMounted } from "vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    VueCropper,
  },
  methods: {
    setImage(e) {
      try {
        // console.log(247, this.$refs.cropper);
        const file = e.target.files[0];
        console.log(file);
        if (!file.type.includes("image/")) {
          console.log("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = (event) => {
            console.log(259, this.$refs.cropper.destroy());
            this.checkState.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result).setData({
              width: this.routeTemplate[this.checkState.styleChecked][
                this.checkState.routeTemplateChecked
              ].cropImgData[this.checkState.uploadImgIndex].width,
              height: this.routeTemplate[this.checkState.styleChecked][
                this.checkState.routeTemplateChecked
              ].cropImgData[this.checkState.uploadImgIndex].height,
            });
            // console.log(258, this.$refs.cropper.destroy());
          };
          reader.readAsDataURL(file);
        } else {
          console.log("Sorry, FileReader API not supported");
        }
        this.checkState.cropperShow = true;
      } catch (error) {
        console.log(error);
      }
    },
    cropImage() {
      try {
        this.checkState.cropperShow = false;
        // get image data for post processing, e.g. upload or setting image src
        this.checkState.cropImg = this.$refs.cropper
          .getCroppedCanvas({
            width: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].width,
            height: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].height,
          })
          .toDataURL();
        const previewImg = document.getElementById("previewImg");
        console.log(this.$refs.cropper.getImageData());
        document.getElementById(
          `imgUpload${this.checkState.uploadImgIndex}`
        ).src = this.checkState.cropImg;
        if (this.checkState.fileList == "") {
          this.checkState.fileList.push({
            content: this.checkState.cropImg,
            coordinate: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].coordinate[this.checkState.uploadImgIndex],
          });
        } else {
          this.checkState.fileList[this.checkState.uploadImgIndex] = {
            content: this.checkState.cropImg,
            coordinate: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].coordinate[this.checkState.uploadImgIndex],
          };
        }
        console.log(this.checkState.fileList);
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const firebaseConfig = {
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

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const checkState = ref({
      styleChecked: "0",
      routeTemplateChecked: "0",
      fileList: [],
      cropperShow: false,
      cropImg: "",
      imgSrc: "",
      uploadImgIndex: 0,
    });
    const imgStyle = [
      {
        text: "網美路線",
        src: "../assets/網美路線icon.png",
      },
      {
        text: "老街路線",
        src: "../assets/老街icon.png",
      },
      {
        text: "節慶路線",
        src: "../assets/節慶icon.png",
      },
      {
        text: "美食路線",
        src: "../assets/美食icon.png",
      },
    ];
    const routeTemplate = [
      [
        {
          src: "../assets/PopularRoute.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 407 },
            { width: 265, height: 407 },
          ],
          coordinate: [
            { x: 73, y: 158 },
            { x: 460, y: 158 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
        {
          src: "../assets/PopularRoute1.png",
          limit: 2,
          cropImgData: [
            { width: 224, height: 336 },
            { width: 224, height: 336 },
          ],
          coordinate: [
            { x: 60, y: 234 },
            { x: 372, y: 172 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
      ],
      [
        {
          src: "../assets/StreeRoute.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 398 },
            { width: 265, height: 398 },
          ],
          coordinate: [
            { x: 128, y: 113 },
            { x: 468, y: 113 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
        {
          src: "../assets/StreeRoute1.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 399 },
            { width: 265, height: 399 },
          ],
          coordinate: [
            { x: 86, y: 81 },
            { x: 533, y: 81 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
      ],
      [
        {
          src: "../assets/FestivalRoute.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 399 },
            { width: 265, height: 399 },
          ],
          coordinate: [
            { x: 52, y: 56 },
            { x: 555, y: 182 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
      ],
      [
        {
          src: "../assets/FoodRoute.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 399 },
            { width: 266, height: 398 },
          ],
          coordinate: [
            { x: 104, y: 78 },
            { x: 479, y: 155 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
        {
          src: "../assets/FoodRoute1.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 406 },
            { width: 265, height: 399 },
          ],
          coordinate: [
            { x: 96, y: 96 },
            { x: 431, y: 177 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
        {
          src: "../assets/FoodRoute2.png",
          limit: 2,
          cropImgData: [
            { width: 265, height: 407 },
            { width: 265, height: 399 },
          ],
          coordinate: [
            { x: 239, y: 45 },
            { x: 556, y: 154 },
          ],
          aspectRatio: [
            { x: 2, y: 3 },
            { x: 2, y: 3 },
          ],
        },
      ],
    ];
    watch(
      checkState.value,
      (newValue) => {
        console.log(newValue, "改變");
        // const cropImg = newValue.cropImg;
        // newValue.fileList.push({ content: cropImg });
        const imgListMap = [];
        for (let i = 0; i < checkState.value.fileList.length; i++) {
          console.log(checkState.value.fileList[i]);
          imgListMap.push({
            src: checkState.value.fileList[i].content,
            x: checkState.value.fileList[i].coordinate.x,
            y: checkState.value.fileList[i].coordinate.y,
          });
        }
        // const imgListMap = checkState.value.fileList.map((x) => x.content);
        console.log(imgListMap);
        toDataURL(
          routeTemplate[checkState.value.styleChecked][
            checkState.value.routeTemplateChecked
          ].src,
          async function(dataUrl) {
            // if (
            //   checkState.value.styleChecked == "2" &&
            //   checkState.value.routeTemplateChecked == "0"
            // ) {
            //   imgListMap.push(dataUrl);
            // } else {
            //   imgListMap.unshift(dataUrl);
            // }
            imgListMap.unshift(dataUrl);
            // 此时可以自行将文件上传至服务器
            await mergeImages(imgListMap).then(
              (b64) => (document.querySelector(".showImg").src = b64)
            );
          }
        );
      },
      { deep: true }
    );
    const afterRead = (file) => {
      console.log(file);
      checkState.value.cropperShow = true;
      checkState.value.cropImg = file;
    };
    const styleCheckedChange = (name) => {
      console.log(name);
      if (name) {
        checkState.value.fileList = [];
      }
    };
    function toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    }
    const cancelCrop = () => {
      checkState.value.cropImg = [];
      checkState.value.cropperShow = false;
      console.log("123132");
    };
    const uploadImgIndex = (index) => {
      document.getElementById(`imgUploadInput${index}`).value = "";
      checkState.value.uploadImgIndex = index;
      console.log("上傳第", checkState.value.uploadImgIndex, "張圖片");
    };
    const uploadImg = async () => {
      console.log(document.querySelector(".showImg").src);
      const StorageRef = firebaseStorageRef(
        storage,
        `img-maker/${new Date().toISOString()}.png`
      );
      Toast.loading({
        message: "製作圖片中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      await uploadString(
        StorageRef,
        document.querySelector(".showImg").src,
        "data_url"
      ).then((snapshot) => {
        console.log(snapshot);
      });
      await getDownloadURL(StorageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        liff
          .sendMessages([
            {
              type: "image",
              originalContentUrl: downloadURL,
              previewImageUrl: downloadURL,
            },
          ])
          .then(() => {
            console.log("message sent");
            liff.closeWindow();
          })
          .catch((err) => {
            console.log("error", err);
            liff.sendMessages([
              {
                type: "text",
                text: err,
              },
            ]);
          });
      });
    };
    return {
      checkState,
      imgStyle,
      routeTemplate,
      styleCheckedChange,
      afterRead,
      cancelCrop,
      uploadImgIndex,
      uploadImg,
    };
  },
};
</script>

<style lang="scss">
.streeStyleBox::-webkit-scrollbar {
  display: none;
}
.streeStyleBox {
  .streeStyleRadioGroup {
    .van-radio__label {
      margin-right: 2rem;
    }
  }
}

.imgUploadListOuterBox::-webkit-scrollbar {
  display: none;
}
.templateImg {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 35%;
}
.planeImg {
  animation: move 8s ease-in-out;
  animation-iteration-count: infinite;
}
.imgMakerBody {
  background: url("../assets/bg3.png") round;
}
.bgDiv {
  background: url("https://www.tedu.tw/img/201806/1529376481842.jpg") fixed;
}
.bgDivInner {
  padding-top: 30%;
  padding-bottom: 30%;
}
.section {
  background-attachment: fixed;
}
.topic1 {
  background-image: url("https://ithelp.ithome.com.tw/upload/images/20201006/20112550tt7P2ZOvp1.jpg");
}
.topic3 {
  background-image: url("https://ithelp.ithome.com.tw/upload/images/20201006/20112550RAeWACWPDm.jpg");
}
.topic5 {
  background-image: url("https://ithelp.ithome.com.tw/upload/images/20201006/20112550X424Ljp30m.jpg");
}
.van-dialog {
  overflow: scroll;
}
@keyframes move {
  0% {
    right: 10%;
  }
  50% {
    right: 15%;
  }
  100% {
    right: 10%;
  }
}
</style>
