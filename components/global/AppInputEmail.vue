<template>
  <div class="py-4 w-full text-left flex flex-col gap-2"
    :class="[hasErrors ? 'text-pink-700' : 'text-current']">
    <label for="email" class="capitalize font-bold text-left w-full text-sm">
      Email <span v-if="required">*</span>
    </label>
    <input v-model="model" type="email" id="email" name="email" class="w-full border rounded-lg py-2 px-4"
      :class="[hasErrors ? 'border-pink-700' : 'border-current']" placeholder="Enter your email"
      required>
    <p class="text-xs italic text-left px-1 text-pink-700 h-4 -mt-1">
      <span v-show="hasErrors">{{ displayError }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  required: boolean;
  errors?: Array<string>;
}>();
const hasErrors = computed(() => (props.errors != null && props.errors.length >= 1));
const displayError = computed(() => (props.errors != null ? props.errors[0] : ''));
const model = defineModel<string>();
</script>