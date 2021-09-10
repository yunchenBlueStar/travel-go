<template>
  <div class="home page_padding">
    <div class="titleFontBox">
      <b>
        <div class="titleFontInnerBox">
          <h1>
            Travel Go
          </h1>
          <h2>
            旅遊回憶照
          </h2>
        </div>
      </b>
    </div>
    <!-- 選擇風格路線 -->
    <div class="select" style="text-align: left;">
      <h2>1. 選擇風格路線</h2>
      {{ checkState.styleChecked }}
      <van-radio-group
        v-model="checkState.styleChecked"
        direction="horizontal"
        @change="styleCheckedChange"
      >
        <van-radio :name="index" v-for="(data, index) in imgStyle" :key="index"
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
      {{ checkState.routeTemplateChecked }}
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
          {{ data.limit }}
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
      {{ checkState.fileList }}
      <van-uploader
        v-model="checkState.fileList"
        multiple
        :max-count="
          routeTemplate[checkState.styleChecked][
            checkState.routeTemplateChecked
          ].limit
        "
      />
    </div>
    <!-- 上傳圖片 -->
    <!-- 預覽圖片 -->
    <div class="select" style="text-align: left;">
      <h2>4. 預覽圖片</h2>
    </div>
    <!-- 預覽圖片 -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ref, watch } from "vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const checkState = ref({
      styleChecked: "0",
      routeTemplateChecked: "0",
      fileList: [],
    });
    const imgStyle = ["網美路線", "老街路線", "節慶路線"];
    const routeTemplate = [
      [
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/StreetRoute.png?alt=media&token=904b94ff-9f29-4075-a386-d662ebf03e1c",
          limit: 4,
        },
      ],
      [
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E6%97%85GO.jpg?alt=media&token=c10e4914-637b-40d1-ab6a-8821fd425717",
          limit: 3,
        },
      ],
      [
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/logo.png?alt=media&token=3bf08ab3-1473-40aa-8595-ef99beae11bd",
          limit: 2,
        },
      ],
    ];
    watch(
      checkState.value,
      (newValue) => {
        console.log(newValue, "改變");
        if (newValue.styleChecked) {
          console.log("123", newValue.styleChecked);
        }
      },
      { deep: true }
    );
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    };
    const styleCheckedChange = (name) => {
      console.log(name);
      if (name) {
        checkState.value.fileList = [];
      }
    };
    return {
      checkState,
      imgStyle,
      routeTemplate,
      styleCheckedChange,
      afterRead,
    };
  },
};
</script>
