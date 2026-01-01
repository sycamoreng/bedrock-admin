<template lang="">
  <div id="targetElement" class="p-4 mb-4 text-sm text-fg-brand-strong rounded-base bg-brand-softer" role="alert">
    <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
  </div>
</template>
<script setup>
import { Dismiss } from 'flowbite';

// target element that will be dismissed
const $targetEl = document.getElementById('targetElement');

// optional trigger element
// const $triggerEl = document.getElementById('triggerElement');

// options object
const options = {
  transition: 'transition-opacity',
  duration: 1000,
  timing: 'ease-out',

  // callback functions
  onHide: (context, targetEl) => {
    console.log('element has been dismissed')
    console.log(targetEl)
  }
};

// instance options object
const instanceOptions = {
  id: 'targetElement',
  override: true
};

const dismiss = new Dismiss($targetEl, null, options, instanceOptions);
</script>