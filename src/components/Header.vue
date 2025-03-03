<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useUserStore } from '../store/useUserStore';


const { t, locale } = useI18n()
const isOpenSideBar = ref<boolean>(false);
const isOpenSubMenu = ref<boolean>(false);
const language = ref<string>('en');
const menu = ref<string | null>(null);
const route = useRoute();
const dropdown = ref<string | null>(null);
const linkMap = "https://www.google.com/maps/search/the+9+tower/@13.759485,100.5679045,18z?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"

const userStore = useUserStore();

const changeLanguage = (val: string) => {
    locale.value = val;
    language.value = val;
    localStorage.setItem('lang', val);
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        isOpenSubMenu.value = false;
    }
};

onMounted(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
        language.value = lang;
        locale.value = lang;
    }
});

watch(() => route.path, (newPath: string) => {
    isOpenSideBar.value = false;
    isOpenSubMenu.value = false;
    if (newPath !== '/') {
        menu.value = newPath;
    } else {
        menu.value = null;
    }
});

</script>
<template>
    <header>
        <nav>
            <div class="py-2 px-10 flex justify-between items-center max-w-[1200px] m-auto">
                <router-link to="/" class="cursor-pointer">
                    <img src="/logo.png" class="w-[60px] h-[50px]" />
                </router-link>
                <div class="gap-5 items-center hidden sm:hidden md:flex lg:flex">
                    <router-link to="/" class="hover:text-orange-500 cursor-pointer"
                        :class="menu === null ? 'text-orange-500' : ''">{{ t('home')
                        }}</router-link>
                    <div ref="dropdown" class="relative p-5" @mouseover="isOpenSubMenu = true"
                        @mouseleave="isOpenSubMenu = false">
                        <div class="hover:text-orange-500 cursor-pointer flex gap-1 items-center"
                            @click="isOpenSubMenu = !isOpenSubMenu">{{ t('contact') }}
                            <ChevronDownIcon class="size-5" />
                        </div>

                        <div v-if="isOpenSubMenu"
                            class="absolute left-0 mt-2 w-40 bg-white border border-gray-300 shadow-md rounded-md z-10">
                            <router-link to="/contact"
                                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                                :class="menu === '/contact' ? 'text-orange-500' : ''">
                                {{ t('contact-list') }}
                            </router-link>
                            <router-link to="/contact/create"
                                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                                :class="menu === '/contact/create' ? 'text-orange-500' : ''">
                                {{ t('contact-create') }}
                            </router-link>

                        </div>

                    </div>

                    <a class="hover:text-orange-500"
                        :href="linkMap" target="_blank">{{
                            t('current-location') }}</a>
                </div>

                <div class="gap-2 items-center hidden sm:hidden md:flex lg:flex">
                    <div class="w-[32px] h-[32px] border-1 border-gray-300 rounded-full overflow-hidden">
                        <img :src="userStore.image" class="object-cover" />
                    </div>
                    <p>{{ userStore.name }}</p>
                    <div>
                        <button
                            :class="language === 'th' ? 'text-orange-400 cursor-pointer' : 'text-black cursor-pointer'"
                            @click="changeLanguage('th')">TH</button> | <button
                            :class="language === 'en' ? 'text-orange-400 cursor-pointer' : 'text-black cursor-pointer'"
                            @click="changeLanguage('en')">EN</button>
                    </div>
                </div>

                <div class="flex gap-2 sm:flex md:hidden lg:hidden">
                    <div>
                        <button
                            :class="language === 'th' ? 'text-orange-400 cursor-pointer' : 'text-black cursor-pointer'"
                            @click="changeLanguage('th')">TH</button> | <button
                            :class="language === 'en' ? 'text-orange-400 cursor-pointer' : 'text-black cursor-pointer'"
                            @click="changeLanguage('en')">EN</button>
                    </div>
                    <button @click="isOpenSideBar = !isOpenSideBar" class="cursor-pointer">
                        <Bars3Icon v-if="!isOpenSideBar" class="size-5 text-black" />
                        <XMarkIcon v-else class="size-5 text-black" />
                    </button>
                </div>
            </div>
        </nav>

        <div v-if="isOpenSideBar"
            class="fixed top-16 bottom-0 w-full bg-white shadow-lg rounded-md flex-col sm:flex-col md:hidden lg:hidden z-10">
            <div class="p-10">
                <div class="mt-5 px-4 flex gap-2 items-center">
                    <div class="w-[50px] h-[50px] border-1 border-gray-300 rounded-full overflow-hidden">
                        <img :src="userStore.image" class="object-cover overflow-hidden" />
                    </div>
                    <p>{{ userStore.name }}</p>
                </div>
                <ul class="mt-10">
                    <li class="border-1 border-b-gray-300 border-white">
                        <router-link to="/" class="block px-4 py-2 text-gray-700  hover:text-orange-500"
                            :class="menu === null ? 'text-orange-500' : ''">{{ t('home')
                            }}</router-link>
                    </li>
                    <li class="border-1 border-b-gray-300 border-white">
                        <div class="flex justify-between px-4 py-2 text-gray-700 hover:text-orange-500 cursor-pointer"
                            @click="isOpenSubMenu = !isOpenSubMenu">
                            {{ t('contact') }}
                            <ChevronDownIcon v-if="!isOpenSubMenu" class="size-5" />
                            <ChevronUpIcon v-if="isOpenSubMenu" class="size-5" />
                        </div>
                        <div v-if="isOpenSubMenu">
                            <router-link to="/contact" class="block px-6 py-2 text-gray-700  hover:text-orange-500"
                                :class="menu === '/contact' ? 'text-orange-500' : ''">
                                {{ t('contact-list') }}
                            </router-link>
                            <router-link to="/contact/create"
                                class="block px-6 py-2 text-gray-700  hover:text-orange-500"
                                :class="menu === '/contact/create' ? 'text-orange-500' : ''">
                                {{ t('contact-create') }}
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <a :href="linkMap" target="_blank"
                            class="block px-4 py-2 text-gray-700  hover:text-orange-500">
                            {{ t('current-location') }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
