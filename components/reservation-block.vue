<!-- reservation-block.vue -->
<template>
  <div
    class="absolute h-9 rounded-md flex items-center px-2 text-xs font-semibold text-white shadow-sm cursor-pointer"
    :class="bgColor"
    :style="{
      top: '10px',
      left: offsetPx + 'px',
      width: widthPx + 'px'
    }"
    @click="Window.alert('hello')"
  >
    {{ reservation.guest }}
  </div>
</template>

<script setup>
const dayjs = useDayjs();

const props = defineProps({
  reservation: Object,
  timelineDays: Array,
  dayWidth: Number
})

/** TIMELINE RANGE */
const timelineStart = props.timelineDays[0]
const timelineEnd = props.timelineDays[props.timelineDays.length - 1]

/** RESERVATION RANGE */
const resStart = dayjs(props.reservation.start)
const resEnd = dayjs(props.reservation.end)

/** CLAMPED START */
const visibleStart = resStart.isAfter(timelineStart)
  ? resStart
  : timelineStart

/** CLAMPED END */
const visibleEnd = resEnd.isBefore(timelineEnd)
  ? resEnd
  : timelineEnd

/** LEFT OFFSET */
const offsetPx = computed(() => {
  const daysFromStart = visibleStart.diff(timelineStart, 'day')
  return daysFromStart * props.dayWidth
})

/** WIDTH */
const widthPx = computed(() => {
  const span = visibleEnd.diff(visibleStart, 'day') + 1
  return span * props.dayWidth
})

/** COLORS */
const bgColor = computed(() => {
  switch (props.reservation.status) {
    case 'confirmed': return 'bg-green-600'
    case 'checked-in': return 'bg-blue-600'
    case 'pending': return 'bg-yellow-500 text-black'
    case 'maintenance': return 'bg-gray-500'
    default: return 'bg-gray-700'
  }
})
</script>

