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
          type="button"
          data-modal-target="create-booking" data-modal-show="create-booking"
          data-modal-placement="right" aria-controls="create-booking">
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
                class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full capitalize"
                :class="item.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">{{item.status}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormModal uid="create-booking" title="Create Booking">
      <template #icon>
        <PhosphorIconBuilding />
      </template>
      <div v-if="bookingTab === 0" class="mb-6">
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <label for="cb-residences" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Residence</label>
            <select
              id="cb-residences"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <!-- <option
                v-for="(item, index) in residenceStore.residences" v-if="residenceStore.residences?.length"
                :key="index">{{item.name}}</option> -->
                <option value="-">Select Residence</option>
                <option value="bateye">Bateye Residence</option>
            </select>
          </div>
          <div class="w-full">
            <label for="cb-apartments" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Apartment</label>
            <select
              id="cb-apartments"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <!-- <option
                v-for="(item, index) in residenceStore.residences" v-if="residenceStore.residences?.length"
                :key="index">{{item.name}}</option> -->
                <option value="-">Select Apartment</option>
                <option value="bateye">Onyx</option>
            </select>
          </div>
        </div>
        <div id="date-range-picker" date-rangepicker class="mb-4 flex gap-x-2">
          <div class="w-full">
            <div class="relative max-w-sm">
              <!-- <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div> -->
              <CustomInput id="cb-check_in" name="start" label="Check in" type="text" placeholder="Select Date" required />
            </div>
          </div>
          <div class="w-full">
            <div class="relative max-w-sm">
              <!-- <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div> -->
              <CustomInput id="cb-check_out" name="end" label="Check out" type="text" placeholder="Select Date" required />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-2">
          <div class="flex items-center mb-4">
            <input id="cb-party_rate" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label for="cb-party_rate" class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Apply Party Rate</label>
          </div>
          <div class="flex items-center mb-4">
            <input checked id="cb-apply_caution_fee" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label for="cb-apply_caution_fee" class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Apply Caution fee</label>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <CustomInput id="cb-price" type="text" label="Base Amount(N)" placeholder="N245,000" required />
          </div>
          <div>
            <CustomInput id="cb-cautionFee" type="text" label="Caution Fee" placeholder="N50,000" required />
          </div>
        </div>
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <CustomInput id="cb-guestName" type="text" label="Guest Name" placeholder="e.g John Doe" required />
          </div>
          <div class="w-full">
            <CustomInput id="cb-guestEmail" label="Guest Email" type="email" placeholder="e.g john@email.xyz" required />
          </div>
        </div>
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <CustomInput id="cb-guestPhone" type="tel" label="Guest Phone" placeholder="e.g +2348012345678" required />
          </div>
          <div class="w-full">
            <CustomInput id="cb-guestAddress" label="Guest Address" type="text" placeholder="Enter Address" required />
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <label for="cb-occupants_adult" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adults</label>
            <select
              id="cb-occupants_adult"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <label for="cb-occupants_child" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Children</label>
            <select
              id="cb-occupants_child"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>
      </div>
      <div v-else-if="bookingTab === 1" class="mb-6">
        <BookingInfo />
      </div>
      <Button text="Create Booking" />
    </FormModal>
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

  const tabs = ["All Bookings", "Confirmed", "In-house", "Checking out soon", "Checked out"];
  const currentTab = ref(0);
  const bookingTab = ref(0);
  const bookingForm = reactive({
    name: "",
    tag_line: "",
    about: "",
    address: "",
    location: "",
  });

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
  });

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
