<template lang="">
  <div>
    <div class="bg-white border-[0.5px] border-gray-200 p-4 rounded-lg flex flex-col gap-y-2">
      <p class="font-medium text-sm">Guest Information</p>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Guest Name</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.guest_name}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Email</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.guest_email}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Phone</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.guest_phone}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Address</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.guest_address}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">No. of Occupants</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.no_of_adults}} Adult(s), {{bookingInfo?.no_of_children}} Child</p>
      </div>
    </div>
    <div class="bg-white border-[0.5px] border-gray-200 p-4 rounded-lg flex flex-col gap-y-2 mt-3">
      <p class="font-medium text-sm">Booking Information</p>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Residence</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.residence_name}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Apartment</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.apartment_name}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Address</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.residence_address}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Check in</p>
        <p class="text-xs text-black font-medium">{{$dayjs(bookingInfo?.check_in).format("dddd DD, MMMM YYYY")}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Check out</p>
        <p class="text-xs text-black font-medium">{{$dayjs(bookingInfo?.check_out).format("dddd DD, MMMM YYYY")}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Nights</p>
        <p class="text-xs text-black font-medium">{{bookingInfo?.nights}} night(s)</p>
      </div>
      <div v-if="bookingInfo.status" class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Status</p>
        <p class="text-xxs font-medium px-2 py-0.5 rounded-full capitalize" :class="statusChecker.classes">{{statusChecker?.status}}</p>
      </div>
    </div>
    <div class="bg-white border-[0.5px] border-gray-200 p-4 rounded-lg flex flex-col gap-y-2 mt-3">
      <p class="font-medium text-sm">Payment</p>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Base Rate</p>
        <p class="text-xs text-black font-medium">{{convertToNaira(bookingInfo?.base_price)}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Discount</p>
        <p class="text-xs text-black font-medium">{{convertToNaira(bookingInfo?.discount)}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Tax</p>
        <p class="text-xs text-black font-medium">{{convertToNaira(bookingInfo?.tax)}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Refundable Caution fee</p>
        <p class="text-xs text-black font-medium">{{convertToNaira(bookingInfo?.caution_fee)}}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-500">Total Amount</p>
        <p class="text-xs text-black font-medium">{{convertToNaira(bookingInfo?.total_price)}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    bookingInfo: Object,
  });

  const statusChecker = computed(() => {
    const bookingInfo = props.bookingInfo;

    if (!bookingInfo.status) return null;

    if (bookingInfo.status === 'confirmed') {
      return {
        status: bookingInfo.status,
        classes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      }
    } else if (bookingInfo.status === 'pending') {
      return {
        status: bookingInfo.status,
        classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      }
    } else if (bookingInfo.status === 'checked_in') {
      return {
        status: "Checked in",
        classes: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      }
    } else if (bookingInfo.status === 'checked_out') {
      return {
        status: "Checked out",
        classes: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      }
    } else {
      return {
        status: "unavailable",
        classes: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      }
    }
  })
</script>
