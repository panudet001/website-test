<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { ChatBubbleLeftIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()

interface ContactItem {
  title: string;
  name: string;
  link: string;
}


const contact = computed<ContactItem[]>(() => [
    { title: t('tel'), name: ' 02-055-6635', link: 'tel:02-055-6635' },
    { title: t('email'), name: 'info@abbon.co.th', link: 'mailto:info@abbon.co.th' },
    { title: t('line'), name: 'Abbon Corporation', link: 'line:https://page.line.me/377aboho?openQrModal=true' },
]);

</script>
<template>
    <footer class="bg-gray-800 text-white text-center py-4">
        <div
            class="flex justify-between max-w-[1200px] m-auto py-2 px-10 gap-4 flex-col sm:flex-col md:flex-row lg:flex-row">
            <div class="flex flex-col text-start gap-4">
                <p class="text-lg"> {{ t('address') }}</p>
                <span v-if="locale !== 'th'">
                    Abbon Corporation Co., Ltd. <br />
                    THE 9th TOWERS, Grand Rama9, <br />
                    Tower A, 30th Floor <br />
                    33/4 Rama 9 Road, Huay Kwang, <br />
                    Huay Kwang, Bangkok 10310
                </span>
                <span v-else>
                    บริษัท แอ๊บบอน คอร์ปอเรชั่น จำกัด <br />
                    อาคาร เดอะไนน์ ทาวเวอร์ แกรนด์ พระรามเก้า <br />
                    อาคาร A ชั้น 30 <br />
                    33/4 ถนนพระราม 9 ห้วยขวาง <br />
                    ห้วยขวาง กรุงเทพมหานคร 10310 <br />
                </span>
            </div>
            <div class="flex flex-col items-start gap-4">
                <p class="text-lg">{{ t('contact-us') }}</p>
                <div class="flex flex-col items-start gap-2">
                    <div v-for="(data, index) in contact" :key="index" class="flex gap-2">
                        <span> {{ data.title }} :</span>
                        <a :href="data.link">
                            {{ data.name }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>