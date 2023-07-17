<template>
  <div class="container bg-main" theme-name="dark">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content flex -column">
        <div class="search-box flex x-space-between">
          <div class="search-list">
            <n-space>
                <n-input class="search-item" placeholder="请输入预案策略名称" v-model:value="warningSearchForm.name"/>
                <n-button type="primary"  @click="search">
                  查询
                </n-button>
            </n-space>
          </div>
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
      <Menu currentPage="PreplanManage"/>
        <!-- 处理弹框 -->
      <n-modal v-model:show="showEditModal" :mask-closable="false" preset="dialog" :showIcon="false" title="添加应急预案"
      :style="{width: '50%', minWidth: '500px', maxWidth: '1000px' }">
          <div class="detail-content" >
            <n-form
              ref="formRef"
              :model="model"
              :rules="rules"
              label-placement="left"
              label-width="auto"
              require-mark-placement="right-hanging"
              :size="size"
              :style="{
                maxWidth: '640px'
              }"
            >
              <n-form-item label="预案名称" path="planName">
                <n-input v-model:value="model.planName" placeholder="请输入预案名称" />
              </n-form-item>
              <n-form-item label="触发条件" path="trigger">
                <n-select
                    v-model:value="model.trigger"
                    placeholder="请选择触发条件"
                    :options="triggerOptions"
                  />
              </n-form-item>
            <n-form-item label="设置联动设备" path="equits">
            <n-dynamic-input v-model:value="model.equits" :on-create="onCreate">
              <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                  <n-select
                    class="mr-10"
                    v-model:value="value.equitType"
                    placeholder="请选择设备"
                    :options="equitTypeOptions"
                  />

                  <n-select
                    v-if="value.equitType !== '2'"
                    v-model:value="value.status"
                    placeholder="请选择设备状态"
                    :options="getOptions(value.equitType)"
                  />
                  <n-input v-else v-model:value="value.status" type="text" placeholder="请输入提示文案"/>
                </div>
              </template>
            </n-dynamic-input>
            </n-form-item>
            </n-form >
          </div>
          <template #action>
            <n-button @click="hideEdit">取消</n-button>
            <n-button type="primary" @click="editConfirm">确定</n-button>
          </template>
        </n-modal>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { h,onMounted,reactive, ref } from 'vue'
import {  NButton, useDialog, useMessage } from "naive-ui";

export default {
  name: 'PreplanManage',
  components: {
    Header,
    Menu,
  },
  setup() {
    const formRef = ref(null)
    const dialog = useDialog()
    const message = useMessage()

    const warningSearchForm = reactive({
      name: '',
      trigger: ''
    })

    const triggerOptions = [
      {label: '火灾系统报警',value: '1'},
      {label: '交通事故',value: '2'},
      {label: '紧急停车',value: '3'},
    ]

    const equitTypeOptions = [
    {label: '指示器',value: '1'},
    {label: '情报板',value: '2'},
    {label: '风机',value: '3'},
    {label: '广播',value: '4'},
    {label: '紧急电话',value: '5'},
    ]

    const showEditModal = ref(false)
    const currentItem = ref(null)
    const model = ref({
        planName: '',
        trigger: '',
        equits:[]
      })

      const rules = {
        planName: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入预案名称'
        },
        trigger: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择触发条件'
        },
        // equits: {
        //   required: true,
        //   trigger: ['blur', 'change'],
        //   message: '请设置联动设备'
        // },
      }

    const columns =[
    {
      title: "ID",
      key: "id"
    },
    {
      title: "预案策略名称",
      key: "planName"
    },
    {
      title: "触发条件",
      key: "trigger"
    },
    {
      title: "创建时间",
      key: "createTime"
    },
    {
      title: "告警状态",
      key: "warningStatus"
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        const buttons = []
            buttons.push(h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              class: 'mr-10',
              onClick: () => editPlan(row)
            },
            { default: () => "编辑" }
          ))
          buttons.push(h(
            NButton,
            {
              size: 'small',
              onClick: () => deletePlan(row)
            },
            { default: () => "删除" }
          ))
          
        return buttons
      }
    }
  ];
    const tabelData = ref([])


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
          planName: '策略1',
          trigger: '交通事故',
          createTime: '2023-02-09 12:34:22',
          warningStatus: '紧急事故',
        },{ 
          id: '12',
          planName: '策略2',
          trigger: '交通事故',
          createTime: '2023-02-09 12:34:22',
          warningStatus: '紧急事故',
        }
      ]

    }

    const deletePlan = (row) => {
        dialog.warning({
          title: '提示',
          content: '您确定删除吗？',
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

    const hideEdit = () => {
      showEditModal.value = false
      currentItem.value = null
    }

    const editPlan = (row) => {
      showEditModal.value = true
      currentItem.value = row
    } 
    
    const editConfirm =  (e) => {
      e.preventDefault()
      // formRef.value?.validate( async(errors) => {
        
      //     if (!errors) {
            const params = {
              id: currentItem.id,
              ...model.value,
            }
            console.log(params)
            message.success('操作成功')
            hideEdit()
             search()
        //   } 
        //   else {
        //     console.log(errors)
        //     message.error('验证失败')
        //   }
        // })

    } 

    const onCreate = () => {
      return {
        equitType: '1',
        status: '',
      }
    }

    const getOptions = (type = '') => {
      let options = []
      switch(type) {
        case '1':
          options = [
            {label: '正行',value: '1'},
            {label: '逆行',value: '2'},
            {label: '禁行',value: '3'},
            {label: '关闭',value: '4'},
          ]
          break;
        case '3':
          options = [
            {label: '播放',value: '1'},
            {label: '待机',value: '2'},
          ]
          break;
        case '4':
          options = [
            {label: '播报',value: '1'},
            {label: '待机',value: '2'},
          ]
          break;
        case '5':
          options = [
            {label: '播报',value: '1'},
            {label: '待机',value: '2'},
          ]
          break;
        default: 
          break
      }
      return options
    }


    onMounted(async() => {
      await search()
    })

    return {
      formRef,
      model,
      rules,
      triggerOptions,
      search,
      warningSearchForm,
      columns: columns,
      tabelData,
      pagination: paginationReactive,
      currentItem,
      showEditModal,
      hideEdit,
      editConfirm,
      onCreate,
      equitTypeOptions,
      getOptions,
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
  .n-button.mr-10, .n-select.mr-10  {
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
.detail-content {
  height: 400px;
  overflow-y: auto;
}

</style>
