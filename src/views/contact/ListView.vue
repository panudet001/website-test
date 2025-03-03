<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

import { MagnifyingGlassIcon, TrashIcon, PlusIcon, ArchiveBoxIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue';

import axios from 'axios';
import { useContactStore } from '../../store/useContactStore';
import { useI18n } from 'vue-i18n';

const contactStore = useContactStore();
const { t, locale } = useI18n();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const openDialog = ref<boolean>(false);
const user = ref<User>();
const users = ref<User[]>([]);

const rowsPerPage = 20;

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(users.value.length / rowsPerPage));

const total = ref(0);

const { contacts, newContacts, loading, error } = contactStore;

const search = ref<string>("");

const dialogDelect = (data : User) => {
  user.value = data;
  openDialog.value = true;
}

const dialogContact = () => {
  if (user.value) {
    users.value = users.value.filter(item => item.id !== user.value.id);
  }
  openDialog.value = false;
}

const paginatedData = computed(() => {

  let filteredUsers = users.value;

  if (search.value && search.value.length > 2) {
    const query = search.value.toLowerCase();
    filteredUsers = users.value.filter(user => {
      return (
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
      );
    });
  }

  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return filteredUsers.slice(start, end);

});

const startIndex = () => {
  const index = (currentPage.value - 1) * rowsPerPage;
  return index;
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const clearSearch = () => {
  search.value = '';
}

onMounted(() => {
  contactStore.get();
  }
)

watch(
  () => contactStore.contacts,
  (nweItem : User[]) => {
    if (nweItem) {
      if (newContacts && newContacts.length > 0) {
        users.value = newContacts;
      } else {
        users.value = nweItem;
      }
    }
  }
);
</script>

<template>
  <div class="py-2 px-10 mt-5 flex flex-col gap-5">
    <p class="text-2xl">{{ t('contact-list') }} </p>
    <!-- Search -->
    <div className='flex justify-between gap-2 flex-col sm:flex-col md:flex-row lg:flex-row'>
      <div class="flex gap-2">
        <div
          class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div class="shrink-0">
            <MagnifyingGlassIcon class='size-5 text-gray-400' />
          </div>
          <input type="text" id="search" v-model="search"
            class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            :placeholder="t('search')">
        </div>
        <button @click="clearSearch()" type="button"
          class="flex gap-1 justify-center items-center p-2 rounded-md cursor-pointer border-1 border-gray-200 hover:bg-gray-200">
          <ArrowPathIcon class="size-4" />
        </button>
      </div>
      <router-link to="/contact/create">
        <button
          class='bg-orange-500 px-4 py-2 text-white rounded-md cursor-pointer hover:bg-orange-400 flex items-center justify-center gap-2'>
          <PlusIcon class="size-5" />
          {{ t('contact-create') }}
        </button>
      </router-link>
    </div>

    <!-- Table -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 text-base"> {{ t('no') }}</th>
            <th scope="col" class="px-6 py-3 text-base"> {{ t('name') }}</th>
            <th scope="col" class="px-6 py-3 text-base"> {{ t('age') }}</th>
            <th scope="col" class="px-6 py-3 text-base"> </th>
          </tr>
        </thead>
        <tbody v-if="users.length > 0">
          <tr v-for="(data, index) in paginatedData" :key="data.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-4">{{ startIndex() + index + 1 }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ data.firstName }}
              {{ data.lastName }}</td>
            <td class="px-6 py-4">{{ data.age }}</td>
            <td class="px-6 py-4">
              <button class='bg-red-400 text-white p-1 cursor-pointer rounded-md' @click="dialogDelect(data)">
                <TrashIcon class='size-5' />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center p-10">
              <div role="status" class="flex justify-center">
                <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2 text-xl">{{ t('loading') }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="users.length > 0 && paginatedData.length <= 0">
          <tr>
            <td colspan="4" class="text-center p-10">
              <div class="flex flex-col gap-1 justify-center items-center">
                <ArchiveBoxIcon class="size-10" />
                <p class="mt-2 text-xl"> {{ t('nodata') }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-col items-end">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ t('showing') }} <span class="font-semibold text-gray-900 dark:text-white">{{ startIndex() + 1 }}</span> {{
          t('to') }} <span class="font-semibold text-gray-900 dark:text-white">{{ rowsPerPage * currentPage }}</span> {{
          t('of') }} <span class="font-semibold text-gray-900 dark:text-white">{{ users.length }}</span> {{ t('entries') }}
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <button @click="previousPage()"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
          {{ t('prev') }}
        </button>
        <button @click="nextPage()"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
          {{ t('next') }}
        </button>
      </div>
    </div>

    <!-- Dialog -->
    <Dialog :open="openDialog" @close="openDialog = false">
      <DialogOverlay class="fixed inset-0 bg-black opacity-50" />

      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-xl font-semibold mb-4"> {{ t('title') }}</h2>
          <p> {{ $t('detail', { name: `${user.firstName} ${user.lastName}` }) }} </p>
          <div class="mt-4 flex justify-end">
            <button @click="openDialog = false"
              class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 cursor-pointer">
              {{ t('close') }}
            </button>
            <button @click="dialogContact()"
              class="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer">
              {{ t('delete') }}
            </button>
          </div>
        </div>
      </div>
    </Dialog>

  </div>
</template>
