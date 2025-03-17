import { defineStore } from 'pinia'
import iconSchema from '@/schema/iconSchema'

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

  return { values, setNameColor }
})
