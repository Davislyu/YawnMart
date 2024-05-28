<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  import ProductModal from "@/components/ProductModal.vue";
  import productModal from "@/composables/useProductModal";
  import { useCategoryStore } from "@/stores/categoryStore";
  const { onOpen, isOpen } = productModal();
  const categoryStore = useCategoryStore();
  import { useGlobalLoader } from "vue-global-loader";
  import { onMounted } from "vue";
  import { useProductStore } from "@/stores/productStore";
  const productStore = useProductStore();
  const { displayLoader, destroyLoader } = useGlobalLoader();
  ////////////////////////
  const fetchCategories = async () => {
    try {
      await categoryStore.getCategories(1, 5);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchProducts = async () => {
    try {
      await productStore.getProducts(1, 5);
    } catch (error) {
      console.log(error);
    }
  };

  const initialSetup = async () => {
    try {
      displayLoader();
      await fetchCategories();
      await fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      destroyLoader();
    }
  };
  onMounted(async () => {
    await initialSetup();
  });
</script>

<template>
  <productModal v-if="isOpen" />
  <div class="w-full max-w-4xl mx-auto my-10">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Product</Button>
    </div>
  </div>
</template>
