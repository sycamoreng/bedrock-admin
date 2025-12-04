<template>
  <div class="relative w-full">
    <!-- Input area -->
    <div
      class="flex flex-wrap items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-primary-50 focus-within:border-primary w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary cursor-text"
      @click="focusInput"
    >
      <!-- Selected tags -->
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center bg-white text-black border border-gray-300 rounded-full px-2 py-1 text-xs mr-1"
      >
        <CustomIcon :icon="tag.icon" />&nbsp;
        {{ tag.label }}
        <button
          @click.stop="removeTag(index)"
          class="ml-1 text-xxs text-black bg-gray-300 rounded-full h-4 w-4 text-center"
        >
          ✕
        </button>
      </span>

      <!-- Text input -->
      <input
        ref="inputRef"
        v-model="search"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="showDropdown = true"
        @keydown.down.prevent="navigate(1)"
        @keydown.up.prevent="navigate(-1)"
        @keydown.enter.prevent="selectActive"
        @keydown.esc="hideDropdown"
        @keydown.backspace="checkDelete"
        type="text"
        :placeholder="tags.length ? '' : placeholder"
        class="flex-1 min-w-[100px] border-none focus:ring-0 outline-none"
      />
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="showDropdown && filteredOptions.length"
        class="absolute z-10 mt-1 w-full max-h-52 overflow-y-scroll bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <ul>
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.label"
            @mousedown.prevent="addTag(option)"
            :class="[
              'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-primary-50 text-xs',
              index === activeIndex ? 'bg-primary-50' : ''
            ]"
          >
            <CustomIcon :icon="option.icon" />
            {{ option.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "TagInput",
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      options: {
        type: Array,
        default: () => [],
      },
      placeholder: {
        type: String,
        default: "Select options...",
      },
    },
    data() {
      return {
        tags: [...this.value],
        search: "",
        showDropdown: false,
        activeIndex: -1,
        blurTimeout: null,
      };
    },
    computed: {
      normalizedOptions() {
        // normalize strings -> { label, icon: null }
        return this.options.map((opt) =>
          typeof opt === "string" ? { label: opt, icon: null } : opt
        );
      },
      filteredOptions() {
        const searchLower = this.search.toLowerCase();
        return this.normalizedOptions.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchLower) &&
            !this.tags.find((t) => t.label === opt.label)
        );
      },
    },
    watch: {
      tags(newVal) {
        this.$emit("update:value", newVal);
      },
    },
    methods: {
      focusInput() {
        this.$refs.inputRef.focus();
      },
      handleFocus() {
        this.showDropdown = true;
        if (this.blurTimeout) clearTimeout(this.blurTimeout);
      },
      handleBlur() {
        this.blurTimeout = setTimeout(() => {
          this.showDropdown = false;
        }, 150);
      },
      hideDropdown() {
        this.showDropdown = false;
      },
      addTag(option) {
        if (!this.tags.find((t) => t.label === option.label)) {
          this.tags.push(option);
        }
        this.search = "";
        this.activeIndex = -1;
        this.showDropdown = false;
        this.focusInput();
      },
      removeTag(index) {
        this.tags.splice(index, 1);
      },
      navigate(direction) {
        if (!this.filteredOptions.length) return;
        this.activeIndex =
          (this.activeIndex + direction + this.filteredOptions.length) %
          this.filteredOptions.length;
      },
      selectActive() {
        if (this.activeIndex >= 0) {
          this.addTag(this.filteredOptions[this.activeIndex]);
        } else if (this.filteredOptions.length === 1) {
          this.addTag(this.filteredOptions[0]);
        }
      },
      checkDelete() {
        if (!this.search) {
          this.tags.pop();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
