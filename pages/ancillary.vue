<template>
  <div class="relative overflow-x-auto p-5">
    <div class="grid grid-cols-4 gap-x-2 mb-10">
      <div class="bg-transparent border border-gray-200 rounded-xl p-6">
        <p class="text-xs text-gray-400 mb-1">Pending Order</p>
        <p class="text-2xl font-semibold">14</p>
      </div>
      <div class="bg-transparent border border-gray-200 rounded-xl p-6">
        <p class="text-xs text-gray-400 mb-1">Completed</p>
        <p class="text-2xl font-semibold">9</p>
      </div>
      <div class="bg-transparent border border-gray-200 rounded-xl p-6">
        <p class="text-xs text-gray-400 mb-1">Amount Sold</p>
        <p class="text-2xl font-semibold">30</p>
      </div>
    </div>
    <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Service Name</th>
          <th scope="col" class="px-6 py-3">Category</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in [...Array(8)]" :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
          <!-- <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.user_id}}
          </th> -->
          <td class="px-6 py-4">Laundry Service</td>
          <td class="px-6 py-4">Laundry</td>
          <td class="px-6 py-4">Wash, dry, and fold service. Ready within 24 hours</td>
          <td class="px-6 py-4">N23,000</td>
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
    <nav class="hidden items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
        <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
          class="font-semibold text-gray-900 dark:text-white">1000</span></span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a
href="#" aria-current="page"
            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
          <a
href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
      </ul>
    </nav>
    <FormModal uid="view-service" title="View Service">
      <!-- <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-y-3 mb-4">
        <p class="text-sm font-medium">Basic Info</p>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">Name</p>
          <p class="text-xs">{{`${selectedPartner?.first_name} ${selectedPartner?.last_name}`}}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">Email</p>
          <p class="text-xs">{{selectedPartner?.email}}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">Phone</p>
          <p class="text-xs">{{`${selectedPartner?.country_code}${parseInt(selectedPartner?.phone_number, 10)}`}}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">Address</p>
          <p class="text-xs">{{selectedPartner?.state}}, {{selectedPartner?.country}}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">Status</p>
          <p class="text-xs"></p>
        </div>
      </div> -->
      <div class="p-4 border border-gray-200 rounded-lg mb-4"></div>
      <div class="flex justify-end items-center gap-x-3">
        <Button text="Reject" class="bg-primary-light" text-color="text-primary" />
        <Button text="Approve" />
      </div>
    </FormModal>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Bedrock Admin | Residences & Apartments | Ancillary Services",
});

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
});

// const selectedService = ref(null);
</script>