<template lang="">
  <div class="relative">
    <div class="bg-white p-5 flex justify-between items-center">
      <div>
        <p class="text-xs text-gray71 mb-2">Manage roles and permissions</p>
        <div class="inline-flex rounded-md shadow-xs">
          <a
            v-for="(item, index) in tabs" :key="index" href="#" aria-current="page"
            class="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:bg-primary focus:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-primary dark:focus:text-white"
            :class="[currentTab === index ? 'text-primary' : 'text-gray-400 hover:text-primary', index === tabs.length - 1 ? 'rounded-e-lg' : 'rounded-s-lg']"
            @click="currentTab = index">
            {{item}}
          </a>
        </div>
      </div>
      <div>
        <Button text="Create Role" />
      </div>
    </div>
    <div class="p-5">
      <div>
        <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Permissions Enabled</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in [...Array(5)]" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
              <td class="px-6 py-4">Super Admin</td>
              <td class="px-6 py-4 capitalize">All permissions enabled</td>
              <td class="px-6 py-4">
                <p
                  data-modal-target="view-permisions" data-modal-show="view-permisions"
                  data-modal-placement="right" aria-controls="view-permisions" class="cursor-pointer">
                  <PhosphorIconEye />
                </p>
                <!-- <span
                data-modal-target="view-permisions" data-modal-show="view-permisions"
                data-modal-placement="right" aria-controls="view-permisions" class="text-primary" @click="selectedPartner = item">View</span>
                <span> • </span>
                <span class="text-blue-400">Edit</span> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FormModal uid="view-permisions" title="Edit Role Permissions">
      <div class="flex flex-col gap-y-4 mb-10">
        <div v-for="(item, index) in permissions" :key="index">
          <p class="text-sm font-medium mb-1">{{item.name}}</p>
          <div class="flex flex-row items-center gap-x-4 text-xs">
            <div v-for="(option, optionIndex) in item.options" :key="optionIndex" class="flex items-center gap-x-1">
              <input type="checkbox" value="" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
              <span>{{option}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-self-end items-center gap-x-3 w-3/4">
        <Button text="Cancel" class="bg-transparent border-gray-200" text-color="text-gray-500" />
        <Button text="Save Permissions" />
      </div>
    </FormModal>
  </div>
</template>

<script setup>
import { useFlowbite } from '~/composables/useFlowbite';

useHead({
  title: "Bedrock Admin | Residences & Apartments | Roles & Permissions",
});

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
});

const tabs = ["Role Management", "Permissions"];
const currentTab = ref(0);

const permissions = [
  {
    name: "Property Management",
    options: ["Manage Properties", "View Properties"],
  },
  {
    name: "Booking Operations",
    options: ["Manage Bookings", "Confirm Manual Payment"],
  },
  {
    name: "Channel Management",
    options: ["View Channel", "Manage Channels"],
  },
  {
    name: "User Access Control",
    options: ["View Channel", "Manage Channels"],
  },
];
</script>