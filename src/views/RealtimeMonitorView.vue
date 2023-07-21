<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content flex -column">
        <div class="search-box flex x-space-between">
          <n-select
          class="search-item"
              v-model:value="ipValue"
              placeholder="请选择IP段"
              :options="ipOptions"
              @change="search"
            />
          <n-button type="primary"  @click="goback">
                  返回
                </n-button>
        </div>
        <div class="monitor-content">
            <h4 class="model-title">左隧道</h4>
            <n-grid x-gap="24" :cols="4">
              <n-gi v-for="(lItem, index) in leftList" :key="index">
                <div class="monitor-item">
                  <div class="img-box">
                    {{ lItem.url }}
                  </div>
                  <p class="monitor-title">{{ lItem.name }}</p>
                </div>
              </n-gi>
            </n-grid>
            <h4 class="model-title">右隧道</h4>
            <n-grid x-gap="24" :cols="4">
              <n-gi v-for="(lItem, index) in leftList" :key="index">
                <div class="monitor-item">
                  <div class="img-box">
                    {{ lItem.url }}
                  </div>
                  <p class="monitor-title">{{ lItem.name }}</p>
                </div>
              </n-gi>
            </n-grid>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'

import { onMounted, ref } from 'vue'

export default {
  name: 'RealtimeMonitorView',
  components: {
    Header,
  },
  setup() {
    const router = useRouter()

    const leftList = ref([])
    const rightList = ref([])

    const ipOptions = ref([])
    const ipValue = ref('')

    const initData = async () => {
      leftList.value = [
        {url: '',name: '摄像头1'},
        {url: '',name: '摄像头2'},
        {url: '',name: '摄像头3'},
        {url: '',name: '摄像头4'},
        {url: '',name: '摄像头1'},
        {url: '',name: '摄像头2'},
        {url: '',name: '摄像头3'},
        {url: '',name: '摄像头4'},
        {url: '',name: '摄像头1'},
        {url: '',name: '摄像头2'},
        {url: '',name: '摄像头3'},
        {url: '',name: '摄像头4'},
        {url: '',name: '摄像头1'},
        {url: '',name: '摄像头2'},
        {url: '',name: '摄像头3'},
        {url: '',name: '摄像头4'},
      ]
      rightList.value = [
        {url: '',name: '摄像头1'},
        {url: '',name: '摄像头2'},
        {url: '',name: '摄像头3'},
        {url: '',name: '摄像头4'},
      ]
    }

    const goback = ()=>{
      router.push({name: 'Home'})
    }

    const search = ()=> {
      initData()
    }

    onMounted(async () => {
      ipValue.value = '172.16.163.1'
      ipOptions.value = [
        {label: '172.16.163.1',value: '172.16.163.1'},
        {label: '172.16.163.2',value: '172.16.163.2'},
        {label: '172.16.163.3',value: '172.16.163.3'},
      ]
      await initData()
    })


    return {
      leftList,
      rightList,
      ipOptions,
      goback,
      search,
      ipValue,
    }
  },
}
</script>
<style scoped lang="less">
.content, .monitor-content {
  flex: auto;
  height: 0;
  min-height: 0;
}
.content{
  padding-bottom: 20px;
}
.monitor-content{
  overflow-y: auto;
  padding-top: 10px;
}

.model-title {
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  border-left: 5px solid @main-color1;
  padding-left: 10px;
  margin: 20px 0;
  text-align: left;
  color: #fff;
}
.search-item {
  width: 295px;
  background: url('~@/assets/img/select_bg.png') center no-repeat;
  background-size: 100% 100%;
  height: 60px;
}
::v-deep {
  .n-base-selection {
    height: 100%;
  }
  .n-base-selection .n-base-selection-label {
    height: 100%;
    background: none;
  }
}
.monitor-item {
  margin-bottom: 10px;
  .img-box {
    height: 100px;
    width: 100%;
    background-color: #0c1835;
    border-radius: 5px;
  }
  .monitor-title {
    color: @main-color2;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
  }
}
</style>
