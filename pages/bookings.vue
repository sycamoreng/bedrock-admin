<template>
  <div class="relative">
    <div class="bg-white p-5 flex justify-between items-center">
      <div>
        <p class="text-xs text-gray71 mb-2">Here's a list of your bookings</p>
        <div class="bg-gray-100/60 border border-gray-200 rounded-md p-[2px] w-fit flex items-center">
          <div
            v-for="(item, index) in tabs" :key="index"
            class="text-center text-sm py-1 px-6 cursor-pointer"
            :class="index === currentTab ? 'bg-primary-light2 border border-primary-light3 rounded-md text-primary' : 'text-gray71'"
            @click="currentTab = index">
            {{item}}
          </div>
        </div>
      </div>
      <div class="flex gap-x-2">
        <button
          class="bg-primary text-xs text-white border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          @click="handleOpenBookingModal">
          <PhosphorIconBuilding /> Create new Booking
        </button>
      </div>
    </div>
    <div class="relative overflow-y-scroll p-5">
      <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Booking No.</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Residence</th>
            <th scope="col" class="px-6 py-3">Apartment</th>
            <th scope="col" class="px-6 py-3">Check in</th>
            <th scope="col" class="px-6 py-3">Check out</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in bookings" :key="index"
            data-drawer-target="view-booking-modal" data-drawer-show="view-booking-modal"
            data-drawer-placement="right" aria-controls="view-booking-modal" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
            @click="selectedPartner = item">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.id}}
            </th>
            <td class="px-6 py-4 capitalize">{{`${item?.Customer?.first_name} ${item?.Customer?.last_name}`}}</td>
            <td class="px-6 py-4 capitalize">{{item.Apartment?.Residence?.name}}</td>
            <td class="px-6 py-4 text-wrap">{{item.Apartment?.name}}</td>
            <td class="px-6 py-4">{{$dayjs(item?.check_in_start).format('DD/MM/YYYY')}}</td>
            <td class="px-6 py-4">{{$dayjs(item?.check_out_end).format('DD/MM/YYYY')}}</td>
            <td class="px-6 py-4">
              <span
                class="text-xxs font-medium me-2 px-2 py-0.5 rounded-full capitalize"
                :class="item.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">{{item.status}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UModal v-model:open="openViewModal" title="View Booking" description="">
      <template #body>
        <BookingInfo  />
      </template>
    </UModal>

    <UModal v-model:open="openModal" title="Create Booking" description="">
      <template #body>
        <BookingCreate
          :residences-data="residenceStore.residences"
          :apartments-data="apartmentStore.apartments" />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  import { useFlowbite } from '~/composables/useFlowbite';

  const bookingStore = useBookingStore();
  const residenceStore = useResidenceStore();
  const apartmentStore = useApartmentStore();

  definePageMeta({
    layout: "default",
  });

  useHead({
    title: "Bedrock Admin | Residences & Apartments | Bookings",
  });

  onMounted(() => {
    useFlowbite(() => {
      initFlowbite();
    })
  });
  onMounted(() => {
    bookingStore.getBookings();
    residenceStore.getResidences({type: 'no-cascade'});
    apartmentStore.getApartments();
  });

  const tabs = ["All Bookings", "Confirmed", "In-house", "Checking out soon", "Checked out"];
  const currentTab = ref(0);
  const openModal = ref(false);
  const openViewModal = ref(false);
  const handleOpenBookingModal = () => {
    openModal.value = !openModal.value;
  }
  const handleViewBookingModal = (reservation) => {
    console.log(reservation)
    openViewModal.value = !openViewModal.value;
  }

  const selectedTab = reactive({
    title: null,
    count: 0,
  });
  const selectedBooking = ref(null);

  const bookings = computed(() => {
    if (!selectedTab.title) {
      return bookingStore.bookings;
    } else {
      // const selectedResidence = residenceStore.residences?.find(item => item.name === selectedTab.title);
      return [];
    }
  });

  const selectTab = (item) => {
    selectedTab.title = item.title;
    selectedTab.count = item.count;
  };
  const selectBooking = (item) => {
    selectedBooking.value = item;
  };
</script>
