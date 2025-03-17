<template>
  <div
    class="app-main"
    @contextmenu.prevent="showGlobalMenu($event)"
    @click="hideAllMenus"
  >
    <div class="app-header"></div>
    <Search></Search>
    <Widget :show-widget-menu="showWidgetMenu"></Widget>
  </div>

  <ContextMenu
    :is-visible="visible"
    :position="position"
    :menu-items="menuItems"
    @select="handleMenuSelect"
    @close="hideAllMenus"
  />
  <IconSetting ref="iconSettingRef" @edit-icon="onEditIcon" />
  <DrawerSetting ref="SettingDrawerRef" />
</template>

<script setup lang="ts">
import ContextMenu from '@/components/ContextMenu.vue'
import Search from '@/components/apps/Search.vue'
import Widget from '@/components/apps/widget.vue'
import type { IContextMenu, IWidget } from '../../utils/types'
import { useContextMenuManager } from '@/composables/useContextMenu'
import DrawerSetting from '@/components/drawerSetting/widgetSetting.vue'
import IconSetting from '@/components/dialogs/iconSetting.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useIconStore } from '@/stores/icon'
import { storeToRefs } from 'pinia'
import { useWidgetStore } from '@/stores/widget'

const widgetStore = useWidgetStore()
const { widgetList } = storeToRefs(widgetStore)
const { getWidgetBg, createWidget, onEditIcon, layoutWidget } = widgetStore

const iconStore = useIconStore()
const { getIconTextStyle } = iconStore

const {
  visible,
  position,
  menuItems,
  hideAllMenus,
  showGlobalMenu,
  showWidgetMenu,
  currentWidget,
  activeMenuType,
} = useContextMenuManager()

const handleMenuSelect = (item: IContextMenu) => {
  if (!activeMenuType.value) return
  if (activeMenuType.value === 'global') {
    globalMenuSelect(item)
  }
  if (activeMenuType.value === 'widget') {
    widgetMenuSelect(item)
  }
}

function globalMenuSelect(item: IContextMenu) {
  switch (item.event) {
    case 'ADD_WIDGET':
      createWidget()
      break
    case 'CHANGE_WALLPAPER':
      openDrawerSetting('wallpaper')
      break
    case 'SETTING':
      openDrawerSetting()
      break
  }
}

function widgetMenuSelect(item: IContextMenu) {
  if (!currentWidget.value) {
    new Error(`currentWidget is null`)
    return
  }

  if (item.event?.includes('LAYOUT_WIDGET')) {
    const size = item.id.split('x').map(Number)
    layoutWidget(currentWidget.value, {
      width: size[0],
      height: size[1],
    })
  }

  switch (item.event) {
    case 'EDIT_ICON':
      openIconSetting(currentWidget.value)
      break
    case 'ICON_OPEN_TAB':
      openIconTab(currentWidget.value)
      break
  }
}

const iconSettingRef = ref<InstanceType<typeof IconSetting>>()
const SettingDrawerRef = ref<InstanceType<typeof DrawerSetting>>()

function openDrawerSetting(menu: string = 'icon') {
  SettingDrawerRef.value?.openDrawer(menu)
}

function openIconSetting(widget: IWidget) {
  iconSettingRef.value?.openIconSetting(widget)
}

function openIconTab(widget: IWidget) {
  window.open(widget.addr, '_blank')
}
</script>

<style lang="scss" scoped>
.app-main {
  @apply flex flex-col wh-full user-select-none;
  .app-header {
    @apply h-[3vh];
  }
}
</style>
