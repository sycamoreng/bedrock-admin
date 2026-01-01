<template lang="">
  <div>
    <label :for="id" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{{label}}</label>
    <input
      :id="id" :type="type" :required="required" :disabled="disabled"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-offset-0 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary"
      :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
  </div>
</template>
<script setup>
  defineOptions({
    name: "CustomInput"
  })
  defineProps({
    id: {
      type: String,
      default: "input-id",
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  defineEmits(['update:modelValue']);
</script>