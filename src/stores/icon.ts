import { defineStore } from 'pinia'
import iconSchema from '@/schema/iconSchema'
import type { IWidget } from '@/utils/types'

interface Values {
  [key: string]: any
}

export const useIconStore = defineStore('icon', () => {
  const values = reactive<Values>({})

  // 初始化响应式变量
  const allConfigs = [
    ...iconSchema.icon.configs,
    ...iconSchema.space.configs,
    ...iconSchema.name.configs,
    ...iconSchema.iconBox.configs,
  ]

  allConfigs.forEach(config => {
    values[config.value] = config.defaultValue
  })

  const setNameColor = (value: string) => {
    values.nameColor = value
  }

  // 统一处理 CSS 变量映射
  allConfigs.forEach(config => {
    if (config.cssVar) {
      watch(
        () => values[config.value],
        newValue => {
          if (config.value === 'nameTextShow') {
            document.documentElement.style.setProperty(
              config.cssVar,
              newValue ? 'block' : 'none'
            )
          } else {
            document.documentElement.style.setProperty(
              config.cssVar,
              `${newValue}${config?.unit ?? ''}`
            )
          }
        }
      )
    }
  })

  const getIconTextStyle = (widget: IWidget) => {
    const baseScale = 0.94
    const text = widget.iconName
    const { width } = widget.size
    if (width === 1) {
      const containerWidth = width * values.iconSize
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

  return { values, setNameColor, getIconTextStyle }
})
