<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <Header/>
      <section class="content">
        <n-grid x-gap="24" cols="4" item-responsive>
          <n-grid-item>
            <div class="box">
              <h4 class="menu-title">设置</h4>
              <n-menu v-model:value="menuKey" :options="menuOptions"  default-value="1" />
            </div>
          </n-grid-item>
          <n-grid-item span="0 400:1 600:2 800:3">
            <div class="box flex -column"  v-if="menuKey === '1'">
              <h4 class="menu-title-2">修改密码</h4>
              <div class="box-content flex xy-axis-center">
                  <n-card title="">
                    <n-form 
                    ref="formRef"
                    :model="model"
                    label-placement="left"
                    label-width="80">
                      <n-form-item-row label="账号">
                          <n-input v-model:value="model.userName" disabled />
                        </n-form-item-row>
                        <n-form-item-row label="原密码">
                          <n-input type="password" placeholder="请输入原密码"  v-model:value="model.password"/>
                        </n-form-item-row>
                        <n-form-item-row label="新密码">
                          <n-input type="password" placeholder="请输入新密码"   v-model:value="model.newPassword"/>
                        </n-form-item-row>
                        <n-form-item-row label="确认密码">
                          <n-input type="password" placeholder="请确认新密码" v-model:value="model.newPassword2"/>
                        </n-form-item-row>
                        <n-form-item-row label=" ">
                          <n-button type="primary" block secondary strong>
                        确定
                        </n-button>
                        </n-form-item-row>
                      </n-form>
                     
                  </n-card>
              </div>
            </div>
            <div class="box flex -column" v-if="menuKey === '2'">
              <h4 class="menu-title-2">关于</h4>
              <div class="box-content flex xy-axis-center">
                <p class="version">隧道监控管理平台  V1.0</p>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </section>
      <Menu currentPage="SettingManage"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { reactive, ref } from 'vue'


export default {
  name: 'SettingManageView',
  components: {
    Header,
    Menu,
  },
  setup() {

    const menuOptions = [
      {
        label: '修改密码',
        key: "1"
      },
      {
        label: '关于',
        key: "2"
      }
    ];
    const menuKey = ref('1')

    const model = reactive({
      userName: 'admin',
      password: '',
      newPassword: '',
      newPassword2: '',
    })

    return {
      menuOptions,
      menuKey,
      model,
    }
  },
  mounted() {
    
    
  }
}
</script>
<style scoped lang="less">
.content,.box-content {
  flex: auto;
  height: 0;
  min-height: 0;
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
  .n-menu .n-menu-item-content {
    text-align: left;
  }
  .n-card {
    background: none;
    border: none;
    width: 50%;
  }
  .n-input,.input__placeholder {
    text-align: left;
  }
}
.menu-title, .menu-title-2 {
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  padding: 0 35px;
  color: @main-color1;
  text-align: left;
  font-weight: bold;
}
.menu-title-2 {
  font-size: 16px;
}
.version {
  font-size: 40px;
  height: 60px;
  line-height: 60px;
  padding: 0 35px;
  color: @main-color1;
  font-weight: bold;
}

</style>
