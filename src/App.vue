<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
    <router-view/>
    </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
 
</template>
<script>
  import { darkTheme } from 'naive-ui'
  import { NConfigProvider, NDialogProvider, NMessageProvider } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'
  const themeOverrides = {
    common: {
      primaryColor: '#00F6FF',
    },
    DataTable: {
      tdColor: '#070e54',
      thColor: '#0f3974',
      borderColor: '#0f3775',
    },
    Button: {
      textColor: '#fff'
    },
    Modal: {
      color: '#093e74',
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#fff'
        }
      }
    }
    // ...
  }

  const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
export default {
  name: 'App',
    setup() {
      return {
        darkTheme, 
        themeOverrides,
        zhCN,
        dateZhCN
      }
    }
  }
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, Source Han Sans CN;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  height: 100%;
}
.n-config-provider {
  height: 100%;
}
::-webkit-scrollbar {
    width: 0;
 }

::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    border: 0 solid transparent;
    box-shadow: none;
  }
</style>
