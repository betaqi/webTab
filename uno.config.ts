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
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
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
