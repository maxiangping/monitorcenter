<template>
  <div class="container bg-main" theme-name="dark">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content flex -column">
        <div class="search-box flex x-space-between">
          <div class="search-list">
            <n-space>
                <n-input class="search-item" placeholder="请输入ID/事件名称" v-model:value="warningSearchForm.name"/>
                <n-select class="search-item" v-model:value="warningSearchForm.warningStatus" :options="warningStatusOptions" />
                <n-button type="primary"  @click="search">
                  查询
                </n-button>
            </n-space>
          </div>
          <n-radio-group v-model:value="warningSearchForm.warningType" name="warningTypeGroup" type="info" @change="changeType">
            <n-radio-button
              v-for="(item,index) in warningTypeList"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </n-radio-group>
        </div>
        <n-data-table
          class="table-box"
          :bordered="false"
          :single-line="false"
          :columns="columns"
          :data="tabelData"
          :pagination="pagination"
        />
      </section>
      <Menu currentPage="WarningManage"/>
      <!-- 详情弹框 -->
      <n-modal v-model:show="showDetailModal" :mask-closable="false" preset="dialog" :showIcon="false" :title="`${warningSearchForm.warningType === 1 ? '事件详情' : '设备详情'}`"
      :style="{width: '50%', minWidth: '500px', maxWidth: '1000px' }">
          <div class="detail-content" v-if="currentItem">
            <h5 class="model-title">{{ warningSearchForm.warningType === 1 ? '事件信息' : '设备信息' }}</h5>
            <ul class="info-list flex -row">
              <li class="inof-item w-50" v-for="(columnI, index) in detailColumn" :key="index">
                <label class="label">{{ columnI.title }}：</label>
                <span class="text" v-if="columnI.title !== '处理状态'">{{ currentItem[columnI.key] }}</span>
                <n-tag class="tag" v-else
                :bordered="false"
                :type="`${currentItem[columnI.key] === '待处理' ? 'warning' : 'info'}`">{{ currentItem[columnI.key] }}</n-tag>
              </li>
            </ul>
            <h5 class="model-title">处理信息</h5>
            <ul class="info-list">
              <li class="inof-item" >
                <label class="label">处理时间：</label>
                <span class="text">{{ currentItem.dealTime }}</span>
              </li>
              <li class="inof-item" >
                <label class="label">描述：</label>
                <span class="text">{{ currentItem.desc }}</span>
              </li>
            </ul>
           
          </div>
          <template #action>
            <n-button @click="hideDetail">取消</n-button>
          
          </template>
        </n-modal>
        <!-- 处理弹框 -->
      <n-modal v-model:show="showDealModal" :mask-closable="false" preset="dialog" :showIcon="false" :title="`${warningSearchForm.warningType === 1 ? '事件处理' : '设备处理'}`"
      :style="{width: '50%', minWidth: '500px', maxWidth: '1000px' }">
          <div class="detail-content" v-if="currentItem">
            <h5 class="model-title">{{ warningSearchForm.warningType === 1 ? '事件信息' : '设备信息' }}</h5>
            <ul class="info-list flex -row">
              <li class="inof-item w-50" v-for="(columnI, index) in detailColumn" :key="index">
                <label class="label">{{ columnI.title }}：</label>
                <span class="text" v-if="columnI.title !== '处理状态'">{{ currentItem[columnI.key] }}</span>
                <n-tag class="tag" v-else
                :bordered="false"
                :type="`${currentItem[columnI.key] === '待处理' ? 'warning' : 'info'}`">{{ currentItem[columnI.key] }}</n-tag>
              </li>
            </ul>
            <h5 class="model-title">处理信息</h5>
            <ul class="info-list">
              <li class="inof-item" >
                <!-- <label class="label">描述：</label> -->
                <n-input
                  v-model:value="dealDetail"
                  type="textarea"
                  placeholder="请输入处理信息"
                />
              </li>
            </ul>
          </div>
          <template #action>
            <n-button @click="hideDetail">取消</n-button>
            <n-button type="primary" @click="dealConfirm">确定</n-button>
          </template>
        </n-modal>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { computed, h,onMounted,reactive, ref } from 'vue'
import { NTag, NButton, useDialog, useMessage } from "naive-ui";

export default {
  name: 'WarningManageView',
  components: {
    Header,
    Menu,
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()

    const warningSearchForm = reactive({
      name: '',
      warningStatus: '1',
      warningType: 1,
    })

    const warningStatusOptions = [
      {label: '一般告警',value: '1'},
      {label: '重要告警',value: '2'},
      {label: '紧急告警',value: '3'},
    ]

    // 告警类型
    const warningTypeList = [
      {label: '事件告警', value: 1},
      {label: '设备告警', value: 2},
    ]

    const showDetailModal = ref(false)
    const showDealModal = ref(false)
    const currentItem = ref(null)
    const dealDetail = ref('')
    
    const columns = ref([])
    const tabelData = ref([])

    const createColumns = (type) =>[
    {
      title: "ID",
      key: "id"
    },
    {
      title: type === 1 ? "事件名称" : "设备名称",
      key: "eventName"
    },
    {
      title: "站点名称",
      key: "addressName"
    },
    {
      title: "告警信息",
      key: "warningInfo"
    },
    {
      title: "告警时间",
      key: "warningTime"
    },
    {
      title: "告警状态",
      key: "warningStatus"
    },
    {
      title: "处理状态",
      key: "dealType",
      render(row) {
        return h(
            NTag,
            {
              type: row.dealType === '待处理' ? 'warning' : 'info',
              bordered: false
            },
            {
              default: () => row.dealType
            }
          );
      }
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        const buttons = []
        if(row.dealType === '待处理') {
          if( type === 1){
            buttons.push(h(
            NButton,
            {
              size: 'small',
              type: 'warning',
              class: 'mr-10',
              onClick: () => antiAlarm(row)
            },
            { default: () => "消警" }
          ))
          }
         
          buttons.push(h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              onClick: () => dealWith(row)
            },
            { default: () => "处理" }
          ))
          
        } 
        if(row.dealType === '已处理') {
          buttons.push(h(
            NButton,
            {
              size: 'small',
              onClick: () => lookDetail(row)
            },
            { default: () => "查看" }
          ))
        } 
        return buttons
      }
    }
  ];
    const paginationReactive = reactive({
        pageSize: 20,
        itemCount: 0,
        page: 1,
        showSizePicker: true,
        pageSizes: [10, 20, 50],
        onChange: (page) => {
          paginationReactive.page = page
          search()
        },
        onUpdatePageSize: (pageSize) => {
          paginationReactive.pageSize = pageSize
          paginationReactive.page = 1
          search()
        }
      })

      const detailColumn = computed(() => {
        return columns.value.filter(item => !['操作'].includes(item.title))
      })
    

    //搜索列表
    const search = async () => {
      const params = {
        ...warningSearchForm,
        pageSize: paginationReactive.pageSize,
        page: paginationReactive.page,
      }
      console.log(params)

      tabelData.value = [
        { 
          id: '11',
          eventName: '策略1',
          addressName: 'dddd',
          warningInfo: '交通事故',
          warningTime: '2023-02-09 12:34:22',
          warningStatus: '紧急事故',
          dealType: '待处理',
        },{ 
          id: '12',
          eventName: '策略2',
          addressName: 'dddd',
          warningInfo: '交通事故',
          warningTime: '2023-02-09 12:34:22',
          warningStatus: '紧急事故',
          dealType: '已处理',
        }
      ]

    }

    const antiAlarm = (row) => {
        dialog.warning({
          title: '提示',
          content: '您确定消除该告警吗？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            console.log(row)
            message.success('操作成功')
          },
          onNegativeClick: () => {
            // message.error('取消')
          }
        })
    }

    const lookDetail = (row) => {
      showDetailModal.value = true
      currentItem.value = row
    }

    const hideDetail = () => {
      showDetailModal.value = false
      showDealModal.value = false
      currentItem.value = null
    }

    const dealWith = (row) => {
      showDealModal.value = true
      currentItem.value = row
      dealDetail.value = ''
    } 

    const dealConfirm = async () => {
      const params = {
        id: currentItem.value.id,
        dealDetail: dealDetail.valie
      }
      console.log(params)
      message.success('操作成功')
      hideDetail()
      await search()

    } 

    const changeType = async () => {
      columns.value = createColumns(warningSearchForm.warningType)
      await search()
    }

    onMounted(async() => {
      columns.value = createColumns(warningSearchForm.warningType)
      await search()
    })

    return {
      search,
      changeType,
      warningTypeList,
      warningSearchForm,
      warningStatusOptions,
      columns: columns,
      tabelData,
      pagination: paginationReactive,
      currentItem,
      showDealModal,
      showDetailModal,
      hideDetail,
      detailColumn,
      dealConfirm,
      dealDetail,
      
    }
  },
}
</script>
<style scoped lang="less">
.container-inner {
  padding-bottom: 0;
}
.content {
  flex: auto;
  height: 0;
  min-height: 0;
}
.search-item {
  width: 200px;
}
.search-box  {
  margin-bottom: 20px;
}
.table-box {
  flex: auto;
  height: 0;
  min-height: 0;
}
::v-deep {
  .menu-box {
    position: relative;
    top: auto;
  }
  .n-button.mr-10 {
    margin-right: 10px;
  }
}
.model-title {
  font-size: 16px;
  height: 18px;
  line-height: 18px;
  border-left: 5px solid @main-color1;
  padding-left: 10px;
  margin: 20px 0;
}
.inof-item {
  line-height: 30px;
  &.w-50 {
    width: 50%;
  }
  .label {
    width: 80px;
    display: inline-block;
  }
  .tag {
    padding: 0 5px;
  }
}

</style>
