<template>
  <v-container>
    <v-row class="mt-8 mb-3" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <v-select
          v-model="selectedGroup"
          class="mt-4"
          variant="outlined"
          label="選擇團購名稱"
          item-title="name"
          item-value="id"
          :items="groups"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-8 mb-5" align="center" justify="center">
      <v-col cols="6">
        <v-row align="center" justify="center">
          <h2>訂單資料</h2>
        </v-row>
        <v-row
          v-for="item in groupOrders"
          :key="item.index"
          :item="item"
          class="mt-5"
        >
          <v-col cols="12"> <b>姓名：</b>{{ item.buyer }}</v-col>
          <v-col cols="12"> <b>訂購餐點：</b> {{ item.items }}</v-col>
          <v-col cols="12"> <b>總金額：</b> {{ item.totalPrice }}</v-col>
          <v-col cols="12"><v-divider></v-divider></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, watch } from "vue";

import { getUserGroups } from "@/services/group";
import { getGroupOrders } from "@/services/order";

const selectedGroup = ref("");
const groups = ref([]);
const groupOrders = ref([]);

onMounted(() => {
  fetchUserGroup();
});

watch(selectedGroup, () => {
  fetchGroupOrder();
});

const fetchUserGroup = () => {
  const content = {
    user_id: JSON.parse(localStorage.getItem("user")).id,
  };
  getUserGroups(content).then((res) => {
    groups.value = res.data.data;
  });
};

const fetchGroupOrder = () => {
  const content = {
    group_id: selectedGroup.value,
  };
  getGroupOrders(content).then((res) => {
    const rawOrders = res.data.data;
    rawOrders.map((o) => {
      if (groupOrders.value.find((g) => g.orderId == o.order_id) == undefined) {
        const data = {
          buyer: o.user_name,
          totalPrice: o.total_price,
          items: o.item_name,
          orderId: o.order_id,
        };
        groupOrders.value.push(data);
      } else {
        const orderIndex = groupOrders.value.indexOf(
          groupOrders.value.find((g) => g.orderId == o.order_id)
        );
        groupOrders.value[orderIndex].items = groupOrders.value[
          orderIndex
        ].items.concat(", ", o.item_name);
      }
    });
  });
};
</script>

<style></style>
