<template>
  <div class="w-full h-full p-y-10 p-l-10 p-r-20 flex flex-col gap-y-10px">
    <n-card
      v-for="(section, sectionIndex) in iconSchema"
      :key="sectionIndex"
      :title="section.title"
      hoverable
      class="border-radius-6"
    >
      <div
        v-for="(config, configIndex) in section.configs"
        :key="configIndex"
        class="flex justify-between items-center gap-col-12px p-x-12 h-36"
      >
        <span>{{ config.label }}</span>
        <!-- {{ config.value }} -->

        <template v-if="config.type === 'slider' && config.value === 'iconRadius'">
          <n-slider
            class="flex-1"
            v-model:value="values[config.value]"
            v-bind="config.props"
            :max="iconRadiusMax"
          />
        </template>

        <n-slider
          v-else-if="config.type === 'slider'"
          class="flex-1"
          v-model:value="values[config.value]"
          v-bind="config.props"
        />
        <n-switch
          size="small"
          v-else-if="config.type === 'switch'"
          v-model:value="values[config.value]"
        />
        <n-color-picker
          v-else-if="config.type === 'colorPicker'"
          v-model:value="values[config.value]"
          style="width: 28px; height: 28px"
          :swatches="swatches"
        />
        <span v-if="config.unit">{{ values[config.value] }}{{ config.unit }}</span>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from '@/stores/icon'
import iconSchema from '../../../../schema/iconSchema'
import { storeToRefs } from 'pinia'
import { swatches } from '@/views/home/utils'

const iconStore = useIconStore()
const { values } = storeToRefs(iconStore)

const iconRadiusMax = computed(() => {
  return values.value?.iconSize / 2
})
</script>
