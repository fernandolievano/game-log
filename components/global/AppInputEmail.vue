<template>
  <div class="w-full max-w-[500px] text-left flex flex-col gap-2">
    <label for="email" class="capitalize font-bold text-left w-full text-sm px-1 tracking-wide">
      Email <span v-if="required">*</span>
    </label>
    <input v-model="model" type="email" id="email" name="email" class="w-full border rounded-lg py-3 px-5 tracking-wider"
      :class="[hasErrors ? 'border-pink-700' : 'border-current']" placeholder="Enter your email"
      required>
    <p class="text-xs text-left px-1 text-pink-700 h-4 tracking-wide">
      <span v-if="hasErrors" class="flex items-center justify-start gap-1">
        <CircleX :size="16"></CircleX>
        {{ displayError }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next';
const props = defineProps<{
  required: boolean;
  errors?: Array<string>;
}>();
const hasErrors = computed(() => (props.errors != null && props.errors.length >= 1));
const displayError = computed(() => (props.errors != null ? props.errors[0] : ''));
const model = defineModel<string>();
</script>