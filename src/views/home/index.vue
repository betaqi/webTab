<template>
  <div
    class="app-main"
    @contextmenu.prevent="showGlobalMenu($event)"
    @click="hideAllMenus"
  >
    <div class="app-header"></div>
    <Search></Search>
    <div class="app-widget">
      <div class="app-widget-grid">
        <VueDraggable class="widget-grid" v-model="widgetList" :animation="300">
          <template v-for="item in widgetList" :key="item.id">
            <div
              :class="['widget-item', `icon-size-${item.size.width}x${item.size.height}`]"
              :style="getWidgetBg(item)"
              @contextmenu.stop.prevent="showWidgetMenu($event, item)"
            >
              <div class="widget-item-icon">
                <span class="icon-txt" :style="getIconTextStyle(item)">{{
                  item.iconName
                }}</span>
              </div>
              <div class="widget-item-name">{{ item.name }}</div>
            </div>
          </template>
        </VueDraggable>
      </div>
    </div>
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
import Search from '@/components/apps/appSearch.vue'
import type { IContextMenu, Widget } from '../../utils/types'
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

function openIconSetting(widget: Widget) {
  iconSettingRef.value?.openIconSetting(widget)
}

function openIconTab(widget: Widget) {
  window.open(widget.addr, '_blank')
}
</script>

<style lang="scss" scoped>
.app-main {
  @apply flex flex-col wh-full user-select-none;
  .app-header {
    @apply h-[3vh];
  }

  .app-widget {
    flex: 1 1 0%;
    .app-widget-grid {
      max-width: var(--icon-grid-width, 1350px);
      @apply h-full mx-auto p-x-45;
    }
  }
}
.widget-grid {
  padding: 3vh 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--icon-size));
  grid-template-rows: repeat(auto-fill, var(--icon-size));
  justify-content: center;
  gap: var(--icon-gap) var(--icon-gap);

  .widget-item {
    border-radius: var(--icon-radius);
    opacity: var(--icon-opacity);
    grid-column: span 1;
    grid-row: span 1;
    background-size: cover;
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;

    .widget-item-icon {
      @apply flex w-full h-full text-white items-center whitespace-nowrap relative;
      .icon-txt {
        @apply absolute left-1/2 font-weight-500 font-size-22 line-height-1;
        transform-origin: 0 center;
        transform: scale(0.94) translateX(-50%);
        transition: transform 0.2s ease-in-out;
      }
    }

    &.sortable-ghost {
      opacity: 0.2;
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.icon-size-1x1 {
      height: calc(var(--icon-size));
      width: calc(var(--icon-size));
      grid-column: span 1;
      grid-row: span 1;
    }

    &.icon-size-1x2 {
      height: calc(var(--icon-size) * 2 + var(--icon-gap));
      width: calc(var(--icon-size) * 1);
      grid-column: span 1;
      grid-row: span 2;
    }

    &.icon-size-2x1 {
      height: calc(var(--icon-size));
      width: calc(var(--icon-size) * 2 + var(--icon-gap));
      grid-row: span 1;
      grid-column: span 2;
    }

    &.icon-size-2x2 {
      height: calc(var(--icon-size) * 2 + var(--icon-gap));
      width: calc(var(--icon-size) * 2 + var(--icon-gap));
      grid-column: span 2;
      grid-row: span 2;
    }

    &.icon-size-4x2 {
      height: calc(var(--icon-size) * 2 + var(--icon-gap));
      width: calc(var(--icon-size) * 4 + var(--icon-gap) * 3);
      grid-column: span 4;
      grid-row: span 2;
    }
  }

  .widget-item-name {
    font-size: var(--icon-nameSize);
    color: var(--icon-nameColor);
    display: var(--icon-name);
    @apply text-center fw-500 w-full overflow-hidden text-ellipsis whitespace-nowrap;
  }
}
</style>
