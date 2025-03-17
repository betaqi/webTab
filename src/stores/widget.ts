import type { IWidget, WidgetIconVO } from '@/utils/types'
import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', () => {
  const widgetList = ref<IWidget[]>([
    {
      id: 'music_player',
      name: '音乐播放器',
      iconName: '🎵',
      iconColor: '#FF5733',
      addr: 'addr1',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 1, height: 1 },
    },
    {
      id: 'calendar',
      name: '日历',
      iconName: '📅',
      iconColor: '#33A1FF',
      addr: 'addr2',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 1, height: 1 },
    },
    {
      id: 'news_feed',
      name: '新闻快讯',
      iconName: '📰',
      iconColor: '#FF33A1',
      addr: 'addr3',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 2, height: 2 },
    },
    {
      id: 'fitness_tracker',
      name: '健身追踪',
      iconName: '🏃‍♂️',
      iconColor: '#33FF57',
      addr: 'addr4',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 1, height: 2 },
    },
    {
      id: 'photo_album',
      name: '相册',
      iconName: '📷',
      iconColor: '#FFC300',
      addr: 'addr5',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 2, height: 1 },
    },
    {
      id: 'weather_forecast',
      name: '天气预报',
      iconName: '⛅',
      iconColor: '#C70039',
      addr: 'addr6',
      type: 'icon',
      iconType: 'textIcon',
      size: { width: 1, height: 1 },
    },
  ])

  function findWidgetById(id: string) {
    const widget = widgetList.value.find(w => w.id === id)
    if (!widget) {
      new Error(`widget ${id} not found`)
    }
    return widget as IWidget
  }

  const getWidgetBg = (widget: IWidget) => {
    if (widget.iconType === 'uploadIcon') {
      return { backgroundImage: `url(${widget.iconImage})` }
    } else {
      return { backgroundColor: widget.iconColor }
    }
  }

  function createWidget() {
    widgetList.value.push({
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
    })
  }

  function layoutWidget(widget: IWidget, size: { width: number; height: number }) {
    const findWidget = findWidgetById(widget.id)
    if (findWidget) {
      findWidget.size = size
    }
  }

  const onEditIcon = (icon: WidgetIconVO) => {
    const widget = findWidgetById(icon.id)
    debugger
    if (widget) {
      widget.name = icon.name
      widget.iconColor = icon.iconColor
      widget.addr = icon.addr
      widget.iconName = icon.iconName
      widget.iconImage = icon.iconImage
      widget.iconType = icon.iconType
    }
  }

  return { widgetList, getWidgetBg, createWidget, onEditIcon, layoutWidget }
})
