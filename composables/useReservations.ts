import { ref, computed } from 'vue'
import dayjs from 'dayjs'

export function useReservations() {
  const residences = ref([
    {
      id: 1,
      name: 'Bateye Residence',
      apartments: [
        {
          id: 101,
          name: 'Apt 101',
          reservations: [
            {
              id: 'R-1243',
              guest: 'John Doe',
              start: dayjs('2025-01-01'),
              end: dayjs('2025-01-04'),
              status: 'confirmed'
            },
            {
              id: 'M-01',
              start: dayjs('2025-01-06'),
              end: dayjs('2025-01-07'),
              status: 'maintenance'
            }
          ]
        },
        {
          id: 102,
          name: 'Apt 102',
          reservations: [
            {
              id: 'R-2121',
              guest: 'Alice Smith',
              start: dayjs('2025-01-03'),
              end: dayjs('2025-01-06'),
              status: 'checked-in'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Oduduwa Residence',
      apartments: [
        {
          id: 101,
          name: 'Apt 201',
          reservations: [
            {
              id: 'R-1243',
              guest: 'John Doe',
              start: dayjs('2025-12-08'),
              end: dayjs('2025-12-10'),
              status: 'confirmed'
            },
            {
              id: 'M-01',
              start: dayjs('2025-12-03'),
              end: dayjs('2025-12-07'),
              status: 'maintenance'
            }
          ]
        },
        {
          id: 102,
          name: 'Apt 202',
          reservations: [
            {
              id: 'R-2121',
              guest: 'Alice Smith',
              start: dayjs('2025-12-06'),
              end: dayjs('2025-12-12'),
              status: 'checked-in'
            }
          ]
        }
      ]
    }
  ])

  const currentDate = ref(dayjs())
  const daysToShow = ref(10)

  const timelineDays = computed(() =>
    Array.from({ length: daysToShow.value }, (_, i) =>
      currentDate.value.add(i, 'day')
    )
  )

  return { residences, timelineDays, currentDate, daysToShow }
}
