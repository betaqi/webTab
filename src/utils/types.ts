// 菜单选项类型
interface MenuOption {
  id: string
  label: string
  event: string
  active?: boolean
}

// 菜单项类型
interface IContextMenu {
  id: string
  label: string
  event?: string
  icon?: string
  options?: MenuOption[]
}

interface Widget {
  id: string
  name: string
  iconName: string
  iconColor: string
  addr: string
  type: string
  iconType: WidgetIconType
  size: {
    width: number
    height: number
  }

  iconImage?: string
  config?: Record<string, any> // 不同组件的特定配置
}

type WidgetIconType = 'uploadIcon' | 'textIcon'
type WidgetIconVO = Pick<
  Widget,
  'id' | 'addr' | 'name' | 'iconColor' | 'iconName' | 'iconImage' | 'iconType'
>

type WidgetMenuConfig = {
  [key: string]: IContextMenu[]
}

export type {
  IContextMenu,
  MenuOption,
  Widget,
  WidgetMenuConfig,
  WidgetIconVO,
  WidgetIconType,
}
