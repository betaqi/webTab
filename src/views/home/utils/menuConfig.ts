import type { IContextMenu, MenuOption, WidgetMenuConfig } from './types'

// 定义菜单事件类型
export type RootMenuEventType = 'ADD_WIDGET' | 'CHANGE_WALLPAPER'

export type WidgetMenuEventType = 'LAYOUT_WIDGET' | 'DELETE_WIDGET'

export type MenuEventType = RootMenuEventType | WidgetMenuEventType

// 布局选项
const layoutOptions: MenuOption[] = [
  { id: '1x1', label: '1 x 1', event: 'LAYOUT_WIDGET_1X1' },
  { id: '2x1', label: '2 x 1', event: 'LAYOUT_WIDGET_2X1' },
  { id: '1x2', label: '1 x 2', event: 'LAYOUT_WIDGET_1X2' },
  { id: '2x2', label: '2 x 2', event: 'LAYOUT_WIDGET_2X2' },
  { id: '4x2', label: '4 x 2', event: 'LAYOUT_WIDGET_4X2' },
]

// 根菜单配置
export const rootMenuConfig: IContextMenu[] = [
  {
    id: 'add',
    label: '添加组件',
    icon: 'i-mingcute:add-circle-line',
    event: 'ADD_WIDGET',
  },
  {
    id: 'wallpaper',
    label: '更换壁纸',
    icon: 'i-mingcute:pic-ai-line',
    event: 'CHANGE_WALLPAPER',
  },
  {
    id: 'setting',
    label: '设置',
    icon: 'i-mingcute:settings-5-line',
    event: 'SETTING',
  },
]

// Widget菜单配置
export const widgetMenuConfig: WidgetMenuConfig = {
  icon: [
    {
      id: 'icon-open-tab',
      label: '在新标签页打开',
      event: 'ICON_OPEN_TAB',
      icon: 'i-mingcute:share-3-line',
    },
    {
      id: 'layout',
      label: '布局',
      event: 'LAYOUT_WIDGET',
      icon: 'i-mingcute:layout-6-line',
      options: layoutOptions,
    },
    {
      id: 'edit-icon',
      label: '编辑图标',
      icon: 'i-mingcute:edit-4-line',
      event: 'EDIT_ICON',
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'i-mingcute:delete-2-line',
      event: 'DELETE_WIDGET',
    },
  ],
}
