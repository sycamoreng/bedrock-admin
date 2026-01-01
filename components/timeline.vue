<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full overflow-x-auto border rounded-sm border-gray-200 bg-white">

    <!-- Date Header -->
    <div class="grid" :style="{ gridTemplateColumns: '200px ' + repeatCol }">
      <div class="bg-gray-100 pt-4 font-medium text-sm text-center text-gray71">
        Apartments
      </div>

      <div
        v-for="day in timelineDays"
        :key="day.valueOf()"
        class="bg-white text-center p-2 border-r-[0.5px] border-gray-200 text-sm"
      >
        <p class="text-xs">{{ day.format('ddd') }}</p>
        <p class="text-sm font-medium">{{ day.format('D MMM') }}</p>
      </div>
    </div>

    <!-- Residences -->
    <div v-for="residence in residences" :key="residence.id" class="w-fit">
      <div
        class="font-medium bg-gray-100 p-2 border-y-[0.5px] border-gray-200 text-sm flex items-center gap-x-3 cursor-pointer"
        @click="residenceVisibility[`r${residence.id}`] = !residenceVisibility[`r${residence.id}`]">
        {{ residence.name }}
        <PhosphorIconCaretUp v-if="residenceVisibility[`r${residence.id}`]" />
        <PhosphorIconCaretDown v-else />
      </div>

      <!-- Apartment Row -->
      <div
        v-for="apt in residence.apartments"
        :key="apt.id"
        class="relative border-b border-gray-200"
        :class="residenceVisibility[`r${residence.id}`] ? 'grid' : 'hidden'"
        :style="{ gridTemplateColumns: '200px ' + repeatCol }"
      >
        <!-- Apartment Label -->
        <div class="border-r-[0.5px] border-gray-200 pl-2 pt-4 text-sm text-gray71 h-12">
          {{ apt.name }}
        </div>

        <!-- Grid Cells -->
        <div
          v-for="day in timelineDays"
          :key="day.valueOf()"
          class="border-r-[0.5px] h-12 border-gray-200"
          :class="filterReservationsByOverlap(apt.reservations, timelineDays)?.length < 1 && 'cursor-pointer z-10 hover:bg-gray-200'"
          @click="bookingAction(day, {residence_id: residence.id, apartment_id: apt.id})"
        ></div>

        <!-- OVERLAY (aligned exactly with the day columns) -->
        <div
          class="absolute inset-y-0"
          :style="{ left: '200px', right: '0' }"
        >
          <ReservationBlock
            v-for="res in filterReservationsByOverlap(apt.reservations, timelineDays)"
            :key="res.id"
            :reservation="res"
            :timeline-days="timelineDays"
            :day-width="120"
            :view-booking="(res) => handleViewBooking(res, apt, residence)"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const dayjs = useDayjs();

const props = defineProps({
  residences: Array,
  timelineDays: Array,
  bookingAction: Function,
  viewBooking: Function,
})
const residenceVisibility = ref({});
const handleVisibilityInit = () => {
  const data = {};
  props.residences.map(item => {
    data[`r${item.id}`] = true;
  });
  residenceVisibility.value = data;
}

watchEffect(() => {
  handleVisibilityInit();
});

const filterReservationsByOverlap = (reservations, days) => {
  if (!reservations || !days || days.length === 0) return []

  const viewStart = days[0].startOf('day')
  const viewEnd = days[days.length - 1].endOf('day')

  return reservations.filter(res => {
    return dayjs(res.start).isBefore(viewEnd) && dayjs(res.end).isAfter(viewStart)
  })
}
const handleViewBooking = (res, apt, residence) => {
  props.viewBooking({
    ...res,
    apartment_id: apt.id,
    apartment_name: apt.name,
    residence_id: residence.id,
    residence_name: residence.name,
  });
};

const repeatCol = computed(() => `repeat(${props.timelineDays.length}, 120px)`)
</script>
