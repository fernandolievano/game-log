<template>
  <div class="py-4 w-full text-left flex flex-col gap-2"
    :class="[hasErrors ? 'text-red-800 dark:text-red-400' : 'text-current']">
    <label for="password" class="capitalize font-bold text-left w-full text-sm">
      Password <span v-if="required">*</span>
    </label>
    <div class="relative w-full h-fit">
      <input v-model="model" :type="isVisible ? 'text' : 'password'" id="password" name="password"
        class="w-full border rounded-lg py-2 px-4"
        :class="[hasErrors ? 'border-red-800 dark:border-red-400' : 'border-current']"
        placeholder="Create your password" required>
      <button class="absolute right-0 top-0 h-full py-2 px-4 rounded-r-lg border cursor-pointer transition-colors"
        :class="[hasErrors ? 'border-red-800 dark:border-red-400 dark:hover:text-white hover:text-black' : 'border-current']"
        type="button" @click="isVisible = !isVisible" title="Toggle Visibility">
        <Eye v-if="isVisible"></Eye>
        <EyeClosed v-else></EyeClosed>
      </button>
    </div>
    <p class="text-xs italic text-left px-1 text-red-800 dark:text-red-400 h-4 -mt-1">
      <span v-if="hasErrors">{{ displayError }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Eye, EyeClosed } from 'lucide-vue-next';
const props = defineProps<{
  required: Boolean;
  errors?: Array<string>;
}>();
const hasErrors = computed(() => (props.errors != null && props.errors.length >= 1));
const displayError = computed(() => (props.errors != null ? props.errors[0] : ''));
const model = defineModel<string>();
const isVisible = ref<boolean>(false);
</script>