import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScalpel } from 'unocss-preset-scalpel'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {
    colors: {},
  },
  content: {
    pipeline: {
      include: [
        //参考：https://unocss.dev/guide/extracting#extracting-from-build-tools-pipeline
        /\.(vue|[jt]sx|mdx?|html)($|\?)/,
        'src/router/index.ts',
        'src/views/home/utils/menuConfig.ts',
      ],
    },
  },
  rules: [['wh-full', { width: '100%', height: '100%' }]],
  presets: [
    presetRemToPx(),
    presetScalpel(),
    presetWind3(),
    presetAttributify({
      prefix: 'uno-',
      prefixedOnly: true,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {},
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
