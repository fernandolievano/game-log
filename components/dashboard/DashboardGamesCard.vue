<template>
  <div class="w-full max-w-[400px] mx-auto flex flex-col justify-start">
    <div class="relative aspect-[16/9] overflow-hidden flex items-center">
      <img class="object-center rounded-2xl"
        :class="[imageHasError ? 'object-contain p-4 w-[50%] h-full mx-auto' : 'w-full h-auto object-cover border border-day dark:border-night']"
        :src="image" :alt="imageAlt" @error="setDefaultImage" loading="lazy">
    </div>

    <div class="px-2 py-2 w-full flex justify-between items-start gap-4">
      <h3 class="text-sm font-semibold font-poppins tracking-wider max-w-[80%]">{{ name }}</h3>
      <span
        class="bg-purple-500 dark:bg-pink-700 text-white px-2 py-1 rounded-2xl text-xs font-sans flex-nowrap text-nowrap">
        {{ hoursPlayed }} hours
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  appid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  playtime: {
    type: Number,
    required: true,
  },
});

const hoursPlayed = computed(() => Math.round(props.playtime / 60));
const imageHasError = ref(false);
const imageAlt = computed(() => {
  return imageHasError ? 'No photo icons created by Wyasa.Design - Flaticon' : `${props.name} Cover`;
});
const setDefaultImage = (e: Event) => {
  imageHasError.value = true;
  const target = e.target as HTMLImageElement;
  if (target) {
    target.src = '/no-photo.png';
  }
};
</script>