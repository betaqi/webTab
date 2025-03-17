import { defineStore } from 'pinia'
import iconSchema from '@/schema/wallpaperSchema'

interface Values {
  [key: string]: any
}

export const useWallpaperStore = defineStore('wallpaper', () => {
  const values = reactive<Values>({})

  // 初始化响应式变量
  const allConfigs = [...iconSchema.wallpaper.configs]

  allConfigs.forEach(config => {
    values[config.value] = config.defaultValue
  })

  function setWallpaperImg(imgUrl: Blob) {
    values.wallpaperImg = URL.createObjectURL(imgUrl)
  }

  // 统一处理 CSS 变量映射
  allConfigs.forEach(config => {
    if (config?.cssVar) {
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
              `${newValue}${config.unit}`
            )
          }
        }
      )
    }
  })

  return { values, setWallpaperImg }
})
