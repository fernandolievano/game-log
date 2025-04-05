<template>
  <header
    class="w-full rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-pink-600/50 shadow-xl flex flex-col items-start justify-start md:flex-row-reverse md:items-center">
    <div class="relative w-full h-fit max-w-[700px]">
      <img :src="image" :alt="imageAlt" @error="setDefaultImage" loading="eager"
        :class="[imageHasError ? 'object-contain p-4 w-auto h-full max-h-[128px] mx-auto' : 'w-full md:h-h-full object-cover object-center saturate-[70%] rounded-2xl z-0 transition-all duration-300 ease-in-out md:rounded-l-none']"
        style="image-rendering: auto;" />
      <div
        class="absolute h-full w-full inset-0 bg-gradient-to-br from-purple-500 to-transparent rounded-2xl from-5% to-90% transition-all duration-300 ease-in-out md:bg-gradient-to-l md:from-pink-500 md:rounded-l-none md:from-0% md:to-100% md:opacity-50">
      </div>
    </div>

    <div class="py-8 md:py-4 xl:py-8 px-4 md:px-8 w-full md:w-auto">
      <h1 class="text-2xl xl:text-3xl text-white text-center md:text-left">
        Your most played game is <strong class="text-3xl xl:text-4xl">{{ name }}</strong> with <strong
          class="text-3xl xl:text-4xl">{{ hoursPlayed }} hours</strong> of playtime.
      </h1>
    </div>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  playtime: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
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