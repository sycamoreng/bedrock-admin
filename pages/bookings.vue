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
              v-model="bookingForm.residence_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <!-- <option
                v-for="(item, index) in residenceStore.residences" v-if="residenceStore.residences?.length"
                :key="index">{{item.name}}</option> -->
                <option value="-">Select Residence</option>
                <option v-for="(item, index) in residenceStore.residences" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="w-full">
            <label for="cb-apartments" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Apartment</label>
            <select
              id="cb-apartments"
              v-model="bookingForm.apartment_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <!-- <option
                v-for="(item, index) in residenceStore.residences" v-if="residenceStore.residences?.length"
                :key="index">{{item.name}}</option> -->
                <option value="-">Select Apartment</option>
                <option v-for="(item, index) in apartments" :key="index" :value="item.id">{{item.name}}</option>
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
              <CustomInput id="cb-check_in" v-model="bookingForm.check_in" name="start" label="Check in" type="text" placeholder="Select Date" required />
            </div>
          </div>
          <div class="w-full">
            <div class="relative max-w-sm">
              <!-- <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div> -->
              <CustomInput id="cb-check_out" v-model="bookingForm.check_out" name="end" label="Check out" type="text" placeholder="Select Date" required />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-2">
          <div class="flex items-center mb-4">
            <input id="cb-party_rate" v-model="bookingForm.apply_party_rate" :checked="bookingForm.apply_party_rate" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label for="cb-party_rate" class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Apply Party Rate</label>
          </div>
          <div class="flex items-center mb-4">
            <input id="cb-apply_caution_fee" v-model="bookingForm.apply_caution_fee" :checked="bookingForm.apply_caution_fee" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
            <label for="cb-apply_caution_fee" class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Apply Caution fee</label>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <CustomInput id="cb-price" v-model="bookingForm.rate" type="text" label="Base Amount(N)" placeholder="N245,000" disabled />
          </div>
          <div>
            <CustomInput id="cb-cautionFee" v-model="bookingForm.caution_fee" type="text" label="Caution Fee" placeholder="N50,000" disabled />
          </div>
        </div>
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <CustomInput id="cb-guestName" v-model="bookingForm.guest_name" type="text" label="Guest Name" placeholder="e.g John Doe" required />
          </div>
          <div class="w-full">
            <CustomInput id="cb-guestEmail" v-model="bookingForm.guest_email" label="Guest Email" type="email" placeholder="e.g john@email.xyz" required />
          </div>
        </div>
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <CustomInput id="cb-guestPhone" v-model="bookingForm.guest_phone" type="tel" label="Guest Phone" placeholder="e.g +2348012345678" required />
          </div>
          <div class="w-full">
            <CustomInput id="cb-guestAddress" v-model="bookingForm.guest_address" label="Guest Address" type="text" placeholder="Enter Address" required />
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <label for="cb-occupants_adult" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adults</label>
            <select
              id="cb-occupants_adult"
              v-model="bookingForm.no_of_adults"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>
          <div>
            <label for="cb-occupants_child" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Children</label>
            <select
              id="cb-occupants_child"
              v-model="bookingForm.no_of_children"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label for="cb-payment_method" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
          <select
            id="cb-payment_method"
            v-model="bookingForm.payment_method"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="paystack">Online (Paystack)</option>
            <option value="transfer">Mobile Transfer to Bedrock Account</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank Deposit (Over the Counter)</option>
          </select>
        </div>
      </div>
      <div v-else-if="bookingTab === 1" class="mb-6">
        <BookingInfo />
      </div>
      <div class="w-1/2 flex justify-self-end">
        <Button text="View Summary" @click="handleBookingAction" />
      </div>
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
  const residenceStore = useResidenceStore();
  const apartmentStore = useApartmentStore();

  const tabs = ["All Bookings", "Confirmed", "In-house", "Checking out soon", "Checked out"];
  const currentTab = ref(0);
  const bookingTab = ref(0);
  const bookingForm = reactive({
    residence_id: "-",
    apartment_id: "-",
    check_in: "2025-12-29",
    check_out: "2025-12-31",
    apply_party_rate: false,
    apply_caution_fee: true,
    rate: null,
    caution_fee: null,
    guest_name: null,
    guest_email: null,
    guest_phone: null,
    guest_address: null,
    no_of_adults: 1,
    no_of_children: 1,
    payment_method: "paystack",
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
    residenceStore.getResidences({type: 'no-cascade'});
    apartmentStore.getApartments();
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

  const apartments = computed(() => {
    const selectedResidence = apartmentStore.apartments?.filter(item => item?.Residence?.id === bookingForm.residence_id);
    return selectedResidence;
  })

  const selectTab = (item) => {
    selectedTab.title = item.title;
    selectedTab.count = item.count;
  };
  const selectBooking = (item) => {
    selectedBooking.value = item;
  };

  const handleBookingAction = () => {
    if (bookingTab.value === 0) {
      bookingStore.generateBookingSummary(bookingForm);
      // if (!bookingStore.bookingSummary) {}
    } else if (bookingTab.value === 1) {
      bookingStore.createBooking();
    }
  };

  watch(() => bookingForm.apartment_id, (bookingFormValue) => {
    if (bookingFormValue.apartment_id !== "-") {
      const findApartment = apartments.value?.find(item => item?.id === bookingForm.apartment_id);
      if (bookingForm.apply_party_rate) {
        bookingForm.rate = findApartment.party_price;
      } else {
        bookingForm.rate = findApartment.price;
      }
      if (bookingForm.apply_caution_fee) {
        bookingForm.caution_fee = findApartment.caution_fee;
      }
    }
  });
  watch(() => bookingForm.apply_party_rate, (newValue) => {
    if (bookingForm.apartment_id !== "-") {
      const findApartment = apartments.value?.find(item => item?.id === bookingForm.apartment_id);
      if (newValue) {
        bookingForm.rate = findApartment.party_price;
      } else {
        bookingForm.rate = findApartment.price;
      }
    }
  });
  watch(() => bookingForm.apply_caution_fee, (newValue) => {
    if (bookingForm.apartment_id !== "-") {
      const findApartment = apartments.value?.find(item => item?.id === bookingForm.apartment_id);
      if (newValue) {
        bookingForm.caution_fee = findApartment.caution_fee;
      } else {
        bookingForm.caution_fee = null;
      }
    }
  });
</script>
