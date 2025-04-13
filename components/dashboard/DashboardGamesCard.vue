<template>
  <div
    class="w-full max-w-[400px] mx-auto grid grid-cols-1 grid-rows-[2fr_auto] md:grid-rows-[2fr_60px] gap-0 items-start h-full"
    :title="name">
    <div class="relative overflow-hidden flex items-start h-fit">
      <img class="object-top rounded-2xl"
        :class="[imageHasError ? 'object-contain p-4 w-[50%] h-full max-h-[155px] mx-auto' : 'w-full h-auto object-cover border-t border-day dark:border-night']"
        :src="image" :alt="imageAlt" @error="setDefaultImage" loading="lazy">
    </div>

    <div
      class="px-2 py-2 md:pl-4 w-full h-full flex justify-between items-start gap-4 bg-gradient-to-b from-white to-day dark:from-black dark:to-night rounded-b-2xl shadow-lg shadow-gray-300 dark:shadow-zinc-900">
      <h3 class="text-sm font-semibold font-poppins tracking-wider max-w-[80%] line-clamp-2">{{ name }}</h3>
      <span
        class="bg-gradient-to-tr from-purple-500 to-pink-600 text-white px-2 py-1 rounded-2xl text-xs font-sans flex-nowrap text-nowrap">
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