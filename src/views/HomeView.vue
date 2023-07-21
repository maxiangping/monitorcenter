<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="search-box flex x-space-between">
        <n-select
          class="search-item-ip"
              v-model:value="ipValue"
              placeholder="请选择IP段"
              :options="ipOptions"
              @update:value="changeIp"
            />
        <div class="warning-info">
          <p class="warning-text">
            <img :src="warningIcon" alt="" class="icon"/>
            <span class="text">{{ warningCenterInfo }}</span>
          </p>
        </div>
        <div class="search-item-ip-w"></div>
      </section>
      <section class="content">
        <div class="col left">
          <div class="col-inner">
            <div class="box h1 mb-2">
              <div class="box-inner">
                <div class="box-header">
                  <h4 class="box-title">设备信息</h4>
                </div>
                <div class="box-content flex x-axis-center">
                  <ul class="equit-info-list  flex xy-axis-center">
                      <figure class="equit-info-item">
                        <div class="img-box">
                            <img :src="equitIcon" alt="" class="equit-icon"/>
                            <span class="equit-num">{{equipmentInfo.total}}</span>
                        </div>
                        <figcaption class="equit-title">设备总数</figcaption>
                      </figure>
                      <figure class="equit-info-item">
                        <div class="img-box">
                            <img :src="equitIcon" alt="" class="equit-icon"/>
                            <span class="equit-num">{{equipmentInfo.fault}}</span>
                        </div>
                        <figcaption  class="equit-title">设备故障</figcaption>
                      </figure>
                  </ul>
                </div>
              </div>
            </div>
            <div class="box h2">
              <div class="box-inner">
                <div class="box-header">
                  <h4 class="box-title">设备告警</h4>
                  <span class="box-more" @click="handleToGoPage('WarningManage', 1)">更多</span>
                </div>
                <div class="box-content flex -column">
                  <ul class="deal-list flex xy-axis-center">
                    <figure class="deal-item">
                      <figcaption class="deal-title"><span class="deal-icon success"></span>已处理</figcaption>
                      <p class="deal-num">{{equitWarningInfo.hasDeal}}</p>
                    </figure>
                    <figure class="deal-item">
                      <figcaption class="deal-title"><span class="deal-icon warning"></span>未处理</figcaption>
                      <p class="deal-num">{{equitWarningInfo.noDeal}}</p>
                    </figure>
                  </ul>
                  <ul class="warning-list" v-if="equitWarningList.length>0">
                    <figure class="warning-item" v-for="(item,index) in equitWarningList" :key="index">
                      <figcaption class="warning-title">
                        <span class="deal-icon " :class="`${item.type === 1 ? 'success' : 'warning'}`"></span>
                        <span class="warning-text">{{item.equitName}}</span>
                        <span class="warning-text">{{item.address}}</span>
                        <span class="warning-text">{{item.time}}</span>
                      </figcaption>
                      
                    </figure>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col center">
          <div class="col-inner">
            <div class="box h3">
              <n-select
                class="search-item-symbel"
                    v-model:value="symbelValue"
                    placeholder="请选择设备"
                    :options="symbelOptions"
                    @update:value="changeSymbel"
                  />
              <n-button class="btn-check" type="primary" @click="handlCheck">巡检</n-button>

              <div class="symbel-item" v-for="(sItem, index) in symbelList" :key="index" :style="{left: `${sItem.x}px`, top: `${sItem.y}%`}" @click="() =>handleClickItem(sItem)">
                <img class="item-img" v-if="!currentItem || (currentItem &&sItem.id !== currentItem.id)" :src="sItem.icon" />
                <img class="item-img" v-if="currentItem && sItem.id === currentItem.id" :src="sItem.icon_active" />
              </div>
              <div class="pop-symbel" v-if="showPop && currentItem" :style="{left: `${currentItem.x + 66}px`, top: `${currentItem.y}%`}">
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
          </div>

        </div>
        <div class="col right">
          <div class="col-inner">
            <div class="box h4 mb-2">
              <div class="box-inner">
                <div class="box-header">
                  <h4 class="box-title" @click="handleToGoPage('WarningManage', 2)">事件告警</h4>
                  <span class="box-more">更多</span>
                </div>
                <div class="box-content flex -column">
                  <ul class="deal-list flex xy-axis-center">
                    <figure class="deal-item">
                      <figcaption class="deal-title"><span class="deal-icon success"></span>已处理</figcaption>
                      <p class="deal-num">{{eventWarningInfo.hasDeal}}</p>
                    </figure>
                    <figure class="deal-item">
                      <figcaption class="deal-title"><span class="deal-icon warning"></span>未处理</figcaption>
                      <p class="deal-num">{{eventWarningInfo.noDeal}}</p>
                    </figure>
                  </ul>
                  <ul class="warning-list" v-if="eventWarningList.length>0">
                    <figure class="warning-item" v-for="(item,index) in eventWarningList" :key="index">
                      <div class="warning-title flex x-space-between">
                        <p class="warning-text"><span class="deal-icon " :class="`${item.type === 1 ? 'success' : 'warning'}`"></span>{{item.equitName}}</p>
                        <span class="warning-text">{{item.typeName}}</span>
                      </div>
                      <div class="warning-title flex x-space-between">
                        <span class="warning-text">{{item.address}}</span>
                        <span class="warning-text">{{item.time}}</span>
                      </div>
                    </figure>
                  </ul>
                </div>
              </div>
            </div>
            <div class="box h5">
              <div class="box-inner">
                <div class="box-header">
                  <h4 class="box-title">实时监控</h4>
                  <span class="box-more"  @click="handleToGoPage('RealtimeMonitor')">更多</span>
                </div>
                <div class="box-content flex x-axis-center">
                  <ul class="monitor-info-list  flex xy-axis-center">
                      <figure class="monitor-info-item" v-for="(item,index) in monitorList" :key="index">
                        <figcaption class="monitor-title">{{item.name}}</figcaption>
                        <div class=" monitor-child-list" v-for="(cItem,i) in item.monitors" :key="i">
                            <div class="img-box">
                                <img :src="cItem.url" alt="" class="monitor-icon"/>
                            </div>
                            <p class="monitor-child-title">{{cItem.monitorName}}</p>
                        </div>
                      </figure>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Menu currentPage="Home"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import equitIcon from '@assets/img/equit_icon.png'
import warningIcon from '@assets/img/warning_icon.png'
import { IoSymbles, initXY } from './conf/sceneUtil'
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


export default {
  name: 'HomeView',
  components: {
    Header,
    Menu,
  },
  setup() {
    const ipOptions = ref([])
    const ipValue = ref('')
    const symbelValue = ref('') 
    const symbelOptions =  Object.keys(IoSymbles).map(key => {
      return {
        label: IoSymbles[key],
        value: key,
      }
    })


    const router = useRouter()

    // 设备信息
    const equipmentInfo = reactive({
      total: 0,
      fault: 0,
    })

    // 设备告警
    const equitWarningInfo = reactive({
      hasDeal: 0,
      noDeal: 0,
    })

    // 设备告警列表
    const equitWarningList = ref([])

    // 事件告警
    const eventWarningInfo = reactive({
      hasDeal: 0,
      noDeal: 0,
    })

    // 事件告警列表
    const eventWarningList = ref([])
  // 监控摄像头列表
    const monitorList = ref([])

    const warningCenterInfo = ref('')

    const symbelList = ref([])

    const currentItem = ref(null)
    const showPop = ref(false)
    
    
    const handleToGoPage = (pageName, type = -1)=>{
      const params = {}
      if(type !== -1 ){
        params.type = type
      }
      router.push({
        name: pageName,
        params
      })
    }
    const changeIp = () =>{
      console.log(ipValue)
    }

    const handlCheck = () => {
      //巡检
    }

    const changeSymbel = () => {

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
    onMounted(() =>{
      ipValue.value = '172.16.163.1'

      ipOptions.value = [
        {label: '172.16.163.1',value: '172.16.163.1'},
        {label: '172.16.163.2',value: '172.16.163.2'},
        {label: '172.16.163.3',value: '172.16.163.3'},
      ]

      warningCenterInfo.value = '1号隧道火灾告警提示！'
    equitWarningList.value = [
      { type: 1,equitName: '温度设备', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 2,equitName: '风机', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 1,equitName: '温度设备', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 3,equitName: '指示灯', address:'1号隧道',  time: '2023-19-90 02:23:43'},
    ]
    eventWarningList.value = [
      { type: 1,equitName: '火灾告警', typeName: '紧急告警', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 2,equitName: '交通事故', typeName: '紧急告警', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 1,equitName: '火灾告警', typeName: '紧急告警', address:'1号隧道',  time: '2023-19-90 02:23:43'},
      { type: 3,equitName: '交通事故', typeName: '紧急告警', address:'1号隧道',  time: '2023-19-90 02:23:43'},
    ]
    monitorList.value = [
      {
        name: '左隧道',
        monitors: [{url: '', monitorName: '摄像头-01'},{url: '', monitorName: '摄像头-02'},],
      },
      {
        name: '右隧道',
        monitors: [{url: '', monitorName: '摄像头-03'},{url: '', monitorName: '摄像头-04'},],
      },
    ]
    symbelList.value = Object.keys(IoSymbles).concat(Object.keys(IoSymbles)).map((key,index) => {
      const position = getXY(index)
      return {
        id: key + `111`,
        type: key,
        name: IoSymbles[Number(key)],
        icon: getIcon(IoSymbles[key]),
        icon_active: getIcon(IoSymbles[key],'active'),
        x: position.x,
        y: position.y,
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
      handleToGoPage,
      equipmentInfo,
      equitIcon,
      equitWarningInfo,
      equitWarningList,
      eventWarningInfo,
      eventWarningList,
      monitorList,
      ipOptions,
      ipValue,
      changeIp,
      warningIcon,
      warningCenterInfo,
      handlCheck,
      symbelValue, 
      symbelOptions,
      changeSymbel,
      symbelList,
      handleClickItem,
      currentItem,
      handleCloseItem,
      showPop,
    }
  },
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
  position: relative;
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
.box-inner {
  padding: 20px;
  height: 100%;
}
.box-header {
  background: url('~@/assets/img/box_title_bg.png') center no-repeat;
  height: 120px;
  margin: 0 25px;
  position: relative;
  padding-top: 15px;
}
.box-title {
  text-align: center;
  font-size: 20px;
  color: @main-color1;
  font-weight: bold;
}
.box-more {
  position: absolute;
  right: -5px;
  top: 20px;
  font-size: 17px;
  color: @main-color1;
  cursor: pointer;
}

.equit-info-list {
  width: 90%;
}
.equit-info-item  {
  width: 50%;
  .img-box {
    position: relative;
    margin: 0 auto 26px;
    width: 70%;
    .equit-icon {
      width: 100%;
      animation: rotate-loading 10s linear  infinite ;
    }
    .equit-num {
      position: absolute;
      top: 50%;
      margin-top: -20px;
      height: 40px;
      text-align: center;
      font-size: 29px;
      font-weight: 500;
      color: @main-color1;
      line-height: 40px;
      left: 0;
      width: 100%;
    }
  }
  .equit-title {
    height: 24px;
    line-height: 24px;
    font-size: 17px;
    font-weight: 400;
    color: @main-color2;
  }
}
.box-content {
    position: relative;
    top: -30px;
    height: 74%;
}

@keyframes rotate-loading{
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
@-webkit-keyframes rotate-loading {
  from {
    transform: rotate(0deg) ;
  }

  to {
    transform: rotate(359deg) ;
  }
}

@-moz-keyframes rotate-loading {
  from {
    transform: rotate(0deg) ;
  }

  to {
    transform: rotate(359deg) ;
  }
}

.deal-list {
  width: 80%;
  margin: 0 auto;
  .deal-item {
    width: 50%;
  }
  .deal-title {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 21px;
    font-weight: bold;
    color: @main-color2;
    margin-bottom: 25px;
  }

  .deal-num {
    height: 30px;
    line-break: 30px;
    font-size: 25px;
    font-weight: 500;
    color: @main-color2;
    text-align: center;
  }
}

.deal-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 12px;
  &.success {
    background: @success;
  }
  &.warning {
    background: @warning;
  }
}

.warning-list {
  overflow-y: auto;
  margin-top: 10px;
  flex: auto;
  height: 0;
  min-height: 0;
  .warning-item {
    padding: 10px;
    border: 1px solid #397EF7;
    background: linear-gradient(90deg, rgba(4,106,213,0) 0%, rgba(3,99,198,0.4) 50%, rgba(4,106,213,0) 100%);
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .warning-title{
    line-height: 30px;
    font-size: 17px;
    font-weight: 400;
    color: @main-color2;
    text-align: left;
  }
  .warning-text {
    margin-right: 5px;
    display: inline-block;
  }
}

.monitor-info-list {
    width: 100%;
  .monitor-info-item  {
    width: 50%;
    
    .img-box {
      position: relative;
      margin: 0 auto;
      width: 70%;
      min-height: 40px;
      .monitor-icon {
        width: 100%;
        height: 100%;
      }
    }
    .monitor-child-title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 17px;
      color: @main-color2;
    }
    .monitor-title {
      height: 30px;
      line-height: 30px;
      font-size: 21px;
      font-weight: bold;
      color: @main-color2;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
.search-box {
  padding: 0 12px;
  margin-bottom: 20px;
}
.search-item-ip , .search-item-symbel{
  width: 295px;
  background: url('~@/assets/img/select_bg.png') center no-repeat;
  background-size: 100% 100%;
}
.search-item-symbel {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 50px;
  width: 182px;
}
.search-item-ip-w {
  width: 295px;
}
.warning-info {
  width: 33%;
  background: url('~@/assets/img/warning_center_bg.png') center no-repeat;
  background-size: 100% 100%;
  height: 62px;
}
.warning-text {
  text-align: cener;
  line-height: 62px;
  .icon {
    position: relative;
    top: -5px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .text {
    font-size: 17px;
    font-weight: 400;
    color: #FE5578;
    line-height: 35px;
  }
}
::v-deep{
  .n-base-selection {
    height: 100%;
  }
  .n-base-selection .n-base-selection-label {
    height: 100%;
    background: none;
  }
  .n-button .n-button__content {
    color: @main-color1;
  }
  .n-button:not(.n-button--disabled):hover {
    background: none;
  }
}
.btn-check  {
  position: absolute;
  top: 24px;
  right: 24px;
  background: url('~@/assets/img/select_bg.png') center no-repeat;
  background-size: 100% 100%;
}
.symbel-item {
  position: absolute;
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
