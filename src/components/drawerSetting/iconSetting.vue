<template>
  <div class="w-full h-full py-[10px] pl-[10px] pr-[20px] flex flex-col gap-y-[10px]">
    <n-card
      v-for="(section, sectionIndex) in iconSchema"
      :key="sectionIndex"
      :title="section.title"
      hoverable
      class="rounded-[6px]"
    >
      <div
        v-for="(config, configIndex) in section.configs"
        :key="configIndex"
        class="flex justify-between items-center gap-x-[12px] px-[12px] h-[36px]"
      >
        <span>{{ config.label }}</span>
        <FormBuilder
          v-model="values[config.value]"
          :type="config.type"
          :style="config.style"
          :class="config.class"
          :props-options="config.props"
          :context="{ values }"
        />
        <span v-if="config.unit">{{ values[config.value] }}{{ config.unit }}</span>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from '@/stores/icon'
import FormBuilder from '@/components/common/FormBuilder.vue'
import iconSchema from '@/schema/iconSchema'
import { storeToRefs } from 'pinia'
const iconStore = useIconStore()
const { values } = storeToRefs(iconStore)
</script>
