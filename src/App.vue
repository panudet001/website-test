<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import { RouterView } from 'vue-router'

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="border-b-1 border-gray-300">
      <Header></Header>
    </div>
    <div class="flex-1 bg-white">
      <div class="max-w-[1200px] m-auto">
        <RouterView />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
