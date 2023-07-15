<template>
  <div class="header-box text-center">
    <div class="bg-left header-bg"></div>
    <div class="bg-center header-bg"><h1 class="header-title">隧道监控平台</h1></div>
    <div class="bg-right header-bg"><span class="time"> {{timeStr}}</span></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'Header',
  setup() {
    const timeArr= ref([])
    const timeStr = computed(() => {
      return timeArr.value.join(' ')
    })

    return {
      timeStr,
      timeArr
    }
  },

  mounted() {
    console.log(this.timeStr)
    this.timeArr = ['2022-09-09','星期二','多云','21:12:23']
  }

}
</script>

<style scoped lang="less">
.header-bg {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  display: inline-block;
  vertical-align: top;

}
.bg-left, .bg-right {
  max-width: 526px;
  width: 30%;
  height: 58px;
}
.bg-center {
  max-width: 505px;
  height: 80px;
  width: 28%;
  background-image: url('~@/assets/img/header_title.png');
}
.bg-left {
  background-image: url('~@/assets/img/header_left.png');
  margin-right: 22px;
}
.bg-right {
  background-image: url('~@/assets/img/header_right.png');
  margin-left: 22px;
}
.header-title {
  margin-top: 3.5%;
  font-size: 43px;
  font-weight: bold;
  color: #FFFFFF;
  height: 42px;
  line-height: 43px;

  background: linear-gradient(0deg, #FFFFFF 0%, #B0D7FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.time {
  display: inline-block;
  margin-top: 3.5%;
  height: 24px;
  font-size: 25px;
  color: @main-color2;
  line-height: 24px;

  background: linear-gradient(0deg, #FFFFFF 0%, #B0D7FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
