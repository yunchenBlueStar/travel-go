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
      <!-- 選擇風格路線 -->
      <div class="select" style="text-align: left;">
        <h2>1. 選擇風格路線</h2>
        <!-- {{ checkState.styleChecked }} -->
        <van-radio-group
          style="margin-top: 1.5rem;"
          v-model="checkState.styleChecked"
          direction="horizontal"
          @change="styleCheckedChange"
        >
          <van-radio
            :name="index"
            v-for="(data, index) in imgStyle"
            :key="index"
            ><span
              :class="
                checkState.styleChecked == index
                  ? 'border_color_lightGreen'
                  : 'border_color_lightgray'
              "
              >{{ data }}</span
            ></van-radio
          >
        </van-radio-group>
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
        <!-- {{ checkState.fileList }}
        {{
          routeTemplate[checkState.styleChecked][
            checkState.routeTemplateChecked
          ].limit
        }} -->
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
                    style="width: 50%;"
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
              :minCropBoxWidth="
                routeTemplate[checkState.styleChecked][
                  checkState.routeTemplateChecked
                ].cropImgData[checkState.uploadImgIndex].width
              "
              :minCropBoxHeight="
                routeTemplate[checkState.styleChecked][
                  checkState.routeTemplateChecked
                ].cropImgData[checkState.uploadImgIndex].height
              "
              :src="checkState.imgSrc"
              alt="Source Image"
            ></vue-cropper>
          </div>
        </van-dialog>
      </div>
      <!-- 上傳圖片 -->
      <img
        :src="checkState.cropImg"
        style="border: 1px solid lightgray; width: 100%;"
      />
      <!-- 預覽圖片 -->
      <div class="select" style="text-align: left;">
        <h2>4. 預覽圖片</h2>
        <div style="text-align: center">
          <img
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
            style="border-radius: 5px"
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
// import imageToBase64 from "image-to-base64/browser";
import { ref, watch } from "vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    VueCropper,
  },
  methods: {
    setImage(e) {
      try {
        const file = e.target.files[0];
        console.log(file);
        if (!file.type.includes("image/")) {
          console.log("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = (event) => {
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

            console.log(this.$refs.cropper);
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
            minWidth: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].width,
            minHeight: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].height,
            maxWidth: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].width,
            maxHeight: this.routeTemplate[this.checkState.styleChecked][
              this.checkState.routeTemplateChecked
            ].cropImgData[this.checkState.uploadImgIndex].height,
          })
          .toDataURL();
        document.getElementById(
          `imgUpload${this.checkState.uploadImgIndex}`
        ).src = this.checkState.cropImg;
        console.log(
          this.routeTemplate[this.checkState.styleChecked][
            this.checkState.routeTemplateChecked
          ].cropImgData[this.checkState.uploadImgIndex].width
        );
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
    const imgStyle = ["網美路線", "老街路線", "節慶路線"];
    const routeTemplate = [
      [
        {
          src: "../assets/PopularRoute.jpg",
          limit: 4,
          uploadImg: [{ img: [] }, { img: [] }, { img: [] }],
          cropImgData: [
            { width: 437, height: 219 },
            { width: 224, height: 219 },
            { width: 224, height: 219 },
            { width: 437, height: 219 },
          ],
          coordinate: [
            { x: 43, y: 128 },
            { x: 509, y: 128 },
            { x: 43, y: 369 },
            { x: 297, y: 369 },
          ],
        },
      ],
      [
        {
          src: "../assets/StreetRoute.png",
          limit: 4,
          uploadImg: [],
          cropImgData: [
            { width: 990, height: 1749 },
            { width: 1257, height: 590 },
            { width: 577, height: 524 },
            { width: 570, height: 524 },
          ],
          coordinate: [
            { x: 0, y: 0 },
            { x: 1138, y: 109 },
            { x: 1134, y: 771 },
            { x: 1825, y: 771 },
          ],
        },
      ],
      [
        {
          src: "../assets/festivalRoute1.png",
          limit: 2,
          uploadImg: [],
          cropImgData: [
            { width: 297, height: 423 },
            { width: 297, height: 423 },
          ],
          coordinate: [
            { x: 52, y: 57 },
            { x: 523, y: 146 },
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
            if (
              checkState.value.styleChecked == "2" &&
              checkState.value.routeTemplateChecked == "0"
            ) {
              imgListMap.push(dataUrl);
            } else {
              imgListMap.unshift(dataUrl);
            }
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
          })
          .catch((err) => {
            console.log("error", err);
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

<style>
.imgUploadListOuterBox::-webkit-scrollbar {
  display: none;
}
.templateImg {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 25%;
}
/* body {
  
} */
.imgMakerBody {
  background: url("../assets/bg2.png") round;
}
.bgDiv {
  background: url("https://www.tedu.tw/img/201806/1529376481842.jpg") fixed;
  /* background-color: transparent;
  background-image: url("../assets/bg2.png");
  background-repeat: repeat;
  background-attachment: fixed;
  background-size: 100%; */
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
</style>
