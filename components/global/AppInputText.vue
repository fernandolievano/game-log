<template>
  <div
    class="py-4 w-full text-left flex flex-col gap-2 transition-colors"
    :class="[hasErrors ? 'text-red-800 dark:text-red-400' : 'text-current']"
  >
    <label
      :for="name"
      class="capitalize font-bold text-left w-full text-sm"
    >
      {{ name }} <span v-if="required">*</span>
    </label>
    <input
      type="text"
      :id="name"
      :name="name"
      class="w-full border rounded-lg py-2 px-4"
      :class="[hasErrors ? 'border-red-800 dark:border-red-400' : 'border-current']"
      :placeholder="`Enter your ${name}`"
      :required="required"
      >
  </div>
  <p class="text-xs italic text-left px-2 text-red-800 dark:text-red-400 h-4 -mt-2">
    <span v-show="hasErrors">Este campo es requerido para continuar</span>
  </p>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  required: boolean;
}>();
const hasErrors = ref<boolean>(false);
</script>