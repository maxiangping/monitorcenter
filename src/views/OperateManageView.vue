<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content flex -column">
        <div class="search-box flex x-space-between">
          <n-select
          class="search-item-ip"
              v-model:value="ipValue"
              placeholder="请选择IP段"
              :options="ipOptions"
              @update:value="search"
            />
          <n-button type="primary"  @click="handleCheck">巡检</n-button>
        </div>
        <div class="lane-content">
          <vue-draggable-resizable
          v-for="(sItem, index) in symbelList"
          :key="sItem.id"
          @dragging="(x,y)=>onDragStart(sItem, x, y)"
          :w="60"
          :h="60"
          :x="sItem.x"
          :y="50"
          :grid="[10, 10]"
          class-name="drag-item"
          :disable-user-select="false"
          :resizable="false"
          >
          <!-- @resizestop="onResize" @click="handleClickItem(sItem)" -->
        
          <div class="symbel-item"   >
                <img class="item-img" v-if="!currentItem || (currentItem &&sItem.id !== currentItem.id)" :src="sItem.icon" />
                <img class="item-img" v-if="currentItem && sItem.id === currentItem.id" :src="sItem.icon_active" />
            </div>
            </vue-draggable-resizable>
              <div class="pop-symbel" v-if="showPop && currentItem" :style="{left: `${currentItem.x + 66}px`, top: `${currentItem.y}%`}" @click.stop>
                  <div class="pop-inner">
                    <h4 class="pop-title">{{currentItem.name}}</h4>
                    <n-icon class="pop-close" size="30" @click="handleCloseItem">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 144L144 368"></path></svg>
                    </n-icon>
                    <ul class="info-list">
                      <li class="info-item" v-for="(columnI, index) in currentItem.info" :key="index">
                        <label class="label">{{ columnI.label }}：</label>
                        <span class="text" >{{ columnI.value }}</span>
                      </li>
                    </ul>
                  </div>
              </div>
        </div>
      </section>
      <Menu currentPage="OperateManage"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { onMounted, ref } from 'vue'
import icon_1 from '@assets/img/1.png'
import icon_1_active from '@assets/img/1_active.png'
import icon_4 from '@assets/img/4.png'
import icon_4_active from '@assets/img/4_active.png'
import icon_4_1 from '@assets/img/4_1.png'
import icon_4_1_active from '@assets/img/4_1_active.png'
import icon_5 from '@assets/img/5.png'
import icon_5_active from '@assets/img/5_active.png'
import icon_6 from '@assets/img/6.png'
import icon_6_active from '@assets/img/6_active.png'
import icon_6_1 from '@assets/img/6_1.png'
import icon_6_1_active from '@assets/img/6_1_active.png'
import icon_7 from '@assets/img/7.png'
import icon_7_active from '@assets/img/7_active.png'
import icon_9 from '@assets/img/9.png'
import icon_9_active from '@assets/img/9_active.png'
import icon_11 from '@assets/img/11.png'
import icon_11_active from '@assets/img/11_active.png'
import icon_12 from '@assets/img/12.png'
import icon_12_active from '@assets/img/12_active.png'
import icon_12_1 from '@assets/img/12_1.png'
import icon_12_1_active from '@assets/img/12_1_active.png'
import icon_13 from '@assets/img/13.png'
import icon_13_active from '@assets/img/13_active.png'
import icon_14 from '@assets/img/14.png'
import icon_14_active from '@assets/img/14_active.png'
import icon_COVI from '@assets/img/COVI.png'
import icon_COVI_active from '@assets/img/COVI_active.png'
import icon_NO2 from '@assets/img/NO2.png'
import icon_NO2_active from '@assets/img/NO2_active.png'
import { IoSymbles, initXY } from './conf/sceneUtil'
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'OperateManageView',
  components: {
    Header,
    Menu,
    VueDraggableResizable,
  },

  setup() {

    const ipOptions = ref([])
    const ipValue = ref('')

    const symbelList = ref([])

    const currentItem = ref(null)
    const showPop = ref(false)

    const initData = async () => {
    }

    const handleCheck = ()=>{
      //
    }

    const search = () => {

    }

    const onDragStart = (sItem, x, y) => {
      console.log('onDragStart',sItem, x, y)
    }
    const onDragEnd = (ev) => {
      console.log('Weeee',ev)

    }
    

    const getIcon = (name, afterStr = '') => {
      switch(name) {
        case '2显车道指示器':
        case '4显车道指示器':
        case '6显车道指示器':
          return  afterStr === '' ? icon_1 : icon_1_active
        case '单面左转指示器':
        case '双面左转指示器':
          return  afterStr === '' ? icon_4_1 : icon_4_1_active
        case '横洞指示器':
          return  afterStr === '' ? icon_6_1 : icon_6_1_active
        case '3显信号灯':
        case '4显信号灯':
          return  afterStr === '' ? icon_7 : icon_7_active
        case '射流风机':
        case '排送风机':
          return  afterStr === '' ? icon_9 : icon_9_active
        case '照明':
          return  afterStr === '' ? icon_11 : icon_11_active
          case '水泵':
          return  afterStr === '' ? icon_12_1 : icon_12_1_active
        case '车通卷帘门':
          return  afterStr === '' ? icon_13 : icon_13_active
        case '人通防火门':
          return  afterStr === '' ? icon_14 : icon_14_active
        case 'COVI':
          return  afterStr === '' ? icon_COVI : icon_COVI_active
        case 'NO2':
          return  afterStr === '' ? icon_NO2 : icon_NO2_active
        case 'COVI/NO2':
          return  afterStr === '' ? icon_COVI : icon_COVI_active
        case '风速风向':
          return  afterStr === '' ? icon_4 : icon_4_active
        case '洞内光强':
          return  afterStr === '' ? icon_5 : icon_5_active
        case '洞外光强':
          return  afterStr === '' ? icon_6 : icon_6_active
        case '车检器':
          return  afterStr === '' ? icon_12 : icon_12_active
        default:
          break;
      }
      return ''
    }

    const handleClickItem = (item) => {
      
      if(currentItem.value && currentItem.value.id === item.id ) {
        showPop.value = false
        currentItem.value = null
        return
      }
      showPop.value = true
      currentItem.value = item
    }

    const handleCloseItem = () => {
      showPop.value = false
      currentItem.value = null
    }

    const getXY = (index) => {
      return initXY[index] ?? { x: 0, y: 0 }
    }

    onMounted(async () => {
      ipValue.value = '172.16.163.1'
      ipOptions.value = [
        {label: '172.16.163.1',value: '172.16.163.1'},
        {label: '172.16.163.2',value: '172.16.163.2'},
        {label: '172.16.163.3',value: '172.16.163.3'},
      ]
      symbelList.value = Object.keys(IoSymbles).concat(Object.keys(IoSymbles)).map((key,index) => {
      const position = getXY(index)
      return {
        id: key + `111`,
        type: key,
        name: IoSymbles[Number(key)],
        icon: getIcon(IoSymbles[key]),
        icon_active: getIcon(IoSymbles[key],'active'),
        x: 0,
        y: position.y * 1024 / 100,
        info: [
          {label: '设备编号', value: IoSymbles[key]},
          {label: '设备桩号', value: '09'},
          {label: '设备方向', value: '左方向'},
          {label: '正面状态', value: '正常'},
          {label: '背面状态', value: '正常'},
          {label: '通讯状态', value: '通讯正常'},
          {label: '故障状态', value: '正常'},
          {label: '故障描述', value: '正常'},
        ]
      }
    })
    })
    return {
      ipOptions,
      ipValue,
      handleCheck,
      handleClickItem,
      handleCloseItem,
      currentItem,
      showPop,
      symbelList,
      onDragStart,
      onDragEnd,
      search,
    }
  },
  
}
</script>
<style scoped lang="less">
.container-inner {
  padding-bottom: 0;
}
.content , .lane-content{
  flex: auto;
  height: 0;
  min-height: 0;
}
.lane-content{
  position: relative;
  background: url('~@/assets/img/lane_all.png') top no-repeat;
  background-size: 100%;
  overflow: hidden;

}
.search-box {
  margin-bottom: 10px;
}
.search-item-ip {
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
  .menu-box {
    position: relative;
    top: auto;
  }
  
}

.symbel-item {
  // position: absolute;
  width: 61px;
  height: 61px;
  cursor: pointer;
  .item-img {
    width: 100%;
    height: 100%;
  }
}
.pop-symbel {
  position: absolute;
  left: 50%;
  right: 50%;
  background: rgba(0,0,0,0.7);
  border-radius: 4px;
  width: 275px;
  z-index: 666;
  .pop-inner {
    padding: 20px;
  }
  .pop-title {
    font-size: 17px;
    font-weight: 500;
    color: @main-color2;
    margin-bottom: 10px;
  }
  .pop-close {
    position: absolute;
    top: 14px;
    right: 10px;
    cursor: pointer;
    color: @main-color2;
  }
}
.info-item {
  line-height: 30px;
  .label {
    width: 40%;
    display: inline-block;
  }
  .label , .text {
    color: #fff;
    font-size: 16px;
  }
  .text {
    display: inline-block;
    width: 60%;
    text-align: right;
  }
}
</style>
