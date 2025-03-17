<template>
  <ContextMenuContainer
    v-model:show="showRootMenu"
    :default-menu-items="rootMenuConfig"
    :widget-menu-config="widgetMenuConfig"
    @select="handleMenuSelect"
  >
    <template #default>
      <div class="app-main">
        <div class="app-header"></div>
        <Search></Search>
        <div class="app-widget">
          <div class="app-widget-grid">
            <VueDraggable class="widget-grid" v-model="dataWidgetList" :animation="300">
              <template v-for="item in dataWidgetList" :key="item.id">
                <div
                  :class="[
                    'widget-item',
                    `icon-size-${item.size.width}x${item.size.height}`,
                  ]"
                  :style="getWidgetBg(item)"
                  @contextmenu="handleWidgetMenu($event, item)"
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

          <div class="app-footer"></div>
        </div>
      </div>
    </template>
  </ContextMenuContainer>

  <ContextMenu
    v-model:show="showWidgetMenu"
    :position="widgetMenuPosition"
    :menu-items="currentWidgetMenuItems"
    @select="handleWidgetMenuSelect"
  />
  <DrawerSetting v-model="isShowDrawer" :activeMenu="activeMenu" />
  <IconSetting ref="iconSettingRef" @edit-icon="onEditIcon" />
</template>

<script setup lang="ts">
import ContextMenuContainer from '@/components/ContextMenuContainer.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import Search from './components/apps/appSearch.vue'

import type { IContextMenu, Widget, WidgetIconVO } from './utils/types'
import { useContextMenu } from '@/composables/useContextMenu'
import { widgetMenuConfig, rootMenuConfig } from './utils/menuConfig'
import DrawerSetting from './components/drawerSetting/widgetSetting.vue'
import IconSetting from './components/dialogs/iconSetting.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useIconStore } from '@/stores/icon'
import { storeToRefs } from 'pinia'

const { show: showRootMenu } = useContextMenu()
const {
  show: showWidgetMenu,
  position: widgetMenuPosition,
  menuItems: currentWidgetMenuItems,
  setMenuItems,
  handleContextMenu: handleWidgetBaseContextMenu,
} = useContextMenu<IContextMenu>()

// ==== 抽屉相关 ====
const activeMenu = ref<string | null>(null)
const isShowDrawer = ref(false)
function changeWallpaper() {
  activeMenu.value = 'wallpaper'
  isShowDrawer.value = true
}
// ==== 抽屉相关 end ====
// ==== 图标设置相关 ====
const iconSettingRef = ref<InstanceType<typeof IconSetting>>()
function openIconSetting(widget: Widget) {
  iconSettingRef.value?.openIconSetting(widget)
}
function openIconTab(widget: Widget) {
  window.open(widget.addr, '_blank')
}
const onEditIcon = (icon: WidgetIconVO) => {
  const widget = dataWidgetList.value.find(w => w.id === icon.id)
  if (widget) {
    widget.name = icon.name
    widget.iconColor = icon.iconColor
    widget.addr = icon.addr
    widget.iconName = icon.iconName
    widget.iconImage = icon.iconImage
    widget.iconType = icon.iconType
  }
}
// ==== 图标设置相关 end ====

const currentWidget = ref<Widget | null>(null)

watch(showWidgetMenu, val => {
  if (val) {
    showRootMenu.value = false
  }
})

watch(showRootMenu, val => {
  if (val) {
    showWidgetMenu.value = false
  }
})

const dataWidgetList = ref<Widget[]>([
  {
    id: 'clock1',
    name: '时钟',
    iconName: '天气',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 1,
      height: 1,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  },
  {
    id: 'weather1',
    name: '天气天',
    iconName: '天气天',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 1,
      height: 1,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  },
  {
    id: 'weather2',
    name: '天气气气',
    iconName: '天气气气',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 1,
      height: 1,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  },
  {
    id: 'weather3',
    name: '天气',
    iconName: '天气',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 1,
      height: 1,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  },
  {
    id: 'weather 4',
    name: '天气',
    iconName: '天气1231222231',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 1,
      height: 1,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  },
])

const getIconTextStyle = (widget: Widget) => {
  const baseScale = 0.94
  const text = widget.iconName
  const { width } = widget.size
  if (width === 1) {
    const containerWidth = width * values.value.iconSize
    const span = document.createElement('span')
    span.style.fontSize = '22px'
    span.style.visibility = 'hidden'
    span.style.fontWeight = '500'
    span.innerText = text
    document.body.appendChild(span)
    const textWidth = span.offsetWidth
    document.body.removeChild(span)
    const scale = containerWidth / (textWidth + 10)
    return {
      transform: `scale(${scale > baseScale ? baseScale : scale}) translateX(-50%)`,
    }
  } else {
    return {
      transform: `scale(${baseScale}) translateX(-50%)`,
    }
  }
}

const getWidgetBg = (widget: Widget) => {
  if (widget.iconType === 'uploadIcon') {
    return { backgroundImage: `url(${widget.iconImage})` }
  } else {
    return { backgroundColor: widget.iconColor }
  }
}

const handleWidgetMenu = (e: MouseEvent, widget: Widget) => {
  handleWidgetBaseContextMenu(e)
  currentWidget.value = dataWidgetList.value.find(w => w.id === widget.id) as Widget
  const menuItems = widgetMenuConfig[widget.type]
  const layoutMenu = menuItems.find(item => item.event === 'LAYOUT_WIDGET')
  if (layoutMenu?.options) {
    layoutMenu.options = layoutMenu.options.map(option => ({
      ...option,
      active: option.id === `${widget.size.width}x${widget.size.height}`,
    }))
  }
  setMenuItems(menuItems)
}

const handleWidgetMenuSelect = (item: IContextMenu) => {
  console.log(currentWidget.value)
  const widget = currentWidget.value
  if (!widget) return
  switch (item.event) {
    case 'LAYOUT_WIDGET_1X1':
      widget.size = {
        width: 1,
        height: 1,
      }
      break
    case 'LAYOUT_WIDGET_2X1':
      widget.size = {
        width: 2,
        height: 1,
      }
      break
    case 'LAYOUT_WIDGET_1X2':
      widget.size = {
        width: 1,
        height: 2,
      }
      break
    case 'LAYOUT_WIDGET_2X2':
      widget.size = {
        width: 2,
        height: 2,
      }
      break
    case 'LAYOUT_WIDGET_4X2':
      widget.size = {
        width: 4,
        height: 2,
      }
      break
    case 'EDIT_ICON':
      openIconSetting(widget)
      break
    case 'ICON_OPEN_TAB':
      openIconTab(widget)
      break
  }
  currentWidget.value = null
}

const handleMenuSelect = (item: IContextMenu) => {
  switch (item.event) {
    case 'ADD_WIDGET':
      handleAddWidget()
      break
    case 'CHANGE_WALLPAPER':
      changeWallpaper()
      break
    case 'SETTING':
      isShowDrawer.value = true
      break
  }
}

function handleAddWidget() {
  dataWidgetList.value.push({
    id: 'clock2',
    name: '时钟',
    iconName: '时钟',
    iconColor: '#000000',
    addr: '',
    type: 'icon',
    iconType: 'textIcon',
    size: {
      width: 2,
      height: 2,
    },
    state: {
      isActive: false,
      isDragging: false,
    },
  })
}
const iconStore = useIconStore()
const { values } = storeToRefs(iconStore)

onMounted(() => {
  document.addEventListener('click', () => {
    showWidgetMenu.value = false
    showRootMenu.value = false
    currentWidget.value = null
  })
})

onUnmounted(() => {
  document.removeEventListener('click', () => {
    showWidgetMenu.value = false
    showRootMenu.value = false
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  @apply flex flex-col wh-full user-select-none;
  .app-header {
    @apply h-[3vh];
  }

  .app-widget {
    flex: 1 1 0%; // 第一个1表示flex-grow，第二个1表示flex-shrink，0%表示flex-basis   => 表示子元素的宽度为0，子元素的宽度会根据内容自动调整
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
