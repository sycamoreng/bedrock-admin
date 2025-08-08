<template>
  <div class="relative overflow-x-auto p-5">
    <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Partner ID</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Account Type</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Phone</th>
          <th scope="col" class="px-6 py-3">Gender</th>
          <th scope="col" class="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in partnerStore.partners" :key="index"
          data-drawer-target="view-partner" data-drawer-show="view-partner"
          data-drawer-placement="right" aria-controls="view-partner" @click="selectedPartner = item"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.user_id}}
          </th>
          <td class="px-6 py-4 capitalize">{{`${item.first_name} ${item.last_name}`}}</td>
          <td class="px-6 py-4 capitalize">{{item.type}}</td>
          <td class="px-6 py-4 text-wrap">{{item.email}}</td>
          <td class="px-6 py-4">{{`${item.country_code}${parseInt(item.phone_number, 10)}`}}</td>
          <td class="px-6 py-4 capitalize">{{item.gender}}</td>
          <td class="px-6 py-4">
            <span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full capitalize"
              :class="item.status === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">{{item.status}}</span>
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
          <a href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a href="#" aria-current="page"
            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
      </ul>
    </nav>
    <FormDrawer uid="view-partner" title="View Partner" v-if="partnerStore?.partners?.length">
      <div class="flex flex-row gap-x-3 items-center">
        <img class="w-28 h-28 rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" alt="" />
        <div>
          <p class="font-medium">{{`${selectedPartner?.first_name} ${selectedPartner?.last_name}`}}</p>
          <p class="text-sm text-gray-400">{{selectedPartner?.email}}</p>
        </div>
      </div>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed, reactive } from 'vue'

  const partnerStore = usePartnerStore();

  onMounted(() => {
    useFlowbite(() => {
      initFlowbite();
    })
  });
  onMounted(() => {
    partnerStore.getPartners();
  });

  const selectedPartner = ref(null);
</script>