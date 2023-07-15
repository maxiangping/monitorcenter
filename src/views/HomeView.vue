<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content">
        <div class="col left">
          <div class="col-inner">
            <div class="box h1 mb-2"></div>
            <div class="box h2"></div>
          </div>
        </div>
        <div class="col center">
          <div class="col-inner">
            <div class="box h3"></div>
          </div>

        </div>
        <div class="col right">
          <div class="col-inner">
            <div class="box h4 mb-2"></div>
            <div class="box h5"></div>
          </div>
        </div>
      </section>
      <Menu currentPage="Home"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Menu,
  }
}
</script>
<style scoped lang="less">
.content {
  flex: auto;
  height: 0;
  min-height: 0;
}
.col {
  float: left;
  height: 100%;
}
.left, .right {
  width: 25%;
}
.center {
  width: 50%;
}
.col-inner {
  margin: 0 13px;
  height: 100%;
}
.h1 { height: 38%; background-image: url('~@/assets/img/bg-1.png'); }
.h2 { height: 58%; background-image: url('~@/assets/img/bg-2.png');}
.h3 { 
  height: 86%; 
  background-color: rgba(8,16,80,0.62);
  border: 1px solid #397EF7;
  border-radius: 10px;
}
.h4 { height: 52%; background-image: url('~@/assets/img/bg-3.png');}
.h5 { height: 44%; background-image: url('~@/assets/img/bg-4.png');}
.mb-2 {
  margin-bottom: 4%;
}
.box {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
