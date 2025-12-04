<template>
  <div class="p-6 space-y-4">
    <!-- Date Navigation -->
    <div class="flex items-center space-x-4">
      <button class="px-4 py-2 bg-transparent border border-gray-300 text-black text-sm rounded-sm" @click="goToday">
        Today
      </button>

      <button class="px-4 py-2 bg-transparent rounded-sm outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary" @click="goPrev">
        <PhosphorIconCaretLeft />
      </button>

      <button class="px-4 py-2 bg-transparent rounded-sm outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary" @click="goNext">
        <PhosphorIconCaretRight />
      </button>

      <div class="text-sm flex items-center px-4 py-2 bg-transparent border border-gray-300 rounded-sm">
        <PhosphorIconCalendarDots />&nbsp;
        {{ currentDate.format('MMM DD, YYYY') }} - {{ currentDate.add(daysToShow, "days").format('MMM DD, YYYY') }}
      </div>

      <!-- <select v-model="daysToShow" class="border p-1 rounded">
        <option :value="10">10 days</option>
        <option :value="14">14 days</option>
        <option :value="30">30 days</option>
      </select> -->
    </div>

    <Timeline :residences="residences" :timeline-days="timelineDays" />
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const { residences, timelineDays, currentDate, daysToShow } = useReservations()

const goPrev = () => {
  currentDate.value = currentDate.value.subtract(daysToShow.value, 'day')
}

const goNext = () => {
  currentDate.value = currentDate.value.add(daysToShow.value, 'day')
}

const goToday = () => {
  currentDate.value = dayjs()
}
</script>
