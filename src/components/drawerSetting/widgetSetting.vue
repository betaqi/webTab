<template>
  <n-drawer
    v-model:show="isShowDrawer"
    :width="502"
    placement="right"
    class="drawer-setting"
    :show-mask="false"
  >
    <n-drawer-content title="设置">
      <div class="flex h-full w-full">
        <n-menu :options="menuOptions" class="h-full w-130" v-model:value="currentMenu" />
        <div class="flex-1 bg-[#f1f0f5]">
          <IconSetting v-if="currentMenu === 'icon'" />
          <WallpaperSetting v-if="currentMenu === 'wallpaper'" />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import IconSetting from './iconSetting.vue'
import WallpaperSetting from './index.vue'
const isShowDrawer = defineModel({ default: false })

const props = defineProps()

const currentMenu = ref('icon')

const menuOptions: MenuOption[] = [
  {
    label: '图标',
    key: 'icon',
    icon: () => h('div', { class: 'i-mingcute:pic-ai-line font-size-16' }),
  },
  {
    label: '壁纸',
    key: 'wallpaper',
    icon: () => h('div', { class: 'i-mingcute:layout-6-line font-size-16' }),
  },
]

function openDrawer(menu: string) {
  isShowDrawer.value = true
  currentMenu.value = menu
}

defineExpose({
  openDrawer,
})
</script>

<style lang="scss">
.drawer-setting {
  .n-drawer-body-content-wrapper {
    padding: 0 !important;
  }
  .n-layout-scroll-container {
    width: 100%;
  }
  .n-menu-item-content__icon {
    margin-right: 0px !important;
  }
  .n-menu-item-content {
    padding-left: 16px !important;
  }
  .n-card-header {
    padding: 8px 12px !important;
  }
}
</style>
