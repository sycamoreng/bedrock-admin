<template>
  <div class="relative">
    <div class="bg-white p-5 flex justify-between">
      <div class="flex gap-x-2">
        <!-- <div class="relative max-w-sm">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input id="datepicker-autohide" datepicker datepicker-autohide datepicker-autoselect-today
            :datepicker-min-date="$dayjs().subtract(60, 'days' ).format('MM/DD/YYY')"
            :datepicker-max-date="$dayjs().format('MM/DD/YYYY')" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date">
        </div> -->
        <button id="tabsDropdownButton" data-dropdown-toggle="tabsDropdown" data-dropdown-trigger="click" type="button"
          class="inline-flex items-center px-5 py-2 text-xs text-center text-white bg-primary rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{selectedTab.title || 'Filter Apartments'}}
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
        <button data-drawer-target="residence-modal" data-drawer-show="residence-modal" data-drawer-placement="right"
          aria-controls="residence-modal" data-drawer-backdrop="true"
          class="bg-primary text-xs text-white border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          type="button">
          <PhosphorIconBuilding /> Add new Residence
        </button>
        <button data-drawer-target="apartment-modal" data-drawer-show="apartment-modal" data-drawer-placement="right"
          aria-controls="apartment-modal"
          class="bg-white text-xs text-primary border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          type="button">
          <PhosphorIconHouse /> Add new Apartment
        </button>
      </div>
    </div>
    <div class="p-5 fixed overflow-y-scroll h-[80vh] w-[82%]">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div v-for="(item, index) in apartments" :key="index"
          class="bg-blue-200 h-auto min-h-[150px] max-w-full p-4 rounded-lg flex flex-col gap-y-10 cursor-pointer hover:bg-blue-300"
          data-drawer-target="view-apartment-modal" data-drawer-show="view-apartment-modal"
          data-drawer-placement="right" aria-controls="view-apartment-modal" @click="selectApartment(item)">
          <div>
            <p class="text-lg font-bold text-primary-500">{{item.name}}</p>
            <p class="text-xs text-gray-500">{{item.Residence?.name || selectedTab?.title}}</p>
          </div>
          <div v-if="item.guest" class="flex items-center gap-x-1">
            <img class="w-5 h-5 rounded-full" src="https://images.pexels.com/photos/33003197/pexels-photo-33003197.jpeg"
              alt="Resident">
            <p class="text-xs text-primary-500">{{item.guest}}</p>
          </div>
        </div>
      </div>
    </div>
    <FormDrawer uid="residence-modal" title="Create Residence">
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
    <FormDrawer uid="apartment-modal" title="Create Apartment">
      <template #icon>
        <PhosphorIconHouse />
      </template>
      <div class="mb-6">
        <div class="mb-4">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a
            residence</label>
          <select id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-if="residenceStore.residences?.length" v-for="(item, index) in residenceStore.residences"
              :key="index">{{item.name}}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g Executive 4-bedroom" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About this
            apartment</label>
          <textarea id="description" rows="4"
            class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a very good description of this apartment..."></textarea>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="N100,000" required />
          </div>
          <div>
            <label for="caution_fee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caution
              fee</label>
            <input type="text" id="caution_fee"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="N50,000" required />
          </div>
        </div>
        <div class="mb-4">
          <label for="max_no_of_occupants" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max.
            Occupants</label>
          <input type="number" id="max_no_of_occupants"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="8" required />
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <label for="no_of_bedrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
              Bedrooms</label>
            <input type="number" id="no_of_bedrooms"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="3" required />
          </div>
          <div>
            <label for="no_of_bathrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
              Bathrooms</label>
            <input type="number" id="no_of_bathrooms"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="4" required />
          </div>
        </div>
        <button type="submit"
          class="text-white justify-center flex items-center bg-primary hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create
          Apartment</button>
      </div>
    </FormDrawer>
    <FormDrawer uid="view-apartment-modal" :title="selectedApartment?.name">
      <template #icon>
        <PhosphorIconHouse />
      </template>
      <div>
        <div
          class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex -mb-px">
            <li class="me-2 w-full" v-for="(item, index) in selectedApartmentTabs" :key="index">
              <p @click="selectedApartmentTab = index"
                class="inline-block p-4 pb-2 border-b-2 rounded-t-lg cursor-pointer"
                :class="selectedApartmentTab === index ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'">
                {{item}}</p>
            </li>
          </ul>
        </div>
        <div id="view-apartment-manage" class="pt-5" v-if="selectedApartmentTab === 0">
          <div class="mb-4">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="title" :value="selectedApartment?.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g Executive 4-bedroom" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About this
              apartment</label>
            <textarea id="description" rows="4" :value="selectedApartment?.about"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a very good description of this apartment..."></textarea>
          </div>
          <div class="mb-4 grid grid-cols-2 gap-x-2">
            <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input type="text" id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N100,000" required />
            </div>
            <div>
              <label for="caution_fee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caution
                fee</label>
              <input type="text" id="caution_fee" :value="selectedApartment?.caution_fee"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N50,000" required />
            </div>
          </div>
          <div class="mb-4">
            <label for="max_no_of_occupants" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max.
              Occupants</label>
            <input type="number" id="max_no_of_occupants" :value="selectedApartment?.max_no_of_occupants"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="8" required />
          </div>
          <div class="mb-4 grid grid-cols-2 gap-x-2">
            <div>
              <label for="no_of_bedrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
                Bedrooms</label>
              <input type="number" id="no_of_bedrooms" :value="selectedApartment?.no_of_bedrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3" required />
            </div>
            <div>
              <label for="no_of_bathrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
                Bathrooms</label>
              <input type="number" id="no_of_bathrooms" :value="selectedApartment?.no_of_bathrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="4" required />
            </div>
          </div>
          <button type="submit"
            class="text-white justify-center flex items-center bg-primary hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update
            Apartment</button>
        </div>
        <div class="pt-5" v-if="selectedApartmentTab === 1">
          <div></div>
        </div>
        <div class="pt-5" v-if="selectedApartmentTab === 2">
          <div class="mb-4">
            <div class="flex justify-between items-center cursor-pointer" @click="selectedApartmentShowPhotoUpload = !selectedApartmentShowPhotoUpload">
              <p class="text-sm text-primary-500 font-bold mb-2 cursor-pointer">Upload new photos</p>
              <PhosphorIconCaretUp v-if="selectedApartmentShowPhotoUpload" />
              <PhosphorIconCaretDown v-else />
            </div>
            <div class="flex items-center justify-center w-full" v-if="selectedApartmentShowPhotoUpload">
              <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                      upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(item, index) in selectedApartment?.ApartmentImages" :key="index">
              <img class="h-auto max-w-full rounded-lg min-h-[150px] object-cover" :src="item?.url" alt="">
            </div>
          </div>
        </div>
      </div>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
  import { useFlowbite } from '~/composables/useFlowbite';

  const apartmentStore = useApartmentStore();
  const residenceStore = useResidenceStore();

  useHead({
    title: "Bedrock Admin | Residences & Apartments",
  });

  onMounted(() => {
    useFlowbite(() => {
      initFlowbite();
    })
  });
  onMounted(() => {
    apartmentStore.getApartments();
    residenceStore.getResidences();
  });

  const selectedTab = reactive({
    title: null,
    count: 0,
  });
  const selectedApartment = ref(null);
  const selectedApartmentTab = ref(0);
  const selectedApartmentShowPhotoUpload = ref(false);

  const selectedApartmentTabs = computed(() => {
    return ["Manage", "Amenities", "Photos"];
  });

  const tabs = computed(() => {
    return residenceStore.residences?.map(item => ({
      title: item.name,
      count: item.Apartments?.length || 0,
    }))
  });

  const apartments = computed(() => {
    if (!selectedTab.title) {
      return apartmentStore.apartments;
    } else {
      const selectedResidence = residenceStore.residences?.find(item => item.name === selectedTab.title);
      return selectedResidence.Apartments;
    }
  });

  const selectTab = (item) => {
    selectedTab.title = item.title;
    selectedTab.count = item.count;
  };
  const selectApartment = (item) => {
    selectedApartment.value = item;
    console.log(item);
  };
</script>
