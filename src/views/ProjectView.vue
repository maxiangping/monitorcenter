<template>
  <div class="container bg-main" theme-name="dark">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content flex -column">
        <div class="search-box flex x-space-between">
          <div class="search-list">
            <n-space>
                <n-input class="search-item" placeholder="请输入工程名称" v-model:value="warningSearchForm.projectName"/>
                <n-button type="primary"  @click="search">
                  查询
                </n-button>
                <n-button type="primary"  @click="addProject">
                  + 新建工程
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
      <Menu currentPage="ProjectView"/>
        <!-- 处理弹框 -->
        <n-modal v-model:show="showEditModal" :mask-closable="false" preset="dialog" :showIcon="false" title="编辑工程"
        :style="{width: '50%', minWidth: '500px', maxWidth: '1000px' }">
          <div class="detail-content" >
            <n-form
              ref="formRef"
              :model="model"
              :rules="rules"
              label-placement="left"
              label-width="auto"
              require-mark-placement="right-hanging"
              :style="{
                maxWidth: '640px'
              }"
            >
              <n-form-item label="工程名称" path="projectName">
                <n-input v-model:value="model.projectName" placeholder="请输入工程名称" />
              </n-form-item>
              <n-form-item label="车道数量" path="lanesNumber">
                <n-input v-model:value="model.lanesNumber" placeholder="请输入车道数量" />
              </n-form-item>
              <n-form-item label="IP段" path="ipStr">
                <n-input v-model:value="model.ipStr" type="textarea" placeholder="请输入IP段" />
              </n-form-item>
            </n-form >
          </div>
          <template #action>
            <n-button size="small" @click="hideEdit">取消</n-button>
            <n-button size="small" type="primary" @click="editConfirm">确定</n-button>
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
import { useRouter } from 'vue-router'

export default {
  name: 'ProjectView',
  components: {
    Header,
    Menu,
  },
  setup() {
    const formRef = ref(null)
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()


    const warningSearchForm = reactive({
      projectName: '',
    })


    const showEditModal = ref(false)
    const currentItem = ref(null)
    const model = ref({
        projectName: '',
        lanesNumber: '',
        ipStr:''
      })

      const rules = {
        projectName: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入工程名称'
        },
        lanesNumber: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入车道数量'
        },
        ipStr: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入设备IP'
        },
      }

    const columns =[
    {
      title: "ID",
      key: "id"
    },
    {
      title: "工程名称",
      key: "projectName"
    },
    {
      title: "车道数量",
      key: "lanesNumber"
    },
    {
      title: "IP和端口",
      key: "deviceList",
      render(row) {
        return h('span',{
          class: 'ip-text',
        },
        { default: () => row.deviceList.reduce((str,item) => {
          str += `${item.ip}:${item.port}；`
          return str
        }, '') })
      }
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
              class: 'mr-10',
              onClick: () => deleteProject(row)
            },
            { default: () => "删除" }
          ))
          buttons.push(h(
            NButton,
            {
              size: 'small',
              onClick: () => gotoScene(row)
            },
            { default: () => "场景管理" }
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
          projectName: '工程1',
          lanesNumber: '4',
          deviceList: [ // ip和端口列表
            {"ip":"192.168.1.1","port":5002},
            {"ip":"192.168.1.3","port":5002},
            {"ip":"192.168.1.10","port":5002}
            ],
        },{ 
          id: '12',
          projectName: '工程2',
          lanesNumber: '4',
          deviceList: [ // ip和端口列表
            {"ip":"192.168.1.1","port":5002},
            {"ip":"192.168.1.3","port":5002},
            {"ip":"192.168.1.10","port":5002}
            ],
        }
      ]

    }

    const deleteProject = (row) => {
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

    const addProject = () => {
      showEditModal.value = true
      model.value = {

      }
    }

    const editPlan = (row) => {
      showEditModal.value = true
      currentItem.value = row
    } 
    
    const editConfirm =  (e) => {
      e.preventDefault()
      formRef.value?.validate( async(errors) => {
        
          if (!errors) {
            const params = {
              id: currentItem.id,
              ...model.value,
            }
            console.log(params)
            message.success('操作成功')
            hideEdit()
             search()
          } 
          else {
            console.log(errors)
            message.error('验证失败')
          }
        })

    } 

    const gotoScene = (row) => {
      router.push({
        name: 'MaintenanceManage',
        params: {
          id: row.id
        }
      })
    }


    onMounted(async() => {
      await search()
    })

    return {
      formRef,
      model,
      rules,
      search,
      warningSearchForm,
      columns: columns,
      tabelData,
      pagination: paginationReactive,
      currentItem,
      showEditModal,
      hideEdit,
      editConfirm,
      addProject,
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
  .n-button--primary-type .n-button__content {
    color: #333;
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
  height: 300px;
  overflow-y: auto;
}

</style>
