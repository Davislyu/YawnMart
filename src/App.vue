<script setup lang="ts">
  import { RouterView } from "vue-router";
  import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
  import CircleSpinner from "vue-global-loader/CircleSpinner.vue";
  import Toaster from "@/components/ui/toast/Toaster.vue";
  import { Notivue, Notification } from "notivue";
  import Navbar from "./components/Navbar.vue";
</script>

<template>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>
  <Toaster />
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <Navbar />
  <RouterView />
</template>
