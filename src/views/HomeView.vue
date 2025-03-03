<script setup lang="ts">
import { ref, watch } from 'vue';

import { useUserStore } from '../store/useUserStore';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const { t, locale } = useI18n()

const imageUrl = ref<string | null>(null);
const fileInput = ref<string | null>(null);

const handleUpload = () => {
  fileInput.value.click();
};

const handleFileInputChange = (event: Event) => {
  const file = event.target.files[0];
  if (file) {
    userStore.setImage(file)
  }
};
</script>

<template>
  <div class="py-2 px-10 flex justify-between items-center">
    <div class="flex flex-col gap-5 items-center w-full mt-20">
      <div class="w-[140px] h-[140px] border-1 border-gray-300 rounded-full overflow-hidden">
        <img :src="userStore.image" class="object-cover overflow-hidden" />
      </div>
      <button @click="handleUpload()" class="bg-orange-500 text-white p-2 cursor-pointer rounded-md">{{
        t('upload-image') }}</button>
      <input type="file" @change="handleFileInputChange" accept="image/*" class="hidden" ref="fileInput" />
      <p>
        {{ t('name') }} : {{ userStore.name }}
      </p>
    </div>
  </div>
</template>
