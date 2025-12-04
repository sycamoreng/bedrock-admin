<template lang="">
  <div :id="uid"
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-[82vw] dark:bg-gray-800"
    tabindex="-1" aria-labelledby="drawer-right-label">
    <h5 id="drawer-right-label"
      class="inline-flex gap-1 items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
      <slot name="icon" />
      {{title}}</h5>
    <button type="button" :data-drawer-hide="uid" :aria-controls="uid"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
      <PhosphorIconX />
    </button>
    <slot />
  </div>
</template>
<script>
  export default {
    name: "FormDrawer",
    props: {
      uid: String,
      title: String,
    }
  }
</script>