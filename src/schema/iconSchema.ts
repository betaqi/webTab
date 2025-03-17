export default {
  icon: {
    title: '图标',
    type: 'icon',
    configs: [
      {
        label: '图标大小',
        type: 'slider',
        value: 'iconSize',
        defaultValue: 68,
        props: {
          min: 50,
          max: 130,
          step: 2,
        },
        cssVar: '--icon-size',
        unit: 'px',
      },
      {
        label: '图标圆角',
        type: 'slider',
        value: 'iconRadius',
        defaultValue: 16,
        props: {
          min: 0,
          max: 100,
          step: 1,
        },
        cssVar: '--icon-radius',
        unit: 'px',
      },
      {
        label: '不透明度',
        type: 'slider',
        value: 'iconOpacity',
        defaultValue: 100,

        props: {
          min: 0,
          max: 100,
          step: 1,
        },
        cssVar: '--icon-opacity',
        unit: '%',
      },
    ],
  },
  space: {
    title: '间距',
    type: 'space',
    configs: [
      {
        label: '行间距',
        type: 'slider',
        value: 'iconRowSpace',
        unit: 'px',
        defaultValue: 27,
        props: {
          min: 0,
          max: 100,
          step: 1,
        },
        cssVar: '--icon-gap',
      },
    ],
  },
  name: {
    title: '名称',
    type: 'name',
    configs: [
      {
        label: '名称',
        type: 'switch',
        value: 'nameTextShow',
        defaultValue: true,
        cssVar: '--icon-name',
        props: {},
      },
      {
        label: '名称颜色',
        type: 'colorPicker',
        value: 'nameColor',
        defaultValue: '#fff',
        cssVar: '--icon-nameColor',
      },
      {
        label: '字体大小',
        type: 'slider',
        value: 'nameSize',
        defaultValue: 14,
        props: {
          min: 12,
          max: 30,
          step: 1,
        },
        cssVar: '--icon-nameSize',
        unit: 'px',
      },
    ],
  },
  iconBox: {
    title: '图标最大宽度',
    type: 'iconBox',
    configs: [
      {
        label: '最大宽度',
        type: 'slider',
        value: 'iconGridWidth',
        defaultValue: 900,
        props: {
          min: 900,
          max: 2000,
          step: 10,
        },
        cssVar: '--icon-grid-width',
        unit: 'px',
      },
    ],
  },
}
