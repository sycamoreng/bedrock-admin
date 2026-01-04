<template lang="">
  <div>
    <div v-if="bookingTab === 0" class="mb-6">
      <div class="mb-4 flex gap-x-2 justify-between items-center">
        <div class="w-full">
          <label for="cb-residences" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Residence</label>
          <select
            id="cb-residences"
            v-model="bookingForm.residence_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <option value="-">Select Residence</option>
              <option v-for="(item, index) in props.residencesData" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="w-full">
          <label for="cb-apartments" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Apartment</label>
          <select
            id="cb-apartments"
            v-model="bookingForm.apartment_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <option value="-">Select Apartment</option>
              <option v-for="(item, index) in apartments" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div id="date-range-picker" date-rangepicker datepicker-format="yyyy/mm/dd" class="mb-4 flex gap-x-2">
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
            <option value="0">0</option>
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
      <BookingInfo :booking-info="bookingInfo" />
    </div>
    <div class="flex gap-x-2">
      <Button v-if="bookingTab > 0" text="Go back" class="bg-white border border-gray-200" text-color="text-black" @click="bookingTab--" />
      <Button :text="bookingTab === 0 ? 'View Summary' : 'Create Booking'" :loading="formLoading" :disabled="!formReady || formLoading" @click="handleBookingAction" />
    </div>
  </div>
</template>
<script setup>
  import { useFlowbite } from '~/composables/useFlowbite';

  const dayjs = useDayjs()
  const toast = useToast();

  const bookingStore = useBookingStore();

  onMounted(() => {
    useFlowbite(() => {
      initFlowbite();
    })
  });

  const props = defineProps({
    residencesData: Array,
    apartmentsData: Array,
    bookingData: Object,
    callback: Function,
  });

  const bookingTab = ref(0);
  const formLoading = ref(false);
  const bookingForm = reactive({
    residence_id: props.bookingData?.residence_id || "-",
    apartment_id: props.bookingData?.apartment_id || "-",
    check_in: props.bookingData?.check_in || dayjs().format("YYYY-MM-DD"),
    check_out: props.bookingData?.check_out || dayjs().add(1, "days").format("YYYY-MM-DD"),
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
  const bookingInfo = reactive({});

  const apartments = computed(() => {
    const selectedResidence = props.apartmentsData?.filter(item => item?.Residence?.id === bookingForm.residence_id);
    return selectedResidence;
  })
  const findApartment = computed(() => {
    const selectedApartment = props.apartmentsData?.find(item => item?.id === bookingForm.apartment_id);
    return selectedApartment;
  })
  const findResidence = computed(() => {
    const selectedResidence = props.residencesData?.find(item => item?.id === bookingForm.residence_id);
    return selectedResidence;
  })
  const formReady = computed(() => {
    if (bookingTab.value === 0) {
      if (bookingForm.residence_id && bookingForm.apartment_id && bookingForm.check_in && bookingForm.check_out && bookingForm.guest_name && bookingForm.guest_email && bookingForm.guest_phone && bookingForm.guest_address && bookingForm.no_of_adults >= 1 && bookingForm.no_of_children >= 0 && bookingForm.payment_method) {
        return true;
      } else {
        return false;
      }
    } else if (bookingTab.value === 1) {
      return true;
    }
    return false;
  });

  const handleBookingAction = async () => {
    try {
      if (bookingTab.value === 0) {
        formLoading.value = true;
        const response = await bedrockServiceClient({
          url: `/admin/booking/summary`,
          method: "post",
          data: bookingForm,
        });
        formLoading.value = false;
        const { data } = response.data;
        bookingTab.value = 1;
        Object.assign(
          bookingInfo,
          {
            guest_name: bookingForm.guest_name,
            guest_email: bookingForm.guest_email,
            guest_phone: bookingForm.guest_phone,
            guest_address: bookingForm.guest_address,
            no_of_adults: bookingForm.no_of_adults,
            no_of_children: bookingForm.no_of_children,
            residence_name: findResidence.value.name,
            residence_address: findResidence.value.address,
            apartment_name: findApartment.value.name,
            check_in: data.check_in_start,
            check_out: data.check_out_end,
            nights: data.nights,
            base_price: data.price_before_tax,
            caution_fee: data.caution_fee,
            tax: data.tax,
            total_price: data.total_price,
            discount: data.discount_amount,
            nightly_breakdown: data.nightly_breakdown,
          }
        );
      } else if (bookingTab.value === 1) {
        formLoading.value = true;
        await bookingStore.createBooking(bookingForm);
        formLoading.value = false;
        toast.add({
          title: "Yaay! Booking succesfully created",
          description: "This booking was successfully registered. Kindly advise the guest to proceed with payment if not settled yet.",
          icon: "i-ph-calendar-check",
          color: "success"
        });
        callback();
      }
    } catch (err) {
      toast.add({
        title: "Oops! Something went wrong",
        description: "Unfortunately, we were not able to proceed with this booking. Please reach out to our support team",
        icon: "i-ph-smiley-sad",
        color: "error"
      })
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
