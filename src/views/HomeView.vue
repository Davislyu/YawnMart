<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
  } from "@/components/ui/pagination";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { Button } from "@/components/ui/button";
  import { Icon } from "@iconify/vue";
  import ProductModal from "@/components/ProductModal.vue";
  import productModal from "@/composables/useProductModal";
  import { useCategoryStore } from "@/stores/categoryStore";
  const { onOpen, isOpen } = productModal();
  const categoryStore = useCategoryStore();
  import { useGlobalLoader } from "vue-global-loader";
  import { onMounted, computed, ref } from "vue";
  import { useProductStore } from "@/stores/productStore";
  const productStore = useProductStore();
  const { displayLoader, destroyLoader } = useGlobalLoader();
  const products = computed(() => productStore.productsData.products);
  const { toast } = useToast();
  const totalPages = computed(() => productStore.productsData.totalPages);

  const totalProducts = computed(() => productStore.productsData.totalProducts);

  const productsData = computed(() => productStore.productsData);

  const currentPage = ref(1);
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
      await productStore.getProducts(currentPage.value, 5);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProd = async (id: string, name: string) => {
    try {
      displayLoader();
      await productStore.deleteProduct(id);
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      destroyLoader();

      toast({
        title: `Deleted!`,
        description: `Successully deleted ${name}`,
        variant: "destructive",
      });
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
    <div class="grid w-full grid-cols-3 gap-4 my-10">
      <Card
        v-for="product in products"
        :key="product._id"
        class="flex flex-col justify-between">
        <CardContent class="grid gap-4 p-4 pt-4">
          <div class="overflow-hidden rounded-md">
            <img
              :src="product.mainImage.url"
              :alt="product.name"
              class="object-cover w-full h-auto transition-all hover:scale-105" />
          </div>
          <h3 class="text-xl font-semibold">
            {{ product.name }}
          </h3>
          <p>{{ product.description }}</p>
        </CardContent>
        <CardFooter class="justify-between w-full p-4 pt-4 border-t">
          <p>{{ product.price }}$</p>
          <div class="flex space-x-2">
            <Button
              variant="secondary"
              @click="$router.push(`/products/${product._id}`)">
              <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
            </Button>
            <Button
              @click="deleteProd(product._id, product.name)"
              variant="destructive">
              <Icon icon="ph:trash-bold" class="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    <Pagination
      v-slot="{ page }"
      show-edges
      :items-per-page="5"
      :total="totalProducts"
      :default-page="1">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="currentPage = 1" />
        <PaginationPrev @click="currentPage = currentPage - 1" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child>
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="
                async () => {
                  currentPage = item.value;
                  await fetchProducts();
                }
              ">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="currentPage + 1" />
        <PaginationLast @click="currentPage = totalPages" />
      </PaginationList>
    </Pagination>
  </div>
</template>
