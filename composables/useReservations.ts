import { ref, computed } from 'vue'
import dayjs from 'dayjs'

export function useReservations() {
  const currentDate = ref(dayjs())
  const daysToShow = ref(10)

  const timelineDays = computed(() =>
    Array.from({ length: daysToShow.value }, (_, i) =>
      currentDate.value.add(i, 'day')
    )
  )

  return { timelineDays, currentDate, daysToShow }
}
