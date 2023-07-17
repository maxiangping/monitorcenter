<template>
  <div class="container bg-main">
    <div class="container-inner flex -column">
      <section class="content flex xy-axis-center">

        <n-card title="隧道监控管理平台">
          <n-form 
          ref="formRef"
          :model="model"
          label-placement="left"
          label-width="80">
            <n-form-item-row label="账号">
                <n-input v-model:value="model.userName" />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input type="password" placeholder="请输入密码"  v-model:value="model.password"/>
              </n-form-item-row>
              <n-form-item-row label=" ">
                <n-button type="primary" block secondary strong @click="handleLogin">
              登录
              </n-button>
              </n-form-item-row>
            </n-form>
            
        </n-card>
              
      </section>
    </div>
  </div>
</template>

<script>

import { reactive } from 'vue'
import { useRouter } from 'vue-router'


export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()

    const model = reactive({
      userName: '',
      password: '',
    })

    const handleLogin = ()=> {
      router.push({name: 'Home'})
    }

    return {
      model,
      handleLogin,
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

::v-deep {

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
.menu-title {
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  padding: 0 35px;
  color: @main-color1;
  text-align: left;
  font-weight: bold;
}

</style>
