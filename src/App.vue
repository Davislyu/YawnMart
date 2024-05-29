<script setup lang="ts">
  import { RouterView } from "vue-router";
  import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
  import CircleSpinner from "vue-global-loader/CircleSpinner.vue";
  import Toaster from "@/components/ui/toast/Toaster.vue";
  import { Notivue, Notification } from "notivue";
  import Navbar from "./components/Navbar.vue";
  import backgroundVideo from "./assets/backgroundVideo.mp4";
</script>

<template>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>
  <Toaster />
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <video autoplay loop muted playsinline class="background-video">
    <source :src="backgroundVideo" type="video/mp4" />
  </video>
  <Navbar />
  <div class="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
  .background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .main-content {
    position: relative;
    z-index: 10;
    padding-top: 64px; /* Adjust this value based on the height of the navbar */
  }
</style>
