import type { SchemaType } from "./schemaTypes.type";

const wallpaperSchema: SchemaType = {
  wallpaper: {
    title: '壁纸',
    type: 'wallpaper',
    configs: [
      {
        label: '壁纸',
        type: 'custom-imgUpload',
        value: 'wallpaperImg',
        defaultValue: '',
      },
      {
        label: '模糊度',
        type: 'slider',
        value: 'wallpaperBlur',
        class: 'flex-1',
        defaultValue: 0,
        props: {
          min: 0,
          max: 40,
          step: 1,
        },
        unit: '%',
      },
      {
        label: '遮罩浓度',
        type: 'slider',
        value: 'wallpaperMask',
        class: 'flex-1',
        defaultValue: 0,
        props: {
          min: 0,
          max: 100,
          step: 1,
        },
        unit: '%',
      },
    ],
  },
}

export default wallpaperSchema