import { menuConfigs } from '@/utils/menuConfig'
import type { IContextMenu, Widget } from '@/utils/types'

export function useContextMenuManager() {
  const activeMenuType = ref<'global' | 'widget' | null>(null)
  const position = ref({ x: 0, y: 0 })
  const menuItems = ref<IContextMenu[]>([])
  const currentWidget = ref<Widget | null>(null)

  function showGlobalMenu(event: MouseEvent) {
    activeMenuType.value = 'global'
    position.value = { x: event.clientX, y: event.clientY }
    menuItems.value = menuConfigs.global.items
    currentWidget.value = null
  }

  function showWidgetMenu(event: MouseEvent, widget: Widget) {
    activeMenuType.value = 'widget'
    position.value = { x: event.clientX, y: event.clientY }
    menuItems.value = menuConfigs.widget(widget.type)
    const layoutMenuItem = menuItems.value.find(item => item.id === 'layout')
    if (layoutMenuItem && layoutMenuItem.options) {
      layoutMenuItem.options = layoutMenuItem.options.map(option => ({
        ...option,
        active: option.id === `${widget.size.width}x${widget.size.height}`,
      }))
    }

    currentWidget.value = widget
  }

  function hideAllMenus() {
    activeMenuType.value = null
  }

  const isGlobalMenuVisible = computed(() => activeMenuType.value === 'global')
  const isWidgetMenuVisible = computed(() => activeMenuType.value === 'widget')
  const visible = computed(() => isGlobalMenuVisible.value || isWidgetMenuVisible.value)

  return {
    isGlobalMenuVisible,
    isWidgetMenuVisible,
    currentWidget,
    activeMenuType,
    visible,
    position,
    menuItems,
    showGlobalMenu,
    showWidgetMenu,
    hideAllMenus,
  }
}
