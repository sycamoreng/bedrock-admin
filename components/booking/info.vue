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
  defineProps({
    bookingInfo: Object,
  });
</script>
