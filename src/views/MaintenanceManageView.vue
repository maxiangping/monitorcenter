<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section v-if="editType === 0" class="content flex -column">
        <div class="search-box flex x-space-between">
          <n-select
              class="search-item-ip"
              v-model:value="projectValue"
              placeholder="请选择IP段"
              :options="projectOptions"
              @change="search"
            />
            <n-button type="primary"  @click="goback">
                  返回
                </n-button>
        </div>
        <div class="box-content flex xy-axis-center">
          <n-grid x-gap="24" cols="4" item-responsive>
            <n-grid-item>
              <div class="box">
                <h4 class="menu-title">设备列表 
                  <!-- <n-icon class="add-icon" size="40" title="添加设备" @click="addSene">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
                      />
                    </svg>
                  </n-icon> -->
                </h4>
                <div class="box-inner">
                  <n-tree
                    block-line
                    :data="treeData"
                    :default-expanded-keys="defaultExpandedKeys"
                    :node-props="nodeProps"
                  />
                </div>
              </div>
            </n-grid-item>
            <n-grid-item span="0 400:1 600:2 800:3">
              <div class="box">
                <div class="box-inner">
                  <h5 class="model-title">设备信息
                    <n-icon class="edit-icon" size="20" title="编辑设备" @click="editSene">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M2 26h28v2H2z" fill="currentColor"></path><path d="M25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z" fill="currentColor"></path></svg>
                  </n-icon>
                  <n-icon class="delete-icon" size="20" title="删除设备" @click="deleteSene">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z" fill="currentColor"></path></g></svg>
                  </n-icon>
                  </h5>
                  <ul class="info-list flex -row">
                    <li class="info-item w-50" v-for="(columnI, index) in detailColumn" :key="index">
                      <label class="label">{{ columnI.label }}：</label>
                      <span class="text" >{{ columnI.value }}</span>
                    </li>
                  </ul>
                  <h5 class="model-title">设备操作</h5>
                  <ul class="btn-list">
                      <n-button class="btn-item" v-for="(btnI, i) in detailBtn" :key="i" type="primary">{{ btnI.label }}</n-button>
                  </ul>
                </div>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
      </section>
      <section v-if="editType >= 1" class="content flex -column eidt-scene">
        <div class="search-box flex x-space-between">
          <n-select
              class="search-item-ip"
              v-model:value="symble"
              placeholder="请选择设备"
              :options="IoSymblesOption"
              @update:value="onChangeSymble"
            />
            <div class="btn-list">
              <n-button type="primary"  @click="editSave" class="mr-10">
                保存
                </n-button>
                <n-button   @click="editCancel">
                  取消
                </n-button>
            </div>
            
        </div>
        <div class="box-content flex xy-axis-center">
          <n-grid x-gap="24" cols="4" item-responsive>
            
            <n-grid-item span="0 400:1 600:2 800:3">
                <div class="box-inner">
                  <h5 class="model-title">指令信息</h5>
                  <NSpace vertical>
                    <NGrid xGap="24" cols="24">
                      <NGi span="8">
                        <NGradientText>2显车道指示器</NGradientText>
                      </NGi>
                      <NGi span="16">
                        <NSpace inline align="end" justify="end" :style="{ width: '100%' }">
                          <NInput v-model:value="vmodel.coord"  :style="{ width: '100%' }" placeholder='段位' />
                          <NSelect
                            v-model:value="vmodel.attr"
                            @update:value="(value) => changeItem(value, index)"
                            :options={attrOptions}
                            :style="{ width: '130px' }"
                            placeholder="控制类型"
                          />
                          <NSelect
                            v-model:value="vmodel.symble"
                            :options="dynOptions"
                            :style="{ width: '150px' }"
                            placeholder='场景'
                          />

                          <NButton
                            @renderIcon="() => h(NIcon, null, { default: () => h(DeleteOutlined) })"
                            @click="() => scenesModel.splice(index, 1)"
                          />
                        </NSpace>
                      </NGi>
                    </NGrid>

                    <NGrid xGap={24} cols={24}>
                      <NGi span={6}>
                        <NSpace vertical>
                          <NText>正红控制</NText>
                          <NSelect v-model:value="vmodel.q1" :options="qoptions" placeholder='请选择' />
                        </NSpace>
                      </NGi>
                      <NGi span={6}>
                        <NSpace vertical>
                          <NText>正绿控制</NText>
                          <NSelect v-model:value="vmodel.q2" :options="qoptions" placeholder='请选择' />
                        </NSpace>
                      </NGi>
                      <NGi span={6}>
                        <NSpace vertical>
                          <NText>正红反馈</NText>
                          <NSelect v-model:value="vmodel.i1" :options="ioptions" placeholder='请选择' />
                        </NSpace>
                      </NGi>
                      <NGi span={6}>
                        <NSpace vertical>
                          <NText>正绿反馈</NText>
                          <NSelect v-model:value="vmodel.i2" :options="ioptions" placeholder='请选择' />
                        </NSpace>
                      </NGi>
                    </NGrid>
                  </NSpace>
                  <h5 class="model-title">反馈信息</h5>
                  <ul class="info-list flex -row">
                    <li class="info-item w-50" v-for="(columnI, index) in detailColumn" :key="index">
                      <label class="label">{{ columnI.label }}：</label>
                      <span class="text" >{{ columnI.value }}</span>
                    </li>
                  </ul>
                  
                </div>
            </n-grid-item>
            <n-grid-item>
              <h5 class="model-title">设备操作</h5>
                  <ul class="btn-list">
                      <n-button class="btn-item" v-for="(btnI, i) in detailBtn" :key="i" type="primary">{{ btnI.label }}</n-button>
                  </ul>
            </n-grid-item>
          </n-grid>
        </div>
      </section>
      <Menu currentPage="ProjectView"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'

import { onMounted, ref, computed, h } from 'vue'
import { useDialog, useMessage } from "naive-ui";
import { IoSymbles, AttrType,addrVarOptions,
  anaVarOptions,
  attrOptions,
  deSerialToScene,
  funcCodeOptions,
  getOtherSymbles,
  ioOptions,
  notIoOptions,
  portOptions,
  serialToDrivsUint16,
  serialToUint16, } from './conf/sceneUtil'
import { DeleteOutlined } from '@vicons/material'
import { NButton, TreeOption } from 'naive-ui'

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}



export default {
  name: 'MaintenanceManageView',
  components: {
    Header,
    Menu,
  },
  setup() {
    const router = useRouter()
    const dialog = useDialog()
    const message = useMessage()

    const getCnt = (version) => {
      if (version === '241') {
        return 6
      } else if (version === '242') {
        return 15
      } else if (version === '243') {
        return 16
      }
      return 48
    }

    const editType  = ref(0)

    const projectOptions = ref([])
    const projectValue = ref('')

    const treeData = ref([])
    const defaultExpandedKeys = ref([])
    const vmodel = ref({})

    const scenesModel = ref([])

    // const qoptions = range(512, 512 + getCnt(ctx.version)).map((v) => ({
    //   label: `Q${v - 511}(寄存器地址${v})`,
    //   value: v,
    // }))
    // const ioptions = range(0, getCnt(ctx.version)).map((v) => ({ label: `I${v + 1}(寄存器地址${v})`, value: v }))
    // const aoptions = range(0, getACnt(ctx.version)).map((v) => ({
    //   label: `A${v + 1}(寄存器地址${v + 128})`,
    //   value: v + 128,
    // }))

    // qoptions.unshift({ label: '无', value: 30000 })
    // ioptions.unshift({ label: '无', value: 30000 })

    
    const IoSymblesOption = Object.keys(IoSymbles).map(key => {
      return {
        label: IoSymbles[key],
        value: key,
      }
    })
    const symble = ref(1)

    const detailColumn = computed(() => {
      return [
        {label: '设备编号',value: '1'},
        {label: '设备桩号',value: '2'},
        {label: '设备方向',value: '1'},
        {label: '通讯状态',value: '正常'},
        {label: '故障状态',value: '正常'},
        {label: '故障描述',value: '正常'},
      ]
    })
    const detailBtn = computed(() => {
      return [
        {label: '正转',value: '1'},
        {label: '反转',value: '2'},
        {label: '停止',value: '3'},
      ]
    })

    const changeItem = (attr, index) => {
        if (attr === AttrType.IoControl) {
          scenesModel[index] = {
            index: scenesModel.length,
            attr: AttrType.IoControl,
            symble: 1,
            coord: 'K001',
            q1: 512,
            q2: 513,
            i1: 0,
            i2: 0,
          }
        }
        if (attr === AttrType.RS485) {
          scenesModel[index] = {
            index: 1,
            symble: 1,
            attr: AttrType.RS485,
            coord: 'k001',
            port: 1,
            fn_code: 1,
            slave_id: 1,
            master_addr: 3000,
            addr_vars: [],
          }
        }

        if (attr === AttrType.Analog) {
          scenesModel[index] = {
            index: 1,
            symble: 1,
            attr: AttrType.Analog,
            coord: 'k001',
            ang_vars: [],
          } 
        }

        if (attr === AttrType.Mixins) {
          scenesModel[index] = {
            index: 1,
            symble: 1,
            attr: AttrType.Mixins,
            coord: 'k001',
            port: 1,
            fn_code: 1,
            slave_id: 1,
            master_addr: 3000,
            addr_vars: [],
            ang_vars: [],
          }
        }
      }
      const dynOptions = computed(() => {
        if (vmodel.attr === AttrType.IoControl) {
          return ioOptions
        } else {
          return notIoOptions
        }
      })

    const goback = ()=>{
      router.push({name: 'ProjectView'})
    }
      
    const initData = async () => {
      treeData.value = [
        { 
          label: '设备1', 
          key: '1',
          type: '1',
          suffix: (value) =>
            h(
              NButton,
              { text: true, type: 'primary', class: 'suffix-icon', onClick: () => addSene(value) },
              { default: () => '添加' }
            ),
          children: [
            { 
              label: '车道显示器', 
              key: '1-1',
              type: '2',
            }, 
            { 
              label: '风机', 
              key: '1-2',
              type: '3',
            },
            { 
              label: '信号灯', 
              key: '1-3',
              type: '4',
            },
          ]
        },
        { 
          label: '设备2', 
          key: '2',
          type: '1',
          suffix: (value) =>
            h(
              NButton,
              { text: true, type: 'primary', class: 'suffix-icon', onClick: () => addSene(value) },
              { default: () => '添加' }
            ),
          children: [
            { 
              label: '车道显示器', 
              key: '2-1',
              type: '2',
            }, 
            { 
              label: '风机', 
              key: '2-2',
              type: '3',
            },
            { 
              label: '信号灯', 
              key: '2-3',
              type: '4',
            },
          ]
        },
      ]

      defaultExpandedKeys.value = ['1','2']
    }

    const nodeProps = ({ option }) => {
        return {
          onClick() {
            if(option.type === '1')return
            message.info("[Click] " + option.label);
          },
          
        };
      }

      const addSene = (ip) => {
        editType.value = 1
      }
      const editSene = () => {
        editType.value = 2
        vmodel = {
          index: 1,
          symble: -1,
          attr:  -1,
          coord: '',
          q1:  -1,
          q2:  -1,
          q3:  -1,
          q4:  -1,
          i1:  -1,
          i2:  -1,
          i3:  -1,
          i4:  -1,
        }
      }
      const editCancel = () => {
        editType.value = 0
      }

      const onChangeSymble = () => {

      }

      const editSave = () => {

      }
      const deleteSene = () => {
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

      const search = () => {
        
      }


    onMounted(async () => {
      projectValue.value = '工程1'

      projectOptions.value = [
        {label: '工程1',value: '工程1'},
        {label: '工程2',value: '工程2'},
        {label: '工程3',value: '工程3'},
      ]
      await initData()
    })


    return {
      projectOptions,
      projectValue,
      treeData,
      defaultExpandedKeys,
      nodeProps,
      addSene,
      detailColumn,
      detailBtn,
      search,
      editSene,
      deleteSene,
      editType,
      editCancel,
      IoSymblesOption,
      onChangeSymble,
      symble,
      editSave,
      vmodel,
      changeItem,
      dynOptions,
      h,
      goback,
      // qoptions, 
      // ioptions, 
      // aoptions,
    }
  },
}
</script>
<style scoped lang="less">
.container-inner {
  padding-bottom: 0;
}
.content, .box-content {
  flex: auto;
  height: 0;
  min-height: 0;
}
.content{
  padding-bottom: 20px;
}
.box-inner {
  padding: 0 24px;
  overflow-y: auto;
  height: 100%;
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
  position: relative;
}
.search-box {
  margin-bottom: 20px;
}
.search-item-ip , .n-select{
  width: 295px;
  background: url('~@/assets/img/select_bg.png') center no-repeat;
  background-size: 100% 100%;
  
} 
.search-item-ip{
  height: 60px;

}
.search-item-ip-w {
  width: 295px;
}
.box {
  background-color: rgba(8,16,80,0.62);
  border: 1px solid #397EF7;
  border-radius: 10px;
  height: 100%;
}
::v-deep {
  .menu-box {
    position: relative;
    top: auto;
  }
  .n-grid {
    height: 100%;
  }
  .n-base-selection {
    height: 100%;
  }
  .n-base-selection .n-base-selection-label {
    background: none;
    height: 100%;
  }
  .n-button--default-type {
    color: #fff;
  }
  .suffix-icon.n-button--primary-type .n-button__content{
    color: @main-color1;
  }
}
.menu-title {
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  padding: 0 35px;
  color: @main-color1;
  text-align: left;
  font-weight: bold;
  position: relative;
}
.add-icon {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.info-item {
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
  .label , .text {
    color: #fff;
    font-size: 16px;
  }
}
.btn-item + .btn-item {
  margin-left: 10px;
}
.edit-icon, .delete-icon {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.delete-icon {
  right: 10px;
}
.edit-icon {
  right: 40px;
}
.btn-list .mr-10 {
  margin-right: 10px;
}
</style>
