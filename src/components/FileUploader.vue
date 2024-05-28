<template>
  <div
    ref="mainImageDropZoneRef"
    class="flex items-center h-40 mt-2 overflow-hidden transition-all border rounded-lg dark:border-gray-600 items"
    :class="{
      'animate-pulse ring-4 ring-teal-500 bg-teal-500 dark:border-teal-400 ring-opacity-20':
        isOverDropZone,
    }"
    @click="() => open()">
    <div class="flex flex-col justify-center mx-auto text-center align-center">
      <p>Drag some files here</p>
      <p class="mt-1 text-xs text-gray-500">Or click here to upload</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from "vue";
  import { useDropZone, useFileDialog } from "@vueuse/core";
  const mainImageDropZoneRef = ref<HTMLDivElement>();
  const emit = defineEmits(["onDrop", "onChange"]);
  function onDrop(files: File[] | null) {
    emit("onDrop", files);
  }
  const props = defineProps<{ multiple: boolean }>();

  const { isOverDropZone } = useDropZone(mainImageDropZoneRef, {
    onDrop,
  });
  const { open, onChange } = useFileDialog({
    accept: "image/*",
    multiple: props.multiple,
  });

  onChange((files) => {
    emit("onChange", files);
  });
</script>

<style scoped></style>
