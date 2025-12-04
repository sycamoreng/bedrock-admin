<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
// import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGrid14Days',
        // titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        views: {
          dayGrid14Days: {
            type: 'dayGrid',
            dayCount: 7,
          },
        }
      }
    }
  }
}
</script>
