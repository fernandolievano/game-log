<template>
  <button class="relative overflow-hidden w-full text-center bg-gradient-to-tr from-black to-gray-one text-white dark:from-gray-three dark:to-white dark:text-black px-4 py-2 rounded-lg my-2 cursor-pointer transition-all duration-500 group hover:text-white">
    <div class="relative z-10"><slot></slot></div>
    <span
      class="absolute inset-0 bg-gradient-to-br from-pink-700 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    </span>
  </button>
</template>