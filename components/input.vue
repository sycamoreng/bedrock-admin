<template lang="">
  <div class="mb-3">
    <div class="mb-1" v-if="label">
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{label}}</label>
    </div>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <slot />
      </div>
      <input :id="id" :type="type" :required="required" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </div>
</template>
<script setup>
  defineOptions({
    name: "Input"
  })
  defineProps({
    id: {
      type: String,
      default: "input-id",
    },
    label: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    modelValue: String,
    required: {
      type: Boolean,
      default: false,
    },
  });
  defineEmits(['update:modelValue']);
</script>