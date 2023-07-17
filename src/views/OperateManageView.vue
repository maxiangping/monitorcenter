<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content">
      </section>
      <Menu currentPage="OperateManage"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'


export default {
  name: 'OperateManageView',
  components: {
    Header,
    Menu,
  },
  setup() {


    return {
      
    }
  },
  mounted() {
    
    
  }
}
</script>
<style scoped lang="less">
.content {
  flex: auto;
  height: 0;
  min-height: 0;
}


</style>
