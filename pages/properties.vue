<template>
  <div class="relative">
    <div class="bg-white p-5 flex justify-between items-center">
      <div>
        <p class="text-xs text-gray71 mb-2">Here's a list of your properties with Bedrock Residences</p>
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
          data-modal-target="residence-modal" data-modal-show="residence-modal" data-modal-placement="right"
          aria-controls="residence-modal" data-modal-backdrop="true"
          class="bg-primary text-xs text-white border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          type="button">
          <PhosphorIconBuilding /> Add new Residence
        </button>
        <button
          data-modal-target="apartment-modal" data-modal-show="apartment-modal" data-modal-placement="right"
          aria-controls="apartment-modal"
          class="bg-white text-xs text-primary border border-primary px-3 py-2 rounded-sm cursor-pointer flex items-center gap-1"
          type="button">
          <PhosphorIconHouse /> Add new Apartment
        </button>
      </div>
    </div>
    <div class="p-5 fixed overflow-y-scroll h-[80vh] w-[82%]">
      <!-- <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div v-for="(item, index) in residenceStore?.residences" :key="index"
          class="bg-blue-200 h-auto min-h-[150px] max-w-full p-4 rounded-lg flex flex-col gap-y-10 cursor-pointer hover:bg-blue-300"
          data-drawer-target="view-apartment-modal" data-drawer-show="view-apartment-modal"
          data-drawer-placement="right" aria-controls="view-apartment-modal">
          <div>
            <p class="text-lg font-bold text-primary-500">{{item.name}}</p>
            <p class="text-xs text-gray-500">{{item?.name}}</p>
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="currentTab === 0" class="relative overflow-y-scroll p-5">
      <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <!-- <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all" class="sr-only">checkbox</label>
              </div>
            </th> -->
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">No of Apartments</th>
            <th scope="col" class="px-6 py-3">Amenities</th>
            <th scope="col" class="px-6 py-3">Bank</th>
            <th scope="col" class="px-6 py-3">Account Number</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in residenceStore?.residences" :key="index"
            data-drawer-target="view-booking-modal" data-drawer-show="view-booking-modal"
            data-drawer-placement="right" aria-controls="view-booking-modal"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <!-- <td class="w-4 p-4 pr-0">
              <div class="flex items-center">
                <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-1" class="sr-only">checkbox</label>
              </div>
            </td> -->
            <td class="px-6 py-4 capitalize">
              <p class="text-black font-medium">{{item?.name}}</p>
              <p class="text-xxs">{{item?.address}}</p>
            </td>
            <td class="px-6 py-4 capitalize">{{item?.Apartments?.length}}</td>
            <td class="px-6 py-4 text-wrap"/>
            <td class="px-6 py-4"/>
            <td class="px-6 py-4"/>
            <td class="px-6 py-4 text-primary font-medium">Edit</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="currentTab === 1" class="relative overflow-y-scroll p-5">
      <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
        <div class="relative" />
        <button
          id="tabsDropdownButton" data-dropdown-toggle="tabsDropdown" data-dropdown-trigger="click" type="button"
          class="inline-flex items-center justify-center text-gray-600 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 font-medium rounded-base text-sm px-3 py-2 focus:outline-none">
          {{selectedResidenceTab.title || 'Filter Apartments'}}
          <span
            class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-gray-500 bg-gray-200 rounded-full">
            {{selectedResidenceTab.count}}
          </span>
        </button>
        <div
          id="tabsDropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li
              v-for="(item, index) in residenceTabs" :key="index"
              class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              @click="selectResidenceTab(item)">
              <p class="text-xs">{{item.title}}
              </p>
              <p
                class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-gray-500 bg-gray-200 rounded-full">
                {{item.count}}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <table class="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <!-- <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all" class="sr-only">checkbox</label>
              </div>
            </th> -->
            <th scope="col" class="px-6 py-3">Apartment</th>
            <th scope="col" class="px-6 py-3">Apartment Type</th>
            <th scope="col" class="px-6 py-3">No Of Occupants</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in apartments" :key="index"
            data-drawer-target="view-booking-modal" data-drawer-show="view-booking-modal"
            data-drawer-placement="right" aria-controls="view-booking-modal"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <!-- <td class="w-4 p-4 pr-0">
              <div class="flex items-center">
                <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-1" class="sr-only">checkbox</label>
              </div>
            </td> -->
            <td class="px-6 py-4 capitalize">
              <p class="text-black font-medium">{{item?.name}}</p>
              <p class="text-xxs">{{item?.Residence?.name}}</p>
            </td>
            <td class="px-6 py-4">{{item?.type}}</td>
            <td class="px-6 py-4">{{item?.max_no_of_occupants}}</td>
            <td class="px-6 py-4 text-primary font-medium">Edit</td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormModal uid="residence-modal" title="Create Residence">
      <template #icon>
        <PhosphorIconBuilding />
      </template>
      <div class="mb-4">
        <div class="mb-4">
          <CustomInput id="cr-name" v-model="residenceData.name" type="text" label="Name" placeholder="e.g Oduduwa Residence" required />
        </div>
        <div class="mb-4">
          <label for="cr-description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">About this
            residence</label>
          <textarea
            id="cr-description" v-model="residenceData.about" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-50 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary"
            placeholder="Write a very good description of this residence..." />
        </div>
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
          <TagInput
            v-model="selectedTags"
            :options="miscStore.amenities?.map(item => ({label: item?.name, icon: item?.icon, value: item?.slug}))"
            placeholder="Select Amenities"
          />
        </div>
        <div class="mb-4">
          <CustomInput id="cr-address" v-model="residenceData.address" type="text" label="Address" placeholder="Physical Address" required />
        </div>
        <div class="mb-4">
          <CustomInput
            id="location" v-model="residenceData.location" type="text" label="Location (Google
            iFrame embed)" placeholder="e.g https://www.google.com/maps/embed?..." required />
        </div>
        <div class="mb-4 flex gap-x-2 justify-between items-center">
          <div class="w-full">
            <CustomInput id="cr-bank" v-model="residenceData.location" type="text" label="Bank" placeholder="Sycamore MFB" required />
          </div>
          <div class="w-full">
            <CustomInput id="cr-accountNumber" v-model="residenceData.location" label="Account Number" type="text" placeholder="0000011111" required />
          </div>
        </div>
        <Button text="Create Residence" :loading="residenceFormLoading" :disabled="!residenceFormReady || residenceFormLoading" @click="createResidence" />
      </div>
    </FormModal>
    <FormModal uid="apartment-modal" title="Create Apartment">
      <template #icon>
        <PhosphorIconHouse />
      </template>
      <div class="bg-gray-100/60 border border-gray-200 rounded-md p-[2px] w-fit flex items-center">
        <div
          v-for="(item, index) in apartmentTab" :key="index"
          class="text-center text-sm py-1 px-6 cursor-pointer"
          :class="index === currentApartmentTab ? 'bg-primary-light2 border border-primary-light3 rounded-md text-primary' : 'text-gray71'"
          @click="currentApartmentTab = index">
          {{item}}
        </div>
      </div>
      <div v-if="currentApartmentTab === 0" class="my-6">
        <div class="mb-4">
          <label for="ca-countries" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Select a
            residence</label>
          <select
            id="ca-countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
            <option
              v-for="(item, index) in residenceStore.residences"
              :key="index">{{item.name}}</option>
          </select>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <CustomInput
            id="ca-name" type="text" label="Name"
            placeholder="e.g Executive 4-bedroom" required />
          <div>
            <label for="ca-apartmentType" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Type</label>
            <select
              id="ca-apartmentType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary">
              <option value="">2 bedroom</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label for="ca-description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">About this
            apartment</label>
          <textarea
            id="ca-description" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-50 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-50 dark:focus:border-primary"
            placeholder="Write a very good description of this apartment..." />
        </div>
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
          <TagInput
            v-model="selectedTags"
            :options="miscStore.amenities?.map(item => ({label: item?.name, icon: item?.icon, value: item?.slug}))"
            placeholder="Select Amenities"
          />
        </div>
        <div class="mb-4">
          <CustomInput
            id="ca-max_no_of_occupants" type="number" label="Max.
            Occupants"
            placeholder="8" required />
        </div>
        <div class="mb-4 grid grid-cols-2 gap-x-2">
          <div>
            <CustomInput
              id="ca-no_of_bedrooms" type="number" label="No. of
              Bedrooms"
              placeholder="3" required />
          </div>
          <div>
            <CustomInput
              id="no_of_bathrooms" type="number" label="No. of
              Bathrooms"
              placeholder="4" required />
          </div>
        </div>
      </div>
      <div v-if="currentApartmentTab === 1" class="my-6">
        <div class="mb-4">
          <CustomInput
            id="ca-price" type="text" label="Base Rate (NGN)"
            placeholder="N100,000" required />
        </div>
        <div class="mb-4">
          <CustomInput
            id="ca-weekend-rate" type="text" label="Weekend Rate (NGN)"
            placeholder="N100,000" required />
        </div>
        <div class="mb-4">
          <CustomInput
            id="ca-party-rate" type="text" label="Party/Event Rate (NGN)"
            placeholder="N100,000" required />
        </div>
        <div class="mb-4">
          <CustomInput
            id="ca-caution-fee" type="text" label="Refundable Caution Fee (NGN)"
            placeholder="N100,000" required />
        </div>
      </div>
      <div v-if="currentApartmentTab === 2" class="my-6">
        <div v-for="(_, index) in [...Array(discountRuleCount)]" :key="index" class="mb-4 grid grid-cols-2 gap-x-2">
          <CustomInput
            id="ca-discount-min-nights" type="number" label="Minimum Nights"
            placeholder="3" required />
          <CustomInput
            id="ca-discount-percent" type="number" label="Discount(%)"
            placeholder="4" required />
        </div>
        <Button text="Add Discount Rule" class="bg-white" text-color="text-primary" @click="discountRuleCount++" />
        <div class="bg-primary-light2 text-sm py-4 px-3 rounded-lg mt-3">
          Preview: Active Discounts
          <!-- <p>Stay </p> -->
        </div>
      </div>
      <Button text="Add Apartment" />
    </FormModal>
    <FormModal uid="view-apartment-modal" :title="selectedApartment?.name">
      <template #icon>
        <PhosphorIconHouse />
      </template>
      <div>
        <div
          class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex -mb-px">
            <li v-for="(item, index) in selectedApartmentTabs" :key="index" class="me-2 w-full">
              <p
class="inline-block p-4 pb-2 border-b-2 rounded-t-lg cursor-pointer"
                :class="selectedApartmentTab === index ? 'text-blue-600 border-blue-600 active dark:text-prring-primary dark:border-prring-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'"
                @click="selectedApartmentTab = index">
                {{item}}</p>
            </li>
          </ul>
        </div>
        <div v-if="selectedApartmentTab === 0" id="view-apartment-manage" class="pt-5">
          <div class="mb-4">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
id="title" type="text" :value="selectedApartment?.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
              placeholder="e.g Executive 4-bedroom" required >
          </div>
          <div class="mb-4">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About this
              apartment</label>
            <textarea
id="description" rows="4" :value="selectedApartment?.about"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-prring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
              placeholder="Write a very good description of this apartment..."/>
          </div>
          <div class="mb-4 grid grid-cols-2 gap-x-2">
            <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input
id="price" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
                placeholder="N100,000" required >
            </div>
            <div>
              <label for="caution_fee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caution
                fee</label>
              <input
id="caution_fee" type="text" :value="selectedApartment?.caution_fee"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
                placeholder="N50,000" required >
            </div>
          </div>
          <div class="mb-4">
            <label for="max_no_of_occupants" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max.
              Occupants</label>
            <input
id="max_no_of_occupants" type="number" :value="selectedApartment?.max_no_of_occupants"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
              placeholder="8" required >
          </div>
          <div class="mb-4 grid grid-cols-2 gap-x-2">
            <div>
              <label for="no_of_bedrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
                Bedrooms</label>
              <input
id="no_of_bedrooms" type="number" :value="selectedApartment?.no_of_bedrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
                placeholder="3" required >
            </div>
            <div>
              <label for="no_of_bathrooms" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of
                Bathrooms</label>
              <input
id="no_of_bathrooms" type="number" :value="selectedApartment?.no_of_bathrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
                placeholder="4" required >
            </div>
          </div>
          <button
type="submit"
            class="text-white justify-center flex items-center bg-primary hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update
            Apartment</button>
        </div>
        <div v-if="selectedApartmentTab === 1" class="pt-5">
          <div/>
        </div>
        <div v-if="selectedApartmentTab === 2" class="pt-5">
          <div class="mb-4">
            <div class="flex justify-between items-center cursor-pointer" @click="selectedApartmentShowPhotoUpload = !selectedApartmentShowPhotoUpload">
              <p class="text-sm text-primary-500 font-bold mb-2 cursor-pointer">Upload new photos</p>
              <PhosphorIconCaretUp v-if="selectedApartmentShowPhotoUpload" />
              <PhosphorIconCaretDown v-else />
            </div>
            <div v-if="selectedApartmentShowPhotoUpload" class="flex items-center justify-center w-full">
              <label
for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                      upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" >
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
    </FormModal>
  </div>
</template>

<script setup lang="ts">
  import { useFlowbite } from '~/composables/useFlowbite';

  const apartmentStore = useApartmentStore();
  const residenceStore = useResidenceStore();
  const miscStore = useMiscStore();
  console.log(miscStore?.amenities)

  useHead({
    title: "Bedrock Admin | Residences & Apartments | Properties",
  });

  onMounted(() => {
    useFlowbite(() => {
      initFlowbite();
    })
  });
  onMounted(() => {
    apartmentStore.getApartments();
    residenceStore.getResidences();
    miscStore.getAmenities();
  });

  const selectedResidenceTab = reactive({
    title: "All Apartments",
    count: apartmentStore.apartments?.length,
  });
  const residenceData = reactive({
    name: "",
    tag_line: "",
    about: "",
    address: "",
    location: "",
  });

  const selectedApartment = ref(null);
  const selectedApartmentTab = ref(0);
  const selectedApartmentShowPhotoUpload = ref(false);
  const residenceFormLoading =  ref(false);
  const tabs = ["Residencies", "Apartments"];
  const currentTab = ref(1);
  const apartmentTab = ["Basic Details", "Pricing", "Discount"];
  const currentApartmentTab = ref(0);
  const discountRuleCount = ref(1);

  const selectedApartmentTabs = computed(() => {
    return ["Manage", "Amenities", "Photos"];
  });

  const residenceTabs = computed(() => {
    const residenceAray = residenceStore.residences?.map(item => ({
      title: item.name,
      count: item.Apartments?.length || 0,
    }))
    return [{title: "All Apartments", count: apartmentStore.apartments?.length}, ...residenceAray];
  });

  const apartments = computed(() => {
    if (selectedResidenceTab.title === "All Apartments" || !selectedResidenceTab?.title) {
      return apartmentStore.apartments;
    } else {
      const selectedResidence = apartmentStore.apartments?.filter(item => item?.Residence?.name === selectedResidenceTab.title);
      return selectedResidence;
    }
  });

  const residenceFormReady = computed(() => {
    if (residenceData?.name && residenceData?.about && residenceData?.address && residenceData?.location) {
      return true;
    } else {
      return false;
    }
  });

  const selectApartment = (item) => {
    selectedApartment.value = item;
  };
  const selectResidenceTab = (item) => {
    selectedResidenceTab.title = item.title;
    selectedResidenceTab.count = item.count;
  };
  const createResidence = async () => {
    try {
      residenceFormLoading.value = true;
      const response = await residenceStore.createResidence(residenceData);
      residenceFormLoading.value = false;
    } catch (err) {
      residenceFormLoading.value = false;
    }
  }
</script>
