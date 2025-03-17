export default {
  wallpaper: {
    title: '壁纸',
    type: 'wallpaper',
    configs: [
      {
        label: '壁纸',
        type: 'imgUpload',
        value: 'wallpaperImg',
        defaultValue: '',
      },
      {
        label: '模糊度',
        type: 'slider',
        value: 'wallpaperBlur',
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
