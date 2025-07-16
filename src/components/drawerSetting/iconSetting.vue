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
