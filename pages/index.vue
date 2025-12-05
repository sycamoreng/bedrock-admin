<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between">
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
      <p @click="modal.show()">ddshdh</p>

      <div class="flex items-center">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
          <div class="relative" />
          <button
            id="tabsDropdownButton" data-dropdown-toggle="tabsDropdownResidences" data-dropdown-trigger="click" type="button"
            class="inline-flex items-center justify-between gap-x-3 text-gray-600 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 font-medium rounded-base text-sm px-3 py-2 focus:outline-none">
            All Residences
            <PhosphorIconCaretDown />
          </button>
          <div
            id="tabsDropdownResidences"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li
                v-for="(item, index) in residencesData" :key="index"
                class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                <p class="text-xs">{{item.title}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
          <div class="relative" />
          <button
            id="tabsDropdownButton" data-dropdown-toggle="tabsDropdownBookingSource" data-dropdown-trigger="click" type="button"
            class="inline-flex items-center justify-between gap-x-3 text-gray-600 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 font-medium rounded-base text-sm px-3 py-2 focus:outline-none">
            Booking Source
            <PhosphorIconCaretDown />
          </button>
          <div
            id="tabsDropdownBookingSource"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li
                v-for="(item, index) in residencesData" :key="index"
                class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                <p class="text-xs">{{item.title}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Timeline :residences="bookingStore.reservations" :timeline-days="timelineDays" />

    <FormModal uid="booking-info" title="Booking Information">
      <BookingInfo />
    </FormModal>
  </div>
</template>

<script setup>
import { Modal } from 'flowbite'
import { useFlowbite } from '~/composables/useFlowbite';

const dayjs = useDayjs()

const bookingStore = useBookingStore();

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
  const $modalElement = document.querySelector('#booking-info');
  const modal = new Modal($modalElement);
});
onMounted(() => {
  bookingStore.fetchReservations({
    start_date: dayjs().subtract(12, "months"),
    end_date: dayjs().format("YYYY-MM-DD"),
  });
});

const { timelineDays, currentDate, daysToShow } = useReservations()

const residencesData = [
  {
    title: "Bateye Residence",
  }
];

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
