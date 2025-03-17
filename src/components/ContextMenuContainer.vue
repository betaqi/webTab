<template>
  <div class="context-menu-container" @contextmenu.prevent="handleContextMenu">
    <slot></slot>
    <ContextMenu
      v-model:show="showContextMenu"
      :position="menuPosition"
      :menu-items="currentMenuItems"
      @select="handleMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import ContextMenu from '@/components/ContextMenu.vue'
import { useContextMenu } from '@/composables/useContextMenu'

interface MenuConfig {
  [key: string]: IContextMenu[]
}

interface Props {
  defaultMenuItems?: IContextMenu[]
  widgetMenuConfig?: MenuConfig
  show?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [IContextMenu]
  'update:show': [boolean]
}>()

const {
  show: showContextMenu,
  position: menuPosition,
  menuItems: currentMenuItems,
  handleContextMenu,
  setupClickOutside,
} = useContextMenu(props.defaultMenuItems || [])

watch(
  () => props.show,
  newVal => {
    if (newVal !== undefined) {
      showContextMenu.value = newVal
    }
  }
)

watch(showContextMenu, newVal => {
  emit('update:show', newVal)
})

const handleMenuSelect = (item: IContextMenu) => {
  emit('select', item)
}

onMounted(() => {
  const cleanup = setupClickOutside()
  onUnmounted(cleanup)
})
</script>

<style lang="scss" scoped>
.context-menu-container {
  @apply w-full h-full;
}
</style>
