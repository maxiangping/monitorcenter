<template>
  <div class="menu-box text-center" :class="`${!isOpen ? 'hide-menu' : ''}`">
    <span class="icon-menu"  @click="handleClickIcon"></span>
    <ul class="menu-list">
      <li class="menu-item" v-for="(item, index) in menuList" :key="index" >
        <div class="menu-item-inner" :class="`${currentPage === item.value ? 'active' : ''}`" @click="handleClickMenu(item.value)">{{item.label}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Menu',
  props: {
    currentPage: String
  },
  setup(ctx) {
    const router = useRouter()
    const menuList = [
      {
        label: '首页',
        value: 'Home',
      },
      {
        label: '操作管理',
        value: 'OperateManage',
      },
      {
        label: '告警管理',
        value: 'WarningManage',
      },
      {
        label: '预案管理',
        value: 'PreplanManage',
      },
      {
        label: '运维管理',
        value: 'ProjectView',
      },
      {
        label: '设置管理',
        value: 'SettingManage',
      },
    ]

    const isOpen = ref(true)

    const handleClickMenu = (value) => {
      if(ctx.currentPage === value) return
      router.push({
        name: value
      })
    }
    const handleClickIcon = () => {
        isOpen.value = !isOpen.value
    }
    
    return {
      menuList,
      currentPage: ctx.currentPage,
      isOpen,
      handleClickMenu,
      handleClickIcon,
    }
  },

  mounted() {
    // console.log(ctx.currentPage)
  }

}
</script>

<style scoped lang="less">
.menu-box {
  position: fixed;
  left: 50%;
  bottom: 9px;
  margin-left: -27%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: top center;
  width: 54%;
  height: 109px;
  background-image: url('~@/assets/img/menu_bg.png');

}
.menu-list {
  width: 80%;
  margin: 60px auto 0;
  
}
.menu-item {
  width: 16.66666%;
  display: inline-block;

}
.menu-item-inner {
  margin: 0 10%;
  height: 40px;
  line-height: 40px;
  color: @main-color1;
  opacity: .6;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url('~@/assets/img/button_unselected.png');
  cursor: pointer;
  &.active {
    opacity: 1;
    background-image: url('~@/assets/img/button_selected.png');
  }
}
.icon-menu {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 30px;
  height: 18px;
  background: url('~@/assets/img/icon_arrow.png') 100% center no-repeat;
  cursor: pointer;
  margin-left: -9px;
  animation: move 2s infinite;
}
.hide-menu {
  background: none;
  height: 40px;
  .icon-menu {
    transform: rotate(180deg);
  }
  .menu-list {
    display: none;
  }
}

@keyframes move{
  0% {
    top: 16px;
  }

  50% {
    top: 24px;
  }

  100% {
    top: 16px;
  }
}
@-webkit-keyframes move {
   0% {
    top: 16px;
  }

  50% {
    top: 24px;
  }

  100% {
    top: 16px;
  }
}

@-moz-keyframes move {
  0% {
    top: 16px;
  }

  50% {
    top: 24px;
  }

  100% {
    top: 16px;
  }
}
</style>
