<template>
  <v-container>
    <v-row class="mt-8 mb-3" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <h2>STEP1</h2>
        <v-select
          v-model="selectedStore"
          class="mt-4"
          variant="outlined"
          label="選擇店家"
          item-title="name"
          item-value="id"
          :items="orderStore"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-8 mb-3" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <h2>STEP2</h2>
        <v-select
          v-model="selectedItem"
          class="mt-4"
          variant="outlined"
          multiple
          label="選擇餐點"
          item-title="name"
          item-value="id"
          :items="orderItem"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :subtitle="getPriceTitle(item.raw.price)"
            ></v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row class="mt-8 mb-5" align="center" justify="center">
      <v-col cols="6">
        <v-row align="center" justify="center">
          <h2>STEP3</h2>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12"> <b>姓名：</b>{{ confirmUser }}</v-col>
          <v-col cols="12"> <b>訂購餐點：</b> {{ confirmItems }}</v-col>
          <v-col cols="12"> <b>總金額：</b> {{ confirmPrice }}</v-col>
          <v-col cols="12"> <b>取餐地點：</b> {{ confirmPlace }}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-10" align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-btn color="primary" size="x-large" rounded="lg" @click="newOrder()"
          >送出訂單</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, watch } from "vue";
import { getGroups, getItems } from "@/services/group";
import { createOrder, createOrderItem } from "@/services/order";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits();
const props = defineProps({});

const orderStore = ref([]);
const selectedStore = ref("");

const orderItem = ref([]);
const selectedItem = ref([]);

const confirmItems = ref("");
const confirmPrice = ref(0);
const confirmPlace = ref("");
const confirmUser = ref("");

onMounted(() => {
  confirmUser.value = JSON.parse(localStorage.getItem("user")).name;
  fetchGroup();
});

watch(selectedStore, () => {
  confirmPlace.value = orderStore.value.find(
    (o) => o.id == selectedStore.value
  ).place;
  selectedItem.value = [];
  fetchItem();
});

watch(selectedItem, () => {
  updateInfo();
});

const fetchGroup = () => {
  getGroups().then((res) => {
    orderStore.value = res.data.data;
  });
};

const fetchItem = () => {
  const content = {
    groupId: selectedStore.value,
  };
  getItems(content).then((res) => {
    orderItem.value = res.data.data;
  });
};

const getPriceTitle = (price) => {
  return `$ ${price}`;
};

const updateInfo = () => {
  confirmItems.value = "";
  confirmPrice.value = 0;

  const filteredItem = orderItem.value.filter((o) =>
    selectedItem.value.find((s) => s == o.id)
  );
  filteredItem.map((item) => {
    confirmItems.value = item.name + ", " + confirmItems.value;
    confirmPrice.value = confirmPrice.value + item.price;
  });
};

const newOrder = () => {
  const content = {
    total_price: confirmPrice.value,
    group_id: selectedStore.value,
    buyer: JSON.parse(localStorage.getItem("user")).id,
  };
  createOrder(content).then((res) => {
    if (res.data.success) {
      newOrderItem(res.data.data.orderId);
    } else {
      alert("訂單新增失敗");
    }
  });
};

const newOrderItem = (order_id) => {
  const content = {
    item_id: selectedItem.value,
    order_id,
  };
  createOrderItem(content).then((res) => {
    if (res.data.success) {
      alert("訂單新增成功");
      router.push({ name: "Home" });
    } else {
      alert("訂單新增失敗");
    }
  });
};
</script>

<style></style>
