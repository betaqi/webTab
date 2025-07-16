import type { SchemaType } from "./schemaTypes.type"
import { swatches } from '@/utils'

const iconSchema: SchemaType = {
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
        class: 'flex-1',
        unit: 'px',
      },
      {
        label: '图标圆角',
        type: 'slider',
        value: 'iconRadius',
        defaultValue: 16,
        props: (context) => ({
          min: 0,
          max: context?.values?.iconSize / 2 || 100,
          step: 1,
        }),
        cssVar: '--icon-radius',
        class: 'flex-1',
        unit: 'px',
      },
      {
        label: '不透明度',
        type: 'slider',
        value: 'iconOpacity',
        defaultValue: 100,
        class: 'flex-1',
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
        class: 'flex-1',
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
        props: {
          size: "small"
        },
      },
      {
        label: '名称颜色',
        type: 'colorPicker',
        value: 'nameColor',
        defaultValue: '#fff',
        cssVar: '--icon-nameColor',
        props: {
          swatches: swatches,
        },
        style: {
          width: '28px',
          height: '28px'
        }
      },
      {
        label: '字体大小',
        type: 'slider',
        value: 'nameSize',
        class: 'flex-1',
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
        class: 'flex-1',
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

export default iconSchema