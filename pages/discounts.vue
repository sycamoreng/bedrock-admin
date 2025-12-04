<template lang="">
  <div class="relative">
    <div class="bg-white p-5 flex justify-between items-center">
      <div>
        <p class="text-xs text-gray71 mb-2">Create and manage your discount codes here</p>
      </div>
      <div>
        <Button text="Create Discount" />
      </div>
    </div>
    <div class="p-5">
      <div class="grid grid-cols-4 gap-x-2 mb-10">
        <div class="bg-transparent border border-gray-200 rounded-xl p-6">
          <p class="text-xs text-gray-400 mb-1">Total Discounts</p>
          <p class="text-2xl font-semibold">2000</p>
        </div>
        <div class="bg-transparent border border-gray-200 rounded-xl p-6">
          <p class="text-xs text-gray-400 mb-1">Active Discounts</p>
          <p class="text-2xl font-semibold">20</p>
        </div>
        <div class="bg-transparent border border-gray-200 rounded-xl p-6">
          <p class="text-xs text-gray-400 mb-1">Total Redemptions</p>
          <p class="text-2xl font-semibold">30</p>
        </div>
      </div>
      <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Code</th>
            <th scope="col" class="px-6 py-3">Discount Type</th>
            <th scope="col" class="px-6 py-3">Value</th>
            <th scope="col" class="px-6 py-3">Valid Period</th>
            <th scope="col" class="px-6 py-3">Usage</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in [...Array(10)]" :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <td class="px-6 py-4">
              <p class="text-black font-medium capitalize">CODE1050</p>
            </td>
            <td class="px-6 py-4">Percentage</td>
            <td class="px-6 py-4">10%</td>
            <td class="px-6 py-4">Oct 28, 2025 - Nov 28, 2025</td>
            <td class="px-6 py-4">24/100</td>
            <td class="px-6 py-4">
              <span
                class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full capitalize"
                :class="'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'">Active</span>
            </td>
            <td class="px-6 py-4">
              <!-- <p class="cursor-pointer">
                <PhosphorIconDotsThreeOutlineVertical />
              </p> -->
              <span
              data-modal-target="view-partner" data-modal-show="view-partner"
              data-modal-placement="right" aria-controls="view-partner" class="text-primary" @click="selectedPartner = item">View</span>
              <span> • </span>
              <span class="text-blue-400">Edit</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

</script>