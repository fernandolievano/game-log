<template>
  <main class="w-full p-0 m-0 dark:bg-black dark:text-white bg-white text-black font-poppins">
    <NuxtLoadingIndicator />
    <div class="flex min-h-screen h-fit items-stretch justify-between p-4 gap-4 xl:gap-8">
      <div class="w-full h-fit lg:max-w-[600px] my-auto">
        <slot />
      </div>

      <div class="hidden lg:flex w-full min-h-full bg-[url(@/assets/images/pexels-marcellino-andrian-209361-671629.jpg)] bg-cover rounded-2xl" title="Photo by Marcellino Andrian: https://www.pexels.com/photo/mechanical-computer-keyboard-671629/">
      </div>
    </div>
  </main>
</template>