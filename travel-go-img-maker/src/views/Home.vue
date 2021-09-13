<template>
  <div class="home">
    <div class="theNav">
      <img
        style="width: 100%;"
        src="https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/banner%20test1.png?alt=media&token=d1d0d115-91c2-4658-90de-9add492c2d8c"
      />
    </div>
    <div class="page_padding">
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
            >
              <p>{{ index + 1 }}.</p>
              <input
                type="file"
                name="image"
                accept="image/*"
                style="font-size: 1.2em; padding: 10px 0;"
                @change="setImage"
                @click="uploadImgIndex(index)"
              />
              <!-- {{
                routeTemplate[checkState.styleChecked][
                  checkState.routeTemplateChecked
                ].uploadImg[index]
              }} -->
              <!-- <van-uploader
                :src="
                  routeTemplate[checkState.styleChecked][
                    checkState.routeTemplateChecked
                  ].uploadImg[index].img
                "
                @click="uploadImgIndex(index)"
                :max-count="1"
                :upload-text="'請上傳圖片'"
                :after-read="afterRead"
              /> -->
            </div>
            <div>
              <van-dialog
                v-model:show="checkState.cropperShow"
                title="請裁切選擇的圖片"
                show-cancel-button
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
                    :viewMode="2"
                    :autoCropArea="0.5"
                    :minCropBoxWidth="150"
                    :minCropBoxHeight="250"
                    :src="checkState.imgSrc"
                    alt="Source Image"
                    :img-style="{ width: '400px', height: '300px' }"
                  ></vue-cropper>
                </div>
              </van-dialog>
            </div>
          </div>
        </div>
        <!-- <van-uploader
          v-model="checkState.fileList"
          multiple
          :after-read="afterRead"
          :max-count="
            routeTemplate[checkState.styleChecked][
              checkState.routeTemplateChecked
            ].limit
          "
        /> -->
      </div>
      <!-- 上傳圖片 -->
      <img :src="checkState.cropImg" style="border: 1px solid lightgray;" />
      <!-- 預覽圖片 -->
      <div class="select" style="text-align: left;">
        <h2>4. 預覽圖片</h2>
        {{
          routeTemplate[checkState.styleChecked][
            checkState.routeTemplateChecked
          ].src
        }}
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
// import imageToBase64 from "image-to-base64/browser";
import { ref, watch } from "vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    VueCropper,
  },
  // methods: {
  //   cropImage() {
  //     // get image data for post processing, e.g. upload or setting image src
  //     this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
  //   },
  //   flipX() {
  //     const dom = this.$refs.flipX;
  //     let scale = dom.getAttribute("data-scale");
  //     scale = scale ? -scale : -1;
  //     this.$refs.cropper.scaleX(scale);
  //     dom.setAttribute("data-scale", scale);
  //   },
  //   flipY() {
  //     const dom = this.$refs.flipY;
  //     let scale = dom.getAttribute("data-scale");
  //     scale = scale ? -scale : -1;
  //     this.$refs.cropper.scaleY(scale);
  //     dom.setAttribute("data-scale", scale);
  //   },
  // },
  data() {
    return {
      // imgSrc = "",
      //       cropImg: "",
    };
  },
  methods: {
    setImage(e) {
      try {
        const file = e.target.files[0];
        if (!file.type.includes("image/")) {
          alert("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.checkState.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result);
            console.log(this.$refs.cropper);
          };
          reader.readAsDataURL(file);
        } else {
          alert("Sorry, FileReader API not supported");
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
          .getCroppedCanvas()
          .toDataURL();
        this.checkState.fileList.push({ content: this.checkState.cropImg });
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const cropper = ref();
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
          limit: 3,
          uploadImg: [{ img: [] }, { img: [] }, { img: [] }],
        },
      ],
      [
        {
          src: "../assets/StreetRoute.png",
          limit: 4,
          uploadImg: [],
        },
      ],
      [
        {
          src: "../assets/festivalRoute.jpg",
          limit: 2,
          uploadImg: [],
        },
      ],
    ];
    watch(
      checkState.value,
      (newValue) => {
        console.log(newValue, "改變");
        // const cropImg = newValue.cropImg;
        // newValue.fileList.push({ content: cropImg });
        const imgListMap = checkState.value.fileList.map((x) => x.content);
        toDataURL(
          routeTemplate[checkState.value.styleChecked][
            checkState.value.routeTemplateChecked
          ].src,
          async function(dataUrl) {
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
      // imageToBase64(
      //   routeTemplate[checkState.value.styleChecked][
      //     checkState.value.routeTemplateChecked
      //   ].src
      // ) // Path to the image
      //   .then((response) => {
      //     // console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
      //     imgListMap.unshift(response);
      //   })
      //   .catch((error) => {
      //     console.log(error); // Logs an error if there was one
      //   });
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
      checkState.value.uploadImgIndex = index;
      console.log("上傳第", checkState.value.uploadImgIndex, "張圖片");
    };
    const cropImageTest = () => {
      // get image data for post processing, e.g. upload or setting image src
      checkState.value.cropImg = cropper.value.getCroppedCanvas().toDataURL();
      console.log("cropImg: ", checkState.value.cropImg);
    };
    return {
      checkState,
      imgStyle,
      routeTemplate,
      styleCheckedChange,
      afterRead,
      cancelCrop,
      cropImageTest,
      uploadImgIndex,
    };
  },
};
</script>

<style>
.imgUploadListOuterBox::-webkit-scrollbar {
  display: none;
}
</style>
