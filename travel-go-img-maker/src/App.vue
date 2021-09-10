<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<script>
export default {};
</script>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Righteous);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  font-size: 26px;
  font-family: "Yu Gothic", SimHei;
}
h2 {
  font-size: 19px;
  font-family: "Microsoft YaHei";
  color: #778899;
}
p {
  font-size: 16px;
  font-family: Meiryo, "微軟正黑體", "Microsoft JhengHei";
}
.strokeFont {
  color: transparent;
  -webkit-text-stroke: 1px gray;
}
.page_padding {
  padding: 1rem;
}
.title_font {
  font-size: 18px;
}
.JhengHei_font {
  font-family: Microsoft JhengHei;
  font-weight: bold;
}
.border_color_lightGreen {
  border: 1px solid rgb(21, 175, 149);
  padding: 0.5rem;
  border-radius: 5px;
  color: rgb(21, 175, 149) !important;
}
.border_color_lightgray {
  border: 1px solid lightgray;
  padding: 0.5rem;
  border-radius: 5px;
  color: gray;
}

.titleFontBox {
  background-color: #bed52d;
  border-radius: 10px;
  padding: 3em 5em;
  b {
    float: left;
    overflow: hidden;
    position: relative;
    top: -25px;
    height: 60px;
  }
  .titleFontInnerBox {
    position: relative;
    top: 0;
    left: 0;
  }
  h1 {
    display: inline-block;
    color: white;
    font-family: "Righteous", serif;
    font-size: 2.6em;
    text-shadow: 0.2em 0.2em 0 rgb(21, 175, 149);
    margin: 0;
    position: relative;
    /*animation*/
    -webkit-animation: moveUpDown 10s;
    /*animation-iteration-count*/
    -webkit-animation-iteration-count: infinite;
    /*animation-delay*/
    -webkit-animation-delay: 4.5s;
  }

  h2 {
    display: inline-block;
    color: white;
    font-family: "Righteous", serif;
    font-size: 2.5em;
    text-shadow: 0.15em 0.15em 0 #84caee;
    margin: 0;
    position: relative;
    /*animation*/
    -webkit-animation: moveUpDown 10s;
    /*animation-iteration-count*/
    -webkit-animation-iteration-count: infinite;
    /*animation-delay*/
    -webkit-animation-delay: 4.5s;
  }

  h1:after {
    content: attr(data-shadow);
    position: absolute;
    top: 0.06em;
    left: 0.06em;
    z-index: -1;
    text-shadow: none;
    background-size: 0.05em 0.05em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
// 修改 vant 組件
.van-radio__icon .van-icon {
  display: none;
}
.van-radio__label {
  padding: 0.5rem 0rem;
  margin: 0 0 10px 0;
  img {
    width: 85%;
    border: 1px solid;
    border-radius: 10px;
  }
}
// 修改 vant 組件
#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@keyframes moveUpDown {
  0% {
    top: 0px;
  }
  10% {
    top: -60px;
    transform: scale(1.05);
  }
  35% {
    top: 0px;
    transform: scale(1);
  }
}
</style>
