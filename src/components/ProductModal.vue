<template>
  <Modal :isOpen="isOpen" @on-close="onClose">
    <div class="overflow-y-auto h-[500px] max-h-[600px]">
      <form action="">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" type="text" placeholder="name" v-model="form.name" />
        </div>
        <div class="grid gap-2">
          <Label for="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="price"
            v-model="form.price" />
        </div>
        <div class="grid gap-2">
          <Label for="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="stock"
            v-model="form.stock" />
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="description"
            v-model="form.description" />
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from "@/components/ui/Modal.vue";
  import productModal from "@/composables/useProductModal";
  const { isOpen, onClose } = productModal();
  import { ref } from "vue";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "./ui/input";
  import { Label } from "./ui/label";
  import { useGlobalLoader } from "vue-global-loader";
  const { displayLoader, destroyLoader } = useGlobalLoader();
  type PAYLOAD = {
    category: string[] | undefined;
    description: string;
    mainImage: File | undefined;
    name: string;
    price: number;
    stock: number;
    subImages: File | undefined;
  };
  const form = ref<PAYLOAD>({
    category: undefined,
    description: "lorem lorem loren lorem ",
    mainImage: undefined,
    name: "Product",
    price: 10,
    stock: 10,
    subImages: undefined,
  });
</script>

<style scoped></style>
