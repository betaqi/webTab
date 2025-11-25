<script setup lang="ts">
import { NColorPicker, NSlider, NSwitch } from 'naive-ui'

interface IBuilderProps {
  type: string
  propsOptions: any
  context?: any
}
const modelValue = defineModel()

const componentMap: Record<string, Component | undefined> = {
  slider: NSlider,
  switch: NSwitch,
  colorPicker: NColorPicker,
}

const props = defineProps<IBuilderProps>()

const realProps = computed(() => {
  if (typeof props.propsOptions === 'function') {
    if (!props.context) {
      console.warn('[FormBuilder] propsOptions 为函数但未传 context，已自动使用空对象')
      return props.propsOptions({})
    }
    return props.propsOptions(props.context)
  }
  return props.propsOptions
})
</script>

<template>
  <component
    :is="componentMap[props.type]"
    v-bind="realProps"
    v-model:value="modelValue"
  />
</template>

<style scoped lang="scss"></style>
