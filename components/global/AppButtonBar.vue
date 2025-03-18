<template>
  <button
    class="w-12 h-12 rounded-full cursor-pointer transition-colors flex items-center justify-center text-current bg-white dark:bg-black border border-day dark:border-night hover:bg-day dark:hover:bg-night duration-300 p-3">
    <slot></slot>
  </button>
</template>