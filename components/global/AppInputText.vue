<template>
  <div class="w-full max-w-[500px] text-left flex flex-col gap-2 transition-colors">
    <label :for="name" class="capitalize font-bold text-left w-full text-sm px-1 tracking-wide">
      {{ name }} <span v-if="required">*</span>
    </label>
    <input v-model="model" type="text" :id="name" :name="name"
      class="w-full border rounded-lg py-3 px-5 tracking-wider text-xs sm:text-sm h-[50px]"
      :class="[hasErrors ? 'border-pink-700' : 'border-current']" :placeholder="`Enter your ${name}`" required>
  </div>
  <p class="text-xs text-left px-1 text-pink-700 h-4 tracking-wide">
    <span v-if="hasErrors" class="flex items-center justify-start gap-1">
      <CircleX :size="14"></CircleX>
      {{ displayError }}
    </span>
  </p>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next';
const props = defineProps<{
  name: string;
  required: boolean;
  errors?: Array<string>;
}>();
const hasErrors = computed(() => (props.errors != null && props.errors.length >= 1));
const displayError = computed(() => (props.errors != null ? props.errors[0] : ''));
const model = defineModel<string>();
</script>