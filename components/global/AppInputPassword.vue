<template>
  <div class="w-full max-w-[500px] text-left flex flex-col gap-2">
    <label for="password" class="capitalize font-bold text-left w-full text-sm px-1 tracking-wide">
      Password <span v-if="required">*</span>
    </label>
    <div class="relative w-full h-fit">
      <input v-model="model" :type="isVisible ? 'text' : 'password'" id="password" name="password"
        class="w-full border rounded-lg py-3 px-5 tracking-wider text-xs sm:text-sm h-[50px]"
        :class="[hasErrors ? 'border-pink-700' : 'border-current']" placeholder="Create your password" required>
      <button class="absolute right-0 top-0 h-full py-3 px-5 rounded-r-lg border cursor-pointer transition-colors"
        :class="[hasErrors ? 'border-pink-700 dark:hover:text-white hover:text-black' : 'border-current bg-white dark:bg-black']"
        type="button" @click="isVisible = !isVisible" title="Toggle Visibility">
        <EyeClosed v-if="isVisible"></EyeClosed>
        <Eye v-else></Eye>
      </button>
    </div>
    <p class="text-xs text-left px-1 text-pink-700 h-4 tracking-wide">
      <span v-if="hasErrors" class="flex items-center justify-start gap-1">
        <CircleX :size="16"></CircleX>
        {{ displayError }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Eye, EyeClosed, CircleX } from 'lucide-vue-next';
const props = defineProps<{
  required: Boolean;
  errors?: Array<string>;
}>();
const hasErrors = computed(() => (props.errors != null && props.errors.length >= 1));
const displayError = computed(() => (props.errors != null ? props.errors[0] : ''));
const model = defineModel<string>();
const isVisible = ref<boolean>(false);
</script>