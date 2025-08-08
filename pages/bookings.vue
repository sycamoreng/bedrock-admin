<template>
  <div class="relative">
    <div class="bg-white p-5 flex justify-between">
      <div class="flex gap-x-2">
        <div class="relative max-w-sm">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input id="datepicker-autohide" datepicker datepicker-autohide datepicker-autoselect-today
            :datepicker-min-date="$dayjs().subtract(60, 'days' ).format('MM/DD/YYYY')"
            :datepicker-max-date="$dayjs().format('MM/DD/YYYY')" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date">
        </div>
        <button id="tabsDropdownButton" data-dropdown-toggle="tabsDropdown" data-dropdown-trigger="click" type="button"
          class="inline-flex items-center px-5 py-2 text-xs text-center text-white bg-primary rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{selectedTab.title || 'Filter by Status'}}
          <span
            class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-600 bg-blue-200 rounded-full">
            {{selectedTab.count}}
          </span>
        </button>
        <div id="tabsDropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li v-for="(item, index) in tabs" :key="index"
              class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              @click="selectTab(item)">
              <p class="text-xs">{{item.title}}
              </p>
              <p
                class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {{item.count}}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex gap-x-2">
        <button data-drawer-target="new-booking-modal" data-drawer-show="new-booking-modal" data-drawer-placement="right"
          aria-controls="new-booking-modal" data-drawer-backdrop="true"
          class="bg-primary text-xs text-white border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          type="button">
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
          <tr v-for="(item, index) in bookings" :key="index"
            data-drawer-target="view-booking-modal" data-drawer-show="view-booking-modal"
            data-drawer-placement="right" aria-controls="view-booking-modal" @click="selectedPartner = item"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.id}}
            </th>
            <td class="px-6 py-4 capitalize">{{`${item?.Customer?.first_name} ${item?.Customer?.last_name}`}}</td>
            <td class="px-6 py-4 capitalize">{{item.Apartment?.Residence?.name}}</td>
            <td class="px-6 py-4 text-wrap">{{item.Apartment?.name}}</td>
            <td class="px-6 py-4">{{$dayjs(item?.check_in_start).format('DD/MM/YYYY')}}</td>
            <td class="px-6 py-4">{{$dayjs(item?.check_out_end).format('DD/MM/YYYY')}}</td>
            <td class="px-6 py-4">
              <span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full capitalize"
                :class="item.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">{{item.status}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormDrawer uid="new-booking-modal" title="Create Booking">
      <template #icon>
        <PhosphorIconBuilding />
      </template>
      <div class="mb-6">
        <div class="mb-6">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g Oduduwa Residence" required />
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About this
            residence</label>
          <textarea id="description" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a very good description of this residence..."></textarea>
        </div>
        <div class="mb-6">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <input type="text" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Physical Address" required />
        </div>
        <div class="mb-6">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location (Google
            iFrame embed)</label>
          <input type="text" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g https://www.google.com/maps/embed?..." required />
        </div>
        <button type="submit"
          class="text-white justify-center flex items-center bg-primary hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create
          Residence</button>
      </div>
    </FormDrawer>
    <FormDrawer uid="view-booking-modal" title="">
      <template #icon>
        <PhosphorIconHouse />
      </template>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
  import { useFlowbite } from '~/composables/useFlowbite';

  const bookingStore = useBookingStore();

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
  });

  const selectedTab = reactive({
    title: null,
    count: 0,
  });
  const selectedBooking = ref(null);

  const tabs = computed(() => {
    return [
      {
        title: "All",
        count: 60,
      },
      {
        title: "Checked in",
        count: 17,
      },
      {
        title: "Checked out",
        count: 19,
      },
      {
        title: "Checking out soon",
        count: 4,
      },
    ]
  });

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
    console.log(item);
  };
</script>
